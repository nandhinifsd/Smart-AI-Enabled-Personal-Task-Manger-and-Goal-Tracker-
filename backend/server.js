
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Groq = require("groq-sdk");

const app = express();

const PORT = 5000;

// Create Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());


// ------------------------------------
// Test route
// ------------------------------------
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend is running successfully",
  });
});


// ------------------------------------
// Groq API route
// ------------------------------------
app.post("/api/groq", async (req, res) => {
  try {

    // Receive aiForm from React
    const { aiForm } = req.body || {};

    console.log("AI form received:", aiForm);

    // Check whether aiForm was received
    if (!aiForm) {
      return res.status(400).json({
        error: "AI form data is required",
      });
    }


    // ------------------------------------
    // Create the AI prompt
    // ------------------------------------
    const prompt = `
Create tasks for the following goal:

Goal: ${aiForm.goalName}
Category: ${aiForm.category}
Duration: ${aiForm.duration} days
Daily available time: ${aiForm.dailyTime}
Difficulty: ${aiForm.difficulty}

Return only valid JSON.

Return the result using exactly this JSON structure:

{
  "tasks": [
    {
      "day": 1,
      "task": 1,
      "taskName": "Task name",
      "description": {
        "whatToDo": "Instructions in 7-10 words",
        "quickTips": "Provide quick tips",
        "learningLinks": [
          "https://example.com"
        ]
      },
      "priority": "Low"
    }
  ]
}

Rules:

- "day" must be a number.
- "task" must be a number.
- "taskName" must be a short task name.
- "whatToDo" must contain 7-10 words.
- "quickTips" should contain practical tips.
- "learningLinks" must be an array of useful learning URLs.
- "priority" must be one of: Low, Medium, High.
- Create practical and achievable tasks for the given duration.
- Make the schedule practical and achievable within the user's available daily time.
- Do not return Markdown.
- Do not return code fences.
- Do not add any text before or after the JSON.
`;


    // ------------------------------------
    // Send prompt to Groq
    // ------------------------------------
    const completion = await groq.chat.completions.create({

      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",
          content: `
You are an AI task planner.

Help users break their goals into practical,
achievable tasks.

Make the schedule practical and achievable
within the given duration.

You MUST return valid JSON.

Do not return Markdown.
Do not return code fences.
Do not add any text before or after the JSON.
`,
        },

        {
          role: "user",
          content: prompt,
        },
      ],
    });


    // ------------------------------------
    // Get AI response
    // ------------------------------------
    const content = completion.choices[0].message.content;

    console.log("Groq response:", content);


    // ------------------------------------
    // Send response back to React
    // ------------------------------------
    res.json({
      response: content,
    });


  } catch (error) {

    console.error("Groq API error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// ------------------------------------
// Start server
// ------------------------------------
/*app.listen(PORT, () => {

  console.log(
    `Backend running at http://localhost:${PORT}`
  );

  console.log(
    "Groq API key loaded:",
    !!process.env.GROQ_API_KEY
  );
});*/
module.exports = app;
