// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { generateRandomDataArray } from "@/randomData";

const handler = (req, res) => {
  try {
    // Generate and send data
    const data = generateRandomDataArray(10);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error generating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;

