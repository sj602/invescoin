const express = require('express');
const googleTrends = require('google-trends-api');

const app = express();
const PORT = process.env.PORT || '3000';

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

app.get('/', (req, res) => {
  console.log('hello world!')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});
