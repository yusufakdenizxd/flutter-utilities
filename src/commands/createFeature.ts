import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export async function createFeatureCommand(uri: vscode.Uri) {
  const featureName = await vscode.window.showInputBox({
    prompt: "Name of the feature:",
  });
  if (featureName) {
    let basePath = await determineBasePath(uri);
    if (!basePath) {
      return;
    }

    const featurePath = path.join(basePath, featureName);
    if (fs.existsSync(featurePath)) {
      vscode.window.showErrorMessage(
        `${"The folder already exists."} "${featureName}".`
      );
      return;
    }

    createFeatureStructure(featurePath, featureName);
  }
}

async function determineBasePath(uri: vscode.Uri): Promise<string | undefined> {
  if (uri) {
    return uri.fsPath;
  } else {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders?.length) {
      return workspaceFolders[0].uri.fsPath;
    } else {
      vscode.window.showErrorMessage(
        "Please open a directory before running this command."
      );
    }
  }
}

function createFeatureStructure(basePath: string, featureName: string) {
  createSection(
    basePath,
    "data",
    ["models", "provider", "api", "controller", "notifier"],
    featureName
  );

  createSection(
    basePath,
    "mixins",
    [],
    featureName
  );

  createSection(
    basePath,
    "presentation",
    ["providers", "pages", "widgets"],
    featureName
  );
}

function createSection(
  basePath: string,
  defaultDirName: string,
  subDirs: string[],
  featureName: string
) {
  const sectionPath = path.join(basePath, defaultDirName);
  fs.mkdirSync(sectionPath, { recursive: true });

  if (subDirs.length > 0) {
    subDirs.forEach((dir) => {
      const dirPath = path.join(sectionPath, dir);
      fs.mkdirSync(dirPath, { recursive: true });
      // const fileName = `${featureName}_${dir}.dart`;
      // fs.writeFileSync(path.join(dirPath, fileName), "");
    });
  }
}

export function deactivate() {}
