import * as mod from "https://deno.land/std@0.209.0/assert/mod.ts";


function scratchOffs1(lines: string[]): number {
  let total = 0;

  for (const line of lines) {
    const winningNumbers = line.replace(/.*?:((\s+\d+)+)\s+\|.*/, '$1').trim().split(/\s+/);
    const ourNumbers = line.replace(/.*?\|((\s*\d+)+)/, '$1').trim().split(/\s+/);

    const numMatches = ourNumbers.filter(num => winningNumbers.includes(num)).length;

    total += Math.floor(2**(numMatches-1));
  }

  return total;
}

// Part 2 illustration of the number of card copies at each step.
//
// Each row represents processing another Card and updating
// the list of copies including the original
//
// [1, 2, 2, 2, 2, 1]; // Card 1
// [1, 2, 4, 4, 2, 1]; // Card 2
// [1, 2, 4, 8, 7, 1]; // Card 3
// [1, 2, 4, 8,14, 1]; // Card 4
// [1, 2, 4, 8,14, 1]; // Card 5
// [1, 2, 4, 8,14, 1]; // Card 5
//  1  2  3  4  5  6   // Card Number

function scratchOffs2(lines: string[]): number {
  const numCopiesPerCard: number[] = [...Array(lines.length)].map(_ => 1);

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const winningNumbers = lines[lineIdx].replace(/.*?:((\s+\d+)+)\s+\|.*/, '$1').trim().split(/\s+/);
    const ourNumbers = lines[lineIdx].replace(/.*?\|((\s*\d+)+)/, '$1').trim().split(/\s+/);

    const numMatches = ourNumbers.filter(num => winningNumbers.includes(num)).length;

    for (let numMatchesIdx = 0; numMatchesIdx < numMatches; numMatchesIdx++) {
      const copyCardIdx = lineIdx + 1 + numMatchesIdx;
      if (copyCardIdx === numCopiesPerCard.length) break;

      numCopiesPerCard[copyCardIdx] += numCopiesPerCard[lineIdx];
    }
  }

  return numCopiesPerCard.reduce((a,b) => a+b);
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("./day_4_scratch_cards_input.txt").split(
    "\n",
  ).slice(0, -1);
  console.log(scratchOffs2(input));
}

Deno.test(function baseCase1() {
  mod.assertEquals(
    scratchOffs1([
      "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
      "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
      "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
      "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
      "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
      "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
    ]),
    13,
  );
});

Deno.test(function baseCase2() {
  mod.assertEquals(
    scratchOffs2([
      "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
      "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
      "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
      "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
      "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
      "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
    ]),
    30,
  );
});

Deno.test(function realCase1() {
  mod.assertEquals(
    scratchOffs1(
      Deno.readTextFileSync("./day_4_scratch_cards_input.txt").split("\n").slice(0, -1),
    ),
    23941,
  );
});

Deno.test(function realCase2() {
  mod.assertEquals(
    scratchOffs2(
      Deno.readTextFileSync("./day_4_scratch_cards_input.txt").split("\n").slice(0, -1),
    ),
    5571760,
  );
});
