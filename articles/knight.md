Knights in chess are weird. If you look at every other piece, their movements are more-or-less straightforward.
Rooks and kings move up, down, left or right. Bishops move along the diagonals.
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

Above, we have a **(4,2)**-knight (left) and a **(6,9)**-knight (right). Both knights are unable to reach entire rows and columns because they share factors. 4 and 2 are both multiples of 2, while 6 and 9 are multiples of 3. Let's focus on the **(6,9)**-knight. Every time we move somewhere, we're adding or subtracting either 6 or 9 from our co-ordinates. As a result, we're always adding a multiple of 2. There's no way for us to get to a number that's between those multiples of two.

<figure>
<svg id='common-6-9-rw'></svg>
</figure>

Any time there's a knight whose numbers share a common factor, there will be some rows and columns that are inaccessible because there's no way to get a co-ordinate between multiples.

#### Parity problems

<figure>
<svg id='parity-3-1-knight-bfs'></svg>
<figcaption>This knight can't reach certain diagonals.</figcaption>
</figure>

Although the **(2,1)**-knight had no problems reaching every square, the **(3,1)**-knight can't reach half of them. Since 3 and 1 have no numbers in common, this is a different problem than we ran into earlier. 

My first instinct when I first saw this was that there was a bug in my code somewhere. My second instinct was to check a bunch of examples and see if I could see a pattern.

<figure>
<div id='parity-grid'>
    <span></span>
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span>1</span>
    <img src="/images/knight/1-1.png"></img>
    <img src="/images/knight/1-2.png"></img>
    <img src="/images/knight/1-3.png"></img>
    <img src="/images/knight/1-4.png"></img>
    <span>2</span>
    <img src="/images/knight/1-2.png"></img>
    <img src="/images/knight/2-2.png"></img>
    <img src="/images/knight/2-3.png"></img>
    <img src="/images/knight/2-4.png"></img>
    <span>3</span>
    <img src="/images/knight/1-3.png"></img>
    <img src="/images/knight/2-3.png"></img>
    <img src="/images/knight/3-3.png"></img>
    <img src="/images/knight/3-4.png"></img>
    <span>4</span>
    <img src="/images/knight/1-4.png"></img>
    <img src="/images/knight/2-4.png"></img>
    <img src="/images/knight/3-4.png"></img>
    <img src="/images/knight/4-4.png"></img>
</div>
<figcaption>Breadth-first-search with several knight configurations. Squares are colored by the number of steps it takes to reach. Black squares aren't reached by the knight.</figcaption>
</figure>

Take a look at the ones where the knight is able to reach every square. In this chart, they're organized in a checkerboard pattern not unlike the checkerboard pattern made by the **(3,1)**-knight. It turns out that for any knight that's able to reach every square on a board, their numbers have to add up to an odd number. 

<figure>
<svg id='parity-2-1-rw'></svg>
<svg id='parity-3-1-rw'></svg>
</figure>

#### Claustrophobic concerns

<figure>
<svg id='5-2-knight-bfs'></svg>
<svg id='8-17-knight-bfs'></svg>
<figcaption>These knights have inaccessible squares in the middle.</figcaption>
</figure>

### Visualizations


