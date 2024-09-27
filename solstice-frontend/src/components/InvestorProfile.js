import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

const InvestorProfile = ({ investorName, onClose }) => {
  const [investor, setInvestor] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPreferences, setUpdatedPreferences] = useState("");
  const [updatedHistory, setUpdatedHistory] = useState("");

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/investor/${investorName}`
        );
        setInvestor(response.data);
        setUpdatedName(response.data.name);
        setUpdatedPreferences(response.data.preferences);
        setUpdatedHistory(response.data.history.join(", "));
      } catch (error) {
        console.error("Error fetching investor:", error);
      }
    };

    fetchInvestor();
  }, [investorName]);

  const handleUpdate = async () => {
    const updatedInvestor = {
      name: updatedName,
      preferences: updatedPreferences,
      history: updatedHistory.split(",").map((item) => item.trim()),
    };

    try {
      await axios.put(
        `http://localhost:8000/api/investor/${investorName}`,
        updatedInvestor
      );
      onClose(); // Close the profile after updating
    } catch (error) {
      console.error("Error updating investor:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/investor/${investorName}`);
      onClose(); // Close the profile after deletion
    } catch (error) {
      console.error("Error deleting investor:", error);
    }
  };

  if (!investor) return null;

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={5}>
        Edit Investor Profile
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Preferences</FormLabel>
          <Input
            value={updatedPreferences}
            onChange={(e) => setUpdatedPreferences(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Investment History</FormLabel>
          <Input
            value={updatedHistory}
            onChange={(e) => setUpdatedHistory(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleUpdate} colorScheme="teal">
          Update Investor
        </Button>
        <Button onClick={handleDelete} colorScheme="red">
          Delete Investor
        </Button>
      </VStack>
    </Box>
  );
};

export default InvestorProfile;
