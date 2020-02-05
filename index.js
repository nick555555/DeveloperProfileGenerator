const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const generateHTML = require("./generateHTML");

//questions used in inquirer prompt
const questions = [
  {
    type: "input",
    message: "Enter your GitHub username: ",
    name: "username"
  },
  {
    type: "list",
    message: "Choose a color for your profile: ",
    name: "color",
    choices: [
      "green",
      "blue",
      "pink",
      "red"
    ]
  }
];

//writes new file based on inputs
const writeFileAsync = util.promisify(fs.writeFile);

function writeToFile(fileName, data) {
  writeFileAsync(fileName, data);
};





function init() {
  return inquirer.prompt(questions)
  .then(function(data) {
    const queryUrl = `https://api.github.com/users/${data.username}`;

    axios.get(queryUrl).then(function(res) {
      var userData = {
        result: res.data,
        color: data.color
      };

      let newData = generateHTML(userData)

      writeToFile("developerProfile.html", newData);
    });
  });
};

init();