import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './GeminiAnalysis.css';

const FinancialChatbot = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Hello! I am SheWorks Financial AI. I can help you with information about starting a business or a startup. What specific guidance are you looking for today?",
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversationContext, setConversationContext] = useState({
        lastTopic: null,
        askedFollowUp: false,
        userDetails: {
            businessType: null,
            stage: null,
            specificConcerns: []
        },
        topicsDiscussed: [],
        hasGreeted: false // Track if the bot has greeted the user
    });
    const chatContainerRef = useRef(null);

    // Hardcoded API key (for development purposes only)
    const apiKey = "AIzaSyAFeZ8JNZ_WIG4tMzzXZ7lrCYNCJVMcpwk"; // Replace with your actual API key

    // Sample startup topics for quick selection
    const quickTopics = [
        "Business plan essentials",
        "Funding options",
        "Legal requirements",
        "Market research",
        "Financial projections"
    ];

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: input,
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Call to Gemini API with conversation context
            const response = await fetchGeminiResponse(input, conversationContext);

            // Update the conversation context based on the response
            if (response.context) {
                setConversationContext(prevContext => ({
                    ...prevContext,
                    ...response.context
                }));
            }

            setMessages(prev => [
                ...prev,
                {
                    id: prev.length + 1,
                    type: 'bot',
                    text: response.text,
                },
            ]);
        } catch (error) {
            console.error('Error fetching response:', error);
            setMessages(prev => [
                ...prev,
                {
                    id: prev.length + 1,
                    type: 'bot',
                    text: "I apologize, but I encountered an error. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const fetchGeminiResponse = async (userInput, context) => {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
        // Updated prompt to enforce strict point-to-point formatting
        const prompt = `
            You are SheWorks Financial AI, a financial advisor bot specialized in entrepreneurship and startups. 
            Your goal is to provide clear, engaging, and point-to-point advice on financial topics. 
            ${
                !context.hasGreeted
                    ? "Start your first response with: 'Hello! I am SheWorks Financial AI. Here's my advice for you:'"
                    : "Do not greet the user again. Provide the response directly."
            }
            
            Rules:
            1. Respond only to financial or business-related queries. If the topic is unrelated, politely decline.
            2. Use bullet points (with "-") for each point.
            3. Each point must start on a new line.
            4. Ensure there is a blank line between each point for better readability.
            5. Do not combine multiple points into a single line.
            6. Keep the tone professional yet engaging.
            7. Add interesting facts or tips to make the content eye-catching.
            8. If the user provides context (e.g., business type or stage), tailor your response accordingly.
    
            User's context: ${JSON.stringify(context)}
            User's input: ${userInput}
    
            Provide your response below:
        `;
    
        const result = await model.generateContent(prompt);
        let responseText = result.response.text();
    
        // Post-processing to enforce strict formatting
        responseText = responseText
            .replace(/\*\*(.*?)\*\*/g, "\n**$1**\n") // Add new lines around bold text
            .replace(/\*(.*?)\*/g, "\n*$1*\n") // Add new lines around italic text
            .replace(/- /g, "\n- ") // Ensure each bullet point starts on a new line
            .replace(/(\S)\n(\S)/g, "$1\n\n$2") // Add extra spacing between points
            .replace(/(\n-.*?)(?=\n-)/g, "$1\n"); // Ensure a blank line between points
    
        // Update the context to mark that the bot has greeted the user
        const updatedContext = {
            ...context,
            hasGreeted: true, // Mark that the bot has greeted the user
        };
    
        // Return the response text and updated context
        return { text: responseText, context: updatedContext };
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleQuickTopic = (topic) => {
        setInput(topic);
        // Optional: automatically send after selecting
        // setTimeout(() => handleSendMessage(), 100);
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h2>Financial Advisor Bot</h2>
                <p>Your guide to entrepreneurship & startups</p>
            </div>

            <div className="chat-container" ref={chatContainerRef}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
                    >
                        <div className="message-avatar">
                            {message.type === 'user' ? '👤' : '🤖'}
                        </div>
                        <div className="message-text">{message.text}</div>
                    </div>
                ))}
                {loading && (
                    <div className="message bot-message">
                        <div className="message-avatar">🤖</div>
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="quick-topics">
                <p>Popular topics:</p>
                <div className="topic-buttons">
                    {quickTopics.map((topic, index) => (
                        <button
                            key={index}
                            onClick={() => handleQuickTopic(topic)}
                            className="topic-button"
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about starting a business..."
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default FinancialChatbot;