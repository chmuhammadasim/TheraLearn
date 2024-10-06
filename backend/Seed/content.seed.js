const mongoose = require("mongoose");
const Content = require("../model/content.model"); // Adjust the path based on your project structure

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/theraLearn', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  seedDatabase();
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Sample data for seeding
const seedData = {
  hero: {
    title: "Welcome to Our Platform",
    subtitle: "Learn and explore with the best resources available",
    buttonText: "Get Started"
  },
  features: [
    {
      icon: "fa-graduation-cap",
      title: "High-Quality Education",
      description: "Access the best learning materials designed by experts.",
      image: "https://example.com/images/feature1.jpg"
    },
    {
      icon: "fa-lightbulb",
      title: "Creative Learning",
      description: "Boost creativity through interactive lessons.",
      image: "https://example.com/images/feature2.jpg"
    },
    {
      icon: "fa-heart",
      title: "Personal Growth",
      description: "Learn skills that help you grow personally and professionally.",
      image: "https://example.com/images/feature3.jpg"
    }
  ],
  cta: {
    title: "Ready to take the next step?",
    description: "Join us today and start learning from the best.",
    buttonText: "Sign Up Now",
    features: [
      {
        title: "Trusted Experts",
        description: "Our teachers are professionals in their fields."
      },
      {
        title: "Flexible Learning",
        description: "Access our courses anytime, anywhere."
      }
    ]
  }
};

// Function to seed the database
async function seedDatabase() {
  try {
    // Check if content already exists
    const contentExists = await Content.findOne();
    if (contentExists) {
      console.log("Content already exists in the database");
      mongoose.connection.close();
      return;
    }

    // Insert seed data
    const newContent = new Content(seedData);
    await newContent.save();
    console.log("Database seeded successfully with content");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database", err);
    mongoose.connection.close();
  }
}
