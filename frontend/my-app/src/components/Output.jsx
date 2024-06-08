import React, { useState } from "react";
import { executeCode } from "../pistonAPI";
import { Box, Button, Text, useToast } from "@chakra-ui/react";

function Output({ code, language, questionId }) {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [passed, setPassed] = useState(false);

  const runCode = async () => {
    if (!code) return;

    setIsLoading(true);
    setIsError(false);
    setPassed(false);

    try {
      const result = await executeCode(language, code, questionId);
      setOutput(result);
      let testPassed = true;

      if (Array.isArray(result)) {
        result.forEach((test) => {
          if (
            parseFloat(test.expectedOutput).toFixed(3) !==
            parseFloat(test.output).toFixed(3)
          ) {
            testPassed = false;
          }
        });
      } else {
        testPassed = false;
      }

      setIsError(!testPassed);
      setPassed(testPassed);
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="25%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Button
        variant="outline"
        colorScheme="blue"
        mb={4}
        ml={4}
        isDisabled={!passed}
        _disabled={{
          bg: "gray.400",
          cursor: "not-allowed",
        }}
        onClick={() => {
          // Submit logic goes here
        }}
      >
        Submit
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : passed ? "green.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : passed ? "green.500" : "#333"}
        overflow="auto"
      >
        {output &&
          Array.isArray(output) &&
          output.map((test, i) => (
            <Box key={i} mb={4}>
              <Text>Test ID: {test.test_id}</Text>
              <Text>Input: {test.input}</Text>
              <Text>Output: {test.output}</Text>
              <Text>
                Expected Output: {parseFloat(test.expectedOutput).toFixed(3)}
              </Text>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default Output;

// import React, { useState } from "react";
// import { executeCode } from "../pistonAPI";
// import { Box, Button, Text, useToast } from "@chakra-ui/react";

// function Output({ code, language, questionId }) {
//   const toast = useToast();
//   const [output, setOutput] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [passed, setIsPassed] = useState(false);
//   const runCode = async () => {
//     const sourceCode = code;
//     if (!sourceCode) return;
//     try {
//       setIsLoading(true);
//       const result = await executeCode(language, sourceCode, questionId);
//       console.log(result);
//       setOutput(result);
//       result ? setIsError(true) : setIsError(false);
//       output.map((test) => {
//         if (test.expectedOutput.toFixed(3) == test.output.toFixed(3)) {
//           counter++;
//         }
//         if (counter == output.size()) {
//           setIsPassed(true);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       toast({
//         title: "An error occurred.",
//         description: error.message || "Unable to run code",
//         status: "error",
//         duration: 6000,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Box w="25%">
//       <Text mb={2} fontSize="lg">
//         Output
//       </Text>
//       <Button
//         variant="outline"
//         colorScheme="green"
//         mb={4}
//         isLoading={isLoading}
//         onClick={runCode}
//       >
//         Run Code
//       </Button>
//       <Button
//         variant="outline"
//         colorScheme="blue"
//         mb={4}
//         isLoading={isLoading}
//         onClick={""}
//         ml={4}
//         disabled={passed}
//       >
//         Submit
//       </Button>
//       <Box
//         height="75vh"
//         p={2}
//         color={isError ? "red.400" : ""}
//         border="1px solid"
//         borderRadius={4}
//         borderColor={isError ? "red.500" : "#333"}
//       >
//         {output &&
//           Array.isArray(output) &&
//           output.map((test, i) => (
//             <>
//               <Text>Test ID: {test.test_id}</Text>
//               <Text>Input: {test.input}</Text>
//               <Text>Output: {test.output}</Text>
//               <Text>Expected Output: {test.expectedOutput.toFixed(3)}</Text>
//             </>
//           ))}
//       </Box>
//     </Box>
//   );
// }
// export default Output;
