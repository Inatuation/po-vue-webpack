import { readFileSync, writeFileSync, unlink } from "fs";
import path from "path";
export function findFile(baseUrl, targetUrl) {
    return readFileSync(path.join(baseUrl, targetUrl), "utf-8");
}

export function outputFile(baseUrl, targetUrl, content) {
    try {
        writeFileSync(path.join(baseUrl, targetUrl), content, "utf-8");
    } catch (error) {
        console.error(error);
    }
}

export function deleteHbsFile(baseUrl, targetUrl) {
    try {
        unlink(path.join(baseUrl, targetUrl), (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                return;
            }
        });
    } catch (error) {
        console.error(error);
    }
}
