# 🚀 Vercel Deployment Guide

## Quick Deployment Steps

### 1. Prepare Your Environment Variables

You'll need:
- **MONGODB_URI**: Your MongoDB connection string (from MongoDB Atlas or local)
- **GEMINI_API_KEY**: Your Google Gemini API key

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository: `Adithya-srikar/AI-Todo`
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `cd Frontend && npm install && npm run build`
   - **Output Directory**: `Frontend/dist`
   - **Install Command**: `npm install` (runs in root)
5. Add Environment Variables:
   - Click **"Environment Variables"**
   - Add `MONGODB_URI` with your MongoDB connection string
   - Add `GEMINI_API_KEY` with your Gemini API key
6. Click **"Deploy"**
7. Wait for deployment to complete
8. Your app is live! 🎉

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add MONGODB_URI
vercel env add GEMINI_API_KEY

# Deploy to production
vercel --prod
```

### 3. Verify Deployment

After deployment:
1. Visit your Vercel URL (e.g., `https://ai-todo.vercel.app`)
2. Test the application:
   - Enter a goal
   - Answer AI questions
   - Select tasks
   - Verify tasks are saved

### 4. Troubleshooting

**Build Fails:**
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version (should be 18+)

**API Routes Return 500:**
- Check Vercel function logs
- Verify environment variables are set
- Test MongoDB connection string
- Verify Gemini API key is valid

**Frontend Can't Connect to API:**
- Ensure API routes are in `/api/` directory
- Check `vercel.json` configuration
- Verify CORS headers in API functions

## Project Structure for Vercel

```
AI TODO/
├── api/                    # Vercel serverless functions
│   ├── ai/
│   │   ├── questions.js     # POST /api/ai/questions
│   │   └── generate-plan.js # POST /api/ai/generate-plan
│   ├── todos/
│   │   ├── index.js         # GET, POST, DELETE /api/todos
│   │   ├── batch.js         # POST /api/todos/batch
│   │   └── [id].js          # PUT, DELETE /api/todos/:id
│   └── db.js                # MongoDB connection
├── Backend/                 # Shared backend code
│   ├── models/Todo.js
│   └── services/geminiService.js
├── Frontend/                # React frontend
│   └── src/
├── vercel.json              # Vercel configuration
└── package.json             # Root dependencies
```

## Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |

## Build Configuration

- **Build Command**: `cd Frontend && npm install && npm run build`
- **Output Directory**: `Frontend/dist`
- **Node Version**: 18.x or higher

## API Routes

All API routes are automatically available at:
- `https://your-app.vercel.app/api/ai/questions`
- `https://your-app.vercel.app/api/ai/generate-plan`
- `https://your-app.vercel.app/api/todos`
- etc.

## Notes

- MongoDB connection is cached for serverless functions (optimized for cold starts)
- All API functions handle CORS automatically
- Frontend uses relative paths (`/api/...`) that work in production
- Vercel automatically handles routing via `vercel.json`

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Vercel function logs
3. Verify environment variables
4. Test API endpoints directly

---

Happy deploying! 🚀

