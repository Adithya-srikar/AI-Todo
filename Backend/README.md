# Backend - AI Task Planner

Express.js backend for the AI-Driven Smart Task Planner application.

## 🛠️ Technologies

- Node.js
- Express.js
- MongoDB & Mongoose
- Google Generative AI (Gemini)
- CORS
- dotenv

## 📁 Structure

```
Backend/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   └── Todo.js              # Todo data model
├── routes/
│   ├── aiRoutes.js          # AI endpoints
│   └── todoRoutes.js        # Todo CRUD endpoints
├── services/
│   └── geminiService.js     # Gemini AI integration
├── server.js                # Main server file
└── package.json
```

## ⚙️ Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

3. Run the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## 🔌 API Endpoints

### AI Routes (`/api/ai`)

**Generate Questions**
```
POST /api/ai/questions
Body: { goal: string }
Response: { questions: string[] }
```

**Generate Plan**
```
POST /api/ai/generate-plan
Body: { goal: string, answers: string[] }
Response: { plan: Array<{title, description, timeEstimate}> }
```

### Todo Routes (`/api/todos`)

**Get All Todos**
```
GET /api/todos
Response: Todo[]
```

**Create Todo**
```
POST /api/todos
Body: { title, description?, timeEstimate?, goal?, order? }
Response: Todo
```

**Create Multiple Todos**
```
POST /api/todos/batch
Body: { todos: Todo[] }
Response: Todo[]
```

**Update Todo**
```
PUT /api/todos/:id
Body: { completed?, title?, description?, etc. }
Response: Todo
```

**Delete Todo**
```
DELETE /api/todos/:id
Response: { message: string }
```

**Delete All Todos**
```
DELETE /api/todos
Response: { message: string }
```

## 🤖 Gemini AI Integration

The `geminiService.js` handles all AI interactions:

- **Question Generation**: Creates 3-5 clarifying questions based on user goal
- **Plan Generation**: Generates 5-10 actionable tasks based on goal and answers
- **Error Handling**: Provides fallback responses if AI fails
- **JSON Parsing**: Extracts structured data from AI responses

## 📊 Data Models

### Todo Model
```javascript
{
  title: String (required),
  description: String,
  timeEstimate: String,
  completed: Boolean (default: false),
  goal: String,
  order: Number (default: 0),
  timestamps: true
}
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `GEMINI_API_KEY` | Google Gemini API key |

## 🚀 Development

The server includes:
- CORS enabled for cross-origin requests
- JSON body parsing
- MongoDB connection with error handling
- Health check endpoint at `/`

## 📝 Notes

- The server must be running before starting the frontend
- Make sure MongoDB is accessible with the provided URI
- Gemini API key must be valid for AI features to work


