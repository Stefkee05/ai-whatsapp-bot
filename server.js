import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

app.post("/whatsapp", async (req, res) => {
  const msg = req.body.Body;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Ti si AI recepcioner za mali biznis. Odgovaraš kratko i ljubazno."
      },
      {
        role: "user",
        content: msg
      }
    ]
  });

  res.send(`
    <Response>
      <Message>${completion.choices[0].message.content}</Message>
    </Response>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Bot radi"));

