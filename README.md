# 🚀 NovaChat – AI-Powered Chatbot  
### Spring Boot + React + Gemini

NovaChat is a modern full-stack AI chatbot that combines a **Spring Boot backend**, **React (Vite) frontend**, and **Gemini** for smart conversational responses.

---

## 🌟 Meaning of “NovaChat”

The name **NovaChat** comes from two meaningful words:

- **Nova** → A bright, explosive burst of light from a star.  
  Symbolizes **innovation, brilliance, and next-generation intelligence**.

- **Chat** → Conversation or messaging.

### 👉 Combined Meaning  
**NovaChat = A bright, intelligent new way to chat — shining like a nova with fast and powerful AI responses.**

---

# 📌 Features

### ✔ AI-powered chat using Gemini  
### ✔ Spring Boot REST backend  
### ✔ React (Vite) frontend  
### ✔ Clean UI with message bubbles & typing animation  
### ✔ Error handling for API overload / rate limits  
### ✔ Modular and extensible code architecture  

---

# 🏗 Tech Stack

### **Backend**
- Java 17  
- Spring Boot 3.3+  
- RestTemplate  
- Maven  
- Gemini API

### **Frontend**
- React (Vite)  
- JavaScript  
- fetch API  
- Custom CSS for modern UI

---

# 📂 Project Structure

```
NovaChat_App/
│
├── backend/          # Spring Boot (Java)
│   └── src/main/java/.../chatbot/
│       ├── controller/
│       ├── service/
│       └── dto/
│
└── frontend/         # React (Vite)
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── api/chat.js
    └── package.json
```

---

# 🔧 Backend Setup

### 1️⃣ Add configuration in `application.properties`:

```properties
spring.application.name=chatbot
server.port=8080


gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
gemini.api.key=YOUR_API_KEY_HERE
gemini.api.model=gemini-2.5-flash
```

> **Security:** Never commit a real API key. Keep `YOUR_API_KEY_HERE` as a placeholder in Git, and put your real key only on your local machine.

### 2️⃣ Run Backend

```bash
mvn spring-boot:run
```

API will run at:

```
http://localhost:8080/api/chat
```

---

# 🎨 Frontend Setup (React + Vite)

### 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Run React application

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# 🧪 API Details

### **POST /api/chat**

#### Request

```json
{
  "message": "Tell me about yourself"
}
```

#### Response

```json
{
  "reply": "I am a Gemini-powered AI..."
}
```

---

# 🖼 UI Screenshot Section

(Add screenshots here once UI is visible)

```
📸 /screenshots/home.png
📸 /screenshots/chat.png
```

---

# 🚀 Future Enhancements

- Save chat history  
- Streamed AI responses  
- Voice input  
- User profiles  
- Dark/Light mode  

---

# 🤝 Contributing

Pull requests are welcome!  
For major changes, open an issue to discuss the proposal.

---

# 📜 License

MIT License.

---

