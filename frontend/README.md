# JobAgent Frontend

Premium SaaS-style job search interface with dark and light theme support.

## 🚀 Features

✨ **Professional Design**
- Clean, modern UI with premium aesthetic
- Smooth animations and transitions
- Fully responsive across all devices

🌙 **Dark & Light Theme**
- System preference detection
- Persistent user preference
- Smooth theme transitions
- Eye-friendly color palettes

🎯 **Job Search Features**
- Resume PDF upload with validation
- AI-powered role prediction
- Real-time location-based job search
- Live results from Indeed India
- Direct job application links

## 📦 Setup & Installation

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation Steps

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Start development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

## 🎨 Theme System

The app uses CSS variables that automatically update based on theme:

**Light Theme:** Clean whites, dark text, blue accents
**Dark Theme:** Deep slate, light text, bright blue accents

Theme preference is saved to localStorage.

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   ├── client.js           # Axios client
│   │   └── jobs.js             # Job API
│   ├── components/
│   │   ├── Header.jsx          # Navigation
│   │   ├── Hero.jsx            # Landing
│   │   ├── JobSearchForm.jsx   # Upload
│   │   ├── JobCard.jsx         # Job card
│   │   └── JobResults.jsx      # Results
│   ├── pages/
│   │   └── Home.jsx            # Main page
│   ├── store/
│   │   └── themeStore.js       # Theme store
│   ├── App.js
│   ├── index.js
│   └── index.css               # Global styles
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🔌 API Integration

Frontend connects to FastAPI backend at `http://localhost:8000`

**POST /jobs/search**
- Upload: Resume PDF
- Params: Location
- Returns: Predicted role & jobs

## 🛠️ Technologies

- React 18.2.0
- React Router 6.20.0
- Tailwind CSS 3.3.6
- Axios 1.6.0
- Zustand 4.4.0
- Lucide React 0.344.0

## 📱 Responsive Design

- Mobile: 0-640px
- Tablet: 640-1024px
- Desktop: 1024px+

## ✅ Features

- ✅ Professional component architecture
- ✅ Dark and light theme fully implemented
- ✅ Responsive design
- ✅ Proper error handling
- ✅ Loading states
- ✅ Clean UI

## 🚀 Next Steps

1. Connect Firebase authentication
2. Add user profile management
3. Implement job favorites
4. Add email notifications
5. Implement resume parser

## 📝 Notes

- PDF upload accepts files up to 10MB
- Location field supports city or city, country format
- Jobs fetched from Indeed India in real-time
- Theme preference stored in browser localStorage
