const axios = require("axios");

const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

const executeCode = async (code, testCases, language, version) => {
  const results = [];

  for (const testCase of testCases) {
    const payload = {
      language: language,
      version: version,
      files: [{ content: code }],
      stdin: testCase.test_case,
    };

    try {
      const response = await axios.post(PISTON_API_URL, payload);
      const output = response.data.run.output.trim();
      const expectedOutput = testCase.test_output.trim();
      const passed = output === expectedOutput;

      results.push({
        test_id: testCase.test_id,
        input: testCase.test_input,
        output,
        expectedOutput,
        passed,
      });
    } catch (error) {
      results.push({
        test_id: testCase.test_id,
        input: testCase.test_input,
        error: error.message,
        passed: false,
      });
    }
  }

  return results;
};

module.exports = { executeCode };
