---
title: 'How to export your VSCode extensions on Mac'
date: '2024-02-18'
description: 'Learn how to easily export all your Visual Studio Code extensions to another machine.'
---

## 1. Make sure you have the `code` command enabled

VSCode makes this easy by providing a command that installs `code` if you don't have it.

You can test it by opening a new terminal with "Ctrl + Shift + \`". Then try `code -v`.

If you don't have the command installed, open the Command Palette in VSCode with: "Cmd + Shift + P". Then type: "Install 'code' command".

## 2. List all your commands in the terminal with `code`

Use the following command to list all your VSCode installed extensions:
```sh
code --list-extensions | xargs -L 1 echo code --install-extension
```
## 3. Copy and paste the output to the other machine

Make sure your other machine also has the `code` command by following the steps in step 1.

Then just copy and paste all the commands there, and it should install the extensions.

### Bonus: here are mine currently if you are curious:

```sh
code --install-extension aaron-bond.better-comments
code --install-extension abrahamwilliam007.es7-javascript-class-snippets
code --install-extension anbuselvanrocky.bootstrap5-vscode
code --install-extension angular.ng-template
code --install-extension ardenivanov.svelte-intellisense
code --install-extension bbugh.change-color-format
code --install-extension benspaulding.procfile
code --install-extension bierner.color-info
code --install-extension bradlc.vscode-tailwindcss
code --install-extension christian-kohler.path-intellisense
code --install-extension clemenspeters.format-json
code --install-extension dbaeumer.vscode-eslint
code --install-extension dracula-theme.theme-dracula
code --install-extension ecmel.vscode-html-css
code --install-extension editorconfig.editorconfig
code --install-extension esbenp.prettier-vscode
code --install-extension expo.vscode-expo-tools
code --install-extension fernandotherojo.nandorojo-tamagui
code --install-extension firsttris.vscode-jest-runner
code --install-extension formulahendry.auto-close-tag
code --install-extension formulahendry.auto-complete-tag
code --install-extension formulahendry.auto-rename-tag
code --install-extension foxundermoon.next-js
code --install-extension github.vscode-github-actions
code --install-extension gruntfuggly.todo-tree
code --install-extension ijs.reactnextjssnippets
code --install-extension ionic.ionic
code --install-extension juanblanco.solidity
code --install-extension kisstkondoros.vscode-gutter-preview
code --install-extension leizongmin.node-module-intellisense
code --install-extension mechatroner.rainbow-csv
code --install-extension mgmcdermott.vscode-language-babel
code --install-extension mike-co.import-sorter
code --install-extension mikestead.dotenv
code --install-extension millenniumambiguity.processing-formatter
code --install-extension mongodb.mongodb-vscode
code --install-extension mrmlnc.vscode-scss
code --install-extension ms-python.debugpy
code --install-extension ms-python.isort
code --install-extension ms-python.python
code --install-extension ms-python.vscode-pylance
code --install-extension ms-toolsai.jupyter
code --install-extension ms-toolsai.jupyter-keymap
code --install-extension ms-toolsai.jupyter-renderers
code --install-extension ms-toolsai.vscode-jupyter-cell-tags
code --install-extension ms-toolsai.vscode-jupyter-slideshow
code --install-extension msjsdiag.vscode-react-native
code --install-extension naumovs.color-highlight
code --install-extension nrwl.angular-console
code --install-extension perkovec.emoji
code --install-extension pkief.material-icon-theme
code --install-extension pmneo.tsimporter
code --install-extension ritwickdey.liveserver
code --install-extension rocketseat.rocketseatreactnative
code --install-extension sainoba.px-to-rem
code --install-extension samplavigne.p5-vscode
code --install-extension seatonjiang.gitmoji-vscode
code --install-extension shardulm94.trailing-spaces
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension styled-components.vscode-styled-components
code --install-extension svelte.svelte-vscode
code --install-extension tobiah.language-pde
code --install-extension tock.vscode-css-custom-properties
code --install-extension wayou.vscode-todo-highlight
code --install-extension xabikos.javascriptsnippets
code --install-extension zignd.html-css-class-completion
```