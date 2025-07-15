interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface AskTutaRequest {
  question: string;
  language: "en" | "sw";
  context?: {
    subject?: string;
    gradeLevel?: number;
    previousMessages?: string[];
  };
}

export class GroqService {
  private apiKey: string;
  private baseUrl = "https://api.groq.com/openai/v1/chat/completions";

  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY || "";
  }

  async askTuta(request: AskTutaRequest): Promise<string> {
    if (!this.apiKey) {
      throw new Error("Groq API key not configured");
    }

    const systemPrompt = this.buildSystemPrompt(
      request.language,
      request.context
    );

    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-70b-versatile",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: request.question,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data: GroqResponse = await response.json();
      return (
        data.choices[0]?.message?.content ||
        "Sorry, I could not generate a response."
      );
    } catch (error) {
      console.error("Groq API error:", error);
      return this.getFallbackResponse(request.question, request.language);
    }
  }

  private buildSystemPrompt(
    language: "en" | "sw",
    context?: AskTutaRequest["context"]
  ): string {
    const basePrompt =
      language === "sw"
        ? `Wewe ni Tuta, mwalimu mzuri wa kielektroniki anayesaidia wanafunzi wa Afrika. Jibu maswali kwa kutumia mifano ya mazingira ya Afrika (kama vile mahindi, ugali, wanyamapori wa Afrika). Jibu kwa Kiswahili rahisi. Hakikisha majibu yako ni mafupi (chini ya sentensi 4) na rahisi kuelewa.`
        : `You are Tuta, a friendly AI tutor specializing in African education. Answer questions using African contexts and examples (like maize farming, ugali, African wildlife, local markets). Keep responses under 4 sentences and use simple language appropriate for African students.`;

    let contextPrompt = "";
    if (context?.subject) {
      contextPrompt +=
        language === "sw"
          ? ` Swali ni kuhusu ${context.subject}.`
          : ` The question is about ${context.subject}.`;
    }

    if (context?.gradeLevel) {
      contextPrompt +=
        language === "sw"
          ? ` Mwanafunzi yu darasa la ${context.gradeLevel}.`
          : ` The student is in grade ${context.gradeLevel}.`;
    }

    return basePrompt + contextPrompt;
  }

  private getFallbackResponse(
    _question: string,
    language: "en" | "sw"
  ): string {
    const fallbacks = {
      en: [
        "I'm having trouble connecting right now, but I'd love to help! Try asking about math, science, or any school subject using examples from your daily life.",
        "Let me think about that... For now, try breaking your question into smaller parts or ask about something specific like fractions or plant growth.",
        "That's a great question! While I get my thoughts together, maybe try asking a math problem using shillings or a science question about African animals.",
      ],
      sw: [
        "Nina tatizo la muunganisho sasa, lakini ningependa kusaidia! Jaribu kuuliza kuhusu hesabu, sayansi, au masomo mengine kwa kutumia mifano ya maisha yako ya kila siku.",
        "Acha nifikiria... Kwa sasa, jaribu kugawanya swali lako katika sehemu ndogo au uliza kitu maalum kama vipande au ukuaji wa mimea.",
        "Hilo ni swali zuri sana! Wakati napata mawazo yangu, labda jaribu kuuliza tatizo la hesabu kwa kutumia shilingi au swali la sayansi kuhusu wanyamapori wa Afrika.",
      ],
    };

    const responses = fallbacks[language];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Method to generate culturally relevant examples
  generateLocalExample(topic: string, language: "en" | "sw"): string {
    const examples = {
      fractions: {
        en: "Think of cutting a chapati into 4 equal pieces. If you eat 1 piece, you've eaten 1/4 of the chapati.",
        sw: "Fikiria ukigawanya chapati katika vipande 4 sawa. Ukila kipande 1, umekula 1/4 ya chapati.",
      },
      photosynthesis: {
        en: "Like how a baobab tree uses sunlight, water, and air to make its own food - just like cooking ugali but the tree does it naturally!",
        sw: "Kama jinsi mti wa mbuyu unavyotumia jua, maji, na hewa kutengeneza chakula chake - kama kupika ugali lakini mti hufanya hivi kwa asili!",
      },
      multiplication: {
        en: "If one basket holds 12 mangoes and you have 3 baskets, you have 12 × 3 = 36 mangoes total.",
        sw: "Ikiwa kikapu kimoja kina maembe 12 na una vikapu 3, una maembe 12 × 3 = 36 jumla.",
      },
    };

    return examples[topic as keyof typeof examples]?.[language] || "";
  }
}

// Export a singleton instance
export const groqService = new GroqService();
