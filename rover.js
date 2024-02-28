const Command = require("./command");

class Rover {
  constructor(position, mode = "NORMAL", generatorWatts = 110) {
    // Write code here!
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }

  receiveMessage(message) {
    let results = [];
    for (let command of message.commands) {
      let result = this.performCommand(command);
      results.push(result);
    }
    return {
      message: message.name,
      results: results,
    };
  }

  performCommand(command) {
    // write some logic for commands here
    let results = {}; //maybe I should initialize results with empty object
    // console.log("///RESULTS///", results);

    if (command.commandType === "STATUS_CHECK") {
      let roverStatus = {
        position: this.position,
        mode: this.mode,
        generatorWatts: this.generatorWatts,
      };

      results = { completed: true, roverStatus: roverStatus };
    } else if (command.commandType === "MOVE") {
      // console.log("///NEW POSITION///", command.value);
      let newPosition = command.value; //extract new position value from the command

      if (this.mode === "LOW_POWER") {
        results.completed = false;
      } else {
        this.position = newPosition; //update the rover's position with the new position
        results.completed = true;
        results.roverStatus = {
          position: this.position,
          mode: this.mode,
          generatorWatts: this.generatorWatts,
        };
      }
    } else if (command.commandType === "MODE_CHANGE") {
      this.mode = command.value;
      results.completed = true;
    } else {
      console.error(`Unknown command type: ${command.commandType}`);
      results.completed = false; //if test command is not completed
    }
    if (command.commandType === "STATUS_CHECK" && !results.completed) {
      console.error("STATUS_CHECK command not found in the message");
    }
    return results;
  }
}

module.exports = Rover;
