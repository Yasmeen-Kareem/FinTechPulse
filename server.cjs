const express = require("express");
const fs = require("fs");
const { discoverTopics } = require("./discover.cjs");
const { evaluateTopic } = require("./editor.cjs");

const app = express();

app.use(express.json());

// Allow the React webpage to communicate with the API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const MEMORY_FILE = "memory.json";
const AGENT_ID = "fintechpulse-001";

let agentStarted = false;
let agentTimer = null;

function loadMemory() {
  if (!fs.existsSync(MEMORY_FILE)) {
    return {
      publishedTopics: [],
      rejectedTopics: []
    };
  }

  const memory = JSON.parse(
    fs.readFileSync(MEMORY_FILE, "utf8")
  );

  // Make sure required arrays exist
  memory.publishedTopics =
    memory.publishedTopics || [];

  memory.rejectedTopics =
    memory.rejectedTopics || [];

  return memory;
}

function saveMemory(memory) {
  fs.writeFileSync(
    MEMORY_FILE,
    JSON.stringify(memory, null, 2)
  );
}

// Autonomous FinTechPulse scan
async function runAgent() {
  console.log(
    "\n🤖 FinTechPulse autonomous scan started."
  );

  try {
    const memory = loadMemory();

    const topics = await discoverTopics();

    console.log(
      `🌐 Found ${topics.length} topics`
    );

    for (const topic of topics) {

      // Avoid publishing the same source twice
      const alreadyPublished =
        memory.publishedTopics.some(
          (post) =>
            post.sources &&
            post.sources.includes(topic.link)
        );

      if (alreadyPublished) {
        console.log(
          `⏭️ Already published: ${topic.title}`
        );
        continue;
      }

      // Editorial decision
      const evaluation =
        evaluateTopic(topic);

      console.log(
        `${evaluation.decision.toUpperCase()}: ${topic.title}`
      );

      // Reject unsuitable topics
      if (evaluation.decision === "reject") {

        memory.rejectedTopics.push({
          topic: topic.title,
          reason: evaluation.reason,
          checkedAt:
            new Date().toISOString()
        });

        continue;
      }

      // Publish selected topic
      const post = {
        id: `fintechpulse-${Date.now()}`,

        createdAt:
          new Date().toISOString(),

        text:
          `${topic.title}. FinTechPulse selected this ` +
          `development because it is relevant to ` +
          `financial technology, digital payments, ` +
          `banking technology, or AI in finance.`,

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

      // One new post per autonomous scan
      break;
    }

    saveMemory(memory);

    console.log(
      "💾 FinTechPulse memory updated."
    );

  } catch (error) {

    console.error(
      "❌ FinTechPulse agent error:",
      error.message
    );
  }
}

// Start autonomous agent
function startAgent() {

  if (agentStarted) {
    return;
  }

  agentStarted = true;

  console.log(
    "🚀 FinTechPulse autonomous agent initialized."
  );

  // Run immediately
  runAgent();

  // Run automatically every 1 minute
  // Use 10 minutes later for final evaluation if preferred
  agentTimer = setInterval(
    runAgent,
    60 * 1000
  );
}

// Initialize agent
app.post(
  "/api/agent/init",
  (req, res) => {

    startAgent();

    res.json({
      agentId: AGENT_ID
    });
  }
);

// Published feed
app.get(
  "/api/agent/feed",
  (req, res) => {

    const agentId =
      req.query.agentId;

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
  }
);

// Homepage
app.get("/", (req, res) => {
  res.send(
    "FinTechPulse Autonomous AI Agent is running 🚀"
  );
});

// Render provides PORT
const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `🚀 FinTechPulse API running on port ${PORT}`
  );

});