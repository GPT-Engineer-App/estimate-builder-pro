import { fetchJobDetails } from '../../../api/preConfiguredJobs.js';

export default async function handler(req, res) {
  const { jobCode } = req.query;

  try {
    const jobDetails = await fetchJobDetails(jobCode);
    res.status(200).json(jobDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}