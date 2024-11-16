import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper, Container, Avatar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useArgonController } from "context";


const ChatBot = () => {
    const [prompt, setPrompt] = useState('');
    const [conversation, setConversation] = useState([]);
    const [currentResponse, setCurrentResponse] = useState('');
    const [typingIndex, setTypingIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Detect if dark mode is preferred (based on user system settings)
    const [controller] = useArgonController();
    const { darkMode, darkSidenav } = controller;  // Assuming darkMode and darkSidenav are part of controller

    const prefersDarkMode = darkMode;  // Correctly referencing darkMode from controller

    const [expanded, setExpanded] = useState(false);

    // Define the theme with light/dark mode support
    const theme = createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',  // Dynamically set light/dark mode
            primary: {
                main: prefersDarkMode ? '#333' : '#ccc',  // Adjust primary color based on mode
            },
            secondary: {
                main: prefersDarkMode ? '#f48fb1' : '#c62828',  // Adjust secondary color based on mode
            },
            background: {
                default: prefersDarkMode ? '#303030' : '#f5f5f5',  // Set background colors
                paper: prefersDarkMode ? '#424242' : '#ffffff',    // Set paper background
            },
            text: {
                primary: prefersDarkMode ? '#ffffff' : '#000000',   // Adjust text color based on mode
                secondary: prefersDarkMode ? '#bdbdbd' : '#424242', // Adjust secondary text color
            },
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    elevation3: {
                        boxShadow: 'none',  // Remove unnecessary shadow
                    },
                },
            },
        },
    });

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }
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
                const result = await axios.post('http://localhost:5002/chat', { prompt });
                setConversation((prev) => [...prev, { sender: 'user', text: prompt }]);
                setCurrentResponse(result.data.response);
                setIsTyping(true);
                setTypingIndex(0);
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
                            { sender: 'bot', text: lastMessage.text + currentResponse[typingIndex] },
                        ];
                    } else {
                        return [...prev, { sender: 'bot', text: currentResponse[typingIndex] }];
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
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    // Clear chat history
    const handleClearChat = () => {
        setConversation([]);
        localStorage.removeItem('chatConversation');
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" style={{ backgroundColor: theme.palette.background.default, padding: '20px', borderRadius: '12px', boxShadow: 'none' }}>
                <Typography variant="h5" gutterBottom style={{ textAlign: 'center', margin: '20px 0', fontWeight: 'bold', color: "#1565c0a4" }}>
                    Supply Chain Management AI
                </Typography>
                <Paper elevation={3} style={{ padding: '30px', maxHeight: '600px', overflowY: 'auto', marginBottom: '20px', borderRadius: '12px', backgroundColor: theme.palette.background.paper }}>
                    {conversation.map((message, index) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                            alignItems="center"
                            mb={2}
                        >
                            {message.sender === 'bot' && (
                                <Avatar alt="Bot" src="/path-to-bot-image.jpg" style={{ marginRight: '10px' }} />
                            )}
                            <Paper
                                style={{
                                    padding: '15px',
                                    backgroundColor: message.sender === 'user' ? theme.palette.primary.main : theme.palette.background.paper,
                                    color: message.sender === 'user' ? theme.palette.text.primary : theme.palette.text.secondary,
                                    maxWidth: '75%',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    boxShadow: 'none',
                                }}
                            >
                                <Typography variant="body2" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                    {message.text}
                                </Typography>
                            </Paper>
                            {message.sender === 'user' && (
                                <Avatar alt="User" src="/path-to-user-image.jpg" style={{ marginLeft: '10px' }} />
                            )}
                        </Box>
                    ))}
                    <div ref={messagesEndRef} />
                </Paper>
                <Box display="flex" alignItems="center" mb={2} style={{ padding: '4px', backgroundColor: theme.palette.background.paper, borderRadius: '16px' }}>
                    <TextField
                        variant="outlined"
                        color="primary"
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
                        style={{ marginRight: '10px', borderRadius: '8px' }}
                    />
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={handleGenerate}
                        style={{ padding: '10px 20px', borderRadius: '8px', textTransform: 'none', boxShadow: 'none' }}
                    >
                        Send
                    </Button>
                </Box>
                <Box textAlign="center">
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClearChat}
                        style={{ textTransform: 'none', borderRadius: '8px' }}
                    >
                        Clear Chat
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default ChatBot;
