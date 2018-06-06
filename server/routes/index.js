var express = require('express');
var router = express.Router();
var axios = require('axios');
var jwt = require('jsonwebtoken');
var db = require('../db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
})

router.get('/api/robot', function(req, res) {
  let url = 'http://openapi.tuling123.com/openapi/api/v2'
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

router.get('/api/weather', function(req, res) {
  let url = 'https://free-api.heweather.com/s6/weather/forecast'
  axios.get(url, {
    params: {
      location: 'auto_ip',
      key: 'b59cc2987db5483a8b851ffe9c36ae42'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((response) => {
	  console.log(response)
	})
})

router.post('/api/login', function(req, res) {
  let username = req.body.username
  let password = req.body.password
  let queryString = `select * from users where username='${username}'`
  db.query(queryString, function(err, rows){
    if (err) {
      console.log(err)
    }
    else {
      if (rows.length === 0) {
        res.send('用户不存在')
      }
      else if (rows[0].password === password) {
        let token = jwt.sign(req.body, 'user_pass_word', {expiresIn: 60*60*24*7})
        let queryString = `update users set token='${token}' where username='${rows[0].username}'`
        db.query(queryString, function(err, row) {
          if (err) {
            console.log(err)
          }
          else {
            let userinfo = {username: rows[0].username, email: rows[0].email, avatar: rows[0].avatar, token: token}
            res.json(userinfo)
          }
        })
      }
      else if (rows[0].password != password) {
        res.send('密码错误')
      }
    }
  })
})

let id = 0
router.post('/api/register', function(req, res) {
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let repassword = req.body.repassword
  if (password != repassword) {
    res.send('密码不一致')
  }
  else {
    let queryString = `select * from users where username='${username}'`
    db.query(queryString, function(err, rows) {
      if (err) {
        console.log(err)
      }
      else if (rows.length != 0) {
        res.send('用户名存在')
      }
    })
  }

  let picture = Math.random() > 0.5 ? '/avatar/panda.jpg' : '/avatar/cat.jpg'
  let queryString = `insert into users(id, username, email, password, avatar) values(${id}, '${username}', '${email}', '${password}', '${picture}')`
  db.query(queryString, function(err, rows) {
    if (err) {
      console.log(err)
    }
    else {
      res.send('注册成功')
      id++
    }
  })
})

router.post('/api/check', function(req, res) {
  let frontEndToken = req.body.token
  let username = req.body.username
  let queryString = `select * from users where username='${username}'`
  db.query(queryString, function(err, rows) {
    if (err) {
      console.log(err)
    }
    else {
      if (rows.length === 0) {
        res.send('fail')
      }
      else if (rows[0].token != frontEndToken) {
        res.send('fail')
      }
      else if (rows[0].token === frontEndToken) {
        jwt.verify(rows[0].token, 'user_pass_word', function(err, decoded) {
          if (err) {
            res.send('fail')
          }
          else {
            res.send('success')
          }
        })
      }
    }    
  })
})

router.get('/api/userinfo', function(req, res) {
  let username = req.query.username
  let queryString = `select * from users where username='${username}'`
  db.query(queryString, function(err, rows) {
    if (err) {
      console.log(err)
    }
    else {
      if (rows.length != 0) {
        let userinfo = {username: rows[0].username, email: rows[0].email, avatar: rows[0].avatar}
        res.json(userinfo)
      }
    }
  })
})

router.get('/api/express', function(req, res) {
  let url = 'https://www.kuaidi100.com/query'
  let postid = req.query.postid
  let type = req.query.type

  axios.get(url, {
    params: {
      type: type,
      postid: postid
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((response) => {
	  console.log(response)
  })
})

let issue = 1600
setInterval(() => {
  issue++
}, 24*60*60*1000) 
router.get('/api/daily', function(req, res) {
  let url = `http://v3.wufazhuce.com:8000/api/hp/detail/${issue}`
  axios.get(url, {
    params: {
      version: '3.5.0',
      platform: 'android'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((response) => {
	  console.log(response)
  })
})

router.get('/api/news', function(req, res) {
  let category = req.query.category
  let url = 'http://is.snssdk.com/api/news/feed/v51/'
  axios.get(url, {
    params: {
      category: category,
      refer: 1
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((response) => {
	  console.log(response)
  })
})

router.get('/api/ticket', function(req, res) {
  let startStation = JSON.parse(req.query.startStation)
  let endStation = JSON.parse(req.query.endStation)
  let time = req.query.time
  let url = 'http://huoche.tuniu.com/station_1708_2500'

  axios.get(url, {
    params: {
      r: 'train/trainTicket/getTickets',
      'primary[departureDate]': time,
      'primary[departureCityCode]': startStation.code,
      'primary[departureCityName]': startStation.station,
      'primary[arrivalCityCode]': endStation.code,
      'primary[arrivalCityName]': endStation.station,
      start: 0,
      limit: 0
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((response) => {
	  console.log(response)
  })
})

module.exports = router;