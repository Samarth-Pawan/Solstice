import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

const InvestorForm = ({ onAddInvestor }) => {
  const [name, setName] = useState("");
  const [preferences, setPreferences] = useState("");
  const [history, setHistory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInvestor = {
      name,
      preferences,
      history: history.split(",").map((item) => item.trim()),
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/investor",
        newInvestor
      );
      onAddInvestor(response.data);
      setName("");
      setPreferences("");
      setHistory("");
    } catch (error) {
      console.error("Error adding investor:", error);
    }
  };

  return (
    <Box p={5} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter investor name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Preferences</FormLabel>
            <Input
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="Enter investment preferences"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Investment History</FormLabel>
            <Input
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              placeholder="Enter investment history (comma separated)"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Add Investor
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default InvestorForm;
