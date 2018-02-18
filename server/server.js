const express = require('express');
const googleTrends = require('google-trends-api');

const app = express();
const port = 3000;

app.get('/interestOverTime/:keyword', (req, res) => {
  return googleTrends.interestOverTime({
    keyword: req.params.keyword
  })
    .then(data => {
      res.json(JSON.parse(data));
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});

app.get('/', (req, res) => {
  console.log('hello world!')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
