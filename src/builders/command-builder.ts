import { Command } from "../command";
import { Builder } from "./builder";

export class CommandBuilder extends Builder<Command> {
  description(description: Command["description"]) {
    return this.add({ description });
  }

  execute(execute: Command["execute"]) {
    return this.add({ execute });
  }
}
