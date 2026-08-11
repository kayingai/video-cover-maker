# OpenCoverMaker 🎨

<div align="center">
  <p><strong>The open-source tool for creating beautiful, engaging covers for your videos, articles, and social media posts in seconds.</strong></p>
  <br />
  <img src="https://github.com/user-attachments/assets/71557a9b-7999-4600-9100-d0413e790a50" alt="OpenCoverMaker Screenshot" width="800" />
</div>

## 🌟 Features

- **Multiple Canvas Ratios**: Support for 16:9 (Landscape), 9:16 (Portrait), 1:1 (Square), and 4:3 (Standard) to fit YouTube, TikTok, Instagram, and more.
- **Rich Background Options**: 
  - Upload your own images or videos.
  - Extract specific frames from uploaded videos to use as the cover background.
  - Choose from a curated palette of solid colors and gradients.
- **Advanced Text Styling**: Add titles and subtitles with customizable fonts, colors, and pre-designed text styles (e.g., Neon, Glitch, 3D, Outline).
- **Local Project History**: Your work is automatically saved to your browser's local storage. Seamlessly switch between recent projects, create new ones, or delete old drafts without needing an account.
- **High-Quality Export**: Export your final cover design instantly as a high-resolution image.
- **Dark Mode UI**: A sleek, professional, and distraction-free dark theme designed for creators.

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.19 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hengtuibabai/video-cover-maker.git
   cd video-cover-maker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal).

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks + LocalStorage
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📂 Project Structure

```text
src/
├── components/
│   ├── layout/           # Header, Footer, MainLayout
│   ├── CoverEditor.tsx   # Core editor component (Canvas & Controls)
│   └── ProjectHistorySidebar.tsx # Left sidebar for local projects
├── App.tsx               # Main application entry
├── main.tsx              # React DOM rendering
└── index.css             # Global styles and Tailwind configuration
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing tools that made this project possible.
- UI inspiration from modern creator tools and design platforms.
