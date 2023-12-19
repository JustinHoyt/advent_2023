const lines = Deno.readTextFileSync("./day_2_cube_conundrum_input.txt").split("\n");
// Last line is empty
lines.pop();

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;
const RED_INDEX = 0;
const GREEN_INDEX = 1;
const BLUE_INDEX = 2;

const part1 = lines.reduce((sum: number, line: string, index: number) => {
  const maxCubesSeen = ['red', 'green', 'blue'].map(color =>
    Math.max(
      ...Array.from(line.matchAll(new RegExp(`\\d+(?= ${color})`, 'g')))
      .map(([match, ...rest]) => Number(match))
    )
  );

  return maxCubesSeen[RED_INDEX] <= MAX_RED &&
      maxCubesSeen[GREEN_INDEX] <= MAX_GREEN &&
      maxCubesSeen[BLUE_INDEX] <= MAX_BLUE
    ? sum + index + 1
    : sum;
}, 0);

console.log(part1);

const part2 = lines.reduce((sum: number, line: string) => {
  const getMatchedNumber = ([match, ...rest]: RegExpMatchArray) => Number(match);

  const calculateLeastRequiredCubes = (color: string): number => {
    const numbersAssociatedWithColor = new RegExp(`\\d+(?= ${color})`, 'g');
    return [...line.matchAll(numbersAssociatedWithColor)]
      .map(getMatchedNumber)
      .reduce((a, b) => Math.max(a, b));
  }

  const productOfLeastCubeRequired = ['red', 'green', 'blue']
    .map(calculateLeastRequiredCubes)
    .reduce((a, b) => a * b);

  return sum + productOfLeastCubeRequired;
}, 0);

console.log(part2);
