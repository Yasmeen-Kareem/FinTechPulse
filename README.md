\# FinTechPulse 🤖💳



\*\*FinTechPulse\*\* is an autonomous AI and technology persona focused on the FinTech ecosystem.



It independently discovers live technology and financial topics, evaluates their relevance, publishes selected topics, remembers previously published content, and continues operating without additional human prompts.



\## 🚀 Live Demo



\*\*Live API:\*\*



https://fintechpulse.onrender.com



\## 🎯 Challenge Goal



FinTechPulse was built to demonstrate an autonomous AI creator that can:



\* Discover topics from live information sources

\* Apply editorial judgment

\* Maintain a consistent FinTech persona

\* Remember previously published content

\* Publish automatically over time

\* Explain why each topic was selected

\* Provide the source of each published topic



\## 🧠 Persona



\*\*Name:\*\* FinTechPulse



\*\*Domain:\*\* FinTech and AI Technology



\### Editorial Focus



FinTechPulse focuses on:



\* Digital payments

\* UPI and payment infrastructure

\* Banking technology

\* Digital banking

\* Financial services

\* AI in finance

\* Financial cybersecurity

\* FinTech regulation

\* Financial infrastructure

\* Emerging financial technologies



The agent rejects topics that do not demonstrate meaningful relevance to financial technology.



\## ⚙️ How It Works



```text

Live Information Sources

&#x20;       ↓

Topic Discovery

&#x20;       ↓

Editorial Evaluation

&#x20;       ↓

Publish / Reject

&#x20;       ↓

Persistent Memory

&#x20;       ↓

Autonomous Feed

```



The agent runs automatically after initialization and periodically checks for new topics.



Previously published topics are stored in `memory.json` to reduce repetition.



\## 🔌 API



\### Initialize Agent



```http

POST /api/agent/init

```



Example response:



```json

{

&#x20; "agentId": "fintechpulse-001"

}

```



\### Retrieve Feed



```http

GET /api/agent/feed?agentId=fintechpulse-001

```



Example response:



```json

{

&#x20; "posts": \[

&#x20;   {

&#x20;     "id": "fintechpulse-example",

&#x20;     "createdAt": "2026-08-09T12:30:43.354Z",

&#x20;     "text": "Example FinTech topic...",

&#x20;     "rationale": "Why the topic was selected and why it is relevant now.",

&#x20;     "sources": \[

&#x20;       "https://example.com/source"

&#x20;     ]

&#x20;   }

&#x20; ]

}

```



Posts are returned in reverse chronological order.



\## 🧠 Memory



The agent maintains persistent memory containing:



\* Previously published topics

\* Rejected topics

\* Publishing reasons

\* Source URLs

\* Publication timestamps



This allows the agent to avoid unnecessary repetition.



\## 🛠️ Technology Stack



\* Node.js

\* Express.js

\* JavaScript

\* RSS feeds

\* JSON-based persistent memory

\* Render deployment

\* GitHub



\## 📁 Project Structure



```text

FinTechPulse/

│

├── server.cjs

├── discover.cjs

├── editor.cjs

├── memory.json

├── package.json

├── PROMPTS.md

└── src/

&#x20;   └── App.jsx

```



\## 🤖 Autonomous Operation



After the initialization endpoint is called, the agent starts its autonomous loop.



No additional human prompt is required for subsequent topic discovery and publishing.



The evaluator can periodically call the feed endpoint and observe new posts appearing over time.



\## 📝 AI Usage



This project was developed with AI assistance for:



\* Architecture design

\* Code generation

\* Debugging

\* API implementation

\* RSS topic discovery

\* Editorial filtering

\* Memory implementation

\* Testing

\* Deployment guidance



The detailed AI-usage log is available in:



`PROMPTS.md`



\## 👩‍💻 Project Background



Built by a \*\*B.Com Computer Applications student\*\* interested in exploring technology, AI, and FinTech through practical project development.



The project was created to explore how an autonomous AI system can continuously discover and evaluate real-world financial technology information rather than waiting for individual prompts.
📌 Project Folder Note

The project was initially developed under the local folder name billwise during the early development stage.

As the project evolved into an autonomous FinTech AI persona, the project was renamed to FinTechPulse. The GitHub repository, application name, API identity, and deployment now use the FinTechPulse name.

The local folder name remains billwise only because it was the original development directory. It does not affect the application, deployment, or functionality.

Final project identity: FinTechPulse 🚀


