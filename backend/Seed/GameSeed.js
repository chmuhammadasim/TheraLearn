const mongoose = require('mongoose');
const Game = require('../model/game.model'); // Adjust the path as needed

const seedGames = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/theraLearn', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const games = [
    {
      userId: '64e245c567a8b27b1c123456',
      gameName: 'Memory Match',
      sessions: [
        {
          level: 1,
          score: 200,
          duration: 300,
          status: 'completed',
          datePlayed: new Date('2024-01-01T10:00:00Z'),
          highestScore: 200,
          attempts: 1,
        },
        {
          level: 2,
          score: 350,
          duration: 450,
          status: 'in-progress',
          datePlayed: new Date('2024-01-02T11:30:00Z'),
          highestScore: 350,
          attempts: 2,
        },
      ],
      overallResults: {
        highestScore: 350,
        totalAttempts: 3,
        totalScore: 550,
      },
    },
    {
      userId: '64e245c567a8b27b1c123457',
      gameName: 'Word Puzzle',
      sessions: [
        {
          level: 1,
          score: 150,
          duration: 200,
          status: 'completed',
          datePlayed: new Date('2024-02-01T08:30:00Z'),
          highestScore: 150,
          attempts: 1,
        },
        {
          level: 2,
          score: 300,
          duration: 400,
          status: 'failed',
          datePlayed: new Date('2024-02-02T09:00:00Z'),
          highestScore: 300,
          attempts: 2,
        },
      ],
      overallResults: {
        highestScore: 300,
        totalAttempts: 3,
        totalScore: 450,
      },
    },
    
  ];

  try {
    await Game.insertMany(games);
    console.log('Games seeded successfully!');
  } catch (error) {
    console.error('Error seeding games:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedGames();
