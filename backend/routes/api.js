const express = require('express');
const Url = require('../src/models/Url');
const router = express.Router();


const {server, app, io} = require("../app")


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
  const title = req.body.title;
  try {
    const newUrl = new Url({
      unique_id: generateUniqueURL(),
      title: title
    });
    await newUrl.save();
    res.status(200).json(newUrl);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create a new URL' });
  }
});

// Update URL with progress, status, and message
router.patch('/update/:uniqueUrl', async (req, res) => {
  const { progress, status, message } = req.body;
  try {
    const updatedUrl = await Url.findOneAndUpdate(
      { unique_id: req.params.uniqueUrl },
      { progress, status, message },
      { new: true }
    );
    console.log(updatedUrl)
    io.to(updatedUrl.unique_id).emit('update', updatedUrl);
    
    if (!updatedUrl) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json(updatedUrl);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to update URL' });
  }
});


// Get progress by unique ID
router.get('/progress/:uniqueId', async (req, res) => {
  try {
    const url = await Url.findOne({ unique_id: req.params.uniqueId });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({ progress: url.progress });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get progress' });
  }
});




module.exports = router;
