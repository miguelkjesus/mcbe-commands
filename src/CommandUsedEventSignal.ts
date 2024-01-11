import { world } from "@minecraft/server";
import { Signal } from "./Signal";
import { CommandUsedEvent } from "./CommandUsedEvent";

export class CommandUsedEventSignal extends Signal<
  (arg: CommandUsedEvent) => void
> {
  prefix: string;

  constructor(prefix: string) {
    super();
    this.prefix = prefix;

    world.beforeEvents.chatSend.subscribe((ev) => {
      if (prefix !== undefined && ev.message.startsWith(prefix)) {
        this.emit(CommandUsedEvent.fromChatEvent(ev, prefix)!);
        ev.cancel = true;
      }
    });
  }
}
