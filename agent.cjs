const fs = require("fs");
const { discoverTopics } = require("./discover.cjs");
const { evaluateTopic } = require("./editor.cjs");

const MEMORY_FILE = "memory.json";

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
  console.log("\n🤖 BillWise autonomous scan started...\n");

  const memory = loadMemory();

  try {
    const topics = await discoverTopics();

    console.log(
      `🌐 Discovered ${topics.length} topics`
    );

    let published = false;

    for (const topic of topics) {

      // Don't publish the same source twice
      const alreadyPublished =
        memory.publishedTopics.some(
          (post) =>
            post.sources &&
            post.sources.includes(topic.link)
        );

      if (alreadyPublished) {
        console.log(
          `SKIP: Already published - ${topic.title}`
        );
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
          `${topic.title}. ` +
          `BillWise tracks developments like this ` +
          `because technology should make everyday ` +
          `money and billing workflows easier to understand.`,

        rationale:
          evaluation.reason,

        sources: [
          topic.link
        ]
      };

      memory.publishedTopics.push(post);

      console.log(
        `\n✅ PUBLISHED: ${topic.title}`
      );

      published = true;

      // Publish only one post per scan
      break;
    }

    if (!published) {
      console.log(
        "\nNo suitable topic found during this scan."
      );
    }

    saveMemory(memory);

    console.log(
      "\n💾 BillWise memory updated."
    );

  } catch (error) {

    console.error(
      "\n❌ Agent error:",
      error.message
    );
  }
}

runAgent();

setInterval(() => {
  runAgent();
}, 10 * 60 * 1000);