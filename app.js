// app.js
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API çağrısında hata:', error.response ? error.response.data : error.message);
    res.status(500).send('OpenAI API çağrısında hata oluştu.');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Sunucu port ${PORT} üzerinde çalışıyor.`);
});
