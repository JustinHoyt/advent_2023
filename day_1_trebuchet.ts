const lines = Deno.readTextFileSync("./day_1_trebuchet_input.txt").split("\n");

// Part 1
console.log(lines.reduce((sum: number, line: string) => {
  const digits = line.match(/\d/g);
  if (digits == null || digits.length === 0) return sum;

  return sum + Number(`${digits.at(0)}${digits.at(-1)}`);
}, 0));

// Part 2
console.log(lines.reduce((sum: number, line: string) => {
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
    (tempLine, { name, replacement }) => tempLine.replaceAll(name, replacement),
    line,
  );

  const digits = newLine.match(/\d/g);
  if (digits == null || digits.length === 0) return sum;

  return sum + Number(`${digits.at(0)}${digits.at(-1)}`);
}, 0));
