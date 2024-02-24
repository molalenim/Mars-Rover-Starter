class Message {
  constructor(name, commands) {
    // Write code here!
    if (!name) {
      throw Error("Name parameter required.");
    }

    this.name = name;
    this.commands = commands;
  }
}

module.exports = Message;
