const express = require('express');
const Url = require('../src/models/Url');

const router = express.Router();


const generateUniqueURL = () => {

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomURL = '';
  
  for (let i = 0; i < 40; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomURL += characters.charAt(randomIndex);
  }
  
  return randomURL;

}

// Create a new unique URL
router.post('/create_url', async (req, res) => {
  try {
    const newUrl = new Url({
      unique_id: generateUniqueURL(),
    });
    await newUrl.save();
    res.json(newUrl);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create a new URL' });
  }
});

// Update URL with progress, status, and message
router.patch('/update/:uniqueUrl', async (req, res) => {
  const { progress, status, message } = req.body;
  try {
    const updatedUrl = await UrlModel.findOneAndUpdate(
      { uniqueUrl: req.params.uniqueUrl },
      { progress, status, message },
      { new: true }
    );

    if (!updatedUrl) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json(updatedUrl);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update URL' });
  }
});

module.exports = router;
