import download from "download-git-repo";
import repo from "../../templates/repo.js";
import { process } from "../../env/index.js";
import { copy } from "fs-extra";
export default function loadTemplate(projectPath) {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === "development") {
            const options = {
                filter: file => {
                  return !['node_modules', 'dist'].some(directory => file.includes(directory));
                }
              };
            copy(repo["vue-webpack-template"].downloadUrl, projectPath, options).then(() => {
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
                return;
            });
        } else {
            download(
                repo["vue-webpack-template"].downloadUrl,
                projectPath,
                function (error) {
                    if (error) {
                        console.log(error);
                        reject();
                        return;
                    }
                    resolve();
                }
            );
        }
    });
}
