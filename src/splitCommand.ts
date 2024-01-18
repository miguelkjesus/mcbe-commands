export interface SplitCommand {
  command: string;
  args: string[];
}

export function splitCommand(text: string): SplitCommand {
  let cmd = { args: [] } as SplitCommand;
  let i = 0;

  // Get command name part
  while (true) {
    if (i >= text.length) {
      cmd.command = text;
      return cmd;
    }
    if (text[i] === " ") {
      cmd.command = text.slice(0, i);
      break;
    }
    i++;
  }

  // Split arguments
  let argStart = ++i;
  let quoted = false;

  while (i < text.length) {
    if (!quoted && text[i] === " ") {
      // dont make a new arg if prev char was also a space, or if it was a quote and we just finished making a quote
      if (text[i - 1] !== " " && (quoted || text[i - 1] !== '"')) {
        cmd.args.push(text.slice(argStart, i));
      }
      argStart = ++i;
    } else if (text[i] === '"' && text[i - 1] !== "\\") {
      if (quoted) {
        cmd.args.push(text.slice(argStart, i));
        quoted = false;
      } else {
        if (text[i - 1] !== " ") {
          cmd.args.push(text.slice(argStart, i));
        }
        quoted = true;
      }
      argStart = ++i;
    } else {
      i++;
    }
  }

  if (quoted) {
    return null
  }

  if (![" ", '"'].includes(text[text.length - 1])) {
    cmd.args.push(text.slice(argStart));
  }

  return cmd;
}
