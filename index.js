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
  .then(function(response) {
    const queryUrl = `https://api.github.com/users/${response.username}`;

    axios.get(queryUrl).then(function(res) {
      var userData = {
        githubURL: res.data.html_url,
        githubImg: res.data.avatar_url,
        githubRepos: res.data.public_repos,
        githubFollowers: res.data.followers,
        githubFollowing: res.data.following,
        githubLocation: res.data.location,
        githubBlog: res.data.blog,
        githubName: res.data.name,
        githubBio: res.data.bio,
        githubStars: res.data.stars,
        color: response.color
      };
      console.log(userData);

      let newData = generateHTML(userData)

      writeToFile("developerProfile.html", newData);
    });
  });
};

init();