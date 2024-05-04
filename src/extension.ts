import * as vscode from "vscode";
import { createFeatureCommand } from "./commands/createFeature";
export function activate(context: vscode.ExtensionContext) {
  let disposableCreateFeature = vscode.commands.registerCommand(
    "extension.createFeature",
    async (uri: vscode.Uri) => {
      await createFeatureCommand(uri);
    }
  );

  context.subscriptions.push(disposableCreateFeature);
}

// This method is called when your extension is deactivated
export function deactivate() {
}

