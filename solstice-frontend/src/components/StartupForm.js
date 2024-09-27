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

const StartupForm = ({ onAddStartup }) => {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStartup = {
      company_name: companyName,
      description,
      industry,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/startup",
        newStartup
      );
      onAddStartup(response.data);
      setCompanyName("");
      setDescription("");
      setIndustry("");
    } catch (error) {
      console.error("Error adding startup:", error);
    }
  };

  return (
    <Box p={5} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter company description"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Industry</FormLabel>
            <Input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Enter industry"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Add Startup
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default StartupForm;
