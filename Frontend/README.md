# Frontend - AI Task Planner

Beautiful React frontend for the AI-Driven Smart Task Planner application.

## 🛠️ Technologies

- React 18
- Vite
- Tailwind CSS
- Axios

## 📁 Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Landing.jsx          # Landing page with search
│   │   ├── WordCycler.jsx       # Animated word cycling
│   │   ├── SearchBar.jsx        # Goal input component
│   │   ├── QuestionsFlow.jsx    # Chat-like Q&A flow
│   │   ├── TodoSelector.jsx     # Task selection interface
│   │   └── TodoSidebar.jsx      # Persistent todo sidebar
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## ⚙️ Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm preview
```

The app will be available at `http://localhost:3000`

## 🎨 Components

### Landing
The landing page featuring:
- Animated word cycling headline
- Large search bar for goal input
- Quick-start example buttons
- Clean, centered layout

### WordCycler
Cycles through action words with smooth fade transitions:
- building → creating → planning → designing → executing
- 2-second intervals
- CSS transitions for smooth effects

### SearchBar
Notion-style search input:
- Large, clean input field
- Integrated submit button
- Loading state with spinner
- Placeholder examples

### QuestionsFlow
Chat-like interface for answering AI questions:
- Progress bar showing completion
- Previous answers displayed
- One question at a time
- Back button for corrections
- Smooth slide-up animations

### TodoSelector
Task selection interface:
- Beautiful card layout
- Individual task cards with hover effects
- Select/deselect individual tasks
- "Select All" functionality
- Visual checkboxes
- Time estimates displayed
- Animated card appearance

### TodoSidebar
Persistent task management:
- Slide-in from right
- Progress bar with percentage
- Task completion checkboxes
- Delete with confirmation
- Organized by creation order
- "Create New Plan" button

## 🎨 Design System

### Colors
- Background: `#FAFAFA`
- Primary: `#1F1F1F` (Gray 900)
- Secondary: `#F7F6F3` (Notion Gray)
- Accents: Tailwind grays

### Typography
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800

### Animations
- `fade-in`: Smooth fade entrance
- `fade-out`: Smooth fade exit
- `slide-up`: Slide up with fade
- `slide-down`: Slide down with fade
- Word cycling: Custom opacity transitions
- Hover effects: Scale transforms
- Button clicks: Active scale down

### Spacing
- Generous padding and margins
- Rounded corners (1rem - 2rem)
- Shadow hierarchy for depth

## 🔗 API Integration

The app connects to the backend at `http://localhost:5000` via Vite proxy:

```javascript
// Configured in vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

All API calls use relative paths (`/api/...`) and are automatically proxied.

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints using Tailwind defaults
- Sidebar adapts to screen size
- Text scales appropriately
- Touch-friendly buttons and interactions

## ✨ User Experience Features

- **Smooth Transitions**: All state changes animated
- **Loading States**: Clear feedback during API calls
- **Error Handling**: User-friendly error messages
- **Progress Tracking**: Visual progress indicators
- **Micro-interactions**: Hover effects on all interactive elements
- **Optimistic UI**: Immediate feedback on actions
- **Persistent State**: Todos survive page refreshes

## 🎯 Key Features

1. **Word Cycling**: Eye-catching headline animation
2. **Progressive Disclosure**: Information revealed step-by-step
3. **Visual Feedback**: Clear indication of selected/completed states
4. **Contextual Actions**: Buttons appear when relevant
5. **Clean Layout**: Generous whitespace and breathing room
6. **Consistent Design**: Unified visual language throughout

## 🚀 Performance

- Vite for lightning-fast HMR
- React 18 with automatic batching
- Optimized re-renders
- Lazy loading ready
- Production build optimization

## 📝 Notes

- Backend must be running on port 5000
- API proxy configured in Vite
- Tailwind configured for JSX files
- Custom animations in tailwind.config.js


