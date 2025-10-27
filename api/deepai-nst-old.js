// DeepAI Neural Style Transfer API
// This runs on Vercel serverless - NO CORS issues!

module.exports = async (req, res) => {
  // ✅ CORS headers - allow browser requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== DeepAI NST API Called ===');
    
    const { styleImageUrl, contentImage, apiKey } = req.body;

    // Validate inputs
    if (!apiKey) {
      console.error('❌ API key missing');
      return res.status(400).json({ 
        error: 'DeepAI API key is required',
        hint: 'Get free key at https://deepai.org/machine-learning-model/neural-style'
      });
    }

    if (!styleImageUrl || !contentImage) {
      console.error('❌ Missing required images');
      return res.status(400).json({ 
        error: 'Both style image URL and content image are required' 
      });
    }

    console.log('📸 Style Image:', styleImageUrl);
    console.log('📸 Content Image length:', contentImage.length);

    // Prepare form data for DeepAI
    // DeepAI expects multipart/form-data
    const FormData = require('form-data');
    const form = new FormData();
    
    // Add style image (URL)
    form.append('style', styleImageUrl);
    
    // Add content image (base64 data URL)
    form.append('content', contentImage);

    console.log('🎨 Calling DeepAI Neural Style Transfer...');

    // ✅ Server-to-server request - NO CORS!
    // Use node-fetch which is compatible with form-data
    const fetch = require('node-fetch');
    
    const deepaiResponse = await fetch(
      'https://api.deepai.org/api/neural-style',
      {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          ...form.getHeaders()
        },
        body: form
      }
    );

    console.log('📡 DeepAI Response Status:', deepaiResponse.status);

    if (!deepaiResponse.ok) {
      const errorText = await deepaiResponse.text();
      console.error('❌ DeepAI Error Response:', errorText);
      
      return res.status(deepaiResponse.status).json({ 
        error: 'DeepAI API request failed',
        status: deepaiResponse.status,
        details: errorText
      });
    }

    const result = await deepaiResponse.json();
    
    console.log('✅ DeepAI Success!');
    console.log('   ID:', result.id);
    console.log('   Output URL:', result.output_url);

    // Return success response
    return res.status(200).json({
      success: true,
      outputUrl: result.output_url,
      id: result.id
    });

  } catch (error) {
    console.error('💥 Server Error:', error.message);
    console.error('Stack:', error.stack);
    
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      hint: 'Check Vercel logs for details'
    });
  }
};
