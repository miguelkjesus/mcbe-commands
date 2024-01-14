import { splitCommand } from "../src/splitCommand";

type ValidTestCase = [
  input: string,
  expected: { command: string; args: string[] }
];
type ErrorTestCase = [input: string];

describe("splitCommand()", () => {
  let validInputs: ValidTestCase[] = [
    ["command", { command: "command", args: [] }],
    ["command   ", { command: "command", args: [] }],
    ["command arg0 arg1", { command: "command", args: ["arg0", "arg1"] }],
    [
      "command   arg0   arg1   ",
      { command: "command", args: ["arg0", "arg1"] },
    ],
    ["", { command: "", args: [] }],
    ['command " arg 0 "', { command: "command", args: [" arg 0 "] }],
  ];

  it.each(validInputs)("correctly splits: %s", (input, expected) => {
    let result = splitCommand(input);
    expect(result).toHaveProperty("command");
    expect(result.command).toEqual(expected.command);

    expect(result).toHaveProperty("args");
    expect(result.args).toEqual(expected.args);
  });

  let errorInputs: ErrorTestCase[] = [['command " arg0 " arg1 "arg 2']];

  it.each(errorInputs)("throws on the input: %s", (input) => {
    expect(() => splitCommand(input)).toThrow();
  });
});
