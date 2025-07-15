# TutaLearn - African Educational Platform

TutaLearn is a Progressive Web App (PWA) that brings AI-powered, culturally relevant education to African students through WhatsApp integration and offline-capable technology.

## 🌍 Mission

**Elimu kwa kila mtu** - Education for everyone. We're democratizing access to quality education across Africa by leveraging familiar technologies like WhatsApp and making learning content culturally relevant and locally contextualized.

## ✨ Features

### 📱 WhatsApp Integration

- Ask educational questions via WhatsApp
- Receive AI-powered responses in Swahili or English
- Voice message support for accessibility
- Offline message queuing

### 🤖 AI-Powered Learning

- Groq API integration for fast, contextual responses
- Content localized to African contexts (e.g., using maize instead of pizza for math problems)
- Multi-language support (English/Swahili)
- Curriculum-aligned content

### 📚 Educational Content

- Grade-level appropriate content (Primary to Secondary)
- Subject coverage: Mathematics, Science, Literature, History
- Interactive lessons with real-world African examples
- Progress tracking and assessments

### 💾 Offline-First PWA

- Works without internet connection
- Background sync when connectivity returns
- Cached educational content
- Mobile-optimized interface

## 📱 PWA Features

TutaLearn is designed as a Progressive Web App with:

- **Offline Functionality**: Cached lessons and user progress
- **App-like Experience**: Can be installed on mobile home screens
- **Background Sync**: Syncs data when connection is restored
- **Push Notifications**: (Coming soon) Lesson reminders and updates

## 🌍 Cultural Localization

We adapt educational content to African contexts by:

- Using local examples (maize farming for math, African wildlife for science)
- Incorporating Swahili language alongside English
- Referencing familiar cultural practices and environments
- Aligning with African educational curricula

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rayklanderman/tutalearn.git&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY,VITE_GROQ_API_KEY)

### Environment Variables Required:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_GROQ_API_KEY`: Your Groq API key for AI responses

## 📊 Database Schema

### Users

- Profile information
- Language preferences
- Grade level
- Learning progress

### Lessons

- Multi-language content
- Difficulty levels
- Subject categorization
- Cultural adaptations

### WhatsApp Chats

- Message history
- AI response tracking
- User engagement metrics

### User Progress

- Lesson completion
- Assessment scores
- Time spent learning

## 🛠 Development Workflow

### Local Development

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Lint and fix code
npm run lint:fix
```

### Testing the PWA

1. Build the project: `npm run build`
2. Serve it locally: `npm run preview`
3. Open in Chrome DevTools
4. Go to Application tab → Service Workers
5. Check "Offline" to test offline functionality

### WhatsApp Integration Setup

1. Register WhatsApp Business API account
2. Get phone number ID and access token
3. Set up webhook pointing to your Supabase Edge Function
4. Add environment variables to deployment

## 🤝 Contributing

We welcome contributions! Areas where you can help:

- Content creation and localization
- UI/UX improvements
- WhatsApp integration enhancements
- Educational game development
- Translation work

### Development Guidelines

- Use TypeScript for all new code
- Follow Tailwind CSS conventions for styling
- Ensure mobile-first responsive design
- Add proper error handling and loading states
- Test offline functionality before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- African education advocates and teachers
- Open-source educational content providers
- Groq for AI capabilities
- Supabase for backend infrastructure
- The React and open-source communities

## 🔗 Links

- **Repository**: https://github.com/rayklanderman/tutalearn.git
- **Live Demo**: Coming soon
- **Supabase Project**: https://mnairnnovejrvgxzvktq.supabase.co

---

**Built with ❤️ for African education**
