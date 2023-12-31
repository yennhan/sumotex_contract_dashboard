// Import fetch from node-fetch or axios if you prefer
import axios from 'axios';

export default async function handler(req, res) {
  const url = 'https://rpc.sumotex.co/create-wallet';

  try {
    const apiRes = await axios.post(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as required by the external API
      },
      body: JSON.stringify(req.body), // Forward the request body
    });

    // Check if the response from the external API is ok
    if (!apiRes.ok) {
      throw new Error(`API responded with status code ${apiRes.status}`);
    }

    // Parse the response data
    const data = await apiRes.json();

    // Send back the data to the client
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in proxy endpoint:', error);
    res.status(500).json({ message: error.message });
  }
}
