import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Input, VStack, Text, HStack } from "@chakra-ui/react";
import axios from "axios";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!message) return;

    setLoading(true);
    setChatHistory((prev) => [...prev, { user: message }]);

    try {
      const response = await axios.post("http://localhost:8000/api/chat/", {
        message,
      });
      setChatHistory((prev) => [
        ...prev,
        { user: message, bot: response.data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    chatContainerRef.current?.scrollTo(
      0,
      chatContainerRef.current.scrollHeight
    );
  }, [chatHistory]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      h="90vh" // Full height of the viewport
      p={5}
      bg="gray.50"
    >
      {/* Chat window */}
      <Box
        ref={chatContainerRef}
        flex="1"
        overflowY="auto"
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="md"
      >
        <VStack spacing={4} align="stretch">
          {chatHistory.map((chat, index) => (
            <Box
              key={index}
              alignSelf={chat.bot ? "flex-start" : "flex-end"}
              maxW="70%" // Limit message width
            >
              <Box
                bg={chat.bot ? "blue.100" : "green.100"}
                p={3}
                borderRadius="md"
                boxShadow="sm"
              >
                <Text fontWeight="bold">{chat.bot ? "Bot" : "You"}</Text>
                <Text>{chat.bot || chat.user}</Text>
              </Box>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Input and send button */}
      <HStack mt={4} spacing={4}>
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          isDisabled={loading}
        />
        <Button
          onClick={handleSendMessage}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyDown}
          isLoading={loading}
        >
          Send
        </Button>
      </HStack>
    </Box>
  );
};

export default ChatInterface;
