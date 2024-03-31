import { findFile, outputFile, deleteHbsFile } from "./util.js";
import Handlebars from "handlebars";

const mainAxiosData = {
    importAxiosPlugin: `import PoAxios from './plugin/axiosPlugin.js';`,
    useAxiosPlugin: `app.use(PoAxios);`,
};

const mainElementData = {
    importElementPlus: `import ElementPlus from 'element-plus';\nimport 'element-plus/dist/index.css';`,
    useElementPlus: `app.use(ElementPlus);`,
};

const mainAutoElementData = {
    autoElementImport: `import 'element-plus/dist/index.css';`,
};

const webpackAutoElementData = {
    autoElementPlusConfig: `const AutoImport = require("unplugin-auto-import/webpack").default;\nconst Components = require("unplugin-vue-components/webpack").default;\nconst { ElementPlusResolver } = require("unplugin-vue-components/resolvers");`,
    autoElementPlusConfigPlugins: `AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
            Components({
            resolvers: [ElementPlusResolver()],
        }),`,
};

let mainData = {};

let webpackConfigData = {};

export default function inject(url, answer) {
    handleData(answer);
    // 定义 Handlebars 辅助方法
    Handlebars.registerHelper("ifNotEmpty", function (value, options) {
        return value ? options.fn(this) : "";
    });
    mainInject(url);
    webpackInject(url);
    packageInjext(url, answer);
}

function handleData(answer) {
    const mData = {};
    const wData = {};
    if (answer.poAxiosCreate) {
        Object.assign(mData, mainAxiosData);
    }
    if (answer.elementPlusCreate === "全局引入") {
        Object.assign(mData, mainElementData);
    }
    if (answer.elementPlusCreate === "按需引入") {
        Object.assign(mData, mainAutoElementData);
        Object.assign(wData, webpackAutoElementData);
    }
    mainData = mData;
    webpackConfigData = wData;
}

function mainInject(url) {
    // 修改main.js
    const mainFileString = findFile(url, "src/main.hbs");
    const mainTemplate = Handlebars.compile(mainFileString);
    const mainResult = mainTemplate(mainData);
    outputFile(url, "src/main.js", mainResult);
    deleteHbsFile(url, "src/main.hbs");
}

function webpackInject(url) {
    // 修改webpack.config.js
    const webpackFileString = findFile(url, "webpack.config.hbs");
    const webpackTemplate = Handlebars.compile(webpackFileString);
    const webpackResult = webpackTemplate(webpackConfigData);
    outputFile(url, "webpack.config.js", webpackResult);
    deleteHbsFile(url, "webpack.config.hbs");
}

function packageInjext(url, answer) {
    // 修改package.json
    const packageFileString = findFile(url, "package.json");
    const packageFile = JSON.parse(packageFileString);
    // 根据用户选择，注入package.json依赖
    if (answer.poAxiosCreate) {
        packageFile.dependencies["axios"] = "^1.6.8";
        packageFile.dependencies["po-axios"] = "^1.1.0";
    }
    if (
        answer.elementPlusCreate === "全局引入" ||
        answer.elementPlusCreate === "按需引入"
    ) {
        packageFile.dependencies["element-plus"] = "^2.6.3";
    }

    if (answer.elementPlusCreate === "按需引入") {
        packageFile.devDependencies["unplugin-auto-import"] = "^0.17.5";
        packageFile.devDependencies["unplugin-vue-components"] = "^0.26.0";
    }
    outputFile(url, "package.json", JSON.stringify(packageFile, null, 2));
}
