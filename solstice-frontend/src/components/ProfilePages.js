import React from "react";
import InvestorProfile from "./InvestorProfile";
import StartupProfile from "./StartupProfile";
import { Box, SimpleGrid } from "@chakra-ui/react";

const ProfilesPage = ({ investors, startups }) => {
  return (
    <Box p={5}>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5}>
        {investors.map((investor, index) => (
          <InvestorProfile key={index} investor={investor} />
        ))}
        {startups.map((startup, index) => (
          <StartupProfile key={index} startup={startup} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProfilesPage;
