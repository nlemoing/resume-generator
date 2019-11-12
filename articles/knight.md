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

In fact, if **a** and **b** share _any_ factors (not including 1), there will be a number of squares that are impossible to reach. Even if we 
have a chessboard that extends forever.

So, if we want to be able to reach every square, we can't choose **a** and **b** if they share any factors that aren't 1.

## The parity problem

The next experiment will be with a **(3, 1)**-knight. 3 and 1 don't have any common factors (excluding one),
so we should be able to reach every row and column.

<div class="chessboard" id="game3"></div> 

It turns out that this choice has its own set of problems. Even though we're able to get to every row and 
every column somehow, we still can't capture the other piece. To see why, take a look at the color of the 
squares that we're able to reach. We start on a dark square. Each new move leaves us on a dark square as 
well. With the knight we chose, there's no way to get to any of the light squares.

It turns out there's quite a few knights that are similarly confined to one color of squares.
A **(7, 5)** knight would have the same problem, as would a **(6, 4)** knight. These knights all share
the same problem because they are all _even_. In the same way that individual numbers can be even or odd,
so can pairs of numbers (or triplets, or quadruplets, or... you get the point). 

Before we go into how this is defined, there's some useful vocab we should know: the even-ness or odd-ness of a number is known as its _parity_. To find the parity of individual numbers, we check if they're divisible by two. If they are, they're even. Otherwise, they're odd. We can extend that definition to pairs of numbers: first, add the two numbers in the pair together, then check the parity of the result. The parity of the pair is the parity of whatever the result is. So, (7,3) and (6,4) are both even because their sums, 12 and 10, are even as well.

What does that have to do with the color of the squares? Recall that whenever you add an even number to another number, the parity stays the same. This is also true for two dimensions! When we move the knight, we can think of it as adding the knight pair to our current co-ordinate pair. If the knight is even, the parity of the co-ordinate will stay the same as well. This means that if our starting parity is odd, it will stay odd no matter which moves we can make, so we can never reach a square with even parity.

This is easy to see visually because the chessboard is colored according to the parity of the squares!

## Finally, a working example

So far we've only looked at examples that haven't worked. Are there any that do?
Well, **(2,1)**-knights can reach any square, so there is at least one example that works.
It turns out that, for an **(a, b)**-knight, as long as **a** and **b**
 - have no common factors besides one, and
 - add up to an odd number,
then we can reach any other square (if we have an unlimited amount of space). 
Below is a **(4,1)**-knight. It feels a lot harder to control than the **(2,1)**-knight, but it can still capture the other piece in **6** moves.

<div class="chessboard" id="game4"></div> 

## The small board problem

There's one last problem. I mentioned earlier that the conditions for reaching every square depend on 
having a certain amount of space. What does the amount of space have to do with anything? Well, when we 
have a larger chessboard, some moves would be possible that weren't before. First, imagine we have the same 
8 by 8 chessboard with a **(9, 1)**-knight. Clearly, the knight won't be able to move, since each move will 
take it outside the chessboard. With a 100 by 100 chessboard, on the other hand, the knight can move 
around with relative ease.

This was an extreme example, but interesting things happen by making small adjustments to knights we've 
already seen. On the same chessboard, a **(5,2)**-knight will not be able to reach the inner four squares,
even though 2 and 5 seem to satisfy our criteria above.

<div class="chessboard" id="game5"></div> 

## Visualizations


