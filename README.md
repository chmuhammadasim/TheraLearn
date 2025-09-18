# TheraLearn 🧠✨

**An Educational Platform with Therapeutic Games for Children with Down Syndrome**

TheraLearn is a comprehensive web application designed to support the cognitive development and learning of children with Down syndrome through interactive games, therapy activities, and educational content. The platform combines modern web technologies with evidence-based therapeutic approaches to create an engaging and supportive learning environment.

## 🎯 Purpose & Target Audience

### Purpose
- Provide specialized therapeutic games tailored for children with Down syndrome
- Support cognitive development through interactive learning activities
- Facilitate communication between patients, families, and psychologists
- Offer educational resources and blog content about mental health and development

### Target Audience
- **Children with Down Syndrome**: Primary users engaging with therapeutic games and activities
- **Parents & Caregivers**: Monitoring progress and supporting their children's development
- **Psychologists & Therapists**: Managing patients, creating content, and tracking progress
- **Educators**: Accessing specialized educational resources and tools

## 🎮 Demo & Screenshots

### Live Demo
- **Frontend**: Runs on `http://localhost:3000` after setup
- **Backend API**: Available at `http://localhost:5000/api`
- **Database**: MongoDB connection required for full functionality

### Key Screens
1. **Landing Page**: Welcome screen with platform introduction
2. **Game Selection**: Interactive game library with difficulty levels
3. **Progress Dashboard**: Analytics and achievement tracking
4. **Therapist Portal**: Patient management and progress monitoring
5. **Blog Section**: Educational content and resources

### Sample Login Credentials (After Seeding)
```
Regular User:
- Email: user@example.com
- Password: password123

Psychologist:
- Email: drsmith@example.com  
- Password: password123

Super Admin:
- Email: admin@example.com
- Password: admin123
```

## 🏗️ Project Architecture

TheraLearn follows a modern full-stack architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                        │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │   Landing Page  │ │   Therapeutic   │ │   Dashboard &   ││
│  │   & Auth        │ │   Games         │ │   Admin Panel   ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
                               │
                               │ API Calls
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Node.js/Express)                 │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │   Auth &        │ │   Game Logic    │ │   Blog &        ││
│  │   User Mgmt     │ │   & Progress    │ │   Content Mgmt  ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
                               │
                               │ Database Operations
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      MongoDB Database                       │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │   Users &       │ │   Games &       │ │   Blogs &       ││
│  │   Profiles      │ │   Results       │ │   Content       ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## 🎮 Features & Games

### Therapeutic Games
- **Magic Memory**: Memory matching game to improve cognitive recall
- **Better Aim**: Hand-eye coordination and motor skills development
- **Math Game**: Number recognition and basic arithmetic skills
- **Count the Fish**: Counting and number recognition activities
- **Match Figures**: Shape and pattern recognition
- **Endless Runner**: Reaction time and continuous attention training
- **Object Guessing Game**: Speech recognition-based naming activities
- **Number Guessing Game**: Counting and number recognition with voice interaction
- **Emotion Detection**: Facial emotion recognition for emotional intelligence
- **Handpose Detector**: Hand gesture recognition for motor skills

### Core Features
- **User Management**: Multi-role system (patients, psychologists, super admins)
- **Progress Tracking**: Detailed analytics on game performance and development
- **Blog System**: Educational content and mental health resources
- **Patient-Psychologist Interaction**: Secure communication and session management
- **Content Management**: Dynamic content updates and customization
- **Dashboard Analytics**: Comprehensive reporting and progress visualization

### User Roles & Permissions
- **Patient/Child**: Access to age-appropriate games and activities
- **Parent/Guardian**: Monitor child's progress and communication with therapists
- **Psychologist**: Manage patients, create content, track therapeutic progress
- **Super Admin**: Full system administration, user management, content oversight

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher) - Tested with v20.19.5
- npm (v8 or higher) - Tested with v10.8.2
- MongoDB (local installation or cloud atlas)
- Git for version control

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/chmuhammadasim/TheraLearn.git
   cd TheraLearn
   ```

2. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the `backend` directory:
   ```env
   THERALEARN_DB_URL=mongodb://127.0.0.1:27017/theraLearn
   PORT_URL=5000
   JWT_KEY=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB service (if running locally)
   mongod
   
   # Seed the database with sample data (recommended for development)
   cd backend
   node Seed/Seed.js        # Main seed data (users, games, psychologists)
   node Seed/BlogSeed.js    # Blog posts and articles
   node Seed/ContentSeed.js # Landing page content
   ```

5. **Start the Application**
   ```bash
   # From the root directory
   npm start
   
   # Or start frontend and backend separately
   # Frontend (http://localhost:3000)
   cd frontend && npm start
   
   # Backend (http://localhost:5000)
   cd backend && npm start
   ```

## 📊 Technology Stack

### Frontend
- **React 18.3.1**: Modern UI library for component-based development
- **React Router 6.26.0**: Client-side routing and navigation
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Material Tailwind**: Pre-built components for enhanced UI
- **Chart.js**: Data visualization for progress tracking
- **Axios**: HTTP client for API communication
- **TensorFlow.js**: Machine learning for handpose and emotion detection
- **React Speech Recognition**: Voice interaction capabilities
- **Canvas Confetti**: Celebration animations for achievements

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: ODM for MongoDB with schema validation
- **JWT**: JSON Web Tokens for secure authentication
- **Bcrypt**: Password hashing for security
- **Helmet**: Security middleware for Express
- **CORS**: Cross-origin resource sharing
- **Express Rate Limit**: API rate limiting for protection
- **Nodemailer**: Email sending functionality

### Development Tools
- **Nodemon**: Auto-restart development server
- **Concurrently**: Run multiple npm scripts simultaneously
- **ESLint**: Code linting and style enforcement
- **Jest**: Testing framework (configured)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Token verification

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/progress` - Get user progress data

### Games
- `POST /api/game/save-score` - Save game score and progress
- `GET /api/game/history/:userId` - Get user's game history
- `GET /api/game/leaderboard` - Get game leaderboards

### Blog & Content
- `GET /api/blog/posts` - Get all blog posts
- `POST /api/blog/create` - Create new blog post (psychologist/admin)
- `GET /api/content/landing` - Get landing page content

### Psychologist Features
- `GET /api/psychologist/patients` - Get assigned patients
- `POST /api/psychologist/question` - Create therapy questions
- `GET /api/psychologistpatient/messages` - Get patient messages

### Admin Features
- `GET /api/superadmin/users` - Get all users
- `PUT /api/superadmin/user/:id` - Update user information
- `DELETE /api/superadmin/user/:id` - Delete user account

## 🗃️ Database Models

### User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  role: ['user', 'psychologist', 'superadmin'],
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  profilePicture: String,
  isActive: Boolean,
  createdAt: Date
}
```

### Game Model
```javascript
{
  userId: ObjectId,
  sessions: [{
    gameName: String,
    level: Number,
    score: Number,
    duration: Number,
    datePlayed: Date
  }],
  overallResults: {
    highestScore: Number,
    totalAttempts: Number,
    totalScore: Number
  }
}
```

### Blog Model
```javascript
{
  title: String,
  slug: String,
  content: String,
  author: ObjectId,
  category: String,
  tags: [String],
  publishedAt: Date,
  isPublished: Boolean,
  likes: Number,
  viewCount: Number
}
```

## 🛠️ Available Scripts

### Root Directory
```bash
npm start          # Start both frontend and backend concurrently
npm test           # Run tests for both frontend and backend
```

### Frontend
```bash
npm start          # Start development server (port 3000)
npm build          # Build for production
npm test           # Run React tests
npm eject          # Eject from Create React App (irreversible)
```

### Backend
```bash
npm start          # Start server with nodemon (port 5000)
npm test           # Run Jest tests
```

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   Error: listen EADDRINUSE: address already in use :::3000
   ```
   **Solution**: Kill the process using the port or change the port
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   
   # Or start frontend on different port
   PORT=3001 npm start
   ```

2. **Database Connection Error**
   ```bash
   MongooseError: Operation `users.findOne()` buffering timed out
   ```
   **Solution**: 
   - Ensure MongoDB is running locally: `mongod`
   - Check your connection string in `.env`
   - For cloud MongoDB, verify network access settings

3. **Module Not Found Errors**
   ```bash
   Module not found: Can't resolve 'xyz'
   ```
   **Solution**: Reinstall dependencies
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Build Fails with Memory Issues**
   ```bash
   FATAL ERROR: Ineffective mark-compacts near heap limit
   ```
   **Solution**: Increase Node.js memory limit
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   npm run build
   ```

5. **CORS Issues in Development**
   ```bash
   Access to fetch blocked by CORS policy
   ```
   **Solution**: The backend already includes CORS middleware, but ensure your frontend is making requests to the correct backend URL.

### Performance Tips

- **Development**: Use `npm start` from root directory to run both servers concurrently
- **Production**: Build frontend with `npm run build` and serve static files through Express
- **Database**: Use MongoDB Atlas for production deployments
- **Caching**: Enable browser caching for better performance

## 🧪 Development Workflow

### Setting Up Development Environment

1. **Code Style**: The project uses ESLint for consistent code formatting
2. **Git Workflow**: Create feature branches from main, submit PRs for review
3. **Testing**: Write tests for new features and bug fixes
4. **Database**: Use local MongoDB for development, cloud for production

### Adding New Games

1. Create game component in `frontend/src/pages/Game/Games/`
2. Add route in `frontend/src/App.js`
3. Implement game logic with score tracking
4. Create API endpoint for saving scores in backend
5. Update game selection page

### Contributing Guidelines

We welcome contributions from the community! Here's how you can help:

#### Types of Contributions
- **Bug Fixes**: Report or fix issues in the code
- **New Games**: Add therapeutic games for children
- **UI/UX Improvements**: Enhance user experience
- **Documentation**: Improve or translate documentation
- **Testing**: Add tests or improve test coverage
- **Accessibility**: Make the platform more accessible

#### Development Process
1. **Fork & Clone**
   ```bash
   git clone https://github.com/yourusername/TheraLearn.git
   cd TheraLearn
   ```

2. **Setup Development Environment**
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Development Guidelines**
   - Follow existing code style and conventions
   - Write meaningful commit messages
   - Add comments for complex logic
   - Test your changes thoroughly
   - Update documentation if needed

5. **Testing**
   ```bash
   # Run all tests
   npm test
   
   # Run frontend tests only
   cd frontend && npm test
   
   # Run backend tests only
   cd backend && npm test
   ```

6. **Submit Pull Request**
   - Provide clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues
   - Ensure CI tests pass

#### Code Style
- **JavaScript**: Follow ESLint configuration
- **React**: Use functional components with hooks
- **CSS**: Use Tailwind CSS utility classes
- **API**: Follow RESTful conventions
- **Database**: Use Mongoose schemas with validation

#### Reporting Issues
When reporting bugs, please include:
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser/environment information
- Screenshots if applicable
- Error logs or console messages

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **Rate Limiting**: Protection against brute force attacks
- **HELMET**: Security headers for Express
- **XSS Protection**: Cross-site scripting prevention
- **Input Sanitization**: MongoDB injection prevention
- **CORS**: Cross-origin resource sharing control

## 📈 Performance Optimizations

- **Code Splitting**: React lazy loading for better performance
- **Image Optimization**: Cloudinary integration for image management
- **Caching**: Browser caching for static assets
- **Compression**: Gzip compression for reduced bundle size
- **Database Indexing**: Optimized MongoDB queries

## 🌐 Deployment

### Environment Variables

Create `.env` files for different environments:

**Backend (.env)**
```env
# Database
THERALEARN_DB_URL=mongodb://127.0.0.1:27017/theraLearn  # Local
# THERALEARN_DB_URL=mongodb+srv://user:pass@cluster.mongodb.net/theraLearn  # Cloud

# Server Configuration
PORT_URL=5000
NODE_ENV=production

# Authentication
JWT_KEY=your_super_secret_jwt_key_here

# Email Configuration (for notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Optional: Test Database
THERALEARN_DB_URL_TEST=mongodb://127.0.0.1:27017/theraLearnTest
```

**Frontend (.env) - Optional**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Frontend Deployment
1. **Build for Production**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Static Hosting**
   - **Netlify**: Connect GitHub repo, set build command to `npm run build`, publish directory to `build`
   - **Vercel**: Import project, framework preset: Create React App
   - **AWS S3**: Upload build folder contents, configure as static website

3. **Environment Variables**
   ```bash
   REACT_APP_API_URL=https://your-backend-domain.com/api
   ```

### Backend Deployment

1. **Heroku Deployment**
   ```bash
   # Install Heroku CLI
   heroku create your-app-name
   heroku config:set THERALEARN_DB_URL=your_mongodb_atlas_url
   heroku config:set JWT_KEY=your_jwt_secret
   git push heroku main
   ```

2. **Railway Deployment**
   ```bash
   # Connect GitHub repo to Railway
   # Set environment variables in Railway dashboard
   # Automatic deployment on push
   ```

3. **VPS/Cloud Server**
   ```bash
   # Install Node.js and PM2
   npm install -g pm2
   
   # Start application with PM2
   pm2 start app.js --name theralearn-backend
   pm2 startup
   pm2 save
   ```

### Database Deployment
- **MongoDB Atlas**: Cloud-hosted MongoDB service
- **Local MongoDB**: For development only
- **Docker**: Containerized MongoDB deployment

### SSL and Security
- Use HTTPS in production
- Set up proper CORS origins
- Configure rate limiting
- Enable MongoDB authentication

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author & Contact

**Muhammad Asim Chattha**
- Email: muhammadasimchattha@gmail.com
- GitHub: [@chmuhammadasim](https://github.com/chmuhammadasim)

## 🤝 Acknowledgments

- Special thanks to the Down syndrome community for inspiration
- React and Node.js communities for excellent documentation
- TensorFlow.js team for machine learning capabilities
- All contributors who help make this project better

## ❓ Frequently Asked Questions (FAQ)

### General Questions

**Q: What age group is TheraLearn designed for?**
A: TheraLearn is primarily designed for children with Down syndrome, typically ages 3-18, but can be adapted for various developmental levels.

**Q: Do I need special hardware to run TheraLearn?**
A: No special hardware is required. The platform runs on standard computers, tablets, and smartphones with a web browser. Some games may benefit from a webcam for emotion detection or hand gesture features.

**Q: Is TheraLearn free to use?**
A: The platform is open-source and free for educational and therapeutic use. Check the license for commercial usage terms.

**Q: Can I use TheraLearn offline?**
A: Currently, TheraLearn requires an internet connection for full functionality. Offline mode is planned for future releases.

### Technical Questions

**Q: What browsers are supported?**
A: TheraLearn works best on modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

**Q: Can I customize the games for specific needs?**
A: Yes! The platform is designed to be customizable. Psychologists and therapists can adjust difficulty levels, and developers can create new games using the existing framework.

**Q: How is user data protected?**
A: We implement industry-standard security measures including password hashing, JWT authentication, and secure database connections. No sensitive data is shared with third parties.

**Q: Can I integrate TheraLearn with other therapy tools?**
A: The platform provides REST APIs that can be integrated with other systems. Contact us for specific integration requirements.

### Development Questions

**Q: How can I add a new therapeutic game?**
A: Follow these steps:
1. Create a new component in `frontend/src/pages/Game/Games/`
2. Implement game logic with score tracking
3. Add routing in `App.js`
4. Create backend API endpoints for score saving
5. Test thoroughly and submit a pull request

**Q: What's the database schema?**
A: The main collections include Users, Games, Blogs, Questions, and Results. See the "Database Models" section for detailed schemas.

**Q: How do I set up a development environment?**
A: Follow the installation instructions in this README. You'll need Node.js, MongoDB, and Git installed on your system.

### Usage Questions

**Q: How do I track a child's progress?**
A: Progress is automatically tracked through game scores, completion times, and difficulty levels. Parents and therapists can view detailed analytics in the dashboard.

**Q: Can multiple children use the same account?**
A: We recommend creating separate accounts for each child to ensure accurate progress tracking and personalized experiences.

**Q: What if my child has difficulty with certain games?**
A: All games have adjustable difficulty levels. Therapists can also provide guidance on which games are most suitable for individual needs.

**Q: How often should children use TheraLearn?**
A: Usage recommendations should come from qualified therapists. Generally, short, frequent sessions (15-30 minutes) are more effective than long sessions.

## 🗺️ Roadmap

### Planned Features
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **Offline Mode**: Games and content available without internet
- [ ] **Multi-language Support**: Interface translation for global accessibility
- [ ] **Advanced Analytics**: AI-powered progress insights and recommendations
- [ ] **Video Therapy Sessions**: Integrated video calling for remote therapy
- [ ] **Parent Portal**: Dedicated interface for parents to monitor progress
- [ ] **Gamification**: Achievement system with badges and rewards
- [ ] **Social Features**: Safe interaction between users and families
- [ ] **Assessment Tools**: Standardized developmental assessments
- [ ] **Content Management**: Easy-to-use interface for creating custom content

### Recent Updates
- ✅ **v1.0.0**: Initial release with basic games and user management
- ✅ **Speech Recognition**: Voice-based games for language development
- ✅ **Emotion Detection**: Facial recognition for emotional intelligence
- ✅ **Hand Gesture Recognition**: Motor skills development games
- ✅ **Progress Tracking**: Comprehensive analytics dashboard

### Contributing to Roadmap
Have ideas for new features? We'd love to hear from you!
- Create a feature request issue on GitHub
- Join our community discussions
- Contribute code for planned features

## 📞 Support & Community

### Getting Help
- **Documentation**: Check this README and inline code comments
- **GitHub Issues**: Report bugs or request features
- **Email Support**: muhammadasimchattha@gmail.com
- **Community**: Join discussions in GitHub Discussions

### Support Channels
- **Bug Reports**: Use GitHub Issues with detailed reproduction steps
- **Feature Requests**: Submit enhancement proposals via GitHub Issues
- **Technical Questions**: Email or create discussion threads
- **Contributions**: Follow the contributing guidelines above

### Response Times
- **Critical Bugs**: 24-48 hours
- **General Issues**: 3-5 business days
- **Feature Requests**: Reviewed during monthly planning cycles
- **Pull Requests**: Reviewed within 1 week

---

**Made with ❤️ for the special needs community**
