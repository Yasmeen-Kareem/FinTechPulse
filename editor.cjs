function evaluateTopic(topic) {
  const title = (topic.title || "").toLowerCase();

  const strongFintechKeywords = [
    "fintech",
    "financial technology",
    "payment",
    "payments",
    "digital payment",
    "digital payments",
    "upi",
    "banking",
    "bank",
    "digital bank",
    "neobank",
    "open banking",
    "credit",
    "lending",
    "loan",
    "insurance",
    "insurtech",
    "wealthtech",
    "financial services",
    "financial infrastructure",
    "payment infrastructure",
    "digital wallet",
    "wallet",
    "fraud",
    "financial fraud",
    "financial crime",
    "rbi",
    "central bank",
    "interest rate",
    "monetary policy",
    "financial regulation",
    "fintech regulation",
    "banking regulation",
    "financial cybersecurity",
    "payment security",
    "financial ai",
    "ai in finance",
    "ai banking",
    "ai payments",
    "blockchain finance",
    "stablecoin"
  ];

  const supportingKeywords = [
    "artificial intelligence",
    "ai",
    "machine learning",
    "automation",
    "cybersecurity",
    "data",
    "technology"
  ];

  const irrelevantKeywords = [
    "movie",
    "film",
    "music",
    "celebrity",
    "sports",
    "gaming",
    "recipe",
    "fashion",
    "travel",
    "entertainment"
  ];

  // Reject clearly unrelated topics
  const irrelevantMatch = irrelevantKeywords.find(
    (keyword) => title.includes(keyword)
  );

  if (irrelevantMatch) {
    return {
      decision: "reject",
      reason:
        `Rejected because the topic is unrelated to FinTech. ` +
        `Detected unrelated category: ${irrelevantMatch}.`
    };
  }

  // Strong FinTech relevance
  const fintechMatches =
    strongFintechKeywords.filter(
      (keyword) => title.includes(keyword)
    );

  if (fintechMatches.length >= 1) {
    return {
      decision: "publish",
      reason:
        `Selected because the topic has direct FinTech relevance. ` +
        `Relevant signals: ${fintechMatches.join(", ")}.`
    };
  }

  // AI/technology alone is NOT enough
  const technologyMatches =
    supportingKeywords.filter(
      (keyword) => title.includes(keyword)
    );

  if (technologyMatches.length >= 2) {
    return {
      decision: "reject",
      reason:
        "Rejected because the topic is primarily general AI or technology news and does not demonstrate sufficient relevance to financial technology."
    };
  }

  return {
    decision: "reject",
    reason:
      "Rejected because the topic does not demonstrate sufficient relevance to FinTech, banking, payments, financial services, or AI in finance."
  };
}

module.exports = {
  evaluateTopic
};