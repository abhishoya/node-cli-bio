#!/usr/bin/env node
"use strict";

var inquirer = require("inquirer");
var chalk = require("chalk");

var response = chalk.bold.green;

var bio = require("./bio.json");

var bioPrompts = {
  type: "list",
  name: "bioOptions",
  message: "What do you want to know about me?",
  choices: [...Object.keys(bio), "Exit"]
};

function main() {
  console.log("Hello, My name is shoydex and welcome to my diary");
  bioHandler();
}

function bioHandler() {
  inquirer.prompt(bioPrompts).then(answer => {
    if (answer.bioOptions == "Exit") {
      return;
    }
    var option = answer.bioOptions;
    console.log(response("--------------------------------------"));
    bio[`${option}`].forEach(info => {
      console.log(response("|   => " + info));
    });
    console.log(response("--------------------------------------"));
    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
      })
      .then(choice => {
        if (choice.exitBack == "Back") {
          bioHandler();
        } else {
          return;
        }
      });
  });
}

main();