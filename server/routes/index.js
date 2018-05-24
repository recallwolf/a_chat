var express = require('express');
var router = express.Router();
var axios = require('axios')

const userData = [
  {username: 'recallwolf', email: '9900@qq.com', password: '123456', avatar: 'avatar/panda.jpg'},
  {username: 'recalldoge', email: '8848@qq.com', password: '123456', avatar: 'avatar/cat.jpg'}
]

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

router.post('/api/login', function(req, res){
  let username = req.body.username
  let password = req.body.password
  let user = userData.find((value) => {
    return value.username === username
  })
  if (user != undefined && user.password === password) {
    res.json(user)
  }
})

module.exports = router;
