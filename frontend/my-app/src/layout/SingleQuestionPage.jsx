import React, { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:5000";

function SingleQuestionPage() {
  const questionId = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const fetchQuestionInfo = async () => {
      try {
        const response = await axios.get(
          `${URL}/api/question/${questionId.questionId}`
        );
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching questions info:", error);
      }
    };
    fetchQuestionInfo();
  }, []);
  return (
    <Box>
      <Box mb={10}>
        <Text fontSize="4xl">{title}</Text>
        <Text fontSize="xl">{description}</Text>
      </Box>
      <CodeEditor questionId={questionId} />
    </Box>
  );
}

export default SingleQuestionPage;
