const Parser = require("rss-parser");

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "FinTechPulse/1.0"
  }
});

// Live sources focused on FinTech, AI and financial technology
const sources = [
  "https://techcrunch.com/category/fintech/feed/",
  "https://techcrunch.com/category/artificial-intelligence/feed/",
  "https://www.technologyreview.com/feed/"
];

async function discoverTopics() {
  const allTopics = [];

  for (const source of sources) {
    try {
      console.log(`🌐 Checking source: ${source}`);

      const feed = await parser.parseURL(source);

      const topics = feed.items
        .slice(0, 5)
        .map((item) => ({
          title: item.title || "Untitled topic",
          link: item.link,
          publishedAt:
            item.isoDate ||
            item.pubDate ||
            new Date().toISOString(),
          source: source
        }))
        .filter((topic) => topic.link);

      allTopics.push(...topics);

      console.log(
        `✅ Found ${topics.length} topics`
      );

    } catch (error) {

      console.log(
        `⚠️ Could not read source: ${source}`
      );

      console.log(
        `   Reason: ${error.message}`
      );
    }
  }

  // Remove duplicate links
  const uniqueTopics = [];

  const seenLinks = new Set();

  for (const topic of allTopics) {

    if (!seenLinks.has(topic.link)) {

      seenLinks.add(topic.link);

      uniqueTopics.push(topic);
    }
  }

  console.log(
    `📰 Total unique topics discovered: ${uniqueTopics.length}`
  );

  return uniqueTopics;
}

// Run a discovery test when this file is executed directly
if (require.main === module) {

  discoverTopics()
    .then((topics) => {

      console.log(
        "\n🤖 FinTechPulse discovered:\n"
      );

      if (topics.length === 0) {

        console.log(
          "❌ No topics found."
        );

        return;
      }

      topics.forEach((topic, index) => {

        console.log(
          `${index + 1}. ${topic.title}`
        );

        console.log(
          `   Source: ${topic.link}`
        );

        console.log(
          `   Published: ${topic.publishedAt}`
        );

        console.log("");
      });

    })
    .catch((error) => {

      console.error(
        "❌ Discovery error:",
        error.message
      );

    });
}

module.exports = {
  discoverTopics
};