Knights in chess are weird. If you look at every other piece, their movements are more-or-less straightforward.
Rooks and kings move up, down, left or right. Bishops move along the diagonals.
Queens can do either. Pawns are a little weird, but in general they always have to move forward. 

Knights are... different. No piece besides the knight can jump over another piece in its path. Furthermore, all other 
pieces are restricted to moving up, down, left, right or diagonally. With their "L"-shaped movement, knights fall somewhere between the 8 compass points, moving in a direction no other piece can. It's because of these unique features that knights have such an interesting and important role in chess; knights are one of the 
first pieces that can be moved (since they can jump over the pieces in front of them), and their unique 
movement pattern makes it easy for them to attack multiple pieces at once.

Still, the movement of knights feels somewhat arbitrary. Knights travel by taking two steps in one direction and then another step perpendicularly. But why shouldn't a knight take three steps, then another perpendicular one? Or four and two? There are a number of other possibilities that can be chosen while maintaining the "L"-shaped *spirit* of the knight. The knight is one of the oldest and most consistent pieces in history, but it also 
feels like the one with which we can do the most experimentation. Let's see what happens to the knight if 
we change things up a bit.

<figure>
<svg id='knight-intro-animation'></svg>
<figcaption>A regular knight, randomly roaming.</figcaption>
</figure>

## The Generalized Knight

The idea is this: we replace the normal two-then-one pattern knights have with an *a*-then-*b* pattern, where *a* and *b* can be any whole number. From now on, when we refer to an **(a, b)**-knight, we're referring to a knight that takes **a** steps 
in any direction and then **b** steps in a perpendicular direction. 
Using this definition, the original knight is a (2,1)-knight.

The regular 8-by-8 board will be too small for most of these knights to move around in. We'll adjust the board size based on the knight we look at to account for this.

### Limitations

<figure>
<svg id='2-1-knight-bfs'></svg>
<figcaption>For a regular knight, every square is reachable.</figcaption>
</figure>

A regular knight can eventually reach *any* square from *any* other square on *any* rectangular board, given enough steps.
Therefore, it's more interesting to look at what a knight *can't* do than what it can. The knights we'll look at will explore every possible path they can take from their starting position. We'll take a look at the squares that they can't reach and try to understand why.

#### Commonality calamities

<figure>
<svg id='common-4-2-knight-bfs'></svg>
<svg id='common-6-9-knight-bfs'></svg>
<figcaption>For these knights, some rows and columns are entirely inaccessible.</figcaption>
</figure>

Above, we have a (4,2)-knight (left) and a (6,9)-knight (right). Some of the rows and columns remain unvisited even after the knights have finished moving. The knights simply can't reach them from their starting positions. This happens because the numbers associated with the knights share a common factor: 4 and 2 are both multiples of 2, while 6 and 9 are multiples of 3. 

Why should this matter? Think of the knight's position as a coordinate on a grid. Each time the knight moves, we are adding or subtracting the knight's numbers with the old coordinates to get new ones. Since the knight's numbers have a factor in common, we are always changing our coordinates by some multiple of that factor.

<figure>
<div class='stacked-knight-graphics'>
<svg id='common-6-9-rw'></svg>
<svg id='common-6-9-rw-text'></svg>
</div>
<figcaption>Since 6 and 9 are both multiples of 3, we are always changing our coordinates by a multiple of 3.</figcaption>
</figure>

Let's say we pick (4, 5) as our starting position. 4 is one above a multiple of 3, so we can write it as 1 + 3(1). Similarly, we can write 5 as 2 + 3(1). We're breaking 4 and 5 up into their quotient (1) and remainder (1 and 2, respectively) when they're divided by 3. If we want to add any multiple of 3 to these numbers, only the quotient will change. That's exactly what's happening when we move the knight since we are always changing each coordinate by either 6 or 9. Our x coordinate will always be one above a multiple of 3; never two above a multiple of 3, nor a multiple of 3 itself. 

Mathematicians have special terminology for being "one above a multiple of 3". They would say that 4 is *congruent* to 1, *modulo* 3. Basically, this means that 1 and 4 have the same remainder when divided by 3. This is also true of 7, 10, and an infinite amount of other numbers. It's not very convenient list an infinite amount of numbers, so there's a catch-all term for when you want to talk about *all* the numbers with this property: the set of all numbers one greater than a multiple of 3 is the *congruence class* of 1, *modulo* 3. Because of the remainder property we saw above, our coordinates will always stay in the same congruence class (*modulo* 3) that they began in because we're always adding multiples of 3. This is why our knight can only reach every third row and column.

The same general idea happens when the knight's numbers share any factor other than 1. If a knight's numbers share a factor, then we will always be adding a multiple of that factor to our coordinates, trapping us in the same congruence class forever.

#### Parity problems

<figure>
<svg id='parity-3-1-knight-bfs'></svg>
<figcaption>This knight can't reach certain diagonals.</figcaption>
</figure>

Although the (2,1)-knight had no problems reaching every square, the (3,1)-knight can't reach half of them. Since 3 and 1 have no numbers in common, this is a different problem than we ran into earlier. If we look at some more examples, we might get more insight into why this is happening. 

<figure>
<div id='parity-grid'>
    <span></span>
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span></span>
    <span>1</span>
    <img src="/images/knight/1-1.png"></img>
    <img src="/images/knight/1-2.png"></img>
    <img src="/images/knight/1-3.png"></img>
    <img src="/images/knight/1-4.png"></img>
    <span></span>
    <span>2</span>
    <img src="/images/knight/1-2.png"></img>
    <img src="/images/knight/2-2.png"></img>
    <img src="/images/knight/2-3.png"></img>
    <img src="/images/knight/2-4.png"></img>
    <span></span>
    <span>3</span>
    <img src="/images/knight/1-3.png"></img>
    <img src="/images/knight/2-3.png"></img>
    <img src="/images/knight/3-3.png"></img>
    <img src="/images/knight/3-4.png"></img>
    <span></span>
    <span>4</span>
    <img src="/images/knight/1-4.png"></img>
    <img src="/images/knight/2-4.png"></img>
    <img src="/images/knight/3-4.png"></img>
    <img src="/images/knight/4-4.png"></img>
    <span></span>
</div>
<figcaption>Breadth-first-search with several knight configurations. Squares are colored by the number of steps it takes to reach. Black squares aren't reached by the knight.</figcaption>
</figure>

Take a look at the ones where the knight is able to reach every square. In this chart, they're organized in a checkerboard pattern not unlike the checkerboard pattern made by the (3,1)-knight. This all has to do with the *parity* of the knight.

*Parity* is just another way of saying if something is even or odd. Normally, we deal with parity of numbers: 4 has even parity while 7 has odd parity. It turns out pairs of numbers have parity as well: you just take the parity of the two numbers added together. For example, (2,1) is odd since 3 is odd, while (3,1) is even since 4 is even.

In the figure above, each knight that is able to reach every square has odd parity. Why would that be?

It turns out a lot of the same properties of single-number parities apply to parities of pairs as well. For example, when you add an even number to another number, the parity will stay the same. If you add an odd number, the parity will swap!

<figure>
<svg id='parity-2-1-rw'></svg>
<svg id='parity-3-1-rw'></svg>
<figcaption>Odd squares are colored red while even squares are blue. A (2,1)-knight (left) can reach both even and odd squares, while the (3,1)-knight (right) is stuck with even ones.</figcaption>
</figure>

This is a clue as to why knights with odd parity can reach more squares than even-parity knights. Odd parity knights swap the parity of their coordinate with each move, so we can reach both even and odd squares regardless of where we start. With even knights, on the other hand, we are stuck on the same parity as we started with. This is why the (3,1)-knight can only reach half the squares that the (2,1)-knight can.

#### Claustrophobic concerns

<figure>
<svg id='5-2-knight-bfs'></svg>
<svg id='8-17-knight-bfs'></svg>
<figcaption>These knights have inaccessible squares in the middle.</figcaption>
</figure>

Everything we've talked about to this point would hold true regardless of the board size. But in some situations, we get interesting patterns if the knight is just a little too big for the board. In these cases, squares in the middle become impossible to reach because the knight can't maneuver tightly enough in the small spaces.

I don't have any insight for explaining when patterns like these will occur. If you have any ideas, let me know!

The animations are reminiscent of the [bouncing DVD logo](https://www.youtube.com/watch?v=QOtuX0jL85Y), though.

### Reaching every square

Generalizing knights thus far has been unsuccessful. Because many of our generalized knights are unable to reach some of the squares, they have been rendered much less useful on the chessboard. Only *(a,b)*-knights that meet a very specific set of criteria can reach every square:

- *a* and *b* must not share any factors
- *a + b* must be odd
- *a* and *b* can't be too big relative to the size of the board

However, it turns out a small tweak to the board itself will allow any of the limited knights we've discussed to reach any square.

#### When in doubt, take the modulus

The modulus operation is another name for the process of taking the remainder of one number divided by another. We've already talked a little bit about the modulus when we looked at knights that shared common factors. In that context, we saw how knights with common factors would miss some rows and columns because they were restricted to the same congruence class: the coordinates always had the same remainder when divided by the common factor.

The most common place to encounter the modulus outside of a math classroom is on a wall clock. If it's 10 o'clock and you wait 3 hours, it'll be 1 o'clock. We're taking the modulus with respect to 12 after we add 3 hours. After 12, the hours wrap back around to 1. Effectively, the modulus makes numbers wrap around to 0 in a cyclical manner.

We can also use the modulus in the context of the knight's coordinates. Instead of preventing the knight from moving past the board's boundary, what if we allowed the knight to wrap around to the other side of the board? To do so, we could first add the knight's coordinates, like before. To get the knight's final position, we can take the modulus of the resulting coordinates with respect to the board's size to ensure that the new coordinates are within the board's boundary. This has the effect of making the knight wrap around the board as it moves.

It's not immediately clear how the modulus will help us solve the problems we had with the knight. First, let's answer a simpler question from the 1D case: what happens if we repeatedly add 3 hours on a regular wall clock? It turns out we'll only see 4 different times. On the other hand, if our wall clock had 11 hours instead of 12, we would eventually see all the hours.

<figure>
<svg id='clock-12'></svg>
<svg id='clock-11'></svg>
<figcaption>Each step adds three hours to the time. On the left, the clock has 12 hours while the one on the right has 11. If the size of step we take shares factors with the modulus we use, we won't be able to reach some numbers.</figcaption>
</figure>

The difference between the two cases is that 12 and 3 share a common factor but 11 and 3 don't. This is similar to the common factor problem we saw earlier: sharing factors causes some numbers to be skipped. However, if we make sure that the number we take the modulus with doesn't share factors with our knight, we should be able to reach every square. By picking a prime number, like 11, we can guarantee that no knight will have a shared factor with it.

So long as the prime we pick is odd, we'll also solve our parity problem. Adding two even numbers can result in an odd number if the numbers we add are large enough to cause a wrap-around. Suppose we pick 7 for our modulus. Normally, 4 + 4 = 8, which is even as expected. However, 8 is congruent to 1 *modulo* 7, and 1 is an odd number. If we add 4 and 4 modulo 7, we actually get an odd result by adding even numbers. Before, we saw issues with even knights because there was no way of changing parities by adding even numbers. With the modulus, we now have a way of getting an odd number by adding two evens.

Finally, our spatial constraint problem should be solved as well, albeit for a less interesting reason: the modulus removes the boundaries at the edge of the board by allowing knights to wrap around to the other side. With no spatial constraints, the knight is able to reach every square on the board.

<figure>
<svg id='fix-4-2'></svg>
<svg id='fix-3-1'></svg>
<svg id='fix-5-2'></svg>
<figcaption>The same boards that gave us problems earlier, this time on a 7 by 7 grid using the modulus to compute coordinates. Since 7 is prime, we can reach every square with any knight we choose.</figcaption>
</figure>

It turns out the secret to unlocking the potential of a generalized knight is to extend our idea of the board as well. What we're left with doesn't very closely resemble chess, but it does generate some pretty pictures.

### Further reading

- [Tom7's chess](http://tom7.org/chess/): some awesome chess-related explorations that inspired me to write this post
- [Generalized knight’s tours on rectangular chessboards](https://core.ac.uk/download/pdf/82621071.pdf): more fun with generalized knights
- [Modular arithmetic](https://en.wikipedia.org/wiki/Modular_arithmetic): some more detailed mathematical explanations of modular arithmetic
- [Cryptonomicon, by Neal Stephenson](https://en.wikipedia.org/wiki/Cryptonomicon): excellent book that contains descriptions of modular arithmetic as it applies to cryptography
