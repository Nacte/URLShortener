const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Url = require('../Models/Url');

// GET /
router.get('/', async (req, res) => {
  try {
    const urls = await Url.find();
    res.render('index', { urls });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// POST /shorten
router.post('/shorten', async (req, res) => {
  const { fullUrl } = req.body;
  const shortUrl = shortid.generate(); // Generate a short ID with 8 characters
  try {
    await Url.create({ shortUrl, fullUrl });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// GET /:shortUrl
router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const urlData = await Url.findOne({ shortUrl });
    if (urlData) {
      urlData.clicks++;
      await urlData.save();
      res.redirect(urlData.fullUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
