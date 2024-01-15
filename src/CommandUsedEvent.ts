import { ChatSendBeforeEvent, Player } from "@minecraft/server";
import { splitCommand } from "./splitCommand";

export interface ICommandUsedEvent {
  chatEvent: ChatSendBeforeEvent;
  prefix: string;
  command: string;
  sender: Player;
  args: string[];
}

export class CommandUsedEvent implements ICommandUsedEvent {
  readonly chatEvent: ChatSendBeforeEvent;
  readonly prefix: string;
  readonly command: string;
  readonly sender: Player;
  readonly args: string[];

  constructor(options: ICommandUsedEvent) {
    this.chatEvent = options.chatEvent;
    this.prefix = options.prefix;
    this.command = options.command;
    this.sender = options.sender;
    this.args = options.args;
  }

  static fromChatEvent(
    chatEvent: ChatSendBeforeEvent,
    prefix: string
  ): CommandUsedEvent | null {
    let { message } = chatEvent;

    let options = <ICommandUsedEvent>{};
    options.chatEvent = chatEvent;
    options.sender = chatEvent.sender;

    if (!message.startsWith(prefix)) return null;
    options.prefix = prefix;

    let cmd;
    try {
      cmd = splitCommand(message.slice(prefix.length));
    } catch (err) {
      // If failed to split the command, it wasn't a valid command.
      return null;
    }

    options.command = cmd.command;
    options.args = cmd.args;

    return new CommandUsedEvent(options);
  }
}
