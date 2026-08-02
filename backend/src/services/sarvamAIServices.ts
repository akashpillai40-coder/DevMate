
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
    apiSubscriptionKey: process.env.SARVAM_API_KEY
});

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

    }catch(error: any) {
        console.error('Sarvam rewrite error:', error.message)
    throw new Error('Failed to rewrite text')
    }
}

