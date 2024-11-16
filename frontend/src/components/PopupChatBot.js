import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Avatar, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const PopupChatBot = () => {
    const [prompt, setPrompt] = useState('');
    const [conversation, setConversation] = useState([]);
    const [currentResponse, setCurrentResponse] = useState('');
    const [typingIndex, setTypingIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);

    // Load conversation from localStorage when the component mounts
    useEffect(() => {
        const savedConversation = localStorage.getItem('chatConversation');
        if (savedConversation) {
            setConversation(JSON.parse(savedConversation));
        }
    }, []);

    // Save conversation to localStorage whenever it updates
    useEffect(() => {
        if (conversation.length > 0) {
            const conversationToSave = conversation.slice(-5); // Keep only the last 5 messages
            localStorage.setItem('chatConversation', JSON.stringify(conversationToSave));
        }
    }, [conversation]);

    const handleGenerate = async () => {
        if (prompt.trim()) {
            try {
                // Send the POST request to the backend API
                const result = await axios.post('http://localhost:5002/chat', { prompt });

                // Update the conversation state with the user's message
                setConversation((prev) => [
                    ...prev,
                    { sender: 'user', text: prompt },
                ]);

                // Prepare for typing animation for the bot response
                setCurrentResponse(result.data.response);
                setIsTyping(true);
                setTypingIndex(0);

                // Clear the prompt field
                setPrompt('');
            } catch (error) {
                console.error('Error generating response:', error);
            }
        }
    };

    useEffect(() => {
        if (isTyping && typingIndex < currentResponse.length) {
            const timeout = setTimeout(() => {
                setConversation((prev) => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage && lastMessage.sender === 'bot') {
                        return [
                            ...prev.slice(0, -1),
                            { sender: 'bot', text: lastMessage.text + currentResponse[typingIndex] }
                        ];
                    } else {
                        return [
                            ...prev,
                            { sender: 'bot', text: currentResponse[typingIndex] }
                        ];
                    }
                });
                setTypingIndex((prev) => prev + 1);
            }, 9);

            return () => clearTimeout(timeout);
        } else if (typingIndex === currentResponse.length) {
            setIsTyping(false);
        }
    }, [typingIndex, isTyping, currentResponse]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    // Function to clear the chat history
    const handleClearChat = () => {
        setConversation([]);
        localStorage.removeItem('chatConversation');
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        
            <Box
                position="fixed"
                bottom="500px"
                right="60px"
                zIndex={9999}
            >
                <Button variant="contained" color="dark" onClick={toggleChat}>
                    <ChatIcon />
                </Button>

                {isOpen && (
                    <Paper elevation={3} style={{ width: '500px', height: '400px', position: 'fixed', bottom: '80px', right: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <Box style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                            {conversation.map((message, index) => (
                                <Box
                                    key={index}
                                    display="flex"
                                    justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                                    alignItems="center"
                                    mb={2}
                                >
                                    {message.sender === 'bot' && (
                                        <Avatar alt="Bot" src="/path-to-bot-image.jpg" />
                                    )}
                                    <Paper
                                        style={{
                                            padding: '10px',
                                            backgroundColor: message.sender === 'user' ? '#1565c0a4' : '#f1f8e9',
                                            maxWidth: '75%',
                                            marginLeft: message.sender === 'user' ? '10px' : '0',
                                            marginRight: message.sender === 'bot' ? '10px' : '0',
                                        }}
                                    >
                                        <Typography variant="body2">
                                            {message.text}
                                        </Typography>
                                    </Paper>
                                    {message.sender === 'user' && (
                                        <Avatar alt="User" src="/path-to-user-image.jpg" />
                                    )}
                                </Box>
                            ))}
                            <div ref={messagesEndRef} />
                        </Box>
                        <Box display="flex" alignItems="center" p={1}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Type your message"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleGenerate();
                                    }
                                }}
                            />
                            <Button
                                variant="text"
                                color="secondary"
                                onClick={handleGenerate}
                                style={{ marginLeft: '10px' }}
                            >
                                Send
                            </Button>
                        </Box>
                        <Box textAlign="center" p={1}>
                            <Button
                                variant="text"
                                color="secondary"
                                onClick={handleClearChat}
                            >
                                Clear Chat
                            </Button>
                        </Box>
                    </Paper>
                )}
            </Box>
        
    );
};

export default PopupChatBot;
