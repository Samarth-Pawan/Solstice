import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import img_member1 from "/Users/samarthpawan/Documents/Projects-code/Solstice-startup-project/Solstice-Platform/solstice-frontend/src/sam-solo.png";

const HomePage = () => {
  return (
    <Box>
      {/* Header */}
      <Box bgGradient="linear(to-r, teal.400, teal.600)" p={4}>
        <HStack justify="space-between" align="center" color="white">
          <Heading as="h1" size="lg">
            Solstice
          </Heading>
          <HStack spacing={4}>
            <Button colorScheme="teal" variant="outline">
              Features
            </Button>
            <Button colorScheme="teal" variant="outline">
              Meet Our Team
            </Button>
          </HStack>
        </HStack>
      </Box>
      {/* Hero Section */}
      <Box
        bgImage="url('path/to/your/hero-image.jpg')" // Replace with your hero image path
        bgSize="cover"
        h="400px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgGradient="linear(to-b, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))" // Gradient overlay
        />
        <VStack spacing={4} zIndex="1" color="white">
          <Heading size="2xl">Welcome to Solstice</Heading>
          <Text fontSize="lg">Empowering Innovation and Connection</Text>
          <Button colorScheme="teal" size="lg">
            Get Started
          </Button>
        </VStack>
      </Box>
      {/* Meet Our Team Section */}
      <Box p={10}>
        <Heading as="h2" size="xl" mb={6}>
          Meet Our Team
        </Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          <GridItem>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={img_member1} // Replace with team member image path
              alt="Team Member 1"
            />
            <Text mt={2} fontWeight="bold">
              Samarth Pawan
            </Text>
            <Text>Founding Member</Text>
          </GridItem>
          <GridItem>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={img_member1} // Replace with team member image path
              alt="Team Member 1"
            />
            <Text mt={2} fontWeight="bold">
              Vatsal Saxena
            </Text>
            <Text>Founding Member</Text>
          </GridItem>
          <GridItem>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={img_member1} // Replace with team member image path
              alt="Team Member 1"
            />
            <Text mt={2} fontWeight="bold">
              Vivan Jain
            </Text>
            <Text>Founding Member</Text>
          </GridItem>
          <GridItem>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={img_member1} // Replace with team member image path
              alt="Team Member 1"
            />
            <Text mt={2} fontWeight="bold">
              Srivant V
            </Text>
            <Text>Founding Member</Text>
          </GridItem>
          <GridItem>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={img_member1} // Replace with team member image path
              alt="Team Member 1"
            />
            <Text mt={2} fontWeight="bold">
              Pranathi Voora
            </Text>
            <Text>Founding Member</Text>
          </GridItem>
          {/* Add more team members as needed */}
        </Grid>
      </Box>
      {/* Quick Access to Features Section */}
      <Box
        p={10}
        bgGradient="linear(to-r, gray.100, gray.300)"
        borderRadius="lg"
        shadow="lg"
        h="500px"
      >
        <Heading as="h2" size="xl" mb={8} textAlign="center" color="teal.600">
          Quick Access to Features
        </Heading>

        {/* Grid layout for buttons */}
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap={6}
          h="100%"
        >
          <Link to="/investors">
            <Button
              w="100%"
              h="80%"
              colorScheme="teal"
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
              p={6}
              borderRadius="md"
            >
              Pitch Deck Evaluation
            </Button>
          </Link>

          <Link to="/investors">
            <Button
              w="100%"
              h="80%"
              colorScheme="teal"
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
              p={6}
              borderRadius="md"
            >
              Find Startups
            </Button>
          </Link>

          <Link to="/investors">
            <Button
              w="100%"
              h="80%"
              colorScheme="teal"
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
              p={6}
              borderRadius="md"
            >
              Add Startup
            </Button>
          </Link>

          <Link to="/investors">
            <Button
              w="100%"
              h="80%"
              colorScheme="teal"
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
              p={6}
              borderRadius="md"
            >
              Add Investor
            </Button>
          </Link>
        </Grid>
      </Box>
      {/* Footer */}
      <Box
        bgGradient="linear(to-r, teal.400, teal.600)"
        p={4}
        color="white"
        textAlign="center"
      >
        <Text>© 2024 Solstice. All rights reserved.</Text>
        <HStack justify="center" spacing={4}>
          <Button variant="link" color="white">
            Privacy Policy
          </Button>
          <Button variant="link" color="white">
            Contact Us
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default HomePage;
