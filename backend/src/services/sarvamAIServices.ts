
import { SarvamAIClient } from "sarvamai";


const client = new SarvamAIClient({
    apiSubscriptionKey: process.env.SARVAM_API_KEY
});
    //---------Rewrite Logs
export const rewriteText = async(text: String) => {
    try{
        const response = await client.chat.completions({
        model: "sarvam-105b",
        messages: [
               { role: "user", 
                 content: `Fix grammar and spelling in this text. Keep the same tone and meaning. Return ONLY the corrected text, no explanation, no markdown:\n\n${text}` 
               }
                  ]
          });

            const correctedText = response.choices[0]?.message?.content

    if (!correctedText) {
      throw new Error('No response from Sarvam AI')
    }
    return correctedText.trim()
    }catch(error: any) {
        console.error('Sarvam rewrite error:', error.message)
    throw new Error('Failed to rewrite text')
    }
}


//---------Week Summary
export const generateWeeklySummary = async(weeklyCheckIns: {
   date: Date
   todayLog: string
   tomorrowLog: string
   leetCode: boolean
   gitPush: boolean
}[]): Promise<string> => {
     try {
    const logText = weeklyCheckIns.map((c, i) => 
      `Day ${i + 1} (${c.date.toDateString()}):\nDid: ${c.todayLog}\nPlanned: ${c.tomorrowLog}\nLeetCode: ${c.leetCode ? 'Yes' : 'No'}, GitHub: ${c.gitPush ? 'Yes' : 'No'}`
    ).join('\n\n')

    const response = await client.chat.completions({
      model: "sarvam-105b",
      messages: [
        {
          role: "user",
          content: `Here are daily work logs from a developer's job search week.
${logText}

Summarize the week in 6-7 sentences — what they built, applications sent, LeetCode/GitHub consistency, and any notable patterns. Write in second person ("You did..."). Return ONLY the summary text, no markdown, no extra explanation.`
        }
      ]
    })

    const summary = response.choices[0]?.message?.content

    if (!summary) {
      throw new Error('No summary generated')
    }

    return summary.trim()
  } catch (error: any) {
    console.error('Sarvam summary error:', error.message)
    throw new Error('Failed to generate weekly summary')
  }
}


