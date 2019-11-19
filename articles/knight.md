Knights in chess are weird. If you look at every other piece, their movements are more-or-less straightforward.
Rooks and kings move in cardinal directions: up, down, left or right. Bishops move along the diagonals.
Queens can do either. Pawns can be a little weird, but in general they always have to move forward on the row they started on. 

Knights are... different. While some pieces, like rooks, bishops and the queen, have no limits on the number of
squares they can travel with each move, no piece besides the knight can jump over another piece in its path. Furthermore, all other 
pieces are restricted to either cardinal (up, down, left, right) or intercardinal (diagonal)
directions. Knights don't have either of these restrictions; they can jump over other pieces, and their
movement is "L"-shaped: two squares in a cardinal direction followed by one square in a perpendicular 
direction. It's because of this that knights have such a unique role in chess; knights are one of the 
first pieces that can be moved (since they can jump over the pieces in front of them), and their unique 
movement pattern makes it easy for them to attack multiple pieces at once.

Still, the movement of knights just feels arbitrary. Why should a knight move in a 2-then-1 pattern? Why not 3 
and 1? Or 4 and 2? The knight is one of the oldest and most consistent pieces in history, but it also 
feels like the one with which we can do the most experimentation. Let's see what happens to the knight if 
we change things up a bit.

<figure>
<svg id='knight-intro-animation'></svg>
<figcaption>A regular knight, randomly roaming.</figcaption>
</figure>

## The Generalized Knight

We've seen how knights move normally: 2 steps in one direction followed by 1 perpendicular 
step. 2 and 1 seem fairly arbitrary. We can replace these with pretty much any pair of whole numbers.
Each of these new knights will still have the same "L"-shaped movement pattern.

From now on, when we refer to an **(a, b)**-knight, we're referring to a knight that takes **a** steps 
in any cardinal direction and then **b** steps in a perpendicular direction. 
Using this definition, our original knight was a **(2,1)**-knight.

To make room for knights of all shapes and sizes, we'll also increase the size of the board when necessary.

### Limitations

<figure>
<svg id='2-1-knight-bfs'></svg>
<figcaption>For a regular knight, every square is reachable.</figcaption>
</figure>

A regular knight can eventually reach any square from any other square on any rectangular board, given enough steps.
Therefore, it's more interesting to look at what a knight *can't* do than what it can. We'll set the knights up to explore
every possible path from their starting position and look for any unreachable area.

#### Commonality calamities

<figure>
<svg id='common-4-2-knight-bfs'></svg>
<svg id='common-6-9-knight-bfs'></svg>
<figcaption>For these knights, some rows and columns are entirely inaccessible.</figcaption>
</figure>

#### Parity problems

<figure>
<svg id='parity-3-1-knight-bfs'></svg>
<figcaption>This knight can't reach certain diagonals.</figcaption>
</figure>

<div id='parity-grid'></div>

#### Claustrophobic concerns

<figure>
<svg id='5-2-knight-bfs'></svg>
<figcaption>These knights have inaccessible squares in the middle.</figcaption>
</figure>

### Visualizations


