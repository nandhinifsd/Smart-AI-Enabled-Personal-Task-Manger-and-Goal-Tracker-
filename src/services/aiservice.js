
export async function generateTasks(aiForm) {
  console.log("Data received by AI service:", aiForm);

  const response = await fetch("https://smart-ai-enabled-personal-task-mang.vercel.app/api/groq", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      aiForm: aiForm,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate tasks");
  }

  console.log("AI response:", data.response);

  return JSON.parse(data.response);
}

