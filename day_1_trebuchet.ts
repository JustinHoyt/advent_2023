import * as mod from "https://deno.land/std@0.209.0/assert/mod.ts";

function trebuchet1(lines: string[]): number {
  return lines.reduce((sum: number, line: string) => {
    const digits = line.match(/\d/g);
    if (digits == null || digits.length === 0) return sum;

    return sum + Number(`${digits.at(0)}${digits.at(-1)}`);
  }, 0);
}

function trebuchet2(lines: string[]): number {
  return lines.reduce((sum: number, line: string) => {
    const newLine = [
      { name: "one", replacement: "o1e" },
      { name: "two", replacement: "t2o" },
      { name: "three", replacement: "t3e" },
      { name: "four", replacement: "f4r" },
      { name: "five", replacement: "f5e" },
      { name: "six", replacement: "s6x" },
      { name: "seven", replacement: "s7n" },
      { name: "eight", replacement: "e8t" },
      { name: "nine", replacement: "n9e" },
    ].reduce(
      (tempLine, { name, replacement }) =>
        tempLine.replaceAll(name, replacement),
      line,
    );

    const digits = newLine.match(/\d/g);
    if (digits == null || digits.length === 0) return sum;

    return sum + Number(`${digits.at(0)}${digits.at(-1)}`);
  }, 0);
}

if (import.meta.main) {
  console.log(trebuchet1(
    Deno.readTextFileSync("./day_1_trebuchet_input.txt").split("\n"),
  ));
  console.log(trebuchet2(
    Deno.readTextFileSync("./day_1_trebuchet_input.txt").split("\n"),
  ));
}

Deno.test(function realCase1() {
  mod.assertEquals(
    trebuchet1(
      Deno.readTextFileSync("./day_1_trebuchet_input.txt").split("\n"),
    ),
    54877,
  );
});

Deno.test(function realCase2() {
  mod.assertEquals(
    trebuchet2(
      Deno.readTextFileSync("./day_1_trebuchet_input.txt").split("\n"),
    ),
    54100,
  );
});
