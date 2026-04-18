# 🛰️ AI Surveillance Backend API

Backend service for an AI-powered drone surveillance system that analyzes incidents and generates real-time insights.

---

## 🚀 Overview

This backend simulates an **AI investigation workflow** by combining multiple data sources:

- 🪪 Badge Logs  
- 🚗 Vehicle Movement  
- 🚁 Drone Patrol Data  

It processes these inputs and returns:

- 📄 Incident Summary  
- 📊 Confidence Score  
- 🚨 Escalation Decision  
- 🧠 AI Reasoning Steps  

---

## 🧰 Tech Stack

- **Backend Framework:** Node.js, Express.js  
- **Language:** TypeScript  
- **Architecture:** REST API  

---

## 📦 Features

- 🔍 **AI-based investigation logic**  
- 📊 **Dynamic confidence calculation**  
- 🚨 **Smart escalation detection**  
- 🧠 **Explainable reasoning output**  
- 🔗 **Frontend-ready API**  

---

## 📁 Project Structure

```text
src/
 ├── routes/
 │   └── investigate.ts
 ├── services/
 │   └── investigateService.ts
 ├── tools/
 │   ├── badgeTools.ts
 │   ├── vehicleTools.ts
 │   └── droneTools.ts
 ├── data/
 │   └── incidents.ts
 ├── app.ts
 └── server.ts
```


🛠️ Setup Instructions

Follow the steps below to run the backend locally:

📥 Clone the Repository
```bash
git clone https://github.com/your-username/your-project.git
cd your-project/backend
```

📦 Install Dependencies
```bash
 npm install
```

⚙️ Configure TypeScript

Create a tsconfig.json file:
```bash
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

📜 Add Scripts

Update your package.json:
```bash
"scripts": {
  "dev": "nodemon --watch src --exec ts-node src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

▶️ Start Development Server
```bash
npm run dev
```

🌐 API Endpoint
🔍 Investigate Incidents
GET /api/investigate
✅ Sample Response
``` bash
{
  "incidents": [
    {
      "id": 1,
      "type": "Suspicious Movement",
      "location": "Yard C",
      "time": "02:10 AM"
    }
  ],
  "summary": "Possible unauthorized movement detected near Yard C.",
  "confidence": 87,
  "needsEscalation": true,
  "followUp": "Security team should inspect Yard C immediately.",
  "reasoningSteps": [
    "Badge activity detected at Yard C",
    "Suspicious vehicle movement near Yard C",
    "Drone confirmed activity at Yard C"
  ]
}
```
🧠 AI Logic Flow
- **Badge Logs + Vehicle Data + Drone Logs**
              ↓
       - **Correlation Engine**
              ↓
      -**Risk Detection Logic**
              ↓
   `**AI Summary + Confidence Score**
   
📊 Confidence Calculation

Badge match → +30
Vehicle suspicious → +30
Drone confirmation → +40

⚠️ Notes
Simulation-based AI system (no real ML model)
Designed for frontend integration

Easily extendable with real-time data
🚀 Future Improvements
🤖 Integrate real ML models
📡 Real-time updates (WebSockets)
🗄 Database integration (MongoDB / PostgreSQL)
🔐 Authentication & authorization


👨‍💻 Author
Madesh Mohan
