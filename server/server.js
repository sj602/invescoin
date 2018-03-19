////////////// Express settings... /////////////
const express = require('express');
const app = express();
const PORT = process.env.PORT || '3000';

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});

////// Google Trends API .../////////////
const googleTrends = require('google-trends-api');

app.get('/interestOverTime/:keyword/:startDate/:endDate', (req, res) => {
  return googleTrends.interestOverTime({
    keyword: req.params.keyword,
    startTime: new Date(req.params.startDate),
    endTime: new Date(req.params.endDate)
  })
    .then(data => {
      res.json(JSON.parse(data));
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

//////////// Twitter API /////////////////////
const Twit = require('twit')

const T = new Twit({
  consumer_key: 'ABsisdF8CgLaBs8Phw6jJHkTC',
  consumer_secret: 'vPwh3knd8y6DkN7sJ1RXKguNlL0KNAUIKBTjuwPBT4KLrmhrdt',
  access_token: '939883399333871616-wqNnaZvXtBMDz38EoaJwCMSHxETzPGp',
  access_token_secret: 'GI3aDKMoFyPl7l2cWpd0VK7Lyjvapmwv6HbVThQZaTTF8',
  timeout: 60*1000
})

// app.get('/twitter', (req, res) => {
//   return T.get('search/tweets', {q: 'crypto since:2018-01-01', count: 30}, (err, data, response) => {
//     try {
//       res.json(data)
//     }
//     catch(err) {
//       console.log('server error: ', err)
//     }
//   })
// });

app.get('/twitter/:userId', (req, res) => {
  return T.get('statuses/user_timeline', {screen_name: req.params.userId, count: 30}, (err, data, response) => {
    try {
      res.json(data)
    }
    catch(err) {
      console.log('server error: ', err)
    }
  })
});
