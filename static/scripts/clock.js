function animateClock(options) {
    const { svgContainer, modulus, start, change } = options;

    const svg = d3.select(svgContainer).attr('viewBox', '0 0 100 100');
    const RADIUS = 45; // 90% of svg
    const CENTER_X = 50;
    const CENTER_Y = 50;
    
    svg.append('circle')
        .attr('r', RADIUS).attr('cx', CENTER_X).attr('cy', CENTER_Y)
        .style('stroke', 'black').style('stroke-width', 1).style('fill', 'none');

    function getAngle(i) {
        return (0.5 - ((i % modulus) / modulus) * 2) * Math.PI;
    }

    function getPointX(i, r) {
        const angle = getAngle(i);
        const x = CENTER_X + RADIUS * Math.cos(angle);
        return d3.interpolateNumber(CENTER_X, x)(r);
    }

    function getPointY(i, r) {
        const angle = getAngle(i);
        const y = CENTER_Y - RADIUS * Math.sin(angle);
        return d3.interpolateNumber(CENTER_Y, y)(r);
    }
    
    function getPoint(i, r) {
        return [getPointX(i, r), getPointY(i, r)];     
    }

    const nums = new Array(modulus);
    const filled = new Array(modulus).fill(false);
    for (i = 0; i < modulus; i++) {
        let [x, y] = getPoint(i, 0.85);
        nums[i] = svg.append('text')
            .text(i).attr('x', x).attr('y', y)
            .style('font-size', '7px')
            .style('text-anchor', 'middle')
            .style('alignment-baseline', 'middle');
    }

    nums[start].style('fill', 'red');
    filled[start] = true;

    const [xStart, yStart] = getPoint(start, 0.7);
    const hand = svg.append('line')
        .attr('x1', 50).attr('y1', 50)
        .attr('x2', xStart).attr('y2', yStart)
        .style('stroke', 'black').style('stroke-width', 1);
    
    function isActive() {
        const { top, bottom } = svgContainer.getBoundingClientRect();
        const { innerHeight } = window;
        // A graphic is active if either endpoint is in view
        return (top >= 0 && top <= innerHeight) ||
               (bottom >= 0 && bottom <= innerHeight);
    }

    let active = isActive();
    let prev = start, next = (prev + change) % modulus;
    
    function step() {

        if (!active) {
            return;
        }

        const interp = d3.interpolateNumber(prev, next);

        // tween: interpolate between prev, next
        // call getPointX on that number
        hand.transition()
            .duration(1000)
            .attrTween('x2', () => t => getPointX(interp(t), 0.7))
            .attrTween('y2', () => t => getPointY(interp(t), 0.7));

        const nextMod = next % modulus;
        if (!filled[nextMod]) {
            nums[nextMod].transition()
                .delay(500).duration(500)
                .style('fill', 'red');
        }
        
        prev = next;
        next = next + change;

        setTimeout(step, 1500);
    }

    document.addEventListener('scroll', () => {
	    if (active === isActive()) return;
	    if (!active) {
            active = true;
            step();
        } else {
            active = false;
        }
    });

    step();
}

animateClock({
    svgContainer: document.getElementById('clock-12'),
    modulus: 12, start: 1, change: 3
});

animateClock({
    svgContainer: document.getElementById('clock-11'),
    modulus: 11, start: 1, change: 3
});