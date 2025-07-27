# So you want a computer to make a crossword

Friends of mine know that I like crosswords. I've done the NYT puzzle every day for 2.5 years (including my wedding day, but excluding the week that the NYT tech guild was striking). I wrote a short program to help generate a crossword for our wedding welcome dinner since the available options didn't quite fit the bill. I bought a 200-page crossword book to take with me to Australia so that I would have something to do on the plane.

I think the main reason I like crosswords is that they're logic puzzles, but with an intrinsically human element to them. The grid doesn't consist of computer-filled words from a dictionary because doing so would lead to an unsatisfying puzzle. Clues aren't usually definitional or pure trivia: they're crafted in a manner such that you can arrive at the answer in a number of different ways. Compared to solving a sudoku, crosswords are fuzzy; solving a hard crossword puzzle will involve taking several wrong stabs that have to be corrected later, or using several crossing clues to guess likely (but not certain) squares. Solving a good crossword puzzle feels like a dialogue with the constructor.

That's not to say that computers don't serve an important role in creating modern crosswords. They are often vital assistants, providing an instant lookup for all matching words or phrases for a partially completed grid. But even with LLMs seemingly hell-bent on infiltrating everyone's hobbies and creative pursuits, we are still a long way from computers progressing from providing scalpels and sterilizing equipment to performing surgery[^1]. Here's why.

Constraints
* 5x5 grid
* 2000 word Wordle dictionary
* No phrases, no 3/4 letter words

Search
* Filling a crossword is NP-complete: search the problem space
* We can write a naive backtracking algorithm to fill a grid
  * Take a grid state, word list
  * Write a function to produce a list of neighbours
  * For each neighbour, recurse downwards
  * If no neighbours, return empty
  * Table stakes optimization: return if we've already reached a state
  * Even though mini crosswords are only 5x5, this is still too much for this algorithm

Improving `neighbours`
* Lessons learned from crossword puzzles: https://cdn.aaai.org/AAAI/1990/AAAI90-032.pdf

* Naive algorithm drawbacks: look at too many states
  * Which clue to fill? Pick the one with the fewest possibilities.
    * How to figure out fewest possibilities? 
      * Crude estimate based on words in dictionary + letters filled - 2000 words in dict, 2 letters filled = 2000/26^2 options. In the 5x5 case, this means ordering based on the number of letters filled in, descending
      * Run-time estimate: actually figure out how many options a variable has based on the words left in the dictionary. Takes longer but might be more accurate
  * Which word to pick as filler? Try to keep the most options on the table.
    * Pick a subset of k legal words, then look at the unfilled clues it crosses. Figure out how many legal options remain for each unfilled clue and multiply together.
    * Compare different values of k.
  * How to backtrack?
    * Backjumping: https://en.wikipedia.org/wiki/Backjumping
      * https://iq.opengenus.org/backjumping/
      * Let's say we've already filled 4 clues and are trying to fill a 5th, and it turns out there's nothing that works for the 5th clue. Naive approach would change the value of the 4th clue then retry the 5th clue. However, maybe the 4th clue doesn't affect the 5th clue at all and changing it wouldn't affect the result.
      * If the clue we're trying to fill is a dead end, we can find the back-jumping point by removing words in reverse order and seeing if we're still unable to fill the current clue. If so, we can skip going back to that state entirely
      * Intuition: let's say we have a partially filled grid and are picking words to go in an unfilled clue 5. We go through all available remaining words and check them against the clues we've filled already. For each word, we care about the earliest clue that conflicts. Why? Let's say we get to the end and nothing has worked. Then we want to pick something in our partial solution to fix. Let's say in every case where clue 4 is a problem, clue 2 is as well. Then, if we change clue 4, eventually we'll get back to clue 5, and when we try to fill it in, clue 2 will still be a problem so we won't have made any progress. 

Backjumping example: c1 = treat, c2 = reach, trying to fill column 2 down, all the remaining words in the dictionary which don't have e in position 2 also don't have r in position 1
treat
beach

{ anode, batch, clued, deter }
anode conflicts with 1 and 2
batch conflicts with 1 and 2
clued conflicts with 1 and 2
deter conflicts with 1 only

removing reach and replacing it with a different word will still result in the same state eventually
however, removing treat will allow for deter to be filled in column 2
therefore, reach is not the problem

[^1]: Comparing crosswords to surgery may not be appropriate since there's a vast gap in difficulty: clearly, making crosswords is much harder. 
