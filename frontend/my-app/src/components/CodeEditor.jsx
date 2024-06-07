import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import axios from "axios";

const URL = "http://localhost:5000";

function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [questionId, setQuestionId] = useState(1);

  useEffect(() => {
    const fetchBaseCode = async () => {
      if (questionId && language) {
        try {
          const response = await axios.get(
            `${URL}/api/starter-code/${questionId}/${language}`
          );

          setCode(response.data.starter_code);
        } catch (error) {
          console.error("Error fetching base code:", error);
        }
      }
    };
    fetchBaseCode();
  }, [language]);

  const onSelect = (language) => {
    setLanguage(language);
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="75%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value)}
          />
        </Box>
        <Output code={code} language={language} questionId={questionId} />
      </HStack>
    </Box>
  );
}

export default CodeEditor;
