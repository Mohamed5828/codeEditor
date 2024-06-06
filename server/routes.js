const express = require("express");
const { Question, Language, QuestionLanguage, TestCase } = require("./models");
const codeExecutor = require("./codeExecutor");

const router = express.Router();
router.get("/test-cases/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const testCases = await TestCase.findAll({
      where: { question_id: questionId },
    });
    res.json(testCases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/starter-code/:questionId/:language", async (req, res) => {
  try {
    const { questionId, language } = req.params;
    const languageRecord = await Language.findOne({
      where: { name: language },
    });

    if (!languageRecord) {
      return res.status(404).json({ error: "Language not found" });
    }

    // Find the question language record based on the question ID and language ID
    const questionLanguage = await QuestionLanguage.findOne({
      where: {
        question_id: questionId,
        language_id: languageRecord.id,
      },
    });

    if (questionLanguage) {
      res.json({
        starter_code: questionLanguage.starter_code,
        language: language.name,
      });
    } else {
      res.status(404).json({ error: "Question not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/run/:questionId", async (req, res) => {
  const { code, language, version } = req.body;
  const { questionId } = req.params;

  try {
    const testCases = await TestCase.findAll({
      where: { question_id: questionId },
    });

    if (!testCases.length) {
      return res.status(404).send("Test cases not found");
    }

    const results = await Promise.all(
      testCases.map(async (testCase) => {
        const { test_input, test_output } = testCase;

        const actualOutput = await codeExecutor.executeCode(
          code,
          test_input,
          language,
          version
        );

        const passed = actualOutput === test_output;

        return {
          test_id: testCase.test_id,
          input: test_input,
          expectedOutput: test_output,
          actualOutput,
          passed,
        };
      })
    );

    res.json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
