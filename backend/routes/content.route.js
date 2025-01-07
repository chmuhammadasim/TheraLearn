const express = require("express");
const router = express.Router();
const contentController = require("../controller/content.controller");
const { admin } = require("../middleware/authMiddleware");
const checkAuth = require("../middleware/check-auth");

router.put("/update-hero", checkAuth, admin, contentController.updateHero);
router.put(
  "/update-feature/:index",
  checkAuth,
  admin,
  contentController.updateFeatureByIndex
);
router.delete(
  "/delete-feature/:index",
  checkAuth,
  admin,
  contentController.deleteFeatureByIndex
);
router.put("/update-cta", checkAuth, admin, contentController.updateCta);
router.get("/", contentController.getAllContent);
router.get("/hero", checkAuth, admin, contentController.getHero);
router.get("/features", checkAuth, admin, contentController.getFeatures);
router.get("/cta", checkAuth, admin, contentController.getCta);

module.exports = router;
