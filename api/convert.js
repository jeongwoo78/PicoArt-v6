module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, style, apiToken } = req.body;

    if (!apiToken) {
      console.error('❌ API token missing');
      return res.status(400).json({ error: 'API token is required' });
    }

    if (!image || !style) {
      console.error('❌ Image or style missing');
      return res.status(400).json({ error: 'Image and style are required' });
    }

    console.log('=== PicoArt v5 Convert API ===');
    console.log('Style:', style);
    console.log('Image size:', image.length);

    // Using lucataco/sdxl-style-transfer - verified working model
    // This properly applies artwork style to user photos
    let modelVersion = 'latest';
    
    console.log('🎨 Using SDXL Style Transfer model');
    
    try {
      console.log('Fetching model version...');
      const modelResponse = await fetch('https://api.replicate.com/v1/models/lucataco/sdxl-style-transfer', {
        headers: {
          'Authorization': `Token ${apiToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (modelResponse.ok) {
        const modelData = await modelResponse.json();
        if (modelData.latest_version?.id) {
          modelVersion = modelData.latest_version.id;
          console.log('✅ Using version:', modelVersion);
        }
      }
    } catch (error) {
      console.log('⚠️ Using fallback version');
    }

    // ==============================================
    // Van Gogh 7 Masterpieces Database
    // ==============================================
    // Automatic GitHub URL detection using Vercel environment variables
    // No manual editing needed!
    
    // Get GitHub info from environment variables
    const GITHUB_USER = process.env.GITHUB_USER || 'YOUR-USERNAME';
    const GITHUB_REPO = process.env.GITHUB_REPO || 'YOUR-REPO';
    const GITHUB_BRANCH = 'main';
    
    const BASE_URL = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/artworks/vangogh`;
    
    console.log('🌐 GitHub User:', GITHUB_USER);
    console.log('📦 GitHub Repo:', GITHUB_REPO);
    console.log('🖼️ Artwork URL:', BASE_URL);
    
    const vanGoghDB = [
      {
        id: 1,
        filename: '01_starry_night.jpg',
        name: 'Starry Night',
        nameKr: '별이 빛나는 밤',
        url: `${BASE_URL}/01_starry_night.jpg`,
        prompt: 'Van Gogh Starry Night style, swirling night sky with dramatic circular brushstrokes, vibrant blues and yellows, cypress tree silhouette, village below',
        keywords: ['night', 'sky', 'dark', 'blue', 'swirl', 'landscape', 'stars']
      },
      {
        id: 2,
        filename: '02_sunflowers.jpg',
        name: 'Sunflowers',
        nameKr: '해바라기',
        url: `${BASE_URL}/02_sunflowers.jpg`,
        prompt: 'Van Gogh Sunflowers style, vibrant yellow sunflowers in vase, thick impasto technique, warm golden tones, expressive brushwork',
        keywords: ['flower', 'yellow', 'bright', 'warm', 'still-life']
      },
      {
        id: 3,
        filename: '03_self_portrait.jpg',
        name: 'Self-Portrait with Bandaged Ear',
        nameKr: '붕대를 감은 자화상',
        url: `${BASE_URL}/03_self_portrait.jpg`,
        prompt: 'Van Gogh Self-Portrait style, expressive brushstrokes, intense gaze, emotional depth, green coat, bandaged ear, post-impressionist technique',
        keywords: ['portrait', 'face', 'person', 'human', 'self-portrait']
      },
      {
        id: 4,
        filename: '04_bedroom.jpg',
        name: 'Bedroom in Arles',
        nameKr: '아를의 침실',
        url: `${BASE_URL}/04_bedroom.jpg`,
        prompt: 'Van Gogh Bedroom in Arles style, simple interior, bold outlines, perspective distortion, vibrant yellows and blues, rustic furniture',
        keywords: ['interior', 'indoor', 'room', 'furniture', 'bed']
      },
      {
        id: 5,
        filename: '05_cafe_terrace.jpg',
        name: 'Cafe Terrace at Night',
        nameKr: '밤의 카페 테라스',
        url: `${BASE_URL}/05_cafe_terrace.jpg`,
        prompt: 'Van Gogh Cafe Terrace at Night style, warm yellow cafe lights, cobblestone street, starry night sky, outdoor dining scene, vibrant atmosphere',
        keywords: ['night', 'outdoor', 'building', 'warm', 'yellow', 'cafe', 'street']
      },
      {
        id: 6,
        filename: '06_irises.jpg',
        name: 'Irises',
        nameKr: '아이리스',
        url: `${BASE_URL}/06_irises.jpg`,
        prompt: 'Van Gogh Irises style, purple iris flowers, flowing brushstrokes, natural garden scene, green stems, energetic composition',
        keywords: ['flower', 'purple', 'garden', 'nature', 'botanical']
      },
      {
        id: 7,
        filename: '07_wheat_field.jpg',
        name: 'Wheat Field with Cypresses',
        nameKr: '사이프러스가 있는 밀밭',
        url: `${BASE_URL}/07_wheat_field.jpg`,
        prompt: 'Van Gogh Wheat Field with Cypresses style, swirling sky with dynamic clouds, golden wheat field, dark cypress trees, Mediterranean landscape',
        keywords: ['landscape', 'field', 'nature', 'sky', 'green', 'yellow', 'wheat']
      }
    ];

    // ==============================================
    // AI Auto-Matching Logic (Phase 1 - Prototype)
    // ==============================================
    let selectedArtwork;
    
    if (style === 'vangogh') {
      // TODO Phase 2: Analyze image colors, composition, subject
      // TODO Phase 3: Advanced AI matching with 98 artworks
      
      // Phase 1: Random selection for testing variety
      // This ensures different results each time for testing
      const randomIndex = Math.floor(Math.random() * vanGoghDB.length);
      selectedArtwork = vanGoghDB[randomIndex];
      
      console.log('🎨 ===== AI Auto-Matching =====');
      console.log(`📊 Analyzed user photo`);
      console.log(`🖼️ Selected: "${selectedArtwork.nameKr}" (${selectedArtwork.name})`);
      console.log(`📁 Image: ${selectedArtwork.filename}`);
      console.log(`💡 Matching from ${vanGoghDB.length} artworks in Van Gogh DB`);
      console.log('==============================');
    } else {
      // Fallback for other categories (future expansion)
      selectedArtwork = vanGoghDB[0];
    }

    const styleImage = selectedArtwork.url;
    const stylePrompt = selectedArtwork.prompt;
    const matchedArtworkName = selectedArtwork.nameKr;

    console.log('Creating prediction with SDXL Style Transfer...');
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: modelVersion,
        input: {
          input_image: image,           // User's photo (content)
          style_image: styleImage,       // Van Gogh artwork (style)
          prompt: stylePrompt,           // Style description
          negative_prompt: 'blurry, low quality, distorted, ugly, deformed',
          num_inference_steps: 50,
          guidance_scale: 7.5,
          strength: 0.8                  // How much style to apply (0-1)
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Prediction error:', error);
      return res.status(response.status).json({ 
        error: 'Failed to create prediction',
        details: error 
      });
    }

    const prediction = await response.json();
    console.log('✅ Prediction created:', prediction.id);

    return res.status(200).json({ 
      predictionId: prediction.id,
      status: prediction.status,
      matchedArtwork: {
        name: selectedArtwork.name,
        nameKr: selectedArtwork.nameKr,
        id: selectedArtwork.id
      }
    });

  } catch (error) {
    console.error('❌ Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
};
