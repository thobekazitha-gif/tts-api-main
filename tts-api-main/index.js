// index.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Your ElevenLabs API key will be stored in environment variables
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

// Replace EXAVITQu4vr4xnSDxMaL with your preferred voice ID from ElevenLabs
app.post("/api/tts", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          voice_settings: { stability: 0.3, similarity_boost: 0.8 },
        }),
      }
    );

    const audioBuffer = await response.arrayBuffer();
    res.set("Content-Type", "audio/mpeg");
    res.send(Buffer.from(audioBuffer));
  } catch (err) {
    res.status(500).json({ error: "Failed to generate audio", details: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ TTS API running on port ${port}`));
