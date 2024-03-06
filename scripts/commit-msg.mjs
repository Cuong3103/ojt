import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import shell from "shelljs";

const initHeaders = () => {
  console.log(
    chalk.yellowBright(
      figlet.textSync("COMMIT MSG", {
        font: "isometric3",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};

const selectMsgType = () => {
  const questions = [
    {
      type: "list",
      name: "msg_type",
      message: "What is the commit message type?",
      choices: [
        "🧹 chore",
        "🎸 feat",
        "🔧 fix",
        "😈 refactor",
        "💄 style",
        "👀 test",
      ],
      filter: function (val) {
        return val.split(" ")[1];
      },
    },
    {
      type: "input",
      name: "msg_content",
      message: "What is your message?",
    },
  ];

  return inquirer.prompt(questions);
};

const run = async () => {
  initHeaders();
  const answer = await selectMsgType();
  const finalCommitMsg = [answer.msg_type, answer.msg_content].join(": ");
  shell.exec(`git commit -m "${finalCommitMsg}"`);
};

run();
