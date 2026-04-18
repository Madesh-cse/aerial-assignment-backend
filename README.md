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
