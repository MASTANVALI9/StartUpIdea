# 🎓 Career Navigator - 10th Grade Career Guidance Platform

A comprehensive career guidance platform designed specifically for 9th and 10th grade students to help them make informed decisions about their future career paths.

## ✨ Features

### 🚀 Core Features
- **Career Stream Exploration**: Discover 5 major career paths (Science, Commerce, Arts, Diploma, ITI, Vocational, Government Jobs)
- **College Finder**: Search and compare colleges by district with detailed course information
- **Salary Insights**: Real-time salary data and career growth projections
- **Success Stories**: Get inspired by role models who achieved their dreams
- **Course & Exam Guidance**: Complete information about courses and entrance exams

### 🛠️ Technical Features
- **Progressive Web App (PWA)**: Works offline and can be installed on devices
- **Mobile Responsive**: Optimized for all screen sizes
- **Performance Optimized**: Fast loading with advanced caching strategies
- **SEO Friendly**: Proper metadata and search engine optimization
- **Secure Authentication**: User accounts and preferences management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MASTANVALI9/StartUpIdea.git
   cd 10th-grade-career-navigator-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your credentials:
   ```env
   TURSO_CONNECTION_URL=your_turso_database_url
   TURSO_AUTH_TOKEN=your_turso_auth_token
   BETTER_AUTH_SECRET=your_auth_secret
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── colleges/          # College finder pages
│   ├── inspiration/       # Success stories
│   ├── salary-insights/   # Salary data pages
│   └── streams/           # Career streams
├── components/            # Reusable React components
│   ├── ui/               # UI component library (Radix UI)
│   └── RoleModelCard.tsx # Featured role model component
├── db/                   # Database schema and seeds
├── lib/                  # Utility functions and configurations
└── visual-edits/         # Visual editing tools
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate database migrations
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with initial data
```

## 🌍 Deployment

### 🚀 Quick Deploy with Vercel (Recommended)
1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Production ready setup"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in the Vercel dashboard:
     - `TURSO_CONNECTION_URL`
     - `TURSO_AUTH_TOKEN`
     - `BETTER_AUTH_SECRET`

3. **Deploy automatically**
   - Vercel will build and deploy your app
   - Your app will be live at `your-app.vercel.app`

### 🐳 Docker Deployment
1. **Build the Docker image**
   ```bash
   docker build -t career-navigator .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 -e TURSO_CONNECTION_URL=your_url -e TURSO_AUTH_TOKEN=your_token -e BETTER_AUTH_SECRET=your_secret career-navigator
   ```

3. **Access your app**
   - Open [http://localhost:3000](http://localhost:3000)

### 🖥️ Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm run start
```

### ☁️ Other Platforms
- **Railway**: Connect your GitHub repo and add environment variables
- **Render**: Connect your GitHub repo and configure build settings
- **Netlify**: Use the included build configuration
- **AWS/Google Cloud**: Use the Dockerfile for container deployment

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Description | Required |
|----------|-------------|----------|
| `TURSO_CONNECTION_URL` | Turso database connection URL | Yes |
| `TURSO_AUTH_TOKEN` | Turso authentication token | Yes |
| `BETTER_AUTH_SECRET` | Authentication secret key | Yes |

## 📊 Performance Features

- **Bundle Optimization**: Code splitting and tree shaking
- **Image Optimization**: WebP/AVIF support with lazy loading
- **API Caching**: 5-minute cache for improved performance
- **Database Indexing**: Optimized queries for fast responses
- **PWA Support**: Offline functionality and app installation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org) and [React](https://reactjs.org)
- UI components by [Radix UI](https://radix-ui.com)
- Database powered by [Turso](https://turso.tech)
- Authentication by [Better Auth](https://better-auth.com)

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: [Your Contact Information]

---

**Made with ❤️ for students who dream big!**
