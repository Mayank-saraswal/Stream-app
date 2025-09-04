# Mstream - Twitch Clone

A modern streaming platform built with Next.js 15, featuring real-time user interactions, authentication, and a responsive design.

## 🚀 Features

- **Authentication & User Management**
  - Clerk authentication integration
  - User registration and login
  - Profile management with avatars
  - Secure webhook handling for user events

- **User Interface**
  - Responsive design with Tailwind CSS
  - Dark theme support with next-themes
  - Modern UI components with Radix UI
  - Collapsible sidebar navigation
  - Search functionality

- **Social Features**
  - User following system
  - Recommended users discovery
  - User profiles and bio
  - Real-time user interactions

- **Performance & Developer Experience**
  - Next.js 15 with Turbopack
  - TypeScript for type safety
  - Prisma ORM for database management
  - PostgreSQL database
  - ESLint for code quality

## 🏗️ Project Structure

```
twitch/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes group
│   │   ├── _components/          # Auth-specific components
│   │   │   ├── logo.tsx          # Logo component
│   │   │   └── theme-provider.tsx # Theme provider
│   │   ├── sign-in/              # Sign-in page
│   │   ├── sign-up/              # Sign-up page
│   │   └── layout.tsx            # Auth layout
│   ├── (browse)/                 # Main application routes
│   │   ├── _components/          # Browse-specific components
│   │   │   ├── navbar/           # Navigation bar components
│   │   │   │   ├── actions.tsx   # User actions
│   │   │   │   ├── logo.tsx      # Navbar logo
│   │   │   │   ├── search.tsx    # Search functionality
│   │   │   │   └── index.tsx     # Main navbar
│   │   │   └── sidebar/          # Sidebar components
│   │   │       ├── index.tsx     # Main sidebar
│   │   │       ├── recommended.tsx # Recommended users
│   │   │       ├── toggle.tsx    # Sidebar toggle
│   │   │       ├── user-item.tsx # User list item
│   │   │       └── wrapper.tsx   # Sidebar wrapper
│   │   ├── (home)/               # Home page
│   │   │   └── page.tsx          # Home page component
│   │   ├── [username]/           # Dynamic user profile routes
│   │   │   └── page.tsx          # User profile page
│   │   └── layout.tsx            # Browse layout
│   ├── api/                      # API routes
│   │   └── webhooks/             # Webhook handlers
│   │       └── clerk/            # Clerk webhook integration
│   │           └── route.ts      # User event handling
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── favicon.ico               # App icon
├── components/                   # Reusable UI components
│   ├── ui/                       # Shadcn/ui components
│   │   ├── avatar.tsx            # Avatar component
│   │   ├── button.tsx            # Button component
│   │   ├── input.tsx             # Input component
│   │   ├── skeleton.tsx          # Loading skeleton
│   │   └── tooltip.tsx           # Tooltip component
│   ├── hint.tsx                  # Hint/tooltip wrapper
│   ├── live-badge.tsx            # Live streaming badge
│   └── user-avatar.tsx           # User avatar component
├── lib/                          # Utility libraries and services
│   ├── auth-service.ts           # Authentication utilities
│   ├── db.ts                     # Database connection
│   ├── follow-service.ts         # Follow/unfollow logic
│   ├── recommended-service.ts    # User recommendations
│   ├── user-service.ts           # User management
│   └── utils.ts                  # General utilities
├── prisma/                       # Database schema and migrations
│   ├── migrations/               # Database migrations
│   │   ├── 20250831141502_init/  # Initial migration
│   │   └── migration_lock.toml   # Migration lock file
│   └── schema.prisma             # Database schema
├── public/                       # Static assets
│   ├── logo.svg                  # Application logo
│   ├── file.svg                  # File icon
│   ├── globe.svg                 # Globe icon
│   ├── next.svg                  # Next.js logo
│   ├── vercel.svg                # Vercel logo
│   └── window.svg                # Window icon
├── store/                        # State management
│   └── use-sidebar.ts            # Sidebar state (Zustand)
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── components.json               # Shadcn/ui configuration
├── eslint.config.mjs             # ESLint configuration
├── middleware.ts                 # Next.js middleware (Clerk)
├── next.config.ts                # Next.js configuration
├── next-env.d.ts                 # Next.js TypeScript definitions
├── package.json                  # Dependencies and scripts
├── postcss.config.mjs            # PostCSS configuration
├── README.md                     # Project documentation
└── tsconfig.json                 # TypeScript configuration
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library
- **next-themes** - Theme management

### Backend & Database
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **Clerk** - Authentication and user management
- **Svix** - Webhook handling

### State Management & Utilities
- **Zustand** - Lightweight state management
- **usehooks-ts** - React hooks collection
- **clsx & tailwind-merge** - Conditional styling
- **query-string** - URL query parsing

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler
- **Autoprefixer** - CSS vendor prefixes

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd twitch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/twitch_db"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_WEBHOOK_SIGNING_SECRET=your_webhook_secret
   
   # Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id             String   @id @default(uuid())
  username       String   @unique
  imageUrl       String   @db.Text
  externalUserId String   @unique   
  bio            String?  @db.Text
  following      Follow[] @relation("Following")
  followers      Follow[] @relation("FollowedBy")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

### Follow Model
```prisma
model Follow {
  id          String @id @default(uuid())
  followerId  String
  followingId String
  follower    User @relation(name: "Following", fields: [followerId], references: [id], onDelete: Cascade)
  following   User @relation(name: "FollowedBy", fields: [followingId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@unique([followerId, followingId])
  @@index([followerId])
  @@index([followingId])
}
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
npx prisma migrate   # Run database migrations
```

## 🎨 UI Components

The project uses a combination of custom components and Shadcn/ui:

### Custom Components
- **Navbar** - Top navigation with logo, search, and user actions
- **Sidebar** - Collapsible sidebar with user recommendations
- **UserAvatar** - User profile picture component
- **LiveBadge** - Indicator for live streaming status
- **Hint** - Tooltip wrapper component

### Shadcn/ui Components
- Avatar, Button, Input, Skeleton, Tooltip
- Configured with New York style and neutral base color
- CSS variables enabled for theming

## 🔐 Authentication Flow

1. **User Registration/Login** - Handled by Clerk
2. **Webhook Processing** - User events sync to database
3. **Session Management** - Automatic session handling
4. **Route Protection** - Middleware protects authenticated routes

### Protected Routes
- All routes except: `/`, `/sign-in/*`, `/sign-up/*`, `/api/webhooks/*`

## 🌐 API Routes

### Webhooks
- `POST /api/webhooks/clerk` - Handles Clerk user events
  - `user.created` - Creates new user in database
  - `user.updated` - Updates user information
  - `user.deleted` - Removes user from database

## 🎯 Key Features Implementation

### Sidebar State Management
```typescript
// Zustand store for sidebar collapse/expand
const useSidebar = create<SidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
}));
```

### User Recommendations
- Fetches users excluding the current user
- Displays in sidebar for easy discovery
- Supports follow/unfollow functionality

### Theme Support
- Dark theme by default
- Configurable through next-themes
- Consistent styling with CSS variables

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm run start`
3. Ensure database is accessible from production environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation links above
- Review the code comments for implementation details

---

**Built with ❤️ using Next.js 15 and modern web technologies**