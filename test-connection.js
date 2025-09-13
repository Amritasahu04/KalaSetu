// Test script to verify backend connectivity and OpenAI integration
const fetch = require('node-fetch');

async function testBackendConnection() {
  console.log('🧪 Testing backend connectivity...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:3000/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    // Test simple POST endpoint
    console.log('\n2. Testing POST endpoint...');
    const testResponse = await fetch('http://localhost:3000/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello from test script!' })
    });
    const testData = await testResponse.json();
    console.log('✅ Test endpoint:', testData);

    // Test upload-product endpoint (without files for now)
    console.log('\n3. Testing upload-product endpoint (validation)...');
    const uploadResponse = await fetch('http://localhost:3000/api/products/upload-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Product',
        description: 'A test product for connectivity',
        category: 'Pottery'
      })
    });
    const uploadData = await uploadResponse.json();
    console.log('📤 Upload response:', uploadData);

    console.log('\n🎉 All connectivity tests passed!');

  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure the backend server is running: npm run dev');
    console.log('2. Check if port 3000 is available');
    console.log('3. Verify CORS settings in backend');
    console.log('4. Check OpenAI API key in .env file');
  }
}

// Test OpenAI directly (if available)
async function testOpenAI() {
  console.log('\n🤖 Testing OpenAI integration...');

  try {
    const OpenAI = require('openai');
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Say hello in one word.' }],
      max_tokens: 10
    });

    console.log('✅ OpenAI test successful:', completion.choices[0].message.content.trim());

  } catch (error) {
    console.error('❌ OpenAI test failed:', error.message);
    console.log('💡 Make sure OPENAI_API_KEY is set in your .env file');
  }
}

// Run tests
async function runTests() {
  await testBackendConnection();
  await testOpenAI();
}

runTests();
