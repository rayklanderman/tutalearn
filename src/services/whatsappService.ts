interface WhatsAppMessage {
  from: string;
  body: string;
  timestamp: string;
  type: "text" | "voice";
}

export class WhatsAppService {
  private accessToken: string;
  private phoneNumberId: string;
  private webhookVerifyToken = "tutalearn_webhook_verify";

  constructor() {
    this.accessToken = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN || "";
    this.phoneNumberId = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID || "";
  }

  // Method to send a message via WhatsApp Business API
  async sendMessage(to: string, message: string): Promise<boolean> {
    if (!this.accessToken || !this.phoneNumberId) {
      console.warn("WhatsApp credentials not configured");
      return false;
    }

    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: to,
            type: "text",
            text: {
              body: message,
            },
          }),
        }
      );

      return response.ok;
    } catch (error) {
      console.error("WhatsApp send error:", error);
      return false;
    }
  }

  // Method to handle incoming webhook messages
  handleIncomingMessage(webhookData: Record<string, unknown>): WhatsAppMessage | null {
    try {
      const entry = webhookData.entry as Array<{
        changes: Array<{
          value: {
            messages: Array<{
              from: string;
              text?: { body: string };
              type: string;
            }>;
          };
        }>;
      }>;
      
      const message = entry?.[0]?.changes?.[0]?.value?.messages?.[0];
      if (!message) return null;

      return {
        from: message.from,
        body: message.text?.body || "",
        timestamp: new Date().toISOString(),
        type: message.type === "text" ? "text" : "voice",
      };
    } catch (error) {
      console.error("Error parsing webhook data:", error);
      return null;
    }
  }

  // Method to verify webhook (for initial setup)
  verifyWebhook(mode: string, token: string, challenge: string): string | null {
    if (mode === "subscribe" && token === this.webhookVerifyToken) {
      return challenge;
    }
    return null;
  }

  // Method to format phone number (ensure it has country code)
  formatPhoneNumber(phoneNumber: string): string {
    // Remove any non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, "");

    // If it starts with 0, assume it's Kenyan and replace with 254
    if (cleaned.startsWith("0")) {
      return "254" + cleaned.substring(1);
    }

    // If it doesn't start with country code, assume Kenya
    if (!cleaned.startsWith("254") && cleaned.length === 9) {
      return "254" + cleaned;
    }

    return cleaned;
  }

  // Method to generate WhatsApp click-to-chat URL
  generateWhatsAppURL(phoneNumber: string, message?: string): string {
    const formatted = this.formatPhoneNumber(phoneNumber);
    const encodedMessage = message ? encodeURIComponent(message) : "";
    return `https://wa.me/${formatted}${
      encodedMessage ? `?text=${encodedMessage}` : ""
    }`;
  }

  // Method to check if WhatsApp Business API is configured
  isConfigured(): boolean {
    return !!(this.accessToken && this.phoneNumberId);
  }

  // Demo method to simulate WhatsApp interaction
  simulateWhatsAppResponse(question: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = [
          "Karibu! I received your question about '" +
            question +
            "'. Let me help you learn!",
          "Great question! In African context, we can explain this using examples from our daily life.",
          "Pole! Let me break this down for you using familiar examples like farming or market scenarios.",
        ];
        resolve(responses[Math.floor(Math.random() * responses.length)]);
      }, 1000); // Simulate network delay
    });
  }
}

// Export a singleton instance
export const whatsappService = new WhatsAppService();
