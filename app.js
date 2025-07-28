require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API çağrısında hata:', error?.response?.data || error.message);
    res.status(500).send('OpenAI API çağrısında hata oluştu.');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Sunucu port ${PORT} üzerinde çalışıyor.`);
});
