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
Using this definition, our original knight was a (2,1)-knight.

Since we're going to have all shapes and sizes of knights as well, we'll be increasing the board to allow for space to move as needed.

### Limitations

<figure>
<svg id='2-1-knight-bfs'></svg>
<figcaption>For a regular knight, every square is reachable.</figcaption>
</figure>

A regular knight can eventually reach any square from any other square on any rectangular board, given enough steps.
Therefore, it's more interesting to look at what a knight *can't* do than what it can. We'll set the knights up to explore
every possible path from their starting position and look for any squares they can't reach.

#### Commonality calamities

<figure>
<svg id='common-4-2-knight-bfs'></svg>
<svg id='common-6-9-knight-bfs'></svg>
<figcaption>For these knights, some rows and columns are entirely inaccessible.</figcaption>
</figure>

Above, we have a (4,2)-knight (left) and a (6,9)-knight (right). Some of the rows and columns remain white even after the knights have finished moving. The knight simply can't reach them from its starting position. This happens because the numbers associated with the knights share a common factor: 4 and 2 are both multiples of 2, while 6 and 9 are multiples of 3. 

Why should this matter? Think of the knight's position as a coordinate on a grid. Each time the knight moves, we are adding or subtracting the knight's numbers with the old coordinates to get new ones. Since the knight's numbers have a factor in common, we are always changing our coordinates by some multiple of that factor.

<figure>
<div class='stacked-knight-graphics'>
<svg id='common-6-9-rw'></svg>
<svg id='common-6-9-rw-text'></svg>
</div>
<figcaption>Since 6 and 9 are both multiples of 3, we are always changing our coordinates by a multiple of 3.</figcaption>
</figure>

Let's say we pick (4, 5) as our starting position. 4 is one above a multiple of 3, so we can write it as 1 + 3(1). If we add a 6 or a 9, we can add them to the right part of the number without affecting the left since they are also multiples of 3. Our x coordinate will always be one above a multiple of 3; never two above a multiple of 3, nor a multiple of 3 itself.

Mathematicians have special terminology for being "one above a multiple of 3". They would say that 4 is *congruent* to 1, *modulo* 3. Basically, this means that 1 and 4 have the same remainder when divided by 3. This is also true of 7, 10, and an infinite amount of other numbers. Mathematicians don't have time to list an infinite amount of numbers, so when they want to talk about *all* the numbers with this property, they call this group the *congruence class* of 1, *modulo* 3. 

Like we saw above, if we add a multiple of 3 to a number, it'll remain in the same congruence class, *modulo* 3. We can also define congruence classes *modulo* other numbers as well; the same property will hold.

If a knight's numbers share a factor, then we will always be adding a multiple of that factor to our coordinates, trapping us in the same congruence class forever.

#### Parity problems

<figure>
<svg id='parity-3-1-knight-bfs'></svg>
<figcaption>This knight can't reach certain diagonals.</figcaption>
</figure>

Although the (2,1)-knight had no problems reaching every square, the (3,1)-knight can't reach half of them. Since 3 and 1 have no numbers in common, this is a different problem than we ran into earlier.

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

Take a look at the ones where the knight is able to reach every square. In this chart, they're organized in a checkerboard pattern not unlike the checkerboard pattern made by the (3,1)-knight. This all has to do with the *parity* of the knight.

*Parity* is just another way of saying if something is even or odd. Normally, we deal with parity of numbers: 4 has even parity while 7 has odd parity. It turns out pairs of numbers have parity as well: you just take the parity of the two numbers added together. For example, (2,1) is odd since 3 is odd, while (3,1) is even since 4 is even.

Every knight that is able to reach every square has the same parity: odd. Why would that be?

<figure>
<svg viewBox="0 0 100 100">

</svg>
<figcaption>Adding evens and odds, illustrated</figcaption>
</figure>

It turns out a lot of the same properties of single-number parities apply to parities of pairs as well. For example, when you add an even number to another number, the parity will stay the same. If you add an odd number, the parity will swap!

<figure>
<svg id='parity-2-1-rw'></svg>
<svg id='parity-3-1-rw'></svg>
<figcaption>Odd squares are colored red while even squares are blue. A (2,1)-knight (left) can reach both even and odd squares, while the (3,1)-knight (right) is stuck with even ones.</figcaption>
</figure>

This is a clue as to why knights with odd parity can reach more squares than even-parity knights. Odd parity knights swap the parity of the coordinate with each move, so we can reach both even and odd squares regardless of where we start. With even knights, on the other hand, we are stuck on the same parity as we started with.

#### Claustrophobic concerns

<figure>
<svg id='5-2-knight-bfs'></svg>
<svg id='8-17-knight-bfs'></svg>
<figcaption>These knights have inaccessible squares in the middle.</figcaption>
</figure>

Everything we've talked about to this point would hold true regardless of the board size. But in some situations, we get interesting patterns if the knight is just a little too big for the board. In these cases, squares in the middle become impossible to reach because the knight can't maneuver tightly enough in the small spaces.

I don't have any insight for the mathematical reason behind this one. If you have any ideas, let me know!

The animations are reminiscent of the [bouncing DVD logo](https://www.youtube.com/watch?v=QOtuX0jL85Y), though.

### Fixing Limitations (TODO)

<figure>
<svg id='fix-4-2'></svg>
<svg id='fix-3-1'></svg>
<svg id='fix-5-2'></svg>
<figcaption>It's all fixed!</figcaption>
</figure>

### Visualizations


