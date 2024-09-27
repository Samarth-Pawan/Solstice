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

const StartupProfile = ({ companyName, onClose }) => {
  const [startup, setStartup] = useState(null);
  const [updatedCompanyName, setUpdatedCompanyName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedIndustry, setUpdatedIndustry] = useState("");

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/startup/${companyName}`
        );
        setStartup(response.data);
        setUpdatedCompanyName(response.data.company_name);
        setUpdatedDescription(response.data.description);
        setUpdatedIndustry(response.data.industry);
      } catch (error) {
        console.error("Error fetching startup:", error);
      }
    };

    fetchStartup();
  }, [companyName]);

  const handleUpdate = async () => {
    const updatedStartup = {
      company_name: updatedCompanyName,
      description: updatedDescription,
      industry: updatedIndustry,
    };

    try {
      await axios.put(
        `http://localhost:8000/api/startup/${companyName}`,
        updatedStartup
      );
      onClose(); // Close the profile after updating
    } catch (error) {
      console.error("Error updating startup:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/startup/${companyName}`);
      onClose(); // Close the profile after deletion
    } catch (error) {
      console.error("Error deleting startup:", error);
    }
  };

  if (!startup) return null;

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={5}>
        Edit Startup Profile
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Company Name</FormLabel>
          <Input
            value={updatedCompanyName}
            onChange={(e) => setUpdatedCompanyName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Industry</FormLabel>
          <Input
            value={updatedIndustry}
            onChange={(e) => setUpdatedIndustry(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleUpdate} colorScheme="teal">
          Update Startup
        </Button>
        <Button onClick={handleDelete} colorScheme="red">
          Delete Startup
        </Button>
      </VStack>
    </Box>
  );
};

export default StartupProfile;
