const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
const Psychologist = require('../model/user.model');

dotenv.config();

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/theraLearn", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected for seeding...'))
    .catch(err => console.error(err));

const seedPsychologists = async () => {
    try {
        // Clear existing psychologists
        await Psychologist.deleteMany();

        // Hash passwords
        const hashedPassword = await bcrypt.hash('password123', 10);

        // Seed data
        const psychologists = [
            {
                username: 'dr_smith',
                email: 'drsmith@example.com',
                password: hashedPassword,
                firstName: 'John',
                lastName: 'Smith',
                contact: '+1234567890',
                city: 'New York',
                country: 'USA',
                bio: 'Experienced psychologist specializing in behavioral therapy.',
                education: ['PhD in Clinical Psychology', 'MSc in Behavioral Science'],
                experience: ['10 years at NYC Mental Health Center', '5 years in private practice'],
                therapyMethods: ['Cognitive Behavioral Therapy', 'Mindfulness Therapy'],
                certifications: ['Certified Cognitive Therapist'],
                availability: 'Monday-Friday, 9 AM - 5 PM',
                consultationFee: 100,
                isActive: true
            },
            {
                username: 'dr_jones',
                email: 'drjones@example.com',
                password: hashedPassword,
                firstName: 'Emily',
                lastName: 'Jones',
                contact: '+1987654321',
                city: 'Los Angeles',
                country: 'USA',
                bio: 'Passionate about child psychology and autism spectrum disorders.',
                education: ['PhD in Child Psychology', 'MSc in Neuroscience'],
                experience: ['8 years as a child psychologist', 'Research in autism spectrum disorders'],
                therapyMethods: ['Play Therapy', 'Speech Therapy'],
                certifications: ['Certified Child Psychologist'],
                availability: 'Monday-Friday, 10 AM - 4 PM',
                consultationFee: 120,
                isActive: true
            },
            {
                username: 'dr_miller',
                email: 'drmiller@example.com',
                password: hashedPassword,
                firstName: 'Michael',
                lastName: 'Miller',
                contact: '+1122334455',
                city: 'Chicago',
                country: 'USA',
                bio: 'Expert in anxiety and stress management with over 15 years of experience.',
                education: ['PhD in Psychology', 'MSc in Cognitive Science'],
                experience: ['15 years in anxiety and stress management'],
                therapyMethods: ['Exposure Therapy', 'Relaxation Techniques'],
                certifications: ['Licensed Clinical Psychologist'],
                availability: 'Monday-Thursday, 8 AM - 6 PM',
                consultationFee: 90,
                isActive: true
            }
        ];

        await Psychologist.insertMany(psychologists);
        console.log('Psychologists seeded successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Seeding failed:', error);
        mongoose.connection.close();
    }
};

// Run the seed function
seedPsychologists();
