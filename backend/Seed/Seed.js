const mongoose = require('mongoose');
const User = require('../model/user.model');
const Result = require('../model/result.model');
const Question = require('../model/question.model');
const Game = require('../model/game.model');

mongoose.connect('mongodb://127.0.0.1:27017/theraLearn');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Result.deleteMany({});
    await Question.deleteMany({});
    await Game.deleteMany({});

    // Create users
    const users = await User.insertMany([
      {
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'hashed_password', 
        role: 'user',
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'Anytown',
        country: 'CountryA',
        contact: '123-456-7890',
        bio: 'An enthusiastic gamer',
        profilePictureUrl: 'http://example.com/profile1.jpg',
        dateOfBirth: Date('1990-01-01'),
        isActive: true,
        lastLogin:  Date()
      },
      {
        username: 'janedoe',
        email: 'janedoe@example.com',
        password: 'hashed_password', 
        role: 'admin',
        firstName: 'Jane',
        lastName: 'Doe',
        address: '456 Elm St',
        city: 'Othertown',
        country: 'CountryB',
        contact: '987-654-3210',
        bio: 'A passionate educator',
        profilePictureUrl: 'http://example.com/profile2.jpg',
        dateOfBirth:  Date('1985-05-15'),
        isActive: true,
        lastLogin:  Date()
      },
      {
        username: 'mike123',
        email: 'mike123@example.com',
        password: 'hashed_password', 
        role: 'user',
        firstName: 'Mike',
        lastName: 'Smith',
        address: '789 Oak St',
        city: 'Smalltown',
        country: 'CountryC',
        contact: '555-123-4567',
        bio: 'A casual gamer',
        profilePictureUrl: 'http://example.com/profile3.jpg',
        dateOfBirth:  Date('2000-07-21'),
        isActive: true,
        lastLogin:  Date()
      }
    ]);

    await Result.insertMany([
      {
        userId: users[0]._id,
        totalGamesPlayed: 5,
        totalTimePlayed: 1200,
        averagePlayTime: 240,
        averageScore: 75,
        lastGame: {
          gameId: new mongoose.Types.ObjectId(),
          score: 85,
          timePlayed: 300
        },
        highestScore: 85,
        lowestScore: 50,
        totalPointsEarned: 375
      },
      {
        userId: users[1]._id,
        totalGamesPlayed: 8,
        totalTimePlayed: 1800,
        averagePlayTime: 225,
        averageScore: 80,
        lastGame: {
          gameId:new mongoose.Types.ObjectId(),
          score: 90,
          timePlayed: 400
        },
        highestScore: 90,
        lowestScore: 60,
        totalPointsEarned: 640
      },
      {
        userId: users[2]._id,
        totalGamesPlayed: 3,
        totalTimePlayed: 600,
        averagePlayTime: 200,
        averageScore: 70,
        lastGame: {
          gameId: new mongoose.Types.ObjectId(),
          score: 75,
          timePlayed: 250
        },
        highestScore: 75,
        lowestScore: 55,
        totalPointsEarned: 210
      }
    ]);

    // Create questions
    await Question.insertMany([
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
      }
    ]);

    await Game.insertMany([
      {
        userId: users[0]._id,
        gameName: 'Puzzle Master',
        sessions: [
          {
            level: 1,
            score: 80,
            duration: 300,
            status: 'completed',
            highestScore: 80,
            attempts: 2
          }
        ],
        overallResults: {
          highestScore: 80,
          totalAttempts: 2,
          totalScore: 80
        }
      },
      {
        userId: users[1]._id,
        gameName: 'Trivia Challenge',
        sessions: [
          {
            level: 1,
            score: 90,
            duration: 400,
            status: 'completed',
            highestScore: 90,
            attempts: 3
          }
        ],
        overallResults: {
          highestScore: 90,
          totalAttempts: 3,
          totalScore: 90
        }
      }
    ]);

    console.log('Seeding completed.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedData();
