const express = require('express');
const router = express.Router();

const axios = require('axios');
const { getTitleAndPrice } = require('../modules/commonFunction');

/* GET home page. */
router.get('/', async (req, res, next) => {
  let URL = req.query.url || process.env.URL_LAZADA;

  const options = {
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'}
  };

  try {
    const response = await axios.get(URL, options);
    if (response.status != 200) {
      return
    }

    const data = getTitleAndPrice(response);

    res.json({ ...data });

  } catch (error) {
    return
  }
});

module.exports = router;
