# VillaGaleon - Luxury Caribbean Villa & Yacht Experience

Welcome to VillaGaleon, your gateway to luxury Caribbean living and unforgettable yacht adventures.

## 🌊 Features

- Luxury villa booking system
- Private yacht reservations
- Interactive location maps
- Virtual concierge chat
- Multi-language support
- Responsive design
- Real-time availability checking
- Secure payment processing

## 🚀 Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - Radix UI Components
  - MDX for content
  - React Router for navigation

- **Backend:**
  - Express.js
  - Prisma ORM
  - PostgreSQL
  - Multer for file uploads
  - Zod for validation

- **Maps & Location:**
  - Google Maps API
  - Custom location markers
  - Interactive points of interest

- **Performance:**
  - Dynamic imports
  - Image optimization
  - Lazy loading
  - SEO optimized

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/villagaleon.git
cd villagaleon
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Google Maps API key:
```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
DATABASE_URL="postgresql://user:password@localhost:5432/villagaleon"
```

4. Set up the database:
```bash
# Create the database
createdb villagaleon

# Run migrations
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## 🛠️ Development

- Start development server:
```bash
npm run dev
```

- Build for production:
```bash
npm run build
```

- Preview production build:
```bash
npm run preview
```

## 🚢 Deployment

The project is configured for deployment to Google Cloud Platform:

1. Build the project:
```bash
npm run build
```

2. Deploy to GCP:
```bash
npm run deploy
```

## 📁 Project Structure

```
villagaleon/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   ├── constants/     # Constants and configurations
│   └── types/         # TypeScript type definitions
├── content/          # MDX content files
├── public/           # Static assets
└── dist/            # Production build output
```

## 🔑 Environment Variables

Required environment variables:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key  # For Google Maps integration
DATABASE_URL=your_database_url                      # PostgreSQL connection string
```

## 📝 Content Management

Content is managed through MDX files located in the `content/` directory:

- `posts/`: Blog posts and experiences
- `amenities/`: Villa and yacht amenities
- `locations/`: Location information
- `uploads/`: Uploaded images and media files

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM:

```prisma
// Post model for blog entries
Post {
  id          String    @id
  title       String
  slug        String    @unique
  description String
  content     String
  category    String
  image       String
  author      String
  authorImage String
  date        DateTime
  photos      Photo[]
}

// Photo model for post galleries
Photo {
  id        String   @id
  url       String
  alt       String
  post      Post     @relation
  postId    String
}
```

## 🔌 API Endpoints

The backend provides the following REST endpoints:

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `POST /api/posts/:id/photos` - Upload photos for a post
- `DELETE /api/posts/:id` - Delete a post and its photos

## 🎨 Styling

- Tailwind CSS for styling
- Custom color palette in `tailwind.config.js`
- Responsive design breakpoints
- Dark mode support

## 🔒 Security

- Environment variables for sensitive data
- Input sanitization
- CORS configuration
- Security headers

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@villagaleon.com or join our Slack channel.