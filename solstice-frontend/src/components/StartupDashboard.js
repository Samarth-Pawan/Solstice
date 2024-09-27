import React, { useEffect, useState } from "react";
import { Box, Heading, VStack, Button, Input } from "@chakra-ui/react";
import StartupForm from "./StartupForm";
import StartupProfile from "./StartupProfile"; // Import the StartupProfile
import axios from "axios";

const StartupDashboard = () => {
  const [startups, setStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null); // State to manage selected startup for profile
  const [showProfile, setShowProfile] = useState(false); // State to manage profile visibility
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [totalStartups, setTotalStartups] = useState(0); // State for total startups
  const [totalFunding, setTotalFunding] = useState(0); // State for total funding

  const fetchStartups = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/startups");
      setStartups(response.data);
    } catch (error) {
      console.error("Error fetching startups:", error);
    }
  };

  const handleAddStartup = (newStartup) => {
    setStartups((prevStartups) => [...prevStartups, newStartup]);
  };

  const handleViewProfile = (startupName) => {
    setSelectedStartup(startupName);
    setShowProfile(true); // Show the profile
  };

  const handleCloseProfile = () => {
    setShowProfile(false); // Hide the profile
    setSelectedStartup(null); // Clear selected startup
  };

  const sortStartups = (order) => {
    const sortedStartups = [...startups].sort((a, b) => {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setStartups(sortedStartups);
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  useEffect(() => {
    if (startups.length > 0) {
      setTotalStartups(startups.length);
      setTotalFunding(
        startups.reduce((acc, startup) => acc + startup.fundingAmount, 0)
      );
    }
  }, [startups]);

  return (
    <Box p={5} bg="gray.50" borderRadius="lg" boxShadow="md">
      <Heading as="h2" size="lg" mb={5} textAlign="center">
        Startup Dashboard
      </Heading>
      <StartupForm onAddStartup={handleAddStartup} />

      {/* Search Input */}
      <Box mb={5}>
        <Input
          placeholder="Search Startups..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="md"
        />
      </Box>

      {/* Sorting Buttons */}
      <Box mb={5}>
        <Button onClick={() => sortStartups("asc")} colorScheme="teal" mr={2}>
          Sort Ascending
        </Button>
        <Button onClick={() => sortStartups("desc")} colorScheme="teal">
          Sort Descending
        </Button>
      </Box>

      {/* Analytics Section */}
      <Box mb={5} borderWidth="1px" borderRadius="lg" p={4} bg="white">
        <Heading as="h4" size="md">
          Analytics
        </Heading>
        <p>Total Startups: {totalStartups}</p>
        <p>Total Funding: ${totalFunding}</p>
      </Box>

      <VStack spacing={4} mt={5}>
        {startups
          .filter((startup) =>
            startup.name?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((startup) => (
            <Box
              key={startup.name}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              width="100%"
              boxShadow="sm"
            >
              <Heading size="md">{startup.name}</Heading>
              <Button
                onClick={() => handleViewProfile(startup.name)}
                colorScheme="teal"
                mt={2}
              >
                View Profile
              </Button>
            </Box>
          ))}
      </VStack>

      {/* Render StartupProfile when showProfile is true */}
      {showProfile && (
        <StartupProfile
          startupName={selectedStartup}
          onClose={handleCloseProfile}
        />
      )}
    </Box>
  );
};

export default StartupDashboard;
