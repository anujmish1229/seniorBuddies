# Senior Buddies Website

A modern, responsive website for Senior Buddies - an intergenerational community program connecting seniors with youth volunteers in Durham Region, Ontario.

🌐 **Live Site**: [seniorbuddiesdurham.ca](https://seniorbuddiesdurham.ca)

## About Senior Buddies

Senior Buddies is a youth-led nonprofit organization that bridges the intergenerational gap by creating meaningful connections between seniors and youth volunteers. Since 2014, we've been building community bonds, reducing loneliness, and empowering both generations through shared experiences and mutual learning.

### Our Mission

To build meaningful intergenerational connections between youth and seniors in order to reduce loneliness, strengthen community belonging, and create positive shared experiences that benefit both generations.

### What We Do

- **Organize Events**: Intergenerational events and activities for seniors and youth
- **Create Safe Spaces**: Welcoming social spaces that reduce isolation
- **Provide Leadership Opportunities**: Empower youth volunteers with leadership roles
- **Encourage Mutual Learning**: Foster respect and cultural sharing across generations

## Features

- 🎨 **Modern UI/UX**: Beautiful, responsive design built with Tailwind CSS and shadcn/ui components
- 🚀 **Fast Performance**: Built with Vite for optimized build times and fast page loads
- 📱 **Fully Responsive**: Mobile-first design that works seamlessly on all devices
- 🎯 **SEO Optimized**: Comprehensive meta tags, Open Graph, and semantic HTML
- 🧭 **Client-Side Routing**: Smooth navigation using React Router
- ♿ **Accessible**: Built with accessibility best practices in mind
- 🌙 **Theme Support**: Modern design system with consistent theming

## Tech Stack

### Core Technologies
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### State Management & Data
- **TanStack Query (React Query)** - Server state management
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Additional Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Project Structure

```
├── public/              # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── _redirects      # Netlify SPA redirect rules
├── src/
│   ├── assets/         # Images and media files
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   └── ScrollToTop.tsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Events.tsx
│   │   ├── Index.tsx
│   │   ├── Join.tsx
│   │   ├── NotFound.tsx
│   │   └── Team.tsx
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── netlify.toml        # Netlify deployment configuration
├── package.json        # Dependencies and scripts
├── tailwind.config.ts  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anujmish1229/anujmish1229.github.io.git
cd anujmish1229
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

This project is configured for deployment on Netlify.

### Netlify Configuration

The project includes:
- `netlify.toml` - Build configuration and redirect rules
- `public/_redirects` - SPA routing support

### Build Settings

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18.x or higher

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect the build settings from `netlify.toml`
3. Deploy! The site will rebuild automatically on every push to your main branch

Alternatively, you can deploy manually using the Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Pages

- **Home (`/`)** - Landing page with hero section and feature overview
- **About (`/about`)** - Organization story, mission, vision, and values
- **Team (`/team`)** - Meet the team members
- **Events (`/events`)** - Upcoming and past events
- **Contact (`/contact`)** - Contact information and form
- **Join (`/join`)** - Volunteer registration and information
- **404 (`/*`)** - Custom not found page

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Credits

**Developed by**: Anuj Mishra  
**GitHub**: [@anujmish1229](https://github.com/anujmish1229)

Built for Senior Buddies

---

For questions or support, please visit [seniorbuddies.ca/contact](https://seniorbuddies.ca/contact)

