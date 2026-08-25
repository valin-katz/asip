# ADRA — Atria Societal Impact Intelligence (ASIP)

ADRA is an AI-powered intelligence platform showcasing **220+ verified student engineering projects** from the Atria Societal Impact Projects (ASIP) curriculum at Atria Institute of Technology, Bangalore.

---

## 🚀 One-Click Deploy on Vercel

### Step 1: Push this Repository to GitHub
1. Initialize Git in this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ADRA ASIP Intelligence Platform"
   ```
2. Create a new repository on [GitHub](https://github.com/new) (e.g. `adra-asip-intelligence`).
3. Link and push your repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/adra-asip-intelligence.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Deploy to Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** → **"Project"**.
2. Select and import your GitHub repository (`adra-asip-intelligence`).
3. Under **Environment Variables**, add:
   * **Name**: `GEMINI_API_KEY`
   * **Value**: *(Your Google Gemini API Key)*
   * *(Optional)* **Name**: `GEMINI_MODEL`, **Value**: `gemini-flash-latest`
4. Click **Deploy**.

Your live URL (e.g. `https://adra-asip.vercel.app`) will be ready in under 30 seconds!

---

## 📁 Repository Structure

├── api/
│   ├── chat.js          # Vercel Serverless Function (securely proxies Gemini API)
│   ├── data.js          # 220 indexed ASIP project records
│   └── projects.js      # Serverless search & directory API
├── assets/
│   ├── atria-icon.png   # Atria icon logo
│   ├── atria-header.png # Atria full red header banner
│   └── atria-footer.png # Atria full red footer banner
├── index.html           # Main ADRA AI Explorer interface
├── app.jsx              # React 18 frontend component engine
├── projects.html        # Dedicated ASIP Project Directory page
├── styles.css           # Clean corporate SaaS design system
├── projects-page.js     # Directory search, filter & modal engine
├── vercel.json          # Vercel routing configuration
├── package.json         # Project metadata
├── .gitignore           # Git ignore for environment secrets & cache
└── .env.example         # Environment variable template
```

---

## 🛡️ Security
* The `GEMINI_API_KEY` is **never exposed to the browser**.
* All queries are processed server-side via the Vercel serverless function (`/api/chat`).
