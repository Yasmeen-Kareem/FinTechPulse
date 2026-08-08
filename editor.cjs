function evaluateTopic(topic) {
  const text = topic.title.toLowerCase();

  const positiveKeywords = [
    "invoice",
    "billing",
    "payment",
    "payments",
    "upi",
    "banking",
    "fintech",
    "financial",
    "accounting",
    "expense",
    "subscription",
    "fraud detection",
    "financial security",
    "ai accounting",
    "ai finance",
    "ai payment",
    "ai invoice"
  ];

  const negativeKeywords = [
    "virus",
    "malware",
    "celebrity",
    "movie",
    "gaming",
    "censorship",
    "politics",
    "conspiracy",
    "entertainment"
  ];

  const positiveMatches = positiveKeywords.filter(
    (keyword) => text.includes(keyword)
  );

  const negativeMatches = negativeKeywords.filter(
    (keyword) => text.includes(keyword)
  );

  // Reject obviously irrelevant or risky topics
  if (negativeMatches.length > 0) {
    return {
      decision: "reject",
      score: 0,
      reason:
        "Rejected because the topic does not provide a useful connection to everyday billing, payments or financial technology."
    };
  }

  // Require a strong finance/billing connection
  if (positiveMatches.length === 0) {
    return {
      decision: "reject",
      score: 10,
      reason:
        "Rejected because the topic does not have a strong enough connection to BillWise's finance and billing focus."
    };
  }

  const score = Math.min(
    50 + positiveMatches.length * 15,
    100
  );

  return {
    decision: "publish",
    score: score,
    reason:
      "Selected because the topic has a clear connection to AI, payments, billing or financial technology and can provide practical value to everyday users."
  };
}

module.exports = { evaluateTopic };