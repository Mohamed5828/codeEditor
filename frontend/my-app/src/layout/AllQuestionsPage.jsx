import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllQuestionsPage() {
  const URL = "http://localhost:5000";
  const [questionsData, setQuestionsData] = useState("");
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${URL}/api/questions`);
        setQuestionsData(response.data);
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };
    fetchQuestion();
  }, []);
  return (
    <Accordion>
      {questionsData &&
        questionsData.map((question) => (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text fontSize="xl">Question Number {question.id}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box>{question.title}</Box>
              <Link to={`/question/${question.id}`}>
                <Button
                  variant="outline"
                  colorScheme="blue"
                  mt={4}
                  onClick={""}
                >
                  Solve
                </Button>
              </Link>
            </AccordionPanel>
          </AccordionItem>
        ))}
    </Accordion>
  );
}

export default AllQuestionsPage;
