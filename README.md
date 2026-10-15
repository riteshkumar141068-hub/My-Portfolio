<div align="center">

# ⚡ Ritesh Kumar — Cyber Interactive Portfolio

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D_Graphics-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://greensock.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<p align="center">
  A state-of-the-art, high-performance personal portfolio built for modern software engineering, AI/ML, and web graphics. Features an interactive 3D room, custom Cyber Terminal CLI, Recruiter Fast Dossier, Web Audio synthesizer, and a military-grade Anti-Tamper & Anti-Screenshot Credential Shield.
</p>

[Explore Live Demo](https://ritesh-portfolio.vercel.app) • [Connect on WhatsApp](https://wa.me/918477861666?text=Hi%20Ritesh,%20I%20saw%20your%20portfolio!) • [LinkedIn](https://linkedin.com/in/riteshkumar141068) • [Report Issue](https://github.com/riteshkumar141068-hub/My-Portfolio/issues)

</div>

---

## 📑 Table of Contents
- [🌟 Key Architectural Highlights](#-key-architectural-highlights)
- [🏗️ System Architecture & Directory Chart](#️-system-architecture--directory-chart)
- [🛡️ Anti-Tamper & Privacy Shield](#️-anti-tamper--privacy-shield)
- [💻 Interactive Cyber CLI Terminal](#-interactive-cyber-cli-terminal)
- [⚡ Recruiter Fast Dossier](#-recruiter-fast-dossier)
- [🛠️ Tech Stack & Dependencies](#️-tech-stack--dependencies)
- [🚀 Local Development & Setup](#-local-development--setup)
- [👨‍💻 Author & Profile](#-author--profile)

---

## 🌟 Key Architectural Highlights

| Feature | Description | Performance Metric |
| :--- | :--- | :--- |
| **3D Interactive Desk** | Three.js desktop environment featuring custom RK developer terminal screen & animated textures | 60–120 FPS WebGL |
| **Cyber Terminal CLI** | Full in-app interactive terminal (`Ctrl+K`) with executable commands (`skills`, `projects`, `sudo hire`, etc.) | Instant response |
| **Recruiter Fast Mode** | 1-page executive dossier for HRs and Engineering Leads with instant WhatsApp chat and verified telemetry | 1-Click Access |
| **Privacy Credential Shield** | Tamper-proof in-app modal viewer with window-blur privacy curtain, anti-screenshot, and disabled printing | 100% Protected |
| **Web Audio Synthesizer** | Real-time cyber sound effects synthesized in pure code (no external MP3 assets, zero latency) | Zero overhead |
| **Bilingual Support** | Instant locale toggle between **English (EN)** and **हिन्दी (HI)** with auto-persistence | Zero layout shift |

---

## 🏗️ System Architecture & Directory Chart

```ascii
My-Portfolio/
├── 📁 public/                         # Public static assets & media
│   ├── 📁 avatar/                     # 3D character render sequences
│   ├── 📁 certificates/               # Watermarked & tamper-proof credentials
│   │   ├── hackerrank_protected.webp  # Role Certified Software Engineer (#F89BCD89AFE8)
│   │   └── icat_protected.webp        # National Aptitude Assessment (#CIT-P-3810557)
│   ├── 📁 flags/                      # SVG Country flags (en, in)
│   ├── 📁 images/                     # Project previews & photography
│   ├── 📁 models/                     # Three.js 3D GLB Room & Laptop models
│   ├── 📁 videos/                     # Cinematic background video loops
│   ├── avatar-screen.png              # 3D monitor custom terminal wallpaper
│   ├── ritesh-headshot.png            # Recruiter Dossier professional portrait
│   ├── ritesh-photo.png               # High-res master portrait
│   ├── icon.svg / icon.png            # Glowing 3D "RK" Vector & Favicon assets
│   └── Ritesh_Kumar_Resume.pdf        # Verified ATS resume document
│
├── 📁 src/                            # Source application code
│   ├── 📁 app/                        # Next.js 15 App Router
│   │   ├── layout.js                  # Global metadata, fonts & Theme/Language providers
│   │   └── page.js                    # Lazy-loaded section orchestrator & GSAP trigger sync
│   │
│   ├── 📁 components/                 # Reusable UI & Cyber Modules
│   │   ├── 📁 sections/               # Portfolio Sections
│   │   │   ├── Navbar.js              # Header with Audio Mute, Recruiter View & Locale dropdown
│   │   │   ├── Hero.js                # Interactive avatar, frame sequences & primary CTAs
│   │   │   ├── About.js               # 3D Room Canvas, Three.js textures & bio journey
│   │   │   ├── Experience.js          # Internship timeline & Credential security trigger
│   │   │   ├── Skills.js              # Bento Grid skill matrix + CodingStats telemetry
│   │   │   ├── Projects.js            # Kinetic sticky gallery + ProjectDemoModal triggers
│   │   │   ├── Testimonials.js        # Industry recommendations & reviews
│   │   │   ├── Contact.js             # Interactive direct contact form & WhatsApp link
│   │   │   └── Footer.js              # Brand signature & social channels
│   │   │
│   │   ├── CodingStats.js             # Live GitHub contributions & language breakdown
│   │   ├── CyberTerminal.js           # Keyboard-accessible interactive developer CLI
│   │   ├── RecruiterModal.js          # Fast 1-page executive dossier for hiring managers
│   │   ├── ProjectDemoModal.js        # Cyber browser mockup frame & architecture view
│   │   ├── ProtectedCertificateModal.js # Anti-tamper, window-blur curtain & anti-screenshot viewer
│   │   ├── CinematicTechBackground.js # Lightweight GPU-accelerated constellation mesh
│   │   ├── RainbowCursorTrail.js      # Ultra-smooth 60fps cursor light trail
│   │   ├── PreferencesPopup.js        # First-visit theme & language configuration modal
│   │   ├── ScrollProgress.js          # Neon viewport reading bar
│   │   └── Preloader.js               # Cyber asset loading transition
│   │
│   ├── 📁 context/                    # React Context State Managers
│   │   ├── LanguageContext.js         # Locale state (English / हिन्दी)
│   │   └── ThemeContext.js            # Dark / Cyber theme state
│   │
│   ├── 📁 data/                       # Structured portfolio datasets
│   │   ├── projects.js                # Project descriptions, repos & metadata
│   │   ├── skills.js                  # Technical skill taxonomy
│   │   └── testimonials.js            # Recommendations & peer feedback
│   │
│   ├── 📁 i18n/                       # Internationalization dictionaries
│   │   ├── en.js                      # English translations
│   │   ├── hi.js                      # Hindi translations
│   │   └── index.js                   # Locale detection & registry
│   │
│   ├── 📁 styles/                     # Styling system
│   │   ├── GlobalStyles.js            # Reset, typography, print shields (@media print)
│   │   └── theme.js                   # Color palette, shadows, glassmorphism tokens
│   │
│   └── 📁 utils/                      # Helper utilities
│       └── soundEffects.js            # Pure Web Audio API synthesized sound generator
│
├── .gitignore                         # Build and dependency ignore definitions
├── package.json                       # Project manifests & dependencies
└── README.md                          # Comprehensive project documentation
```

---

## 🛡️ Anti-Tamper & Privacy Shield

To safeguard Ritesh Kumar's verified credentials (HackerRank & ICAT) from duplication, unauthorized scraping, or forgery, this portfolio implements a multi-tiered security layer:

```ascii
   [User Requests Certificate View]
                 │
                 ▼
  ┌──────────────────────────────────────────────┐
  │ 1. Hard-Burnt Watermark WebP (No Raw PDFs)   │
  │    • "CONFIDENTIAL • ISSUED TO RITESH KUMAR" │
  │    • Security hologram seal & Credential ID  │
  └──────────────────────┬───────────────────────┘
                         │
                         ▼
  ┌──────────────────────────────────────────────┐
  │ 2. Window Blur & Snipping Tool Curtain       │
  │    • Inactivity detector instantly blurs     │
  │    • Snipping tool (Win+Shift+S) triggers    │
  │      automatic Privacy Mask Concealment      │
  └──────────────────────┬───────────────────────┘
                         │
                         ▼
  ┌──────────────────────────────────────────────┐
  │ 3. Keyboard & Clipboard Interceptor          │
  │    • PrintScreen clears clipboard with alert │
  │    • Ctrl+P, Ctrl+S, Ctrl+U, F12 disabled    │
  │    • Right-click context menu prevented      │
  │    • @media print hides body element         │
  └──────────────────────────────────────────────┘
```

---

## 💻 Interactive Cyber CLI Terminal

Press `Ctrl + K` or click the glowing `>_ Terminal` launcher in the corner to open the interactive CLI:

```bash
ritesh@portfolio-cli:~$ help
AVAILABLE COMMANDS:
  • skills         : List programming languages, tools & frameworks
  • projects       : View flagship software & AI projects
  • experience     : View internship at Apexsquare & education
  • certifications : Check verified HackerRank & ICAT credentials
  • contact        : Direct WhatsApp & Email contact channels
  • whoami         : Reveal guest recruiter profile
  • sudo hire      : Fast-track candidate hiring pipeline
  • clear          : Clear terminal screen
  • exit           : Close terminal window
```

---

## ⚡ Recruiter Fast Dossier

For HRs and Tech Leads with limited time:
* Accessible via the top navbar **`⚡ Recruiter View`** button.
* Displays Ritesh's professional profile, current role as **Software Engineering Intern @ Apexsquare Solutions**, education at **AKTU**, top 3 flagship projects, verified credentials, and instant contact actions.

---

## 🛠️ Tech Stack & Dependencies

* **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
* **UI Library:** [React 19](https://reactjs.org/)
* **Styling:** [Styled-Components 6](https://styled-components.com/)
* **3D Engine:** [Three.js](https://threejs.org/)
* **Animation Engine:** [GSAP 3 (GreenSock) & ScrollTrigger](https://greensock.com/)
* **Audio:** Native HTML5 Web Audio API
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

---

## 🚀 Local Development & Setup

### 1. Clone the repository
```bash
git clone https://github.com/riteshkumar141068-hub/My-Portfolio.git
cd My-Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 👨‍💻 Author & Profile

**Ritesh Kumar**  
*Software Engineering Intern @ Apexsquare Solutions*  
*B.Tech in Computer Science & Engineering, AKTU (2022–2026 Expected)*

* 🌐 **GitHub:** [@riteshkumar141068-hub](https://github.com/riteshkumar141068-hub)
* 💼 **LinkedIn:** [riteshkumar141068](https://linkedin.com/in/riteshkumar141068)
* 📱 **WhatsApp:** [Direct Chat ↗](https://wa.me/918477861666?text=Hi%20Ritesh,%20I%20saw%20your%20portfolio!)
* 📧 **Email:** [ritesh.kumar141068@gmail.com](mailto:ritesh.kumar141068@gmail.com)

---

<div align="center">
  <sub>Built with ❤️ and engineered with precision by Ritesh Kumar. © 2026 All Rights Reserved.</sub>
</div>
