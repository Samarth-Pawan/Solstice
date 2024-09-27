import React, { useEffect, useState } from "react";
import { Box, Heading, VStack, Button, Input } from "@chakra-ui/react";
import InvestorForm from "./InvestorForm";
import InvestorProfile from "./InvestorProfile"; // Import the InvestorProfile
import axios from "axios";

const InvestorDashboard = () => {
  const [investors, setInvestors] = useState([]);
  const [selectedInvestor, setSelectedInvestor] = useState(null); // State to manage selected investor for profile
  const [showProfile, setShowProfile] = useState(false); // State to manage profile visibility
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [totalInvestors, setTotalInvestors] = useState(0); // State for total investors
  const [totalInvestment, setTotalInvestment] = useState(0); // State for total investment

  const fetchInvestors = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/investors");
      setInvestors(response.data);
    } catch (error) {
      console.error("Error fetching investors:", error);
    }
  };

  const handleAddInvestor = (newInvestor) => {
    setInvestors((prevInvestors) => [...prevInvestors, newInvestor]);
  };

  const handleViewProfile = (investorName) => {
    setSelectedInvestor(investorName);
    setShowProfile(true); // Show the profile
  };

  const handleCloseProfile = () => {
    setShowProfile(false); // Hide the profile
    setSelectedInvestor(null); // Clear selected investor
  };

  const sortInvestors = (order) => {
    const sortedInvestors = [...investors].sort((a, b) => {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setInvestors(sortedInvestors);
  };

  useEffect(() => {
    fetchInvestors();
  }, []);

  useEffect(() => {
    if (investors.length > 0) {
      setTotalInvestors(investors.length);
      setTotalInvestment(
        investors.reduce((acc, investor) => acc + investor.investmentAmount, 0)
      );
    }
  }, [investors]);

  return (
    <Box p={5} bg="gray.50" borderRadius="lg" boxShadow="md">
      <Heading as="h2" size="lg" mb={5} textAlign="center">
        Investor Dashboard
      </Heading>

      <InvestorForm onAddInvestor={handleAddInvestor} />

      {/* Search Input */}
      <Box mb={5}>
        <Input
          placeholder="Search Investors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="md"
        />
      </Box>

      {/* Sorting Buttons */}
      <Box mb={5}>
        <Button onClick={() => sortInvestors("asc")} colorScheme="teal" mr={2}>
          Sort Ascending
        </Button>
        <Button onClick={() => sortInvestors("desc")} colorScheme="teal">
          Sort Descending
        </Button>
      </Box>

      {/* Analytics Section */}
      <Box mb={5} borderWidth="1px" borderRadius="lg" p={4} bg="white">
        <Heading as="h4" size="md">
          Analytics
        </Heading>
        <p>Total Investors: {totalInvestors}</p>
        <p>Total Investment: ${totalInvestment}</p>
      </Box>

      <VStack spacing={4} mt={5}>
        {investors
          .filter((investor) =>
            investor.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((investor) => (
            <Box
              key={investor.name}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              width="100%"
              boxShadow="sm"
            >
              <Heading size="md">{investor.name}</Heading>
              <Button
                onClick={() => handleViewProfile(investor.name)}
                colorScheme="teal"
                mt={2}
              >
                View Profile
              </Button>
            </Box>
          ))}
      </VStack>

      {/* Render InvestorProfile when showProfile is true */}
      {showProfile && (
        <InvestorProfile
          investorName={selectedInvestor}
          onClose={handleCloseProfile}
        />
      )}
    </Box>
  );
};

export default InvestorDashboard;
