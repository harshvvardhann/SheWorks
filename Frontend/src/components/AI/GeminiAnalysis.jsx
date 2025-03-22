import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GeminiAnalysis.css';

// Note: In production, you should use environment variables instead
const GEMINI_API_KEY = 'AIzaSyAFeZ8JNZ_WIG4tMzzXZ7lrCYNCJVMcpwk';
const GeminiAnalysis = () => {
    const { investorName } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [conversations, setConversations] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [investorData, setInvestorData] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Fetch investor data on mount
    useEffect(() => {
        // Simulated investor data fetch - in production replace with real API call
        fetchInvestorData();

        // Show the welcome message
        const welcomeMessage = {
            type: 'system',
            content: `Welcome to the AI Investment Analysis for ${investorName}! Ask any questions about ${investorName}'s investment strategy, portfolio performance, or market insights. The Gemini AI will analyze and provide detailed answers based on the available data.`,
            timestamp: new Date(),
        };
        setConversations([welcomeMessage]);

        // Focus on input field
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Scroll to the bottom of messages whenever conversations update
    useEffect(() => {
        scrollToBottom();
    }, [conversations]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Simulated data fetch function - replace with real API call in production
    const fetchInvestorData = () => {
        setTimeout(() => {
            setInvestorData({
                name: investorName,
                sectors: ['Technology', 'Healthcare', 'Renewable Energy', 'Finance', 'Consumer Goods'],
                performance: {
                    annualizedReturn: '18.7%',
                    sharpeRatio: 1.8,
                    maxDrawdown: '-12.3%',
                    volatility: '14.2%',
                },
                topHoldings: [
                    { name: 'AAPL', percentage: 8.5 },
                    { name: 'MSFT', percentage: 7.2 },
                    { name: 'AMZN', percentage: 6.3 },
                    { name: 'NVDA', percentage: 5.8 },
                    { name: 'GOOGL', percentage: 5.2 },
                ],
                riskProfile: 'Moderate-Aggressive',
                investmentHorizon: 'Long-term (5-10 years)',
            });
        }, 1000);
    };

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleBack = () => {
        navigate(-1);
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Display suggested questions
    const suggestedQuestions = [
        "What's the investment strategy?",
        'How has the portfolio performed?',
        'What are the top holdings?',
        'How is risk managed?',
        "What's the market outlook?",
    ];

    const handleSuggestedQuestion = (question) => {
        setPrompt(question);
        setTimeout(() => {
            handleSubmit({ preventDefault: () => {} });
        }, 100);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!prompt.trim()) return;

        // Add the user message to the conversation
        const userMessage = {
            type: 'user',
            content: prompt.trim(),
            timestamp: new Date(),
        };

        setConversations((prev) => [...prev, userMessage]);
        setLoading(true);
        setPrompt('');

        try {
            // Now we'll actually call the Gemini API
            await callGeminiAPI(userMessage.content);
        } catch (err) {
            console.error('Error generating response:', err);
            const errorMessage = {
                type: 'error',
                content: 'Sorry, I encountered an error processing your request. Please try again.',
                timestamp: new Date(),
            };
            setConversations((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    // Function to call the Gemini API
    const callGeminiAPI = async (userPrompt) => {
        setIsTyping(true);

        // Create a typing message first
        const typingMessage = {
            type: 'ai',
            content: '',
            timestamp: new Date(),
            isTyping: true,
        };

        setConversations((prev) => [...prev, typingMessage]);

        try {
            // Prepare context with investor data
            const investorContext = investorData
                ? `Information about ${investorName}'s portfolio:
                - Sectors: ${investorData.sectors.join(', ')}
                - Performance: Annual return ${investorData.performance.annualizedReturn}, Sharpe ratio ${
                      investorData.performance.sharpeRatio
                  }
                - Risk profile: ${investorData.riskProfile}
                - Investment horizon: ${investorData.investmentHorizon}
                - Top holdings: ${investorData.topHoldings.map((h) => `${h.name} (${h.percentage}%)`).join(', ')}`
                : `Limited information available about ${investorName}.`;

            // Prepare the full prompt with investor context
            const fullPrompt = `You are an AI investment advisor assistant providing information about investor ${investorName}. 
                
            ${investorContext}
                
            Based on this information, please answer the following question:
            ${userPrompt}`;

            // Call Gemini API
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: fullPrompt,
                                    },
                                ],
                            },
                        ],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 800,
                        },
                    }),
                }
            );

            const data = await response.json();

            // Handle potential error responses
            if (!response.ok) {
                throw new Error(`API error: ${data.error?.message || 'Unknown error'}`);
            }

            // Extract the text from the response
            let responseText = '';
            if (
                data.candidates &&
                data.candidates.length > 0 &&
                data.candidates[0].content &&
                data.candidates[0].content.parts &&
                data.candidates[0].content.parts.length > 0
            ) {
                responseText = data.candidates[0].content.parts[0].text;
            } else {
                responseText = "I couldn't generate a response. Please try again.";
            }

            // Simulate typing effect for better UX
            let displayText = '';
            const fullText = responseText;
            let i = 0;

            const typingInterval = setInterval(() => {
                if (i < fullText.length) {
                    displayText += fullText.charAt(i);
                    i++;

                    setConversations((prev) => {
                        const newConversations = [...prev];
                        const typingIndex = newConversations.findIndex((msg) => msg.isTyping);
                        if (typingIndex !== -1) {
                            newConversations[typingIndex].content = displayText;
                        }
                        return newConversations;
                    });
                } else {
                    clearInterval(typingInterval);
                    setIsTyping(false);

                    // Mark the message as completed
                    setConversations((prev) => {
                        const newConversations = [...prev];
                        const typingIndex = newConversations.findIndex((msg) => msg.isTyping);
                        if (typingIndex !== -1) {
                            newConversations[typingIndex].isTyping = false;
                        }
                        return newConversations;
                    });
                }
            }, 15);
        } catch (error) {
            console.error('Error calling Gemini API:', error);

            // Update the typing message to show the error
            setConversations((prev) => {
                const newConversations = [...prev];
                const typingIndex = newConversations.findIndex((msg) => msg.isTyping);
                if (typingIndex !== -1) {
                    newConversations[typingIndex] = {
                        type: 'error',
                        content: `Error calling Gemini API: ${error.message}`,
                        timestamp: new Date(),
                        isTyping: false,
                    };
                }
                return newConversations;
            });

            setIsTyping(false);
        }
    };

    // Function to format timestamps
    const formatTime = (timestamp) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(timestamp);
    };

    return (
        <div className="gemini-analysis">
            <div className="header">
                <button className="back-button" onClick={handleBack}>
                    <span className="back-arrow">←</span> Back to Leaderboard
                </button>
                <h1 className="investor-name">{investorName}</h1>
                <div className="gemini-badge">
                    <span className="gemini-icon">✦</span> Powered by Gemini AI
                </div>
            </div>

            {investorData && (
                <div className="investor-summary">
                    <div className="summary-card">
                        <div className="summary-header">Portfolio Overview</div>
                        <div className="summary-metrics">
                            <div className="metric">
                                <div className="metric-label">Annual Return</div>
                                <div className="metric-value">{investorData.performance.annualizedReturn}</div>
                            </div>
                            <div className="metric">
                                <div className="metric-label">Sharpe Ratio</div>
                                <div className="metric-value">{investorData.performance.sharpeRatio}</div>
                            </div>
                            <div className="metric">
                                <div className="metric-label">Risk Profile</div>
                                <div className="metric-value">{investorData.riskProfile}</div>
                            </div>
                            <div className="metric">
                                <div className="metric-label">Top Sectors</div>
                                <div className="metric-value">{investorData.sectors.slice(0, 2).join(', ')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="chat-container">
                <div className="messages-container">
                    {conversations.map((message, index) => (
                        <div key={index} className={`message ${message.type}-message ${message.isTyping ? 'typing' : ''}`}>
                            {message.type === 'system' && <div className="system-message-icon">i</div>}
                            {message.type === 'user' && (
                                <div className="user-avatar">
                                    <span>You</span>
                                </div>
                            )}
                            {message.type === 'ai' && (
                                <div className="ai-avatar">
                                    <span>AI</span>
                                </div>
                            )}
                            {message.type === 'error' && <div className="error-message-icon">!</div>}

                            <div className="message-content">
                                <div className="message-text">
                                    {message.content}
                                    {message.isTyping && <span className="typing-cursor"></span>}
                                </div>
                                <div className="message-time">{formatTime(message.timestamp)}</div>
                            </div>
                        </div>
                    ))}

                    {loading && !isTyping && (
                        <div className="message ai-message loading-message">
                            <div className="ai-avatar">
                                <span>AI</span>
                            </div>
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {conversations.length <= 2 && !loading && (
                    <div className="suggested-questions">
                        <div className="suggested-label">Suggested questions:</div>
                        <div className="question-chips">
                            {suggestedQuestions.map((question, index) => (
                                <button key={index} className="question-chip" onClick={() => handleSuggestedQuestion(question)}>
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <form className="prompt-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={prompt}
                        onChange={handlePromptChange}
                        onKeyPress={handleKeyPress}
                        placeholder={`Ask about ${investorName}'s investments...`}
                        className="prompt-input"
                        disabled={loading || isTyping}
                        ref={inputRef}
                    />
                    <button
                        type="submit"
                        className={`send-button ${prompt.trim() && !loading && !isTyping ? 'active' : ''}`}
                        disabled={!prompt.trim() || loading || isTyping}
                    >
                        <span className="send-icon">→</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GeminiAnalysis;
