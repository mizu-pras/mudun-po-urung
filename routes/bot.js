const express = require('express');
const router = express.Router();

const axios = require('axios');
const { getTitleAndPrice } = require('../modules/commonFunction');

router.get('/', async (req, res, next) => {
  try {
    const token = process.env.BOT_KEY;
    
    let methods = "getMe";
    let url = 'https://api.telegram.org/bot' + token + '/' + methods;

    const response = await axios.get(url);

    res.json(response.data);

  } catch (error) {
    return
  }
});

router.get('/getUpdates', async (req, res, next) => {
  try {
    const token = process.env.BOT_KEY;
    
    let methods = "getUpdates";
    let url = 'https://api.telegram.org/bot' + token + '/' + methods;

    const response = await axios.get(url);

    res.json(response.data);

  } catch (error) {
    return
  }
});

router.get('/sendmsg', async (req, res, next) => {
  
  let URL = process.env.URL_LAZADA;

  const options = {
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'}
  };

  try {
    const response = await axios.get(URL, options);
    if (response.status != 200) {
      return res.send('err lazada');
    }

    const data = await getTitleAndPrice(response);
    console.log(data);
    //res.json(data);

    // send message
    try {
      const token = process.env.BOT_KEY;
      
      let methods = "sendMessage";

      let id_receiver = process.env.MY_ID;
      let text = `*${data.title}*

*${data.value}*
      
[Link pembelian](` + URL + `})`;

      let url = 'https://api.telegram.org/bot' + token + '/' + methods + '?chat_id=' + id_receiver + '&text=' + text + '&parse_mode=Markdown';
  
      const response = await axios.get(url);
  
      res.json(response.data);
  
    } catch (error) {
      return res.send('err send');
    }    

  } catch (error) {
    return res.send('err lazada 2');
  }
  
});

module.exports = router;
