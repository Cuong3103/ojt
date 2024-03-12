import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import shell from "shelljs";

const initHeaders = () => {
  console.log(
    chalk.greenBright(
      figlet.textSync("FAMS", {
        font: "isometric3",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};

const getReleaseVersion = () => {
  const questions = [
    {
      type: "input",
      name: "releaseVersion",
      message: "What is incoming release version?",
      default: "1.0.3"
    },
  ];

  return inquirer.prompt(questions);
};

const run = async () => {
  initHeaders();
  const answer = await getReleaseVersion();
  const releaseVersion = answer.releaseVersion;
  shell.exec(`docker buildx build --platform linux/amd64 -f ./Dockerfile -t gcr.io/sonic-stratum-415515/fams-ui:${releaseVersion} --target production .`)
  shell.exec(`docker push gcr.io/sonic-stratum-415515/fams-ui:${releaseVersion}`)
  shell.exec('docker system prune -a')
};

run();
