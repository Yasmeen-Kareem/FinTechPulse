const express = require("express");
const fs = require("fs");
const { discoverTopics } = require("./discover.cjs");
const { evaluateTopic } = require("./editor.cjs");

const app = express();

app.use(express.json());

const MEMORY_FILE = "memory.json";
const AGENT_ID = "billwise-001";

let agentStarted = false;

function loadMemory() {
  return JSON.parse(
    fs.readFileSync(MEMORY_FILE, "utf8")
  );
}

function saveMemory(memory) {
  fs.writeFileSync(
    MEMORY_FILE,
    JSON.stringify(memory, null, 2)
  );
}

async function runAgent() {
  console.log("🤖 BillWise autonomous scan started.");

  try {
    const memory = loadMemory();
    const topics = await discoverTopics();

    console.log(`🌐 Found ${topics.length} topics`);

    for (const topic of topics) {

      const alreadyPublished =
        memory.publishedTopics.some(
          (post) =>
            post.sources &&
            post.sources.includes(topic.link)
        );

      if (alreadyPublished) {
        continue;
      }

      const evaluation =
        evaluateTopic(topic);

      console.log(
        `${evaluation.decision.toUpperCase()}: ${topic.title}`
      );

      if (evaluation.decision === "reject") {
        memory.rejectedTopics.push({
          topic: topic.title,
          reason: evaluation.reason,
          checkedAt: new Date().toISOString()
        });

        continue;
      }

      const post = {
        id: `billwise-${Date.now()}`,

        createdAt:
          new Date().toISOString(),

        text:
          `${topic.title}. BillWise tracks this ` +
          `because it has practical relevance to ` +
          `money, payments, billing or financial technology.`,

        rationale:
          evaluation.reason,

        sources: [
          topic.link
        ]
      };

      memory.publishedTopics.push(post);

      console.log(
        `✅ PUBLISHED: ${topic.title}`
      );

      break;
    }

    saveMemory(memory);

    console.log("💾 Memory updated.");

  } catch (error) {
    console.error(
      "❌ Agent error:",
      error.message
    );
  }
}

function startAgent() {

  if (agentStarted) {
    return;
  }

  agentStarted = true;

  console.log(
    "🚀 BillWise autonomous agent initialized."
  );

  runAgent();

  setInterval(
    runAgent,
    10 * 60 * 1000
  );
}

app.post("/api/agent/init", (req, res) => {

  startAgent();

  res.json({
    agentId: AGENT_ID
  });
});

app.get("/api/agent/feed", (req, res) => {

  const agentId = req.query.agentId;

  if (agentId !== AGENT_ID) {
    return res.status(404).json({
      posts: []
    });
  }

  const memory = loadMemory();

  const posts =
    memory.publishedTopics
      .map((post) => ({
        id: post.id,
        createdAt: post.createdAt,
        text: post.text,
        rationale: post.rationale,
        sources: post.sources
      }))
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

  res.json({
    posts
  });
});

app.get("/", (req, res) => {
  res.send("BillWise AI Agent is running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `BillWise API running on port ${PORT}`
  );
});
