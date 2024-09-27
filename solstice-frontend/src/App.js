import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvestorDashboard from "./components/InvestorDashboard";
import StartupDashboard from "./components/StartupDashboard";
import ChatInterface from "./components/ChatInterface";
import HomePage from "./components/HomePage";
import { Box, Link, Flex } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <Flex as="nav" p={5} bg="teal.500" color="white">
        <Link href="/" mr={5}>
          {" "}
          Solstice{" "}
        </Link>
        <Link href="/investors" mr={5}>
          Investors
        </Link>
        <Link href="/startups">Startups</Link>
        <Link href="/chat" ml={5}>
          Chat
        </Link>
      </Flex>
      <Box p={5}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/investors" element={<InvestorDashboard />} />
          <Route path="/startups" element={<StartupDashboard />} />
          <Route path="/chat" element={<ChatInterface />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
