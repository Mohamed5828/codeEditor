const axios = require("axios");

const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

const executeCode = async (code, testCases, language, version) => {
  const results = [];

  for (const testCase of testCases) {
    const payload = {
      language: language,
      version: version,
      files: [{ content: code }],
      stdin: testCase.test_input,
    };

    try {
      // console.log("Payload:", payload);
      const response = await axios.post(PISTON_API_URL, payload);
      const output = response.data.run.output.trim();

      results.push({
        test_id: testCase.id,
        input: testCase.test_input,
        output: output,
        expectedOutput: testCase.test_output,
        response: response.data,
      });
    } catch (error) {
      console.error("Error:", error.message);
      results.push({
        test_id: testCase.id,
        input: testCase.test_input,
        output: error.message,
        expectedOutput: testCase.test_output,
      });
    }
  }
  // console.log(results);
  return results;
};

module.exports = { executeCode };
