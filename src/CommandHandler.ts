import { CommandUsedEventSignal } from "./CommandUsedEventSignal";
import { Command } from "./Command";

export class CommandHandler<TCommand extends Command = Command> {
  readonly commandUsed: CommandUsedEventSignal;
  protected readonly commands = new Map<string, TCommand>();

  constructor(prefix: string) {
    this.commandUsed = new CommandUsedEventSignal(prefix);
  }

  get prefix(): string {
    return this.commandUsed.prefix;
  }

  set prefix(v: string) {
    this.commandUsed.prefix = v;
  }

  start(): CommandHandler {
    this.commandUsed.subscribe((event) => {
      let command = this.getCommand(event.command);
      if (command === undefined || !command.canUse.value(event, this)) {
        event.sender.sendMessage(
          `§cUnrecognised command '${
            this.prefix + event.command
          }'. Either you do not have permission to use this command or it doesn't exist.`
        );
      } else {
        try {
          command.execute(event, this);
        } catch (error) {
          event.sender.sendMessage(
            `§cThere was an unhandled error while executing the command.\n${error.name}: ${error.message}\n${error.stack}§r`
          );
        }
      }
    });

    return this;
  }

  register(commands: TCommand[]): CommandHandler {
    for (let command of commands) {
      this.commands.set(command.name, command);
      command.aliases.forEach((alias) => this.commands.set(alias, command));
    }

    return this;
  }

  unregister(command: TCommand): CommandHandler {
    this.commands.delete(command.name);
    command.aliases.forEach((alias) => this.commands.delete(alias));

    return this;
  }

  getCommand(nameOrAlias: string): TCommand | undefined {
    return this.commands.get(nameOrAlias);
  }

  getCommands(): TCommand[] {
    return [...new Set(this.commands.values())];
  }
}
