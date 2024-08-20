const mongoose = require('mongoose');

const Blog = require('../model/blog.model');
const User = require('../model/user.model');
const Game = require('../model/game.model');
const Question = require('../model/question.model');
const Result = require('../model/result.model');

const mongoURI = 'mongodb://127.0.0.1:27017/theraLearn';

const seedData = async () => {
  try {
    // Connect to the database
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await Blog.deleteMany({});
    await Game.deleteMany({});
    await Question.deleteMany({});
    await Result.deleteMany({});

    const users = await User.find({});
    console.log('Users:', users);

    // Sample blog data
    const blogs = [
      {
        title: 'Exploring the Wonders of the Universe',
        slug: 'exploring-wonders-universe',
        author: users[0]._id,
        content: 'The universe is vast and full of mysteries. In this blog, we explore some of the most fascinating aspects of the cosmos...',
        summary: 'An exploration of the most intriguing aspects of the universe, from black holes to dark matter.',
        category: 'Lifestyle',
        tags: ['Space', 'Cosmos', 'Astronomy'],
        coverImageUrl: 'https://example.com/images/universe-cover.jpg',
        additionalImages: [
          'https://example.com/images/universe1.jpg',
          'https://example.com/images/universe2.jpg',
        ],
        videoUrl: 'https://example.com/videos/universe-intro.mp4',
        audioUrl: 'https://example.com/audio/universe-podcast.mp3',
        publishedAt: new Date(),
        isPublished: true,
        viewCount: 1200,
        estimatedReadTime: 5,
        seoTitle: 'Exploring the Wonders of the Universe | Blog',
        seoDescription: 'Discover the most intriguing aspects of the universe in our latest blog post.',
        featured: true,
        allowComments: true,
        language: 'English',
      },
      {
        title: 'A Culinary Journey Through Italy',
        slug: 'culinary-journey-italy',
        author: users[1]._id,
        content: 'Italy is renowned for its rich culinary heritage. This blog takes you on a journey through some of the best dishes and recipes...',
        summary: 'A journey through Italy’s culinary landscape, exploring traditional recipes and local flavors.',
        category: 'Food',
        tags: ['Italian', 'Cuisine', 'Recipes'],
        coverImageUrl: 'https://example.com/images/italy-cuisine.jpg',
        additionalImages: [
          'https://example.com/images/italy1.jpg',
          'https://example.com/images/italy2.jpg',
        ],
        videoUrl: 'https://example.com/videos/italy-cuisine.mp4',
        audioUrl: 'https://example.com/audio/italy-food.mp3',
        publishedAt: new Date(),
        isPublished: true,
        viewCount: 850,
        estimatedReadTime: 7,
        seoTitle: 'A Culinary Journey Through Italy | Blog',
        seoDescription: 'Experience Italy’s rich culinary traditions in our latest blog post.',
        featured: false,
        allowComments: true,
        language: 'English',
      },
      {
        title: 'The Future of Artificial Intelligence',
        slug: 'future-artificial-intelligence',
        author: users[0]._id,
        content: 'Artificial Intelligence (AI) is rapidly evolving. In this blog, we explore the potential future developments in AI...',
        summary: 'An analysis of the potential future developments and impacts of Artificial Intelligence.',
        category: 'Technology',
        tags: ['AI', 'Machine Learning', 'Technology'],
        coverImageUrl: 'https://example.com/images/ai-future.jpg',
        additionalImages: [
          'https://example.com/images/ai1.jpg',
          'https://example.com/images/ai2.jpg',
        ],
        videoUrl: 'https://example.com/videos/ai-future.mp4',
        audioUrl: 'https://example.com/audio/ai-podcast.mp3',
        publishedAt: new Date(),
        isPublished: true,
        viewCount: 1500,
        estimatedReadTime: 6,
        seoTitle: 'The Future of Artificial Intelligence | Blog',
        seoDescription: 'Explore the future developments and impacts of AI in our latest blog post.',
        featured: true,
        allowComments: true,
        language: 'English',
      },
      {
        title: 'Mindful Living: A Guide to Wellness',
        slug: 'mindful-living-wellness-guide',
        author: users[1]._id,
        content: 'Mindful living is a powerful tool for achieving mental and physical well-being. This blog offers practical tips and techniques...',
        summary: 'A practical guide to achieving wellness through mindful living.',
        category: 'Health',
        tags: ['Wellness', 'Mindfulness', 'Health'],
        coverImageUrl: 'https://example.com/images/mindful-living.jpg',
        additionalImages: [
          'https://example.com/images/mindful1.jpg',
          'https://example.com/images/mindful2.jpg',
        ],
        videoUrl: 'https://example.com/videos/mindful-living.mp4',
        audioUrl: 'https://example.com/audio/mindful-living.mp3',
        publishedAt: new Date(),
        isPublished: true,
        viewCount: 950,
        estimatedReadTime: 8,
        seoTitle: 'Mindful Living: A Guide to Wellness | Blog',
        seoDescription: 'Achieve wellness through mindful living with our practical guide in this blog post.',
        featured: false,
        allowComments: true,
        language: 'English',
      }
    ];

    // Insert sample blogs
    await Blog.insertMany(blogs);

    // Sample game data
    const games = [
      {
        userId: users[0]._id,
        gameName: 'Puzzle Master',
        sessions: [
          { level: 1, score: 80, duration: 300, status: 'completed', highestScore: 80, attempts: 2 },
          { level: 2, score: 70, duration: 350, status: 'completed', highestScore: 70, attempts: 3 },
          { level: 3, score: 85, duration: 400, status: 'completed', highestScore: 85, attempts: 1 },
        ],
        overallResults: { highestScore: 85, totalAttempts: 6, totalScore: 235 }
      },
      {
        userId: users[0]._id,
        gameName: 'Trivia Challenge',
        sessions: [
          { level: 1, score: 90, duration: 250, status: 'completed', highestScore: 90, attempts: 1 },
          { level: 2, score: 85, duration: 300, status: 'completed', highestScore: 85, attempts: 2 },
          { level: 3, score: 78, duration: 400, status: 'completed', highestScore: 78, attempts: 1 },
        ],
        overallResults: { highestScore: 90, totalAttempts: 4, totalScore: 253 }
      },
      {
        userId: users[1]._id,
        gameName: 'Memory Match',
        sessions: [
          { level: 1, score: 60, duration: 200, status: 'completed', highestScore: 60, attempts: 1 },
          { level: 2, score: 75, duration: 250, status: 'completed', highestScore: 75, attempts: 2 },
          { level: 3, score: 80, duration: 300, status: 'completed', highestScore: 80, attempts: 1 },
        ],
        overallResults: { highestScore: 80, totalAttempts: 4, totalScore: 215 }
      },
      {
        userId: users[1]._id,
        gameName: 'Word Scramble',
        sessions: [
          { level: 1, score: 88, duration: 300, status: 'completed', highestScore: 88, attempts: 2 },
          { level: 2, score: 82, duration: 350, status: 'completed', highestScore: 82, attempts: 3 },
          { level: 3, score: 95, duration: 400, status: 'completed', highestScore: 95, attempts: 1 },
        ],
        overallResults: { highestScore: 95, totalAttempts: 6, totalScore: 265 }
      },
      {
        userId: users[2]._id,
        gameName: 'Number Crunch',
        sessions: [
          { level: 1, score: 92, duration: 250, status: 'completed', highestScore: 92, attempts: 1 },
          { level: 2, score: 88, duration: 300, status: 'completed', highestScore: 88, attempts: 2 },
          { level: 3, score: 80, duration: 400, status: 'completed', highestScore: 80, attempts: 1 },
        ],
        overallResults: { highestScore: 92, totalAttempts: 4, totalScore: 260 }
      }
    ];

    // Insert sample games
    await Game.insertMany(games);

    // Sample questions data
    const questions = [
      {
        questionText: 'What is the capital of France?',
        options: [
          { text: 'Berlin', isCorrect: false },
          { text: 'Madrid', isCorrect: false },
          { text: 'Paris', isCorrect: true },
          { text: 'Rome', isCorrect: false }
        ],
        difficulty: 'easy',
        category: 'Geography',
        createdBy: users[0]._id,
        timesAttempted: 10,
        timesCorrect: 8,
        tags: ['geography', 'europe']
      },
      {
        questionText: 'What is 2 + 2?',
        options: [
          { text: '3', isCorrect: false },
          { text: '4', isCorrect: true },
          { text: '5', isCorrect: false },
          { text: '6', isCorrect: false }
        ],
        difficulty: 'easy',
        category: 'Math',
        createdBy: users[1]._id,
        timesAttempted: 20,
        timesCorrect: 15,
        tags: ['math', 'addition']
      },
      {
        questionText: 'Who wrote "Hamlet"?',
        options: [
          { text: 'Charles Dickens', isCorrect: false },
          { text: 'William Shakespeare', isCorrect: true },
          { text: 'Jane Austen', isCorrect: false },
          { text: 'Mark Twain', isCorrect: false }
        ],
        difficulty: 'medium',
        category: 'Literature',
        createdBy: users[2]._id,
        timesAttempted: 12,
        timesCorrect: 9,
        tags: ['literature', 'shakespeare']
      },
      {
        questionText: 'What is the boiling point of water?',
        options: [
          { text: '90°C', isCorrect: false },
          { text: '100°C', isCorrect: true },
          { text: '110°C', isCorrect: false },
          { text: '120°C', isCorrect: false }
        ],
        difficulty: 'easy',
        category: 'Science',
        createdBy: users[0]._id,
        timesAttempted: 18,
        timesCorrect: 16,
        tags: ['science', 'physics']
      },
      {
        questionText: 'Which planet is known as the Red Planet?',
        options: [
          { text: 'Venus', isCorrect: false },
          { text: 'Mars', isCorrect: true },
          { text: 'Jupiter', isCorrect: false },
          { text: 'Saturn', isCorrect: false }
        ],
        difficulty: 'easy',
        category: 'Astronomy',
        createdBy: users[1]._id,
        timesAttempted: 15,
        timesCorrect: 13,
        tags: ['astronomy', 'mars']
      }
    ];

    // Insert sample questions
    await Question.insertMany(questions);

    console.log('Seeding completed.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedData();
