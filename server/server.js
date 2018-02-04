const express = require('express');
const googleTrends = require('google-trends-api');

const app = express();
const port = 3000;

app.get('/interestOverTime/:keyword', (req, res) => {
  return googleTrends.interestOverTime({
    keyword: req.params.keyword
  })
    .then(data => data)
    .catch(err => console.log(err))
  // console.log(req.params.keyword)
});
app.get('/', (req, res) => {
  console.log('hello world!')
})
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});