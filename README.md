# Professional Portfolio Website

A modern, full-stack professional portfolio website built with React, TypeScript, Express.js, and featuring advanced animations, custom cursor effects, and responsive design.

## Features

- 🎨 Modern dark theme with neon accent colors
- 🖱️ Custom mouse-following cursor with interactive animations
- ✨ Smooth scroll reveal animations throughout
- 📱 Fully responsive design for all devices
- 🎯 Professional sections: Hero, About, Tech Arsenal, Portfolio, Contact
- 📧 Working contact form with validation
- 🔄 Glass morphism design effects
- ⚡ Fast performance with Vite build system

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Radix UI** components
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Zod** for validation

### Skills Showcased
- React & Next.js
- Node.js & Express
- MongoDB & MySQL
- PostgreSQL
- TypeScript
- Tailwind CSS

## Local Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5000
```

The application will automatically reload when you make changes to the code.

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Deployment on Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "Initial portfolio commit"
git push origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your portfolio repository

3. **Configure build settings:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables (if needed):**
   - Add any environment variables in the Vercel dashboard
   - For this portfolio, no additional env vars are required

5. **Deploy:**
   - Click "Deploy"
   - Your portfolio will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy from your project directory:**
```bash
vercel
```

4. **Follow the prompts:**
   - Project name: Choose your preferred name
   - Deploy to production: Yes

### Vercel Configuration

Create a `vercel.json` file in your root directory for custom configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "functions": {
    "server/index.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Custom Domain Setup

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain
   - Configure DNS with your domain provider

2. **DNS Configuration:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record pointing to Vercel's IP

## Performance Optimization

The portfolio is optimized for performance with:
- Code splitting and lazy loading
- Optimized images and assets
- Minimal bundle size
- Fast animations with hardware acceleration
- Efficient re-renders with React best practices

## Customization

### Updating Content
- Modify personal information in `client/src/pages/home.tsx`
- Update skills and technologies in the skills arrays
- Replace project information in the projects array
- Change images by updating the image URLs

### Styling
- Colors and themes in `client/src/index.css`
- Component styles using Tailwind CSS classes
- Custom animations in Framer Motion components

### Contact Form
- The contact form logs submissions to console
- For production, integrate with services like:
  - Netlify Forms
  - Formspree
  - EmailJS
  - Custom email service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available under the MIT License.