import * as vscode from 'vscode';
import * as cp from 'child_process';

function fileTypeCheck(fileExtensions:String):Boolean {
	var extArray:Array<String> = fileExtensions.toUpperCase().trim().replace(" ", "").replace(".", "").split(",");
	var check = String(String(vscode.window.activeTextEditor.document.fileName).split(".").pop().toUpperCase());
	for (var x = 0; x < extArray.length; x++) {
		if (extArray[x] ===  check || extArray[x] === ""){
			return true;
		} 
	}
	return false;
}

export function activate(context: vscode.ExtensionContext) {
	console.log('openWith is now active!');

	let openWith = vscode.commands.registerCommand('extension.openIn', async () => {
		var config:Array<Object> = Object.values(Object(vscode.workspace.getConfiguration().get('openIn.programs')));
		var programs:Array<Array<String>> = [];
		var programPaths:Array<vscode.QuickPickItem> = [];
		var chosenProgram;
		for (var x = 0; x < config.length; x++) {
			programs.push(Object.values(config[x]));
		}
		for (var i = 0; i < programs.length; i++) {
			var temp = String(programs[i][2]);
			if (fileTypeCheck(programs[i][2])) {
				var desc = String(programs[i][1] + " | All");
				if (programs[i][2] === "") {
					programPaths.push({label: String(programs[i][0]), description: desc});
				} else { programPaths.push({label: String(programs[i][0]), description: String(String(programs[i][1] + " | "  + programs[i][2])) }); }
			}
		}
		chosenProgram = await vscode.window.showQuickPick(programPaths, {placeHolder: "Program: ..."});
		cp.exec(String("\"" + Object.values(chosenProgram)[0]) + "\" \"" + String(vscode.window.activeTextEditor.document.fileName) + "\"");
	});

	context.subscriptions.push(openWith);
}

export function deactivate() {}
