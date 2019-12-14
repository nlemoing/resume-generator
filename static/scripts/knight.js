function animateKnight(options) {

    const { svgContainer, w, h, r, c, a, b, colorFn, nextFn, mod, listener } = options;

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
        return mod ? moves : moves.filter(move => valid(move[0], move[1]));
    }

    function isActive() {
        const { top, bottom } = svgContainer.getBoundingClientRect();
        const { innerHeight } = window;
        // A graphic is active if either endpoint is in view
        return (top >= 0 && top <= innerHeight) ||
               (bottom >= 0 && bottom <= innerHeight);
    }
    
    let active = isActive();
    const queue = [];

    function step(r, c, i = 0) {
        
        if (!active) {
            queue.push({r, c, i});
            return;
        }

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
            const newR_mod = (newR + h) % h,
                  newC_mod = (newC + w) % w,
                  r_mod = r - (newR - newR_mod)
                  c_mod = c - (newC - newC_mod);

            const line = svg.append('line')
                .style('stroke-width', 0.1)
                .style('stroke', 'black');
            
            const modLine = mod ? svg.append('line')
                .style('stroke-width', 0.1)
                .style('stroke', 'black') : null;

            const rowInterpolator = d3.interpolateNumber(r + 0.5, newR + 0.5);
            const colInterpolator = d3.interpolateNumber(c + 0.5, newC + 0.5);
            const modRowInterpolator = d3.interpolateNumber(r_mod + 0.5, newR_mod + 0.5);
            const modColInterpolator = d3.interpolateNumber(c_mod + 0.5, newC_mod + 0.5);
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
                .on('start', () => {
                    if (listener) listener(newR_mod, newC_mod);
                })
                .on('end', () => {
                    line.remove();
                    step(newR_mod, newC_mod, i + 1);
                });
            if (modLine) {
                modLine.transition()
                    .delay(2500)
                    .duration(1000)
                    .attrTween('x1', () => earlyInterpolator(modColInterpolator))
                    .attrTween('y1', () => earlyInterpolator(modRowInterpolator))
                    .attrTween('x2', () => lateInterpolator(modColInterpolator))
                    .attrTween('y2', () => lateInterpolator(modRowInterpolator))
                    .on('end', () => {
                        modLine.remove();
                    });
            }
        }

        moves.forEach(next);

    }

    document.addEventListener('scroll', () => {
	    if (active === isActive()) return;
	    if (!active) {
            active = true;
            // Move everything out of queue and into tempQueue
            const tempQueue = queue.splice(0, queue.length);
            tempQueue.forEach(({r, c, i}) => { step(r, c, i); });
        } else {
            active = false;
        }
    });

    step(r, c);

};

function randomNextMove(moves) {
    return [moves[Math.floor(Math.random() * moves.length)]];
}

function randomColor() {
    return `hsl(${Math.random() * 360},100%,50%)`;
}

function sequentialColor(low, high, gap, long = false) {
    const lowHue = `hsl(${low}, 85%, 50%)`;
    const highHue = `hsl(${high}, 85%, 50%)`;
    const interp = long ?
        d3.interpolateHslLong(lowHue, highHue) :
        d3.interpolateHsl(lowHue, highHue);
    return (r, c, i) => interp((i % gap) / gap);
}

function parityColor(r, c, i) {
    return ((r + c) % 2) ? 'red' : 'blue';
}

class Board {
    constructor({w, h, r, c}) {
        this.w = w;
        this.h = h;
        this.visited = new Array(h);
        for (let row = 0; row < h; row++) {
            this.visited[row] = new Array(w).fill(0);
        }
        this.visited[r][c] = true;
    }

    next(moves) {
        const newMoves = [];
        for (const [r, c] of moves) {
            const modR = (r + this.h) % this.h,
                  modC = (c + this.w) % this.w;
            if (!this.visited[modR][modC]) {
                newMoves.push([r,c]);
            }
            this.visited[modR][modC] += 1;
        }
        return newMoves;
    }
}

function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
}

function textAnimation(options) {

    const { svgTextContainer, a, b } = options;
    const cf = gcd(a, b);
    const aq = a / cf;
    const bq = b / cf;

    const svg = d3.select(svgTextContainer);
    svg.attr('viewBox', '0 0 60 30');
    

    Object.getPrototypeOf(svg).length = function () { return this.node().getComputedTextLength() };
    Object.getPrototypeOf(svg).left = function () { return this.node().getBBox().x; }
    Object.getPrototypeOf(svg).right = function () { return this.node().getBBox().width + this.left(); };

    const FIRST_ROW = 16;
    const SECOND_ROW = 23;
    const THIRD_ROW = 30;
    const SPACE = 1;
    const OFFSET = 30;
    const LINE = 10;

    function text(t, x = 0, y = 0) {
        return svg.append('text')
            .text(t)
            .style('font-size', '6px')
            .attr('x', x)
            .attr('y', y)
    }

    function line(x1, x2) {
        return svg.append('line')
            .attr('y1', LINE).attr('y2', LINE)
            .attr('x1', x1).attr('x2', x2)
            .style('stroke-width', 0.5)
            .style('stroke', 'black');
    }

    const [aq_len, bq_len] = (() => {
        const aq_obj = text(`${aq}`)
        const aq_len = aq_obj.length();
        const bq_obj = text(`${bq}`);
        const bq_len = bq_obj.length();
        aq_obj.remove();
        bq_obj.remove();
        return [aq_len, bq_len];
    })();

    let { r, c } = options;
    const cq = Math.floor(c / cf);
    const C_REM    = text(`${c % cf}`, 0,                       FIRST_ROW);
    const C_OP     = text('+',         C_REM.right() + SPACE,   FIRST_ROW);
    const C_CF     = text(`${cf}`,     C_OP.right() + SPACE,    FIRST_ROW);
    const C_LPAREN = text('(',         C_CF.right(),            FIRST_ROW);
    let   C_QUOT   = text(`${cq}`,     C_LPAREN.right(),        FIRST_ROW);
    const C_RPAREN = text(')',         C_QUOT.right(),          FIRST_ROW);
    const C_NAME   = text('X:',        0,                       LINE - 1);
    let   C_NUM    = text(`${c}`,      C_NAME.right() + SPACE,  LINE - 1);
    const C_LINE   = line(0, C_RPAREN.right());

    const rq = Math.floor(r / cf);
    const R_REM    = text(`${r % cf}`, OFFSET,                  FIRST_ROW);
    const R_OP     = text('+',         R_REM.right() + SPACE,   FIRST_ROW);
    const R_CF     = text(`${cf}`,     R_OP.right() + SPACE,    FIRST_ROW);
    const R_LPAREN = text('(',         R_CF.right(),            FIRST_ROW);
    let   R_QUOT   = text(`${rq}`,     R_LPAREN.right(),        FIRST_ROW);
    const R_RPAREN = text(')',         R_QUOT.right(),          FIRST_ROW);
    const R_NAME   = text('Y:',        OFFSET,                  LINE - 1);
    let   R_NUM    = text(`${r}`,      R_NAME.right() + SPACE,  LINE - 1);
    const R_LINE   = line(OFFSET, R_RPAREN.right());
    
    text(`${a}`, C_CF.left(), THIRD_ROW);
    text(`${b}`, R_CF.left(), THIRD_ROW);

    function animate(newR, newC) {
        const diffC = newC - c;
        const diffR = newR - r;
        const swapped = Math.abs(diffC) === b;

        [
            { name: `${a}`, start: C_CF.left(), swap: R_CF.left() },
            { name: `${b}`, start: R_CF.left(), swap: C_CF.left() }
        ].forEach(({name, start, swap, diff}) => {
            text(name, start, THIRD_ROW)
                .transition()
                    .duration(1000)
                    .attr('x', swapped ? swap : start)
                    .attr('y', SECOND_ROW) 
                .transition()
                    .duration(1000)
                    .style('opacity', 0)
                .on('end', function () { this.remove(); });
        });

        [
            { diff: diffC, start: C_OP.left() },
            { diff: diffR, start: R_OP.left() }
        ].forEach(({diff, start}) => {
            text(diff < 0 ? '–' : '+', start, SECOND_ROW)
                .style('opacity', 0)
                .style('fill', diff < 0 ? 'red' : 'green')
                .transition()
                    .duration(1000)
                    .style('opacity', 1)
                .transition()
                    .delay(1000)
                    .duration(1000)
                    .attr('y', FIRST_ROW)
                    .style('opacity', 0)
                .on('end', function () { this.remove(); });
        });

        // Animate factoring
        [
            { name: `${cf}`, dest: C_CF.left(), start: C_CF.left() },
            { name: `(`, dest: C_LPAREN.left(), start: C_CF.left() },
            { name: `${swapped ? bq : aq}`, dest: C_QUOT.left(), start: C_CF.left() },
            { name: ')', dest: C_QUOT.left() + (swapped ? bq_len : aq_len), start: C_CF.left() },
            { name: `${cf}`, dest: R_CF.left(), start: R_CF.left() },
            { name: `(`, dest: R_LPAREN.left(), start: R_CF.left() },
            { name: `${swapped ? aq : bq}`, dest: R_QUOT.left(), start: R_CF.left() },
            { name: ')', dest: R_QUOT.left() + (swapped ? aq_len : bq_len), start: R_CF.left() }
        ].forEach(({ name, dest, start }) => {
            text(name, start, SECOND_ROW)
                .style('opacity', 0)
                .transition()
                    .delay(1000)
                    .duration(1000)
                    .attr('x', dest)
                    .style('opacity', 1)
                .transition()
                    .duration(1000)
                    .attr('y', FIRST_ROW)
                    .style('opacity', 0)
                .on('end', function () { this.remove(); });
        });

        // Fade out and remove old numbers
        [C_QUOT, R_QUOT, C_NUM, R_NUM].forEach(num => {
            num.transition()
                .delay(2000)
                .duration(1000)
                .style('opacity', 0)
                .on('end', function () { this.remove(); });
        });
        // Append and fade in new numbers
        C_QUOT = text(`${Math.floor(newC / cf)}`, C_LPAREN.right(), FIRST_ROW).style('opacity', 0);
        R_QUOT = text(`${Math.floor(newR / cf)}`, R_LPAREN.right(), FIRST_ROW).style('opacity', 0);
        C_NUM = text(`${newC}`, C_NAME.right() + SPACE, LINE - 1).style('opacity', 0);
        R_NUM = text(`${newR}`, R_NAME.right() + SPACE, LINE - 1).style('opacity', 0);
        [C_QUOT, R_QUOT, C_NUM, R_NUM].forEach(num => {
            num.transition()
                .delay(2000)
                .duration(1000)
                .style('opacity', 1)
                .transition();
        });
        // Adjust right parens to fit new numbers
        [{ paren: C_RPAREN, dest: C_QUOT.right() },
         { paren: R_RPAREN, dest: R_QUOT.right() }].forEach(({paren, dest}) => {
            paren.transition()
                .delay(2000)
                .duration(1000)
                .attr('x', dest);
        });
        r = newR;
        c = newC;
    }
    return animate;
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
    colorFn: sequentialColor(0, 120, 7)
}
const cf21Board = new Board(cf21Options);
cf21Options.nextFn = cf21Board.next.bind(cf21Board);
animateKnight(cf21Options);

const cf42Options = {
    svgContainer: document.getElementById('common-4-2-knight-bfs'),
    w: 25, h: 25, r: 0, c: 0, a: 2, b: 4,
    colorFn: sequentialColor(0, 120, 10)
}
const cf42Board = new Board(cf42Options);
cf42Options.nextFn = cf42Board.next.bind(cf42Board);
animateKnight(cf42Options);

const cf69Options = {
    svgContainer: document.getElementById('common-6-9-knight-bfs'),
    w: 25, h: 25, r: 0, c: 0, a: 6, b: 9,
    colorFn: sequentialColor(0, 120, 7)
}
const cf69Board = new Board(cf69Options);
cf69Options.nextFn = cf69Board.next.bind(cf69Board);
animateKnight(cf69Options);

const cf69rw = {
    svgContainer: document.getElementById('common-6-9-rw'),
    svgTextContainer: document.getElementById('common-6-9-rw-text'),
    w: 25, h: 25, r: 5, c: 4, a: 6, b: 9,
    colorFn: () => 'red',
    nextFn: randomNextMove
}
cf69rw.listener = textAnimation(cf69rw);
animateKnight(cf69rw);

// Parity: BFS with 3,1 knight on a regular board
// More in-depth example with a 2,1 and 3,1 knight side by side
const p31Options = {
    svgContainer: document.getElementById('parity-3-1-knight-bfs'),
    w: 8, h: 8, r: 0, c: 0, a: 1, b: 3,
    colorFn: sequentialColor(0, 120, 6)
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
    colorFn: sequentialColor(0, 120, 14),
}
const ts52Board = new Board(ts52Options);
ts52Options.nextFn = ts52Board.next.bind(ts52Board);
animateKnight(ts52Options);

const ts817Options = {
    svgContainer: document.getElementById('8-17-knight-bfs'),
    w: 25, h: 25, r: 0, c: 0, a: 8, b: 17,
    colorFn: sequentialColor(0, 120, 77),
}
const ts817Board = new Board(ts817Options);
ts817Options.nextFn = ts817Board.next.bind(ts817Board);
animateKnight(ts817Options);

const fix42Options = {
    svgContainer: document.getElementById('fix-4-2'),
    w: 7, h: 7, r: 0, c: 0, a: 4, b: 2, mod: true,
    colorFn: sequentialColor(0, 120, 4),
};
const fix42Board = new Board(fix42Options);
fix42Options.nextFn = fix42Board.next.bind(fix42Board);
animateKnight(fix42Options);

const fix31Options = {
    svgContainer: document.getElementById('fix-3-1'),
    w: 7, h: 7, r: 0, c: 0, a: 3, b: 1, mod: true,
    colorFn: sequentialColor(0, 120, 4),
};
const fix31Board = new Board(fix31Options);
fix31Options.nextFn = fix31Board.next.bind(fix31Board);
animateKnight(fix31Options);

const fix52Options = {
    svgContainer: document.getElementById('fix-5-2'),
    w: 7, h: 7, r: 0, c: 0, a: 5, b: 2, mod: true,
    colorFn: sequentialColor(0, 120, 7),
};
const fix52Board = new Board(fix52Options);
fix52Options.nextFn = fix52Board.next.bind(fix52Board);
animateKnight(fix52Options);