import { Box } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [questionId, setQuestionId] = useState(1);

  useEffect(() => {
    const fetchBaseCode = async () => {
      if (questionId && language) {
        try {
          const response = await axios.get(
            `/api/starter-code/${questionId}/${language}`
          );
          setCode(response.data.baseCode);
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
      <Box>
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
          height="75vh"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          value={code}
          theme="vs-dark"
          onChange={(value) => setCode(value)}
        />
      </Box>
      <Output code={code} language={language} questionId={questionId} />
    </Box>
  );
}

export default CodeEditor;
