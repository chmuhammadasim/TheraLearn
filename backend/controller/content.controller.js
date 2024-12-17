const Content = require("../model/content.model");
const ContentController = {};

ContentController.updateHero = async (req, res) => {
  try {
    const { title, subtitle, buttonText } = req.body;
    if (!title || !subtitle || !buttonText) {
      return res.status(400).json({ message: "All fields are required: title, subtitle, and buttonText" });
    }
    console.log("Updating hero section with data:", req.body);
    const content = await Content.findOne();
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    content.hero = { title, subtitle, buttonText };
    await content.save();
    res.status(200).json({
      message: "Hero section updated successfully",
      content: {
        hero: content.hero,
      },
    });
  } catch (error) {
    console.error("Error updating hero section:", error);
    res.status(500).json({
      message: "Server error while updating hero section",
      error: error.message || "Internal Server Error",
    });
  }
};

module.exports = ContentController;

ContentController.updateFeatureByIndex = async (req, res) => {
  try {
    const { index } = req.params;
    const { icon, title, description, image } = req.body;
    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Content not found" });
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
ContentController.deleteFeatureByIndex = async (req, res) => {
  try {
    const { index } = req.params;
    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Content not found" });
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
ContentController.updateCta = async (req, res) => {
  try {
    const { title, description, buttonText, features } = req.body;
    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Content not found" });
    content.cta = { title, description, buttonText, features };
    await content.save();
    res.status(200).json({ message: "CTA section updated", content });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
ContentController.getAllContent = async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "all Content not found" });
    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
ContentController.getHero = async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Hero Content not found" });
    res.status(200).json({ hero: content.hero });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
ContentController.getFeatures = async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "Feature Content not found" });
    res.status(200).json({ features: content.features });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
ContentController.getCta = async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) return res.status(404).json({ message: "CTA Content not found" });
    res.status(200).json({ cta: content.cta });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = ContentController;
