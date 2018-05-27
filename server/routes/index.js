var express = require('express');
var router = express.Router();
var axios = require('axios');
var jwt = require('jsonwebtoken');

const userData = [
  {username: 'recallwolf', email: '9900@qq.com', password: '123456', avatar: 'avatar/panda.jpg'},
  {username: 'recalldoge', email: '8848@qq.com', password: '123456', avatar: 'avatar/cat.jpg'}
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api/robot', function(req, res) {
  var url = 'http://openapi.tuling123.com/openapi/api/v2'
  axios.post(url, {
    perception: {
        reqType: 0,
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
  let userinfo = {username: user.username, email: user.email, avatar: user.avatar}
  if (user != undefined && user.password === password) {
    token = jwt.sign(req.body, 'user_pass_word', {expiresIn: 60*60*24*7})
    user.token = token
    userinfo.token = token
    res.json(userinfo)
  }
})

router.post('/api/check', function(req, res) {
  let frontEndToken = req.body.token
  let username = req.body.username
  let user = userData.find((value) => {
    return value.username === username
  })
  if (frontEndToken != user.token) {
    res.send('fail')
  }
  else {
    res.send('success')
  }
})

router.get('/api/userinfo', function(req, res) {
  let username = req.query.username
  let user = userData.find((value) => {
    return value.username === username
  })
  if (user != undefined) {
    let userinfo = {username: user.username, email: user.email, avatar: user.avatar}
    res.json(userinfo)
  }
})

module.exports = router;
