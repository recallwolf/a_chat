var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api/robot', function(req, res) {
  var url = 'http://openapi.tuling123.com/openapi/api/v2';
  axios.post(url, {
    perception: {
        reqType:0,
        inputText: {
            text: req.query.data
        }
      },
      userInfo: {
        apiKey: "abed486a812740b4a7e31c20ceeffdae",
        userId: "6e12feff135e9b4c"
      }
  }).then((response) => {
    res.json(response.data)
  }).catch((response) => {
	  console.log(response)
	})
});

module.exports = router;
