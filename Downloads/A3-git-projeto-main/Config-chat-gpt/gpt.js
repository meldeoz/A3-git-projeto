// Configurando dotenv
require("dotenv").config();
const PSIC_API_KEY = process.env.PSIC_API_KEY;
console.log(PSIC_API_KEY)

const express = require('express');
const ajuda = express();

const port = 3000;

const cors = require("cors");
ajuda.use(cors());
ajuda.options('*', cors());

// OPENAI
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: PSIC_API_KEY });

ajuda.post("/pergunte-ao-psicologo", async (req, res) => {
  const completion = await openai.createChatCompletion({
    messages: [{ role: "user", content: req.body.prompt }],
    model: "gpt-3.5-turbo",
    max_tokens: 200,
  });
  console.log(completion);
  res.send(completion.data.choices[0].message.content);
});

