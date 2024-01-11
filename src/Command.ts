import { Getter } from "./Getter";
import { CommandUsedEvent } from "./CommandUsedEvent";
import { CommandHandler } from "./CommandHandler";

export type CommandPropertyGetter<
  TReturn,
  TCommandHandler extends CommandHandler = CommandHandler
> = Getter<[event: CommandUsedEvent, handler: TCommandHandler], TReturn>;

export abstract class Command {
  abstract name: string;
  aliases: string[] = [];
  canUse: CommandPropertyGetter<boolean, CommandHandler<this>> = new Getter(true);

  abstract execute(
    event: CommandUsedEvent,
    handler: CommandHandler<this>
  ): void;
}
