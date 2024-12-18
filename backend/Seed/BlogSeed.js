const mongoose = require('mongoose');
const Blog = require('../model/blog.model');

mongoose.connect("mongodb://127.0.0.1:27017/theraLearn", {})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

const seedBlogs = [
  {
    title: 'The Importance of Mental Health in the Workplace',
    slug: 'importance-of-mental-health-in-workplace',
    author: 'your-author-id-here',
    content: 'Mental health in the workplace is essential for employee well-being and productivity. In this blog, we explore the impact of mental health on performance and provide strategies for creating a supportive environment.',
    summary: 'Explore how workplace mental health initiatives can improve employee satisfaction and performance.',
    tags: ['mental health', 'workplace', 'employee wellness'],
    coverImageUrl: 'https://www.example.com/images/mental-health-workplace.jpg',
    videoUrl: 'https://www.youtube.com/embed/video-id',
    likes: 35,
    dislikes: 2,
    comments: [
      {
        user: 'user-id-1',  // Replace with actual user ObjectId
        comment: 'Great article! I believe mental health initiatives are crucial for success.',
      },
    ],
    publishedAt: new Date(),
    isPublished: true,
    viewCount: 500,
    estimatedReadTime: 6,
  },
  {
    title: 'Managing Stress and Avoiding Burnout',
    slug: 'managing-stress-and-avoiding-burnout',
    author: 'your-author-id-here',
    content: 'Burnout and stress are increasingly common in today\'s fast-paced world. This blog offers expert advice on managing stress, recognizing the signs of burnout, and tips for avoiding it.',
    summary: 'Learn how to effectively manage stress and avoid burnout with expert strategies.',
    tags: ['stress management', 'burnout', 'mental health'],
    coverImageUrl: 'https://www.example.com/images/stress-burnout.jpg',
    videoUrl: 'https://www.youtube.com/embed/video-id',
    likes: 45,
    dislikes: 3,
    comments: [
      {
        user: 'user-id-2',  // Replace with actual user ObjectId
        comment: 'These tips have really helped me manage my stress levels.',
      },
    ],
    publishedAt: new Date(),
    isPublished: true,
    viewCount: 650,
    estimatedReadTime: 7,
  },
  {
    title: 'Building Emotional Intelligence for Career Success',
    slug: 'building-emotional-intelligence-for-career-success',
    author: 'your-author-id-here',
    content: 'Emotional intelligence (EQ) is a key factor in career development. In this blog, we discuss how improving EQ can help you build stronger relationships and advance your career.',
    summary: 'Discover the importance of emotional intelligence in the workplace and how to enhance it for career growth.',
    tags: ['emotional intelligence', 'career development', 'professional growth'],
    coverImageUrl: 'https://www.example.com/images/emotional-intelligence-career.jpg',
    videoUrl: 'https://www.youtube.com/embed/video-id',
    likes: 60,
    dislikes: 4,
    comments: [
      {
        user: 'user-id-3',  // Replace with actual user ObjectId
        comment: 'Improving emotional intelligence has made a huge difference in my work life!',
      },
    ],
    publishedAt: new Date(),
    isPublished: true,
    viewCount: 800,
    estimatedReadTime: 5,
  },
  {
    title: 'The Role of Leadership in Employee Motivation',
    slug: 'role-of-leadership-in-employee-motivation',
    author: 'your-author-id-here',
    content: 'Leadership plays a critical role in motivating employees. In this blog, we explore the best leadership practices that inspire motivation and lead to improved team performance.',
    summary: 'Learn how leadership can enhance employee motivation and drive team success.',
    tags: ['leadership', 'employee motivation', 'management'],
    coverImageUrl: 'https://www.example.com/images/leadership-motivation.jpg',
    videoUrl: 'https://www.youtube.com/embed/video-id',
    likes: 50,
    dislikes: 1,
    comments: [
      {
        user: 'user-id-4',  // Replace with actual user ObjectId
        comment: 'As a manager, I found these insights really useful for motivating my team.',
      },
    ],
    publishedAt: new Date(),
    isPublished: true,
    viewCount: 700,
    estimatedReadTime: 8,
  },
  {
    title: 'The Impact of Technology on Mental Health Treatment',
    slug: 'impact-of-technology-on-mental-health-treatment',
    author: 'your-author-id-here',
    content: 'Technology is revolutionizing mental health treatment. From teletherapy to apps that track mental wellness, this blog covers the latest innovations in mental health care and their effectiveness.',
    summary: 'Learn how technology is transforming mental health treatment and improving access to care.',
    tags: ['mental health', 'technology', 'healthcare innovation'],
    coverImageUrl: 'https://www.example.com/images/technology-mental-health.jpg',
    videoUrl: 'https://www.youtube.com/embed/video-id',
    likes: 55,
    dislikes: 0,
    comments: [
      {
        user: 'user-id-5',  // Replace with actual user ObjectId
        comment: 'Telehealth has made therapy much more accessible for me.',
      },
    ],
    publishedAt: new Date(),
    isPublished: true,
    viewCount: 850,
    estimatedReadTime: 6,
  },
];

// Insert the seed data into the database
Blog.insertMany(seedBlogs)
  .then(() => {
    console.log('Seed data saved successfully!');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log('Error saving seed data:', err);
    mongoose.connection.close();
  });
