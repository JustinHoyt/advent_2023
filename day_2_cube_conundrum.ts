const lines = Deno.readTextFileSync("./day_2_cube_conundrum_input.txt").split(
  "\n",
);
lines.pop();

const MAX_RED_ALLOWED = 12;
const MAX_GREEN_ALLOWED = 13;
const MAX_BLUE_ALLOWED = 14;

const part1 = lines.reduce((sum: number, line: string, index: number) => {
  const getMatchedNumber = ([match, ..._rest]: RegExpMatchArray) =>
    Number(match);

  const maxCubesSeen = (color: string): number => {
    const numbersAssociatedWithColor = new RegExp(`\\d+(?= ${color})`, "g");
    return [...line.matchAll(numbersAssociatedWithColor)]
      .map(getMatchedNumber)
      .reduce((a, b) => Math.max(a, b));
  };

  return ([
      ["red", MAX_RED_ALLOWED],
      ["green", MAX_GREEN_ALLOWED],
      ["blue", MAX_BLUE_ALLOWED],
    ] as const).every(([color, maxAllowed]) =>
      maxCubesSeen(color) <= maxAllowed
    )
    ? sum + index + 1
    : sum;
}, 0);

console.log(part1);

const part2 = lines.reduce((sum: number, line: string) => {
  const getMatchedNumber = ([match, ..._rest]: RegExpMatchArray) =>
    Number(match);

  const maxCubesSeen = (color: string): number => {
    const numbersAssociatedWithColor = new RegExp(`\\d+(?= ${color})`, "g");
    return [...line.matchAll(numbersAssociatedWithColor)]
      .map(getMatchedNumber)
      .reduce((a, b) => Math.max(a, b));
  };

  return sum +
    maxCubesSeen("red") * maxCubesSeen("green") * maxCubesSeen("blue");
}, 0);

console.log(part2);
