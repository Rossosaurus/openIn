# openIn for VS Code

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

openIn is an extension for VS Code that allows files to be opened in external applications from within VS Code.

## Getting Started <a name = "getting_started"></a>

1. Clone the repository:

```
git clone https://github.com/Rossosaurus/openIn.git
```
2. Open in VS Code

### Prerequisites

 - VS Code
 - NodeJS
 - NPM
 - VSCE

### Installing

Either install using the extensions marketplace inside of VS Code

#### Or

Compile from the source:
 1. Run `vsce package` to compile the source. Run `npm install -g vsce` if you don't have vsce installed
 2. Run `code --install-extension <path to compiled vsix file>`

## Usage <a name = "usage"></a>

In order to open a file using the openIn command from command pallette you need to add a program entry into your `settings.json`.

Open your `settings.json` and add the following entry for each program you want:
```
"openWith.programs": [
        {
            "name": "<name displayed in command pallette>",
            "path": "<Path of executable + arguments or command to be executed use $filePath for where the file location should be placed in the command string. If $filePath is not found the file path will be placed at the end of the string.>",
            "fileExtensions": "<List of file extensions this program will be listed for. Separate them by commas, leave empty to be listed on every file type.>"
            "contextMenu": "<Set to true if you want this to be the program launched when using the explorer context menu command. Cannot be true if no file extensions are listed in the \"fileExtensions\" property. If a this property is set as true for multiple programs with the same file extension listed than the first program in this array will be used.">
        }
    ],
```
Now open command palette (`ctrl + shift + p`)

Run `openIn: Open script with program...` and select the program you want

Or

Right click on a file in explorer and select `openIn: Open File`

All programs currently open files by executing a command using `child_process.exec(<commandString>)` the command string will run the text in the `path` property as a command with `$filePath` replaced with the path to the file currently open. If `$filePath` is not found in the string then the file path will be appended to the end of the text in the `path` property.

Please report any problems by registering an issue in the github repository.