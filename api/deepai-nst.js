// DeepAI Neural Style Transfer API - v2 (Fixed)
// Properly handles FormData with node-fetch

const FormData = require('form-data');
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // CORS headers
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
    console.log('=== DeepAI NST API v2 Called ===');
    
    const { styleImageUrl, contentImage, apiKey } = req.body;

    // Validate inputs
    if (!apiKey) {
      console.error('❌ API key missing');
      return res.status(400).json({ 
        error: 'DeepAI API key is required',
        hint: 'Get your API key from https://deepai.org/dashboard/profile'
      });
    }

    if (!styleImageUrl || !contentImage) {
      console.error('❌ Missing required images');
      return res.status(400).json({ 
        error: 'Both style image URL and content image are required' 
      });
    }

    console.log('📸 Style Image URL:', styleImageUrl);
    console.log('📸 Content Image type:', contentImage.substring(0, 30) + '...');
    console.log('🔑 API Key prefix:', apiKey.substring(0, 10) + '...');

    // Create FormData
    const form = new FormData();
    
    // DeepAI accepts:
    // - 'style': URL or base64 of style image
    // - 'image': URL or base64 of content image (NOT 'content')
    
    form.append('style', styleImageUrl);
    form.append('image', contentImage);  // Changed from 'content' to 'image'

    console.log('🎨 Calling DeepAI Neural Style Transfer...');
    console.log('   Endpoint: https://api.deepai.org/api/neural-style');

    // Make request to DeepAI
    const deepaiResponse = await fetch(
      'https://api.deepai.org/api/neural-style',
      {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          ...form.getHeaders()  // This adds Content-Type: multipart/form-data
        },
        body: form
      }
    );

    console.log('📡 DeepAI Response Status:', deepaiResponse.status);
    console.log('📡 Response Headers:', JSON.stringify(deepaiResponse.headers.raw()));

    // Get response text first for better error handling
    const responseText = await deepaiResponse.text();
    console.log('📡 Response Body:', responseText.substring(0, 200));

    if (!deepaiResponse.ok) {
      console.error('❌ DeepAI Error Response:', responseText);
      
      // Try to parse as JSON for better error message
      let errorDetails = responseText;
      try {
        const errorJson = JSON.parse(responseText);
        errorDetails = errorJson.err || errorJson.error || responseText;
      } catch (e) {
        // Not JSON, use raw text
      }
      
      return res.status(deepaiResponse.status).json({ 
        error: 'DeepAI API request failed',
        status: deepaiResponse.status,
        details: errorDetails,
        hint: 'Check your API key and image formats'
      });
    }

    // Parse successful response
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Failed to parse response as JSON');
      return res.status(500).json({
        error: 'Invalid response from DeepAI',
        details: responseText.substring(0, 200)
      });
    }
    
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
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      hint: 'Check Vercel Function logs for details'
    });
  }
};
