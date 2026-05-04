export async function askTeacher(question: string) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: question }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Oops! I'm a bit tired right now. Can we talk again in a moment? 🌟";
  }
}
