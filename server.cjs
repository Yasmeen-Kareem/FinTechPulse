const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const MEMORY_FILE = "memory.json";

function loadMemory() {
  return JSON.parse(fs.readFileSync(MEMORY_FILE, "utf8"));
}

function saveMemory(memory) {
  fs.writeFileSync(
    MEMORY_FILE,
    JSON.stringify(memory, null, 2)
  );
}

// Initialize BillWise
app.post("/api/agent/init", (req, res) => {
  const memory = loadMemory();

  const agentId = "billwise-001";

  res.json({
    agentId: agentId,
    persona: memory.persona
  });
});

// BillWise feed
app.get("/api/agent/feed", (req, res) => {
  const memory = loadMemory();

  const posts = memory.publishedTopics.map((post) => ({
    id: post.id,
    createdAt: post.createdAt,
    text: post.text,
    rationale: post.rationale,
    sources: post.sources
  }));

  posts.sort(
    (a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
  );

  res.json({
    posts: posts
  });
});

app.listen(3000, () => {
  console.log(
    "BillWise API running on http://localhost:3000"
  );
});