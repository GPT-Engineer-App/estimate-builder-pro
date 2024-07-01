const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let jobConfigurations = [];

app.post('/api/job-configurations', (req, res) => {
  const { jobCode, part1, part2, labor1, labor2 } = req.body;
  jobConfigurations.push({ jobCode, part1, part2, labor1, labor2 });
  res.status(201).send('Job configuration saved successfully!');
});

app.get('/api/job-codes', (req, res) => {
  const jobCodes = jobConfigurations.map(config => config.jobCode);
  res.json(jobCodes);
});

app.get('/api/job-configurations/:jobCode', (req, res) => {
  const { jobCode } = req.params;
  const jobConfiguration = jobConfigurations.find(config => config.jobCode === jobCode);
  if (jobConfiguration) {
    res.json(jobConfiguration);
  } else {
    res.status(404).send('Job configuration not found');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});