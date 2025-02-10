import { world } from "@minecraft/server";

import { TokenStream } from "~/tokens";
import type { Command } from "./command";
import { Invocation } from "./invocation";

export class CommandManager {
  prefix: string;
  commands: Command[] = [];

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  listen(): void {
    world.beforeEvents.chatSend.subscribe((event) => {
      if (!event.message.startsWith(this.prefix)) return;

      const stream = new TokenStream(event.message.slice(this.prefix.length));
      const command = this.getInvokedCommand(stream);
      if (!command) return;

      const invocation = new Invocation(this, event.sender, event.message);
      command.execute(invocation);
    });
  }

  getInvokedCommand(stream: TokenStream): Command | undefined {
    let search = [...this.commands];

    let command: Command | undefined;
    while ((command = search.pop())) {
      if (stream.match(command.nameTokens)) {
        search = [...command.subcommands];
      }
    }

    return command;
  }
}
