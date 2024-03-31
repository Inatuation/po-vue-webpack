import path from "path";
import { installAxios } from "../../templates/axios.js";
import { mkdirSync } from "fs";
import loadTemplate from '../utils/loadTemplate.js';
import inject from '../utils/inject.js';

export default async function cteateApp(projectName, answer) {
    // 在当前目录创建新项目文件夹
    const projectPath = path.join(process.cwd(), projectName);
    mkdirSync(projectPath);
    await loadTemplate(projectPath);
    if (answer.poAxiosCreate) {
        installAxios(projectPath);
    }
    inject(projectPath, answer);
}
