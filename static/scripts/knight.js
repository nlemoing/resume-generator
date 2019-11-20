function animateKnight(options) {

    const { svgContainer, w, h, r, c, a, b, colorFn, nextFn } = options;

    const svg = d3.select(svgContainer).attr('viewBox', `0 0 ${w} ${h}`);
    const highlights = new Array(h);
    for (let r = 0; r < h; r++) {
        highlights[r] = new Array(w).fill(null);
    }

    function valid(r, c) {
        return r >= 0 && c >= 0 && r < h && c < w; 
    }

    function nextMoves(r, c) {
        let moves = [[r + a, c + b], [r + a, c - b], [r - a, c + b], [r - a, c - b],
                     [r + b, c + a], [r + b, c - a], [r - b, c + a], [r - b, c - a]];
        return moves.filter(move => valid(move[0], move[1]));
    }

    function step(r, c, i = 0) {
        const moves = nextFn(nextMoves(r, c));

        if (!highlights[r][c]) {
            highlights[r][c] = svg.append('rect').attr('x', c).attr('y', r)
        }
        const highlight = highlights[r][c];
        const square = svg.append('rect').attr('x', c + 0.5).attr('y', r + 0.5);

        square.transition()
        // grow
            .duration(1000)
            .attr('width', 1)
            .attr('height', 1)
            .attr('x', c)
            .attr('y', r)
        // pause
        .transition()
            .duration(500)
        //shrink
            .duration(1000)
            .attr('width', 0)
            .attr('height', 0)
            .attr('x', c + 0.5)
            .attr('y', r + 0.5)
        .on('end', () => {
            square.remove();
        });

        setTimeout(() => {
            highlight.attr('width', 1).attr('height', 1).style('fill', colorFn(r, c, i));
        }, 1000);

        function next([newR, newC]) {
            const line = svg.append('line')
                .style('stroke-width', 0.1)
                .style('stroke', 'black');

            const rowInterpolator = d3.interpolateNumber(r + 0.5, newR + 0.5);
            const colInterpolator = d3.interpolateNumber(c + 0.5, newC + 0.5);
            function earlyInterpolator(interpolator) {
                return function (t) {
                    return interpolator(Math.min(t / 0.8, 1));
                }
            }
            function lateInterpolator(interpolator) {
                return function (t) {
                    return interpolator(Math.max((t - 0.2) / 0.8, 0));
                }
            }
            line.transition()
                .delay(2500)
                .duration(1000)
                .attrTween('x1', () => earlyInterpolator(colInterpolator))
                .attrTween('y1', () => earlyInterpolator(rowInterpolator))
                .attrTween('x2', () => lateInterpolator(colInterpolator))
                .attrTween('y2', () => lateInterpolator(rowInterpolator))
                .on('end', () => {
                    line.remove();
                    step(newR, newC, i + 1);
                });
        }

        moves.forEach(next);

    }

    let started = false;
    document.addEventListener('scroll', () => {
        if (started) return;
        const { top, bottom } = svgContainer.getBoundingClientRect();
        const { scrollY } = window;
        if (scrollY > bottom) {
            started = true;
            setTimeout(() => step(r, c), 500);
        }        
    })

};

function randomNextMove(moves) {
    return [moves[Math.floor(Math.random() * moves.length)]];
}

function randomColor() {
    return `hsl(${Math.random() * 360},100%,50%)`;
}

function sequentialColor(low, high, gap) {
    return (r, c, i) => d3.interpolateHslLong(low, high)((i % gap) / gap);
}

function parityColor(r, c, i) {
    if (r % 2 && c % 2) return 'red';
    if (r % 2) return 'green';
    if (c % 2) return 'yellow';
    return 'blue';
}

class Board {
    constructor({w, h, r, c}) {
        this.visited = new Array(h);
        for (let row = 0; row < h; row++) {
            this.visited[row] = new Array(w).fill(false);
        }
        this.visited[r][c] = true;
    }

    next(moves) {
        moves = moves.filter(([r, c]) => !this.visited[r][c]);
        moves.forEach(([r, c]) => { this.visited[r][c] = true; });
        return moves;
    }
}

// Introduction: Default Knight, default board, random walk with random colors
animateKnight({
    svgContainer: document.getElementById('knight-intro-animation'),
    w: 8, h: 8, r: 0, c: 0, a: 1, b: 2,
    colorFn: randomColor,
    nextFn: randomNextMove
});

const cf21Options = {
    svgContainer: document.getElementById('2-1-knight-bfs'),
    w: 8, h: 8, r: 0, c: 0, a: 1, b: 2,
    colorFn: sequentialColor('red', 'purple', 12)
}
const cf21Board = new Board(cf21Options);
cf21Options.nextFn = cf21Board.next.bind(cf21Board);
animateKnight(cf21Options);

// Common factors: BFS with various knights with a large (25x25) board.
const cf42Options = {
    svgContainer: document.getElementById('common-4-2-knight-bfs'),
    w: 25, h: 25, r: 0, c: 0, a: 2, b: 4,
    colorFn: sequentialColor('red', 'purple', 12)
}
const cf42Board = new Board(cf42Options);
cf42Options.nextFn = cf42Board.next.bind(cf42Board);
animateKnight(cf42Options);

const cf69Options = {
    svgContainer: document.getElementById('common-6-9-knight-bfs'),
    w: 25, h: 25, r: 0, c: 0, a: 6, b: 9,
    colorFn: sequentialColor('red', 'purple', 12)
}
const cf69Board = new Board(cf69Options);
cf69Options.nextFn = cf69Board.next.bind(cf69Board);
animateKnight(cf69Options);

const cf69rw = {
    svgContainer: document.getElementById('common-6-9-rw'),
    w: 25, h: 25, r: 0, c: 0, a: 6, b: 9,
    colorFn: () => 'red',
    nextFn: randomNextMove
}
animateKnight(cf69rw);

// Parity: BFS with 3,1 knight on a regular board
// More in-depth example with a 2,1 and 3,1 knight side by side
const p31Options = {
    svgContainer: document.getElementById('parity-3-1-knight-bfs'),
    w: 8, h: 8, r: 0, c: 0, a: 1, b: 3,
    colorFn: sequentialColor('red', 'purple', 12)
}
const p31Board = new Board(p31Options);
p31Options.nextFn = p31Board.next.bind(p31Board);
animateKnight(p31Options);

const p21rwOptions = {
    svgContainer: document.getElementById('parity-2-1-rw'),
    w: 8, h: 8, r: 0, c: 0, a: 1, b: 2,
    colorFn: parityColor,
    nextFn: randomNextMove
}
animateKnight(p21rwOptions);

const p31rwOptions = {
    svgContainer: document.getElementById('parity-3-1-rw'),
    w: 8, h: 8, r: 0, c: 0, a: 1, b: 3,
    colorFn: parityColor,
    nextFn: randomNextMove
}
animateKnight(p31rwOptions)

// Tight Spaces: BFS with 5,2 knight on a regular board, 8,17 knight on a 25x25 board
const ts52Options = {
    svgContainer: document.getElementById('5-2-knight-bfs'),
    w: 8, h: 8, r: 0, c: 0, a: 5, b: 2,
    colorFn: sequentialColor('red', 'purple', 8),
}
const ts52Board = new Board(ts52Options);
ts52Options.nextFn = ts52Board.next.bind(ts52Board);
animateKnight(ts52Options);

const ts817Options = {
    svgContainer: document.getElementById('8-17-knight-bfs'),
    w: 25, h: 25, r: 0, c: 0, a: 8, b: 17,
    colorFn: sequentialColor('red', 'purple', 8),
}
const ts817Board = new Board(ts817Options);
ts817Options.nextFn = ts817Board.next.bind(ts817Board);
animateKnight(ts817Options);