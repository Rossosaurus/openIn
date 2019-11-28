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
            "path": "<path to program executable with any arguments>",
            "fileExtensions": "<file types this option is shown for. Separate by "," leave blank for all>"
        }
    ],
```
Now open command pallete (`ctrl + shift + p`)

Run `openIn: Open script with program...` and select the program you want

All programs currently open files by running the text in the path setting as a command followed by the path to the file currently open. If you want to run programs with arguments ensure all all the arguments come before the path.