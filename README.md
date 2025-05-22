# 📝 Todo Summary Assistant

A modern full-stack application that helps you manage your todos and get AI-powered summaries sent to Slack.

---

## 🚀 Features

- ✅ Create, edit, delete personal to-do items
- 📋 View current to-do list
- 🧠 Summarize all pending to-dos using a real LLM (OpenAI, Cohere, etc.)
- 📤 Post the generated summary to a Slack channel
- 🔔 Success/failure notifications for Slack operations
- 🎨 Modern UI with purple theme
- 🔄 Real-time updates and loading states

---

## 🛠️ Tech Stack

### Frontend:
- **React** (UI)
- **Modern CSS with custom properties** (styling)
- Axios (API communication)

### Backend:
- **Node.js + Express**
- LLM Integration (e.g., **OpenAI**)
- Slack Webhook Integration
- JSON file-based storage

---

## 🧩 API Endpoints

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/todos`         | Fetch all to-dos                 |
| POST   | `/todos`         | Add a new to-do                  |
| DELETE | `/todos/:id`     | Delete a to-do by ID             |
| POST   | `/summarize`     | Summarize todos & send to Slack  |

---

## 🧩 Prerequisites

- **Node.js (v14 or higher)**
- **OpenAI API key**
- **Slack workspace with webhook URL**

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/SukhleenSingh/To-do-Summary-Assistant.git
cd todo-summary-assistant
```

### 2. Install Dependencies

#### Frontend:
```bash
cd frontend
npm install
```

#### Backend:
```bash
cd ../backend
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
```

---

### 4. Run Locally

#### Backend:
```bash
cd backend
npm start
```

#### Frontend:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

---

## 🤖 LLM Setup (OpenAI Example)

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API keys section
4. Create a new API key

---

## 💬 Slack Setup

1. Go to your Slack workspace
2. Create a new app at [api.slack.com/apps](https://api.slack.com/apps)
3. Enable Incoming Webhooks
4. Create a new webhook URL for your desired channel

---

## 📐 Design & Architecture Decisions

- **Modular folder structure** separating frontend and backend
- **Axios** used for clean frontend-backend communication
- **LLM integration** uses `/summarize` endpoint to send the current to-do list, gets a response, and then pushes it to Slack

---


## 📁 Project Structure

```
todo-summary-assistant/
│
├── frontend/         # React App
│   ├── src/
│   ├── public/
│   └── .env.example
│
├── backend/          # Node.js (Express)
│   ├── routes/
│   ├── services/
│   └── .env.example
│
└── README.md
```

---

## 🧪 Future Enhancements

- ✅ Task due dates and priorities
- ✅ Completed task summary
- ✅ Markdown support in Slack summary

---

## 📄 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---


### © 2025 Todo Summary Assistant – Built with ❤️ during Full Stack Internship
