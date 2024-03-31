import inquirer from "inquirer";
import chalk from "chalk";
import cteateApp from "../lib/commands/createApp.js";
export async function createProject(projectName) {
    const answer = await inquirer.prompt([
        {
            type: "confirm",
            name: "confirmCreate",
            message: `你是否要创建名为${projectName}的vue3应用?`,
            default: true,
        },
        {
            type: "confirm",
            name: "poAxiosCreate",
            message: "是否使用po-axios？",
            default: true,
        },
        {
            type: "list",
            name: "elementPlusCreate",
            message: "是否引入Element Plus",
            choices: ["否", "全局引入", "按需引入"],
        },
    ]);
    if (answer.confirmCreate) {
        cteateApp(projectName, answer);
    } else {
        console.log(chalk.yellow("Aborted creating new project."));
    }
}
