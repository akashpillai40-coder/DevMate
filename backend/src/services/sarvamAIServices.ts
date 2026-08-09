import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
  apiSubscriptionKey: process.env.SARVAM_API_KEY,
});

// --------------------------------------------------
// Rewrite Check-in Text
// --------------------------------------------------
export const rewriteText = async (text: string): Promise<string> => {
  try {
    const response = await client.chat.completions({
      model: "sarvam-105b",

      reasoning_effort: null as any,

      max_tokens: 500,

      messages: [
        {
          role: "user",
          content: `Fix grammar and spelling in this text. Keep the same tone and meaning. Return ONLY the corrected text, no explanation, no markdown:

${text}`,
        },
      ],
    });

    const correctedText = response.choices[0]?.message?.content;

    if (!correctedText) {
      console.dir(response, { depth: null });
      throw new Error("No response from Sarvam AI");
    }

    return correctedText.trim();

  } catch (error: any) {
    console.error("Sarvam rewrite error:", error);
    throw new Error("Failed to rewrite text");
  }
};
// --------------------------------------------------
// Generate Weekly Summary
// --------------------------------------------------

export const generateWeeklySummary = async (
  weeklyCheckIns: {
    date: Date;
    todayLog: string;
    tomorrowLog: string;
    leetCode: boolean;
    gitPush: boolean;
  }[]
): Promise<string> => {
  try {
    const logText = weeklyCheckIns
      .map(
        (c, i) =>
          `Day ${i + 1} (${c.date.toDateString()}):
Did: ${c.todayLog}
Planned: ${c.tomorrowLog}
LeetCode: ${c.leetCode ? "Yes" : "No"}
GitHub: ${c.gitPush ? "Yes" : "No"}`
      )
      .join("\n\n");

    const response = await client.chat.completions({
      model: "sarvam-105b",

      reasoning_effort: "low",

      max_tokens: 800,

      messages: [
        {
          role: "user",
          content: `Here are daily work logs from a developer's job search week.

${logText}

Summarize the week in 6-7 sentences — what they built, applications sent, LeetCode/GitHub consistency, and any notable patterns. Write in second person ("You did..."). Return ONLY the summary text, no markdown, no extra explanation.`,
        },
      ],
    });

    const summary = response.choices[0]?.message?.content;

    if (!summary) {
      console.log("Full Sarvam response:", response);
      throw new Error("No summary generated");
    }

    return summary.trim();
  } catch (error: any) {
    console.error("Sarvam summary error:", error);
    throw new Error("Failed to generate weekly summary");
  }
};