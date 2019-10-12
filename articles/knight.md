Knights in chess are weird. If you look at every other piece, they're allowed to move according to 
some reasonable set of restrictions. Rooks and kings move in cardinal directions. Bishops move along 
the diagonals. Queens can do either. To a lesser extend, so can pawns, but they always have to move
forward. If you can accept the fact that certain pieces move in certain ways, then these seem like 
the first ones you would come up with.

Knights are... different. While some pieces, like rooks, bishops and the queen, are unlimited in the
number of squares they can move, none of them can jump over a piece in their path. Furthermore, all other 
pieces are restricted to either cardinal (North, South, East, West) or intercardinal (NW, NE, SW, SE)
movements. Knights don't have either of these restrictions: they can jump over other pieces and they
move in an "L" shape: two squares in a cardinal direction followed by one square in a perpendicular 
direction. It's because of this that knights have such a unique role in chess; knights are one of the 
first pieces that can be moved (since they can jump over the pieces in front of them), and their unique 
movement pattern makes it easy for them to attack multiple pieces at once.

Still, the movement of knights just feels arbitrary. If a knight can move 2 squares, then 1, why not 3 
and 1? Or 4 and 2? The knight is one of the oldest and most consistent pieces in history, but it also 
feels like the one with which we can do the most experimentation. Let's see what happens to the knight if 
we change things up a bit.

## New and Improved: The Generalized Knight

We've seen how knights move normally: **2** steps in one direction followed by **1** perpendicular 
step. 2 and 1 seem fairly arbitrary. We can replace these with pretty much any pair of whole numbers.
Each of these new knights will still have the same "L"-shaped movement pattern, just with slightly 
different distances.

An **(a, b)**-knight takes **a** steps in any cardinal direction and then **b** steps in a perpendicular 
direction. Using this definition, our original knight was a **(2,1)**-knight. Try using it below to capture 
the black knight. Valid moves are highlighted in green and you can reset the knight to its original 
position by clicking on it.

<div class="chessboard" id="game1"></div>

Knights are tricky to move, at least compared with other pieces that move in a straight line.
Even with the most optimal set of moves, a knight still takes **5** moves to capture the black knight from 
its starting position. So what happens to the movement if we try some other knight varieties? 

## The common factor problem

Our first experiment involves a "doubled" knight. Instead of a **(2,1)**-knight, we'll double its movements 
and use a **(4, 2)**-knight.

<div class="chessboard" id="game2"></div>

Part of what makes this knight tricky to maneuver is its size relative to the board; each step takes the 
knight halfway across the board in some direction. Even with an infinite board, though, we wouldn't be 
able to capture the black knight. Because of this choice of knight, there's a whole swath of unreachable 
squares.

Imagine the board was on a co-ordinate grid, with a number corresponding to each square's row and column. 
Our knight starts at row 0, column 0. With the **(4,2)**-knight, each movement changes the knight's x 
co-ordinate by either 2 or 4 squares in either direction. The same applies for the y co-ordinate. Because 
of this, the knight will always stay on squares with even co-ordinates, so any odd rows or columns are 
inaccessible. Capturing the black knight with the **(4,2)**-knight is impossible because it lives in the 
7th column.

This can happen even if the numbers aren't both even. For example, if we had a very large chessboard and 
a **(3, 9)**-knight, the co-ordinates would change by a multiple of 3 with each move. If another square's 
co-ordinates weren't a multiple of 3, we wouldn't be able to reach it. If we choose our **a** and **b** so 
that they share _any_ factors (not including 1), there will be a number of squares that are impossible to 
reach. Even if we have a chessboard that extends forever. I'll show this below. 

So, if we want to be able to reach every square, we can't choose **a** and **b** if they share any factors that aren't 1.

## The parity problem

The next experiment will be with a **(3, 1)**-knight. 3 and 1 don't have any common factors (excluding one),
so we should be able to reach every row and column.

<div class="chessboard" id="game3"></div> 

It turns out that this choice has its own set of problems. Even though we're able to get to every row and 
every column somehow, we still can't capture the other piece. To see why, take a look at the color of the 
squares that we're able to reach. We start on a dark square. Each new move leaves us on a dark square as 
well. With the knight we chose, there's no way to get to any of the light squares.

The **(3,1)**-knight belongs to a larger family of knights for which this happens. This has to do with the 
_parity_ of these knights. A number's parity tells us whether that number is even or odd. 2, 42 and 0 
have even parity, while 7 and 31 have odd parity. Co-ordinates also have a parity: the parity of a 
co-ordinate (x, y) is the parity of x + y (the parity of the number we get when we add each of the 
co-ordinates together). (3,1) is even since 3 + 1 is 4, while (4, 7) is odd since 4 and 7 add to 11.
The chessboard is actually colored according to the parity of its co-ordinates: light squares are odd and 
dark squares are even. It turns out that any knight with even parity (including both **(3,1)** and **(4,2)**) 
will be part of this family of knights.

Remember that we were only able to reach dark squares with the **(3,1)**-knight. This happens because 
**(3,1)** is an even co-ordinate. When we move the knight, we are really adding or subtracting **(3,1)** with 
our current co-ordinate to get the next co-ordinate. Adding an even number to an even number will always 
give us an even number. This is no different when using two dimensions.Since we started on an even (dark) 
square, and each move adds an even number to our co-ordinates, we'll only ever end up on an even (dark) 
square.

## Finally, a working example

So far we've only looked at examples that haven't worked. Are there any that do?
Well, **(2,1)**-knights can reach any square, so there is at least one example that works.
It turns out that, for an **(a, b)**-knight, as long as **a** and **b**
 - have no common factors, and
 - add up to an odd number,
then we can reach any other square (if we have an unlimited amount of space). 
Below is a **(4,1)**-knight. It feels a lot harder to control than the **(2,1)**-knight, but it can still capture the other piece in **6** moves.

<div class="chessboard" id="game4"></div> 

## The small board problem

There's one last problem. I mentioned earlier that the conditions for reaching every square depend on 
having a certain amount of space. What does the amount of space have to do with anything? Well, when we 
have a larger chessboard, some moves would be possible that weren't before. First, image we have the same 
8 by 8 chessboard with a **(9, 1)**-knight. Clearly, the knight won't be able to move, since each move will 
take it outside the chessboard. With a 100 by 100 chessboard, on the other hand, the knight can move 
around with relative ease.

This was an extreme example, but interesting things happen by making small adjustments to knights we've 
already seen. On the same chessboard, a **(5,2)**-knight will not be able to reach the inner four squares, 
even though 2 and 5 seem to satisfy our criteria above. See if you can figure out why that would be. Once 
you've got that, why would it happen in general?

<div class="chessboard" id="game5"></div> 
