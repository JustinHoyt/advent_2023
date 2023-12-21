import * as mod from "https://deno.land/std@0.209.0/assert/mod.ts";

const MAX_RED_ALLOWED = 12;
const MAX_GREEN_ALLOWED = 13;
const MAX_BLUE_ALLOWED = 14;

function cubeConundrum1(lines: string[]) {
  return lines.reduce((sum: number, line: string, index: number) => {
    const getMatchedNumber = ([match, ..._rest]: RegExpMatchArray) =>
      Number(match);

    const maxCubesSeen = (color: string): number => {
      const numbersAssociatedWithColor = new RegExp(`\\d+(?= ${color})`, "g");
      return [...line.matchAll(numbersAssociatedWithColor)]
        .map(getMatchedNumber)
        .reduce((a, b) => Math.max(a, b), -Infinity);
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
}

function cubeConundrum2(lines: string[]) {
  return lines.reduce((sum: number, line: string) => {
    const getMatchedNumber = ([match, ..._rest]: RegExpMatchArray) =>
      Number(match);

    const maxCubesSeen = (color: string): number => {
      const numbersAssociatedWithColor = new RegExp(`\\d+(?= ${color})`, "g");
      return [...line.matchAll(numbersAssociatedWithColor)]
        .map(getMatchedNumber)
        .reduce((a, b) => Math.max(a, b), 0);
    };

    return sum +
      maxCubesSeen("red") * maxCubesSeen("green") * maxCubesSeen("blue");
  }, 0);
}

if (import.meta.main) {
  console.log(cubeConundrum1(
    Deno.readTextFileSync("./day_2_cube_conundrum_input.txt").split("\n"),
  ));
  console.log(cubeConundrum2(
    Deno.readTextFileSync("./day_2_cube_conundrum_input.txt").split("\n"),
  ));
}

Deno.test(function realCase1() {
  mod.assertEquals(
    cubeConundrum1(
      Deno.readTextFileSync("./day_2_cube_conundrum_input.txt").split("\n"),
    ),
    2694,
  );
});

Deno.test(function realCase2() {
  mod.assertEquals(
    cubeConundrum2(
      Deno.readTextFileSync("./day_2_cube_conundrum_input.txt").split("\n"),
    ),
    54699,
  );
});
