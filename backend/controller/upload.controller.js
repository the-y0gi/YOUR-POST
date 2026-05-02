const uploadService = require("../services/upload.service");

exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = await uploadService.uploadImage(req.file.path);

    res.status(200).json({
      success: true,
      avatar: imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
