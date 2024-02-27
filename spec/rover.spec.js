const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function () {
    let rover = new Rover(98382); // Passes 98382 as the rover's position.
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  });

  // 8 tests here!
  test("response returned by receiveMessage contains the name of the message", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(98382); // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    expect(response.message).toBe(message.name);
  });

  // 9 tests here!
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(98382); // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  });

  // 10 tests here!
  test("responds correctly to the status check command", function () {
    let commands = [new Command("STATUS_CHECK")]; //retrieves current status of the rover
    let message = new Message(
      "Test message with status check command",
      commands
    );
    console.log("MESSAGE:", message);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    let roverStatus = response.results[0].roverStatus;

    expect(roverStatus.mode).toBe("NORMAL");
    expect(roverStatus.generatorWatts).toBe(110);
    expect(roverStatus.position).toBe(98382);
  });

  // 11 tests here!
  test("responds correctly to the mode change command", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
      new Command("MOVE"),
    ];

    let message = new Message(
      "Test message with mode change command",
      commands
    );
    let rover = new Rover(98382);

    let response = rover.receiveMessage(message); // Check if the STATUS_CHECK command is found in the response

    let statusCheckResult = response.results.find(
      (result) => result.commandType === "STATUS_CHECK"
    ); // state the rover status if STATUS_CHECK command is found

    if (statusCheckResult) {
      let roverStatus = statusCheckResult.roverStatus;
      expect(roverStatus.mode).toBe("NORMAL");
      expect(roverStatus.generatorWatts).toBe(110);
      expect(roverStatus.position).toBe(98382);
    } else {
      // handle if STATUS_CHECK command is not found
      console.error("STATUS_CHECK command not found in the message");
    }
  });

  // // 12 tests here!
  // test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {});

  // // 13 tests here!
  // test("responds with the position for the move command", function () {});
});
