import { Box } from "@chakra-ui/react";
import SingleQuestionPage from "./layout/SingleQuestionPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllQuestionsPage from "./layout/AllQuestionsPage";

function App() {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={10} py={8}>
      <Router>
        <Routes>
          <Route path="/" element={<AllQuestionsPage />} />
          <Route
            path={"/question/:questionId"}
            element={<SingleQuestionPage />}
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
