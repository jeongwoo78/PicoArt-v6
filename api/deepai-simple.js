// DeepAI NST - Simple URL Version
// Uses image URLs instead of base64 for easier debugging

const fetch = require('node-fetch');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== DeepAI Simple URL Version ===');
    
    const { styleImageUrl, contentImageUrl, apiKey } = req.body;

    if (!apiKey || !styleImageUrl || !contentImageUrl) {
      return res.status(400).json({ 
        error: 'API key and both image URLs are required' 
      });
    }

    console.log('Style:', styleImageUrl);
    console.log('Content:', contentImageUrl);

    // Simple URL-encoded form body
    const params = new URLSearchParams();
    params.append('style', styleImageUrl);
    params.append('image', contentImageUrl);

    const deepaiResponse = await fetch(
      'https://api.deepai.org/api/neural-style',
      {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      }
    );

    const responseText = await deepaiResponse.text();
    console.log('Status:', deepaiResponse.status);
    console.log('Response:', responseText.substring(0, 200));

    if (!deepaiResponse.ok) {
      return res.status(deepaiResponse.status).json({ 
        error: 'DeepAI failed',
        details: responseText
      });
    }

    const result = JSON.parse(responseText);
    return res.status(200).json({
      success: true,
      outputUrl: result.output_url,
      id: result.id
    });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ 
      error: error.message
    });
  }
};
