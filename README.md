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

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **PWA**: Vite PWA Plugin
- **AI**: Groq API
- **WhatsApp**: WhatsApp Business API
- **Deployment**: Vercel
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- WhatsApp Business API access (for production)

### Installation

1. **Clone the repository**

   ```powershell
   git clone https://github.com/rayklanderman/tutalearn.git
   cd tutalearn
   ```

2. **Install dependencies**

   ```powershell
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with your configurations:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

4. **Start development server**
   ```powershell
   npm run dev
   ```

### Build for Production

```powershell
npm run build
npm run preview
```

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
