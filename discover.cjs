const Parser = require("rss-parser");

const parser = new Parser();

const sources = [
  "https://www.technologyreview.com/feed/",
  "https://techcrunch.com/category/fintech/feed/",
  "https://techcrunch.com/category/artificial-intelligence/feed/"
];

async function discoverTopics() {
  const allTopics = [];

  for (const source of sources) {
    try {
      const feed = await parser.parseURL(source);

      const topics = feed.items.slice(0, 5).map((item) => ({
        title: item.title,
        link: item.link,
        publishedAt: item.pubDate
      }));

      allTopics.push(...topics);

    } catch (error) {
      console.log("Could not read:", source);
    }
  }

  return allTopics;
}

// Test the discovery engine
discoverTopics()
  .then((topics) => {
    console.log("\n🌐 BillWise discovered:\n");

    if (topics.length === 0) {
      console.log("No topics found.");
      return;
    }

    topics.forEach((topic, index) => {
      console.log(`${index + 1}. ${topic.title}`);
      console.log(`   ${topic.link}`);
      console.log("");
    });
  })
  .catch((error) => {
    console.log("Discovery error:", error.message);
  });

module.exports = { discoverTopics };