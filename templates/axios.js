import { mkdirSync, writeFileSync } from "fs";
import path from "path";

export function installAxios(url) {
    // 添加axios模板
    const pluginPath = path.join(url, "src/plugin");
    mkdirSync(pluginPath);
    writeFileSync(path.join(pluginPath, "axiosPlugin.js"), writeAxiosPlugin());
}

function writeAxiosPlugin() {
    return `import axios from "axios";
import PoAxios from "po-axios";
    
const PoAxios = {
    install(app) {
        const axiosInstance = axios.create();
        const instance = new PoAxios(axiosInstance);
        app.config.globalProperties.$axios = instance;
    },
};
    
export default PoAxios;
    `;
}
