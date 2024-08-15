const mongoose = require('mongoose');

const Blog = require('../model/blog.model'); 
const User = require('../model/user.model');

const mongoURI = 'mongodb://127.0.0.1:27017/theraLearn';

const seedBlogs = async () => {
  try {
    // Connect to the database
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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
        author: users[1]._id, // Reference to a user ID
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
      }
    ];

    // Insert sample blogs
    await Blog.insertMany(blogs);

    console.log('Seed data successfully inserted.');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seeding script
seedBlogs();
