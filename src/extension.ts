import * as vscode from 'vscode';
import * as cp from 'child_process';

function fileTypeCheck(fileExtensions:String, chosenFileExt:string):Boolean {
	var extArray:Array<String> = fileExtensions.toUpperCase().trim().replace(" ", "").replace(".", "").split(",");
	var check = chosenFileExt;
	for (var x = 0; x < extArray.length; x++) {
		if (extArray[x] ===  check || extArray[x] === ""){
			return true;
		} 
	}
	return false;
}

export function activate(context: vscode.ExtensionContext) {

	console.log('openIn is now active!');
	var config:Array<Object> = Object.values(Object(vscode.workspace.getConfiguration().get('openIn.programs')));
	var programs:Array<Array<String>> = [];
	var programPaths:Array<vscode.QuickPickItem> = [];
	var chosenProgram;
	for (var x = 0; x < config.length; x++) {
		programs.push(Object.values(config[x]));
	}

	let openIn = vscode.commands.registerCommand('extension.openIn', async () => {
		for (var i = 0; i < programs.length; i++) {
			if (fileTypeCheck(programs[i][2], vscode.window.activeTextEditor.document.fileName)) {
				var desc = String(programs[i][1] + " | All");
				if (programs[i][2] === "") {
					programPaths.push({label: String(programs[i][0]), description: desc});
				} else { programPaths.push({label: String(programs[i][0]), description: String(String(programs[i][1] + " | "  + programs[i][2])) }); }
			}
		}
		chosenProgram = await vscode.window.showQuickPick(programPaths, {placeHolder: "Program: ..."});
		cp.exec(String("\"" + Object.values(chosenProgram)[0]) + "\" \"" + String(vscode.window.activeTextEditor.document.fileName) + "\"");
		openIn.dispose();
	});

	let cmOpenIn = vscode.commands.registerCommand('extension.cmOpenIn', (uri:vscode.Uri) => {
		var fileExtension = uri.fsPath.toUpperCase().split(".").pop();
		for (var i = 0; i < programs.length; i++) {
			if (fileTypeCheck(programs[i][2], fileExtension) && programs[i][3]) {
				cp.exec(String("\"" + programs[i][1] + "\" \"" + uri.fsPath));
				return;
			}
		}
		vscode.window.showInformationMessage("openIn: Cannot find a program to open this file with via the contextMenu. Make sure that the contextMenu property of a program that uses this file type is listed in settings.json.");
	});

	let recheck = vscode.commands.registerCommand('extension.recheck', async ()=> {
		var config:Array<Object> = Object.values(Object(vscode.workspace.getConfiguration().get('openIn.programs')));
		var programs:Array<Array<String>> = [];
		for (var x = 0; x < config.length; x++) {
			programs.push(Object.values(config[x]));
		}
	});

	context.subscriptions.push(openIn);
	context.subscriptions.push(cmOpenIn);
	context.subscriptions.push(recheck);
}

export function deactivate() {}
