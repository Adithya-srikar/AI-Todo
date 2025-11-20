# 🚀 AI-Driven Smart Task Planner

A beautiful, AI-powered task planning application that helps you break down your goals into actionable steps. Built with the MERN stack and powered by Google's Gemini AI.

## ✨ Features

- 🎯 **Smart Goal Processing**: Enter any goal and get AI-generated clarifying questions
- 🤖 **AI-Powered Planning**: Receive a personalized, step-by-step action plan
- 📋 **Beautiful UI**: Notion-inspired clean and modern interface
- ✅ **Task Management**: Select, save, and track your tasks with ease
- 💾 **Persistent Storage**: All tasks saved in MongoDB
- 🎨 **Smooth Animations**: Delightful transitions and micro-interactions throughout

## 🛠️ Tech Stack

**Frontend:**
- React (JSX)
- Vite
- Tailwind CSS
- Axios

**Backend:**
- Node.js (Vercel Serverless Functions)
- MongoDB & Mongoose
- Google Generative AI (Gemini 2.0 Flash)

## 📁 Project Structure

```
AI TODO/
├── api/                    # Vercel serverless functions
│   ├── ai/
│   │   ├── questions.js
│   │   └── generate-plan.js
│   ├── todos/
│   │   ├── index.js
│   │   ├── batch.js
│   │   └── [id].js
│   └── db.js              # Database connection
├── Backend/               # Backend code (shared with API)
│   ├── models/
│   ├── services/
│   └── config/
├── Frontend/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── vercel.json           # Vercel configuration
└── package.json          # Root package.json
```

## 🚀 Deployment to Vercel

### Prerequisites

- Vercel account ([Sign up here](https://vercel.com))
- MongoDB database (MongoDB Atlas recommended)
- Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Step 1: Push to GitHub

Your code is already on GitHub at: `https://github.com/Adithya-srikar/AI-Todo.git`

### Step 2: Deploy to Vercel

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository: `Adithya-srikar/AI-Todo`

2. **Configure Build Settings**
   - Framework Preset: **Other**
   - Root Directory: `./` (root)
   - Build Command: `cd Frontend && npm install && npm run build`
   - Output Directory: `Frontend/dist`
   - Install Command: `npm install` (in root)

3. **Add Environment Variables**
   In Vercel project settings → Environment Variables, add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Step 3: Verify Deployment

- Visit your Vercel URL
- Test the application:
  1. Enter a goal
  2. Answer AI questions
  3. Select tasks
  4. Check if tasks are saved

## 🏃 Local Development

### Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:
```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Run backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📖 Usage

1. **Enter Your Goal**: Type what you want to accomplish (e.g., "Build an ecommerce site")
2. **Answer Questions**: The AI will ask 3-5 clarifying questions
3. **Review Your Plan**: Get a personalized 5-10 step action plan
4. **Select Tasks**: Choose which tasks to add to your todo list
5. **Track Progress**: Check off tasks as you complete them in the sidebar

## 🔑 API Endpoints

All endpoints are available at `/api/*`:

### AI Routes
- `POST /api/ai/questions` - Generate clarifying questions
- `POST /api/ai/generate-plan` - Generate action plan

### Todo Routes
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `POST /api/todos/batch` - Create multiple todos
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## 🎯 Project Highlights

- **Serverless Architecture**: All backend routes are Vercel serverless functions
- **Clean Architecture**: Modular component structure
- **Smooth UX**: Thoughtful animations and transitions
- **Error Handling**: Graceful fallbacks for AI failures
- **Responsive**: Mobile-first design approach
- **Performance**: Optimized with Vite and React best practices

## 📝 Notes

- MongoDB connection is cached for serverless functions
- Gemini 2.0 Flash model is used (free tier)
- All API routes handle CORS automatically
- Frontend uses relative paths that work in production

## 🔧 Troubleshooting

**Build fails on Vercel:**
- Check that all environment variables are set
- Verify MongoDB connection string is correct
- Ensure Gemini API key is valid

**API routes return 500:**
- Check Vercel function logs
- Verify environment variables are set correctly
- Test MongoDB connection

**Frontend can't connect to API:**
- Ensure API routes are in `/api/` directory
- Check `vercel.json` rewrites configuration

## 📝 License

This project is open source and available under the MIT License.

---

Built with ❤️ using React, Node.js, and Gemini AI | Deployed on Vercel

