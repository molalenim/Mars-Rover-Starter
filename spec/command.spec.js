const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function () {
  //Test 1
  it("throws error if command type is NOT passed into constructor as the first parameter", function () {
    expect(function () {
      new Command();
    }).toThrow(new Error("Command type required."));
  });

  //Test 2: sets command type
  test("constructor sets command type", function () {
    let command = new Command("MOVE");
    expect(command.commandType).toBe("MOVE");
  });

  // Test 3: sets command type and value passed in as the 2nd argument
  test("constructor sets a value passed in as the 2nd argument", function () {
    // create new Command object with a specified command type and value
    let moveCommand = new Command("MOVE", 12000);
    
    //expect(moveCommand.commandType).toBe("MOVE");

    // check if the value property of created object matches expected value
    expect(moveCommand.value).toBe(12000);
  });
});

