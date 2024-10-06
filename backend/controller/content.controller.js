const Content = require("../model/content.model"); 
const ContentController = {};

ContentController.updateHero = async (req, res) => {
  try {
    const { title, subtitle, buttonText } = req.body;
    
    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Content not found" });

    // Update hero section
    content.hero = { title, subtitle, buttonText };

    await content.save();
    res.status(200).json({ message: "Hero section updated", content });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 2. Add or Update Specific Feature by Index
ContentController.updateFeatureByIndex = async (req, res) => {
  try {
    const { index } = req.params;
    const { icon, title, description, image } = req.body;

    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Content not found" });

    // Check if the index exists, else add a new feature
    if (content.features[index]) {
      content.features[index] = { icon, title, description, image };
    } else {
      content.features.push({ icon, title, description, image });
    }

    await content.save();
    res.status(200).json({ message: "Feature updated", content });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 3. Remove a Feature by Index
ContentController.deleteFeatureByIndex = async (req, res) => {
  try {
    const { index } = req.params;

    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Content not found" });

    // Remove the feature at the specified index
    if (content.features[index]) {
      content.features.splice(index, 1);
      await content.save();
      res.status(200).json({ message: "Feature deleted", content });
    } else {
      res.status(404).json({ message: "Feature not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 4. Update CTA Section
ContentController.updateCta = async (req, res) => {
  try {
    const { title, description, buttonText, features } = req.body;

    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Content not found" });

    // Update CTA section
    content.cta = { title, description, buttonText, features };

    await content.save();
    res.status(200).json({ message: "CTA section updated", content });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 5. Get All Content
ContentController.getAllContent = async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Content not found" });

    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 6. Get Hero Section
ContentController.getHero = async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Content not found" });

    res.status(200).json({ hero: content.hero });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 7. Get Features Section
ContentController.getFeatures = async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Content not found" });

    res.status(200).json({ features: content.features });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 8. Get CTA Section
ContentController.getCta = async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Content not found" });

    res.status(200).json({ cta: content.cta });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = ContentController;