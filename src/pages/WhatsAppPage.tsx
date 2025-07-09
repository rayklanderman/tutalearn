import { useState } from "react";
import { MessageCircle, Send, Phone, Globe, Zap } from "lucide-react";

export function WhatsAppPage() {
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // Mock chat history
  const [chatHistory] = useState([
    {
      id: "1",
      message: "Hello Tuta! Can you help me understand fractions?",
      response:
        "Karibu! Of course I can help! Let me explain fractions using ugali. If you cut ugali into 4 equal pieces and eat 1 piece, you have eaten 1/4 (one quarter) of the ugali. What would you like to know about fractions?",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "2",
      message: "How do plants make food?",
      response:
        "Great question! Plants make their own food through photosynthesis - like how a baobab tree uses sunlight, water from rain, and carbon dioxide from air. The green leaves act like a kitchen, mixing these ingredients with sunlight to make sugar (food). This is why leaves are green - they have chlorophyll which captures sunlight!",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Simulate sending message via WhatsApp
    alert(`Message would be sent via WhatsApp: "${message}"`);
    setMessage("");
  };

  const handleConnectWhatsApp = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Ask Tuta via WhatsApp
            </h1>
            <p className="text-gray-600">
              Get instant AI-powered help with your studies through WhatsApp
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`h-3 w-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-gray-400"
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {isConnected ? "Connected" : "Not Connected"}
            </span>
          </div>
        </div>
      </div>

      {/* Connection Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            WhatsApp Connection
          </h2>

          <div className="space-y-4">
            <div className="flex items-center p-4 border border-gray-200 rounded-lg">
              <Phone className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <p className="font-medium text-gray-900">TutaLearn WhatsApp</p>
                <p className="text-sm text-gray-600">+254 700 000 000</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">
                How to Connect:
              </h3>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Save our WhatsApp number: +254 700 000 000</li>
                <li>2. Send "Hello" to start chatting with Tuta</li>
                <li>3. Ask any educational question in English or Swahili</li>
                <li>4. Get instant, contextual responses!</li>
              </ol>
            </div>

            <button
              onClick={handleConnectWhatsApp}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-lg transition-colors ${
                isConnected
                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {isConnected ? "Disconnect WhatsApp" : "Connect WhatsApp"}
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            WhatsApp Features
          </h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <Zap className="h-5 w-5 text-yellow-500 mr-3 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Instant Responses</p>
                <p className="text-sm text-gray-600">
                  Get immediate help from AI tutor Tuta
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Globe className="h-5 w-5 text-blue-500 mr-3 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Bilingual Support</p>
                <p className="text-sm text-gray-600">
                  Ask questions in English or Swahili
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <MessageCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Voice Messages</p>
                <p className="text-sm text-gray-600">
                  Send voice notes for better accessibility
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-5 w-5 text-purple-500 mr-3 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Offline Queue</p>
                <p className="text-sm text-gray-600">
                  Messages sync when you're back online
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent WhatsApp Conversations
        </h2>

        <div className="space-y-4">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{chat.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    You • {new Date(chat.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 ml-6">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{chat.response}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Tuta • {new Date(chat.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {chatHistory.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No conversations yet. Start chatting with Tuta on WhatsApp!
            </p>
          </div>
        )}
      </div>

      {/* Quick Message */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Send Quick Message
        </h2>

        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Type your question here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          This will redirect to WhatsApp with your pre-filled message
        </p>
      </div>
    </div>
  );
}
