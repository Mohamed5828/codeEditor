const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("iti_test", "springstudent", "springstudent", {
  host: "localhost",
  dialect: "mysql",
});

const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

const Language = sequelize.define("Language", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const QuestionLanguage = sequelize.define(
  "QuestionLanguage",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Question,
        key: "id",
      },
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Language,
        key: "id",
      },
    },
    starter_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["question_id", "language_id"],
      },
    ],
  }
);

const TestCase = sequelize.define("TestCase", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Question,
      key: "id",
    },
  },
  test_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  test_input: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  test_output: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Question.hasMany(QuestionLanguage, { foreignKey: "question_id" });
Language.hasMany(QuestionLanguage, { foreignKey: "language_id" });
QuestionLanguage.belongsTo(Question, { foreignKey: "question_id" });
QuestionLanguage.belongsTo(Language, { foreignKey: "language_id" });

Question.hasMany(TestCase, { foreignKey: "question_id" });
TestCase.belongsTo(Question, { foreignKey: "question_id" });

sequelize.sync();

module.exports = { Question, Language, QuestionLanguage, TestCase };
