import * as mod from "https://deno.land/std@0.209.0/assert/mod.ts";

const isNum = (x: string): boolean => isFinite(+x) && isFinite(parseFloat(x));

function gearRatios1(lines: string[]): number {
  const symbols = new Set(["#", "$", "%", "&", "*", "+", "-", "/", "=", "@"]);
  let total = 0;

  const calculateValue = (row: number, col: number): number => {
    return parseInt(lines[row].slice(col), 10);
  };

  function isAdjacentToSymbol(row: number, col: number): boolean {
    if (!(col < lines[row].length) || !isNum(lines[row][col])) {
      return false;
    }

    const currentlyAdjacentToSymbol = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col - 1],
      [row, col + 1],
      [row + 1, col - 1],
      [row + 1, col],
      [row + 1, col + 1],
    ].reduce((foundSymbol, [_row, _col]) =>
      foundSymbol || (
        0 <= _row && _row < lines.length &&
        0 <= _col && _col < lines[row].length &&
        symbols.has(lines[_row][_col])
      ), false);

    return currentlyAdjacentToSymbol || isAdjacentToSymbol(row, col + 1);
  }

  for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[row].length; col++) {
      if (isNum(lines[row][col]) && isAdjacentToSymbol(row, col)) {
        const partValue = calculateValue(row, col);
        total += partValue;

        // skip past the other numbers for that part
        col += partValue.toString().length;
      }
    }
  }

  return total;
}

function gearRatios2(lines: string[]): number {
  function calcCostOfPart(row: number, col: number): number {
    while (col >= 0 && isNum(lines[row][col - 1])) {
      col--;
    }

    return parseInt(lines[row].slice(col), 10);
  }

  function calcEndOfPartNumber(row: number, col: number): number {
    while (col + 1 < lines[row].length && isNum(lines[row][col + 1])) {
      col++;
    }

    return col;
  }

  function getCostIfValidGear(row: number, col: number): number {
    const partCosts: number[] = [];
    for (let _row = row - 1; _row <= row + 1; _row++) {
      for (let _col = col - 1; _col <= col + 1; _col++) {
        if (
          0 <= _row && _row < lines.length &&
          0 <= _col && _col < lines[_row].length &&
          isNum(lines[_row][_col]) &&
          partCosts.length < 2
        ) {
          partCosts.push(calcCostOfPart(_row, _col));

          _col = calcEndOfPartNumber(_row, _col);
        }
      }
    }

    return partCosts.length === 2 ? partCosts[0] * partCosts[1] : 0;
  }

  let total = 0;
  for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[row].length; col++) {
      if (lines[row][col] !== "*") continue;

      total += getCostIfValidGear(row, col);
    }
  }
  return total;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("./day_3_gear_ratios_input.txt").split(
    "\n",
  );
  console.log(gearRatios2(input));
}

Deno.test(function isNumCase() {
  mod.assert(isNum("1"));
  mod.assert(isNum(".1"));
  mod.assert(isNum("10000000000000000"));
  mod.assert(isNum("-234"));
  mod.assert(isNum("0"));
  mod.assertFalse(isNum("   "));
  mod.assertFalse(isNum(".1."));
  mod.assertFalse(isNum("12asdf"));
  mod.assertFalse(isNum("asdf1"));
  mod.assertFalse(isNum("NaN"));
  mod.assertFalse(isNum("1/0"));
  mod.assertFalse(isNum("Infinity"));
  mod.assertFalse(isNum("-Infinity"));
});

Deno.test(function baseCase1() {
  mod.assertEquals(
    gearRatios1([
      "467..114..",
      "...*......",
      "..35..633.",
      "......#...",
      "617*......",
      ".....+.58.",
      "..592.....",
      "......755.",
      "...$.*....",
      ".664.598..",
    ]),
    4361,
  );
});

Deno.test(function realCase1() {
  mod.assertEquals(
    gearRatios1(
      Deno.readTextFileSync("./day_3_gear_ratios_input.txt").split("\n"),
    ),
    531561,
  );
});

Deno.test(function baseCase2() {
  mod.assertEquals(
    gearRatios2([
      "467..114..",
      "...*......",
      "..35..633.",
      "......#...",
      "617*......",
      ".....+.58.",
      "..592.....",
      "......755.",
      "...$.*....",
      ".664.598..",
    ]),
    467835,
  );
});

Deno.test(function realCase2() {
  mod.assertEquals(
    gearRatios2(
      Deno.readTextFileSync("./day_3_gear_ratios_input.txt").split("\n"),
    ),
    83279367,
  );
});
