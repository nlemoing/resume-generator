
What makes a good crossword? Over the past year, I've solved almost 400, and I still have a hard time coming up with an answer that feels cohesive. Many of the criteria are subjective, contradictory, and situational; the best definition I've seen for a good puzzle is "one people enjoy". Here are some of my personal markers:

* Clues should be be challenging, but achievable, regardless of the solver's background.
* Clues shouldn't simply be definitions; the best ones leverage wordplay to misdirect or deceive solvers. Too much misdirection, however, and and a puzzle can become impenetrable.
* Words used should be in the lexicon, but a good crossword stretches the solver's vocabulary and incorporates interesting answers.
* Vowel-heavy filler answers and proper nouns are sometimes a necessary evil to stitch together a grid, but should be kept to a minimum. Even one or two clunky entries in an otherwise excellent grid can leave a poor taste in a solver's mouth.

Add in the fact that you have to make these words actually cross one another, and the feat of constructing a puzzle that delights solvers seems insurmountable. Luckily, advances in constructor tools over the last few decades have made this noble goal slightly more attainable.

## The role of software

Even today, computers have difficulty generating a complete crossword grid from scratch. The problem of filling a dense grid using a given dictionary is incredibly hard, computationally.[1]. It's easy for a computer to verify that a given grid is valid; all it has to do is go through each of the clues and check to see if it's in the dictionary. However, coming up with the grid itself involves searching a huge number of possibilities.

However, the majority (maybe all?) modern crossword constructors use software as an assistive tool. Constructors typically provide the marquee entries to a grid, which helps dramatically reduce the number of possibilities that have to be checked, and use software to provide inspiration for the rest of the grid. 

However, this process can also be tedious; most construction software uses dictionaries with hundreds of thousands of words, many of which may be esoteric, difficult to clue, or downright non-sensical. The software focuses on coming up with *something* quickly and allows the constructor to iterate quickly by letting them exclude entries they don't want from the grid. 

## 

Even if filling a grid is hard in general, I had a hard time letting go of the idea that, given certain constraints, we could allow a computer to help us find surprising and interesting grids, even if it takes a while. Inspired by the [NYT Mini Crossword](https://www.nytimes.com/crosswords/game/mini), I decided to try to create my own. but using a dictionary that completely avoided proper nouns and common crossword filler answers. Luckily, someone else had already created one that was perfect for my use-case.

In Josh Wardle's original version of Wordle, there were over 10,000 5-letter words accepted by the game as input. However, Wardle and his wife whittled down the list of words that could actually be used as answers to just 2,310, excluding words like "aalii", "fices", and "weamb" from the list of possibilities. This is exactly what I was looking for: a human-curated, proper-noun-free list of words that someone could reasonably be expected to know.

Armed with a word list, the next step was writing a program to create a grid.
<> Insert game here

Given a (partially filled) grid:
1. If the grid is fully filled in and valid, return it!
2. Otherwise, pick a clue to start with
3. For each word in the dictionary which fits in that clue, fill it in. Search that grid for a solution. If there was a valid solution, return it, otherwise continue to the next word.

I started by writing a program that did this, and it was able to fill in grids that had 3 or more clues already filled in quite quickly. However, with more open spaces, the program started hanging; it had too many possibilities to explore. To help this run more quickly, there were two places I optimized:

1. Clue choice: since we can arrive at the same grid starting at any clue, it's typically best to start by filling in clues that have more constraints first since those clues have fewer matching words that we'll need to check.

2. Word choice: we'd like to start with words that increase our likelihood of finding a valid grid down the line, which means starting with words that leave more possibilities for crossing clues.

With this process, I was able to come up with 50 or so 5x5 grids, and I've published two of them as puzzles on CrossHare: [taking measurements](https://crosshare.org/crosswords/BcOFnK6cWhK4rsoxLvGr/taking-measurements) and [til the cows come home](https://crosshare.org/crosswords/I6os6ho51cCdpqYcodIo/til-the-cows-come-home). Let me know which one is your favourite!

For me, this process highlighted a few more things about crosswords. I was relieved to discover that it is possible to build a puzzle that doesn't use awkward filler words, but I also learned that puzzle isn't guaranteed to be fun to play. A lot of the grids I generated were hard to come up with interesting clues for because they were straightforward dictionary words without much room for wordplay. Coming up with interesting entries, grid arrangements, and clues, is a skill that's uniquely human. Even when computers finish taking over the world, there will still be demand for crosswords with human touch.

## Appendix


[2]: https://www.theatlantic.com/science/archive/2023/08/writing-crossword-puzzle-clues-rules-grammar-compositionality/674938/

[1]: https://www.sciencedirect.com/science/article/abs/pii/S0304397523005881
