const mongoose = require("mongoose");
const Content = require("../model/content.model");

// Connect to the database
mongoose.connect("mongodb://127.0.0.1:27017/theraLearn", {})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

// Seeding data
const seedData = new Content({
  hero: {
    title: "Empowering Digital Literacy for Down Syndrome Individuals",
    subtitle: "Interactive learning and therapy to help individuals with Down syndrome acquire essential technology skills for independence.",
    buttonText: "Get Started",
  },
  features: [
    {
      title: "Self-Paced Learning",
      description: "Users can learn at their own pace with customized content tailored to cognitive abilities, ensuring a personalized experience.",
      image: "https://example.com/image1.jpg",
    },
    {
      title: "Gamified Activities",
      description: "Engaging learning through fun, task-based activities that reward progress and keep students motivated.",
      image: "https://example.com/image2.jpg",
    },
    {
      title: "Assistive Technology",
      description: "Specialized tools help individuals with Down syndrome navigate digital platforms independently, fostering self-reliance.",
      image: "https://example.com/image3.jpg",
    },
    {
      title: "Interactive Community",
      description: "A platform for communication and collaboration, enabling individuals to connect with caregivers and peers in a supportive environment.",
      image: "https://example.com/image4.jpg",
    },
  ],
  cta: {
    title: "Join the Digital Literacy Movement!",
    description: "Sign up today to help individuals with Down syndrome develop essential tech skills and gain confidence in the digital world.",
    buttonText: "Sign Up Now",
    features: [
      {
        title: "Digital Independence",
        description: "Empower individuals to navigate technology independently and confidently, enhancing their daily life and autonomy.",
      },
      {
        title: "Personalized Learning Paths",
        description: "Create custom learning tracks based on cognitive skills and preferred learning styles, ensuring effective education.",
      },
      {
        title: "Community Support",
        description: "Access a network of caregivers, educators, and peers who provide ongoing support and encouragement throughout the learning process.",
      },
    ],
  },
});

seedData.save()
  .then(() => {
    console.log("Seed data saved successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Error saving seed data:", err);
    mongoose.connection.close();
  });
