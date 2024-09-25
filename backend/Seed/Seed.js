const mongoose = require('mongoose');
const Blog = require('./models/Blog');
const Game = require('./models/Game');
const Question = require('./models/Question');
const User = require('./models/User');

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/theraLearn'; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Game.deleteMany({});
    await Question.deleteMany({});
    await Blog.deleteMany({});

    // Create psychologists
    const psychologists = await User.insertMany([
      {
        username: 'drsmith',
        email: 'drsmith@example.com',
        password: 'password123',
        role: 'psychologist',
        firstName: 'John',
        lastName: 'Smith',
        education: ['PhD in Clinical Psychology', 'Masters in Child Development'],
        experience: ['10 years in child psychology', '5 years in family therapy'],
        specialization: 'Child Psychology',
        profilePictureUrl: 'https://example.com/drsmith.jpg',
        bio: 'Dr. Smith has been practicing child psychology for over 10 years, focusing on early mental health interventions.',
        contact: '123-456-7890',
        address: '123 Elm St, New York, NY',
        city: 'New York',
        country: 'USA',
        patients: [],
        createdAt: new Date(),
      },
      {
        username: 'drjones',
        email: 'drjones@example.com',
        password: 'password123',
        role: 'psychologist',
        firstName: 'Sarah',
        lastName: 'Jones',
        education: ['Masters in Counseling Psychology'],
        experience: ['8 years in behavioral therapy', '3 years in cognitive behavioral therapy (CBT)'],
        specialization: 'Behavioral Therapy',
        profilePictureUrl: 'https://example.com/drjones.jpg',
        bio: 'Dr. Jones specializes in behavioral therapy and has helped many patients overcome behavioral challenges.',
        contact: '987-654-3210',
        address: '456 Oak St, Boston, MA',
        city: 'Boston',
        country: 'USA',
        patients: [],
        createdAt: new Date(),
      },
      {
        username: 'drmiller',
        email: 'drmiller@example.com',
        password: 'password123',
        role: 'psychologist',
        firstName: 'Emily',
        lastName: 'Miller',
        education: ['PhD in Neuropsychology'],
        experience: ['5 years in cognitive therapy'],
        specialization: 'Cognitive Therapy',
        profilePictureUrl: 'https://example.com/drmiller.jpg',
        bio: 'Dr. Miller is a leading expert in cognitive therapy, specializing in the treatment of anxiety disorders.',
        contact: '555-111-2222',
        address: '789 Maple St, Chicago, IL',
        city: 'Chicago',
        country: 'USA',
        patients: [],
        createdAt: new Date(),
      },
      // More psychologists
      {
        username: 'drtaylor',
        email: 'drtaylor@example.com',
        password: 'password123',
        role: 'psychologist',
        firstName: 'Anna',
        lastName: 'Taylor',
        education: ['PhD in Clinical Psychology'],
        experience: ['7 years in family therapy', '2 years in couples therapy'],
        specialization: 'Couples Therapy',
        profilePictureUrl: 'https://example.com/drtaylor.jpg',
        bio: 'Dr. Taylor focuses on strengthening relationships and resolving conflicts.',
        contact: '444-555-3333',
        address: '101 Pine St, San Francisco, CA',
        city: 'San Francisco',
        country: 'USA',
        patients: [],
        createdAt: new Date(),
      },
    ]);

    // Create users (patients)
    const users = await User.insertMany([
      {
        username: 'janedoe',
        email: 'janedoe@example.com',
        password: 'password123',
        role: 'user',
        firstName: 'Jane',
        lastName: 'Doe',
        psychologist: psychologists[0]._id,
        profilePictureUrl: 'https://example.com/janedoe.jpg',
        contact: '123-555-7890',
        address: '101 Pine St, Los Angeles, CA',
        city: 'Los Angeles',
        country: 'USA',
        dateOfBirth: new Date(1990, 5, 15),
        createdAt: new Date(),
        games: [],
        questions: [],
        result: [],
      },
      {
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123',
        role: 'user',
        firstName: 'John',
        lastName: 'Doe',
        psychologist: psychologists[1]._id,
        profilePictureUrl: 'https://example.com/johndoe.jpg',
        contact: '456-555-1234',
        address: '202 Cedar St, Miami, FL',
        city: 'Miami',
        country: 'USA',
        dateOfBirth: new Date(1985, 8, 20),
        createdAt: new Date(),
        games: [],
        questions: [],
        result: [],
      },
      {
        username: 'alicejohnson',
        email: 'alicejohnson@example.com',
        password: 'password123',
        role: 'user',
        firstName: 'Alice',
        lastName: 'Johnson',
        psychologist: psychologists[2]._id,
        profilePictureUrl: 'https://example.com/alicejohnson.jpg',
        contact: '789-555-4321',
        address: '303 Birch St, Dallas, TX',
        city: 'Dallas',
        country: 'USA',
        dateOfBirth: new Date(1992, 3, 10),
        createdAt: new Date(),
        games: [],
        questions: [],
        result: [],
      },
      {
        username: 'bobsmith',
        email: 'bobsmith@example.com',
        password: 'password123',
        role: 'user',
        firstName: 'Bob',
        lastName: 'Smith',
        psychologist: psychologists[0]._id,
        profilePictureUrl: 'https://example.com/bobsmith.jpg',
        contact: '321-555-6543',
        address: '404 Willow St, Seattle, WA',
        city: 'Seattle',
        country: 'USA',
        dateOfBirth: new Date(1988, 1, 25),
        createdAt: new Date(),
        games: [],
        questions: [],
        result: [],
      },
      {
        username: 'chriswilliams',
        email: 'chriswilliams@example.com',
        password: 'password123',
        role: 'user',
        firstName: 'Chris',
        lastName: 'Williams',
        psychologist: psychologists[1]._id,
        profilePictureUrl: 'https://example.com/chriswilliams.jpg',
        contact: '654-555-7890',
        address: '505 Spruce St, Denver, CO',
        city: 'Denver',
        country: 'USA',
        dateOfBirth: new Date(1995, 7, 12),
        createdAt: new Date(),
        games: [],
        questions: [],
        result: [],
      },
      // More users
      {
        username: 'emilyclark',
        email: 'emilyclark@example.com',
        password: 'password123',
        role: 'user',
        firstName: 'Emily',
        lastName: 'Clark',
        psychologist: psychologists[3]._id,
        profilePictureUrl: 'https://example.com/emilyclark.jpg',
        contact: '888-555-7777',
        address: '606 Elm St, Portland, OR',
        city: 'Portland',
        country: 'USA',
        dateOfBirth: new Date(1993, 11, 5),
        createdAt: new Date(),
        games: [],
        questions: [],
        result: [],
      },
    ]);

    // Assign patients to psychologists
    psychologists[0].patients = [users[0]._id, users[3]._id];
    psychologists[1].patients = [users[1]._id, users[4]._id];
    psychologists[2].patients = [users[2]._id];
    psychologists[3].patients = [users[5]._id];
    await Promise.all(psychologists.map(psychologist => psychologist.save()));

    // Create games for users
    const games = await Game.insertMany([
      {
        userId: users[0]._id,
        gameName: 'Memory Game',
        description: 'A fun game to boost memory and attention span.',
        sessions: [
          {
            level: 1,
            score: 500,
            duration: 5,
            status: 'completed',
          },
          {
            level: 2,
            score: 600,
            duration: 7,
            status: 'completed',
          },
        ],
        overallResults: {
          highestScore: 600,
          totalAttempts: 2,
          totalScore: 1100,
        },
      },
      {
        userId: users[1]._id,
        gameName: 'Puzzle Game',
        description: 'Solve puzzles to improve problem-solving skills.',
        sessions: [
          {
            level: 1,
            score: 300,
            duration: 10,
            status: 'completed',
          },
          {
            level: 2,
            score: 400,
            duration: 12,
            status: 'completed',
          },
        ],
        overallResults: {
          highestScore: 400,
          totalAttempts: 2,
          totalScore: 700,
        },
      },
      {
        userId: users[2]._id,
        gameName: 'Quiz Game',
        description: 'Answer questions to test your knowledge.',
        sessions: [
          {
            level: 1,
            score: 100,
            duration: 8,
            status: 'completed',
          },
          {
            level: 2,
            score: 150,
            duration: 6,
            status: 'completed',
          },
        ],
        overallResults: {
          highestScore: 150,
          totalAttempts: 2,
          totalScore: 250,
        },
      },
      // More games
      {
        userId: users[3]._id,
        gameName: 'Speed Game',
        description: 'Test your speed in this fun game.',
        sessions: [
          {
            level: 1,
            score: 700,
            duration: 5,
            status: 'completed',
          },
          {
            level: 2,
            score: 800,
            duration: 8,
            status: 'completed',
          },
        ],
        overallResults: {
          highestScore: 800,
          totalAttempts: 2,
          totalScore: 1500,
        },
      },
    ]);

    // Create questions
    const questions = await Question.insertMany([
      {
        questionText: 'How are you feeling today?',
        psychologistId: psychologists[0]._id,
        createdAt: new Date(),
      },
      {
        questionText: 'What challenges are you facing?',
        psychologistId: psychologists[1]._id,
        createdAt: new Date(),
      },
      {
        questionText: 'How did you cope with stress this week?',
        psychologistId: psychologists[2]._id,
        createdAt: new Date(),
      },
      {
        questionText: 'What is your main goal for therapy?',
        psychologistId: psychologists[3]._id,
        createdAt: new Date(),
      },
      {
        questionText: 'How do you usually handle conflict?',
        psychologistId: psychologists[0]._id,
        createdAt: new Date(),
      },
      // More questions
      {
        questionText: 'What makes you happy?',
        psychologistId: psychologists[1]._id,
        createdAt: new Date(),
      },
      {
        questionText: 'What do you want to improve about yourself?',
        psychologistId: psychologists[2]._id,
        createdAt: new Date(),
      },
    ]);

    // Create blogs
    const blogs = await Blog.insertMany([
      {
        title: 'Understanding Anxiety',
        content: 'Anxiety is a common mental health issue...',
        author: psychologists[0]._id,
        createdAt: new Date(),
      },
      {
        title: 'Coping with Stress',
        content: 'Stress can be managed with various techniques...',
        author: psychologists[1]._id,
        createdAt: new Date(),
      },
      {
        title: 'The Importance of Therapy',
        content: 'Therapy can greatly improve mental well-being...',
        author: psychologists[2]._id,
        createdAt: new Date(),
      },
      {
        title: 'Building Healthy Relationships',
        content: 'Relationships are key to emotional health...',
        author: psychologists[3]._id,
        createdAt: new Date(),
      },
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
