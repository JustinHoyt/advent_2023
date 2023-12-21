import * as mod from "https://deno.land/std@0.209.0/assert/mod.ts";

function problemName1(lines: string[]): number {
  return lines.length;
}

function problemName2(lines: string[]): number {
  return lines.length;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("./day_x_problem_name_input.txt").split(
    "\n",
  );
  console.log(problemName2(input));
}

Deno.test.ignore(function baseCase1() {
  mod.assertEquals(
    problemName1([
    ]),
    0,
  );
});

Deno.test.ignore(function baseCase2() {
  mod.assertEquals(
    problemName2([
    ]),
    0,
  );
});

Deno.test.ignore(function realCase1() {
  mod.assertEquals(
    problemName1(
      Deno.readTextFileSync("./day_x_problem_name_input.txt").split("\n"),
    ),
    0,
  );
});

Deno.test.ignore(function realCase2() {
  mod.assertEquals(
    problemName2(
      Deno.readTextFileSync("./day_x_problem_name_input.txt").split("\n"),
    ),
    0,
  );
});
