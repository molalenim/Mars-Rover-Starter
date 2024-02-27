const Command = require("./command");


class Rover {
  constructor(position, mode = "NORMAL", generatorWatts = 110) {
    // Write code here!
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }

  receiveMessage(message) {
    //console.log("RECEIVE MESSAGE:", message);

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
    let results;
    //let statusCheckCommand = new Command("STATUS_CHECK");
    if (command.commandType === "STATUS_CHECK") {
      let roverStatus = {
        position: this.position,
        mode: this.mode,
        generatorWatts: this.generatorWatts,
        
      };
      console.log("ROVER STATUS:", roverStatus);
      results = {completed: true, roverStatus: roverStatus};
    } else if (command.commandType === "MOVE") {
      results = {completed: true};
    } else if (command.commandType === "MODE_CHANGE"){
      results = {completed: true};
    
    } else {
      console.error(`Unknown command type: ${command.commandType}`);
    }
    //console.log("RESULTS:", results);
    return results;
  }
}

module.exports = Rover;

// Tip from Phillip

// it("Responds to TA message & commands", function() {
//    let rover = new Rover(100);
//    let commands = [
//       new Command('MOVE', 4321),
//       new Command('STATUS_CHECK'),
//       new Command('MODE_CHANGE', 'LOW_POWER'),
//       new Command('MOVE', 3579),
//       new Command('STATUS_CHECK')
//    ];
//    let message = new Message('TA power', commands);
//    let response = rover.receiveMessage(message);
//    expect(response.message).toEqual('TA power');
//    expect(response.results[0].completed).toBeTruthy();
//    expect(response.results[1].roverStatus.position).toEqual(4321);
//    expect(response.results[2].completed).toBeTruthy();
//    expect(response.results[3].completed).toBeFalsy();
//    expect(response.results[4].roverStatus.position).toEqual(4321);
//    expect(response.results[4].roverStatus.mode).toEqual('LOW_POWER');
//    expect(response.results[4].roverStatus.generatorWatts).toEqual(110);
//   });
