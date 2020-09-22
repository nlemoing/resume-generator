function animations(value, mobile) {
    digits = [
        Math.floor(value / 100) % 10,
        Math.floor(value / 10) % 10,
        Math.floor(value) % 10
    ];

    function animation1() {
        const hundreds = [];
        for (let j = 0; j < digits[0]; j++) {
            const start = 0.3 + j * 0.04;
            const end = start + 0.3;
            for (let i = 0; i < 100; i++) {
                hundreds.push(clamp(t => ({
                    type: 'rect',
                    color: hsl(0, 0, 50),
                    position: {
                        x: 70 + (j % 3) * 140 + ((i % 10) - 4.5) * 12.5,
                        y: 250 + Math.floor(j / 3) * 140 + (Math.floor(i / 10) - 4.5) * 12.5
                    },
                    size: { 
                        w: bezier(t, 0, 10),
                        h: bezier(t, 0, 10),
                    }
                }), start, end))
            }
        }

        const tens = [];
        for (let j = 0; j < digits[1]; j++) {
            const start = 0.34 + j * 0.04;
            const end = start + 0.3;
            for (let i = 0; i < 10; i++) {
                tens.push(clamp(t => ({
                    type: 'rect',
                    color: hsl(0, 0, 50),
                    position: {
                        x: 500 + (j % 3) * 140 + (i - 4.5) * 12.5,
                        y: 250 + Math.floor(j / 3) * 140
                    },
                    size: { 
                        w: bezier(t, 0, 10),
                        h: bezier(t, 0, 10),
                    }
                }), start, end))
            }
        }

        const ones = [];
        for (let i = 0; i < digits[2]; i++) {
            const start = 0.38 + i * 0.04;
            const end = start + 0.3;
            ones.push(clamp(t => ({
                type: 'rect',
                color: hsl(0, 0, 50),
                position: {
                    x: 930 + (i % 3) * 140,
                    y: 250 + Math.floor(i / 3) * 140
                }, size: {
                    w: bezier(t, 0, 10),
                    h: bezier(t, 0, 10),
                }
            }), start, end));
        }

        return Canvas({
            id: "animation-1",
            objects: [
                clamp(t => ({
                    type: 'text',
                    color: rgb(0, 0, 0),
                    position: { x: bezier(t, 480, 210), y: bezier(t, 360, 100) },
                    font: font(bezier(t, 300, 100)),
                    text: digits[0]
                }), 0, 0.25),
                clamp(t => ({
                    type: 'text',
                    color: rgb(0, 0, 0),
                    position: { x: 640, y: bezier(t, 360, 100) },
                    font: font(bezier(t, 300, 100)),
                    text: digits[1]
                }), 0, 0.25),
                clamp(t => ({
                    type: 'text',
                    color: rgb(0, 0, 0),
                    position: { x: bezier(t, 800, 1070), y: bezier(t, 360, 100) },
                    font: font(bezier(t, 300, 100)),
                    text: digits[2]
                }), 0, 0.25),
                ...hundreds,
                ...tens,
                ...ones,
            ],
            animationLength: 3000,
            mobile,
        });
    }

    function animation2() {
        const hundreds = [];
        for (let j = 0; j < digits[0]; j++) {
            const start = j * 0.02;
            const end = start + 0.3;
            for (let i = 0; i < 100; i++) {
                const color = i === 99 ?
                    t => hsl(0, bezier(t, 0, 100), 50) :
                    () => hsl(0, 0, 50);
                const x = 70 + (j % 3) * 140 + ((i % 10) - 4.5) * 12.5;
                const y = 250 + Math.floor(j / 3) * 140 + (Math.floor(i / 10) - 4.5) * 12.5;
                const position = i === 99 ? 
                    clamp(t => ({
                        x: bezier(t, x, 905 + 40 * (j % 3)),
                        y: bezier(t, y, 630 + 40 * Math.floor(j / 3))
                    }), 0.5, 1) :
                    () => ({ x, y });
                hundreds.push(clamp(t => ({
                    type: 'rect',
                    color: color(t),
                    position: position(t),
                    size: { 
                        w: 10,
                        h: 10,
                    }
                }), start, end))
            }
        }

        const tens = [];
        for (let j = 0; j < digits[1]; j++) {
            const start = 0.02 + j * 0.02;
            const end = start + 0.3;
            for (let i = 0; i < 10; i++) {
                const color = i === 9 ?
                    t => hsl(120, bezier(t, 0, 100), 50) :
                    () => hsl(0, 0, 50);
                const x = 500 + (j % 3) * 140 + (i - 4.5) * 12.5;
                const y = 250 + Math.floor(j / 3) * 140;
                const position = i === 9 ? 
                    clamp(t => ({
                        x: bezier(t, x, 1025 + 40 * (j % 3)),
                        y: bezier(t, y, 630 + 40 * Math.floor(j / 3))
                    }), 0.5, 1) :
                    () => ({ x, y });
                tens.push(clamp(t => ({
                    type: 'rect',
                    color: color(t),
                    position: position(t),
                    size: { 
                        w: 10,
                        h: 10,
                    }
                }), start, end))
            }
        }

        const ones = [];
        for (let i = 0; i < digits[2]; i++) {
            const start = 0.04 + i * 0.02;
            const end = start + 0.3;
            ones.push(clamp(t => ({
                type: 'rect',
                color: hsl(240, bezier(t, 0, 100), 50),
                position: clamp(t => ({
                    x: bezier(t, 930 + (i % 3) * 140, 1145 + 40 * (i % 3)),
                    y: bezier(t, 250 + Math.floor(i / 3) * 140, 630 + 40 * Math.floor(i / 3)),
                }), 0.5, 1)(t), size: {
                    w: 10,
                    h: 10,
                }
            }), start, end));
        }

        return Canvas({
            id: "animation-2",
            objects: [
                () => ({
                    type: 'text',
                    color: rgb(0, 0, 0),
                    position: { x: 210, y: 100 },
                    font: font(100),
                    text: digits[0]
                }),
                clamp(t => ({
                    type: 'text',
                    color: hsl(0, bezier(t, 0, 100), bezier(t, 0, 50)),
                    position: { x: bezier(t, 210, 945), y: bezier(t, 100, 585) },
                    font: font(bezier(t, 100, 50)),
                    text: digits[0]
                }), 0.5, 0.8),
                clamp(t => ({
                    type: 'text',
                    color: hsl(0, 0, bezier(t, 100, 0)),
                    position: { x: 1005, y: 585 },
                    font: font(50),
                    text: '+',
                }), 0.8, 1),
                () => ({
                    type: 'text',
                    color: rgb(0, 0, 0),
                    position: { x: 640, y: 100 },
                    font: font(100),
                    text: digits[1]
                }),
                clamp(t => ({
                    type: 'text',
                    color: hsl(120, bezier(t, 0, 100), bezier(t, 0, 50)),
                    position: { x: bezier(t, 640, 1065), y: bezier(t, 100, 585) },
                    font: font(bezier(t, 100, 50)),
                    text: digits[1]
                }), 0.5, 0.8),
                clamp(t => ({
                    type: 'text',
                    color: hsl(0, 0, bezier(t, 100, 0)),
                    position: { x: 1125, y: 585 },
                    font: font(50),
                    text: '+',
                }), 0.8, 1),
                () => ({
                    type: 'text',
                    color: rgb(0, 0, 0),
                    position: { x: 1070, y: 100 },
                    font: font(100),
                    text: digits[2]
                }),
                clamp(t => ({
                    type: 'text',
                    color: hsl(240, bezier(t, 0, 100), bezier(t, 0, 50)),
                    position: { x: bezier(t, 1070, 1185), y: bezier(t, 100, 585) },
                    font: font(bezier(t, 100, 50)),
                    text: digits[2]
                }), 0.5, 0.8),
                ...hundreds,
                ...tens,
                ...ones,
            ],
            animationLength: 5000,
            mobile,
        });
    }

    function animation3() {
        const objects = [];
        // Add all the fixed elements in the bottom right
        [1005, 1125].forEach(x => {
            objects.push(() => ({
                type: 'text',
                color: rgb(0, 0, 0),
                position: { x, y: 585 },
                font: font(50),
                text: '+'
            }));
        })
        for (let i = 0; i < 3; i++) {
            objects.push(() => ({
                type: 'text',
                color: hsl(i * 120, 100, 50),
                position: { x: 945 + i * 120, y: 585 },
                font: font(50),
                text: digits[i],
            }));
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < digits[i]; j++) {
                objects.push(() => ({
                    type: 'rect',
                    position: {
                        x: 905 + 40 * (j % 3) + 120 * i,
                        y: 630 + 40 * Math.floor(j / 3),
                    },
                    color: hsl(120 * i, 100, 50),
                    size: { w: 10, h: 10 }
                }));
            }
        }

        // Animate the blocks
        let blocks = 0;
        const totalBlocks = digits[0] * 99 + digits[1] * 9;
        for (let i = 0; i < 2; i++) {
            const s = i ? 9 : 99;
            for (let j = 0; j < digits[i]; j++) {
                for (let k = 0; k < s; k++) {
                    const group = Math.floor(blocks / 3);
                    const startX = 70 + (430 * i) + (j % 3) * 140 + ((k % 10) - 4.5) * 12.5;
                    const startY = 250 + Math.floor(j / 3) * 140 + (i ? 0 : (Math.floor(k / 10) - 4.5) * 12.5);
                    const endX = 70 + 12.5 * (group % 15) + 270 * (k % 3);
                    const endY = 710 - 12.5 * Math.floor(group / 15);
                    const startTime = interpolate(blocks / totalBlocks, 0.4, 0.7);
                    objects.push(t => ({
                        type: 'rect',
                        position: clamp(t => ({
                            x: bezier(t, startX, endX),
                            y: bezier(t, startY, endY),
                        }), startTime, startTime + 0.3)(t),
                        color: clamp(
                            t => hsl(i * 120, bezier(t, 0, 75), 50 + bezier(t, 0, (k % 3) * 15)),
                            0,
                            0.4
                        )(t),
                        size: { w: 10, h: 10 }
                    }))
                    blocks += 1;
                }
            }
        }
        
        return Canvas({
            id: "animation-3",
            objects,
            animationLength: 5000,
            mobile,
        })
    }

    return [
        animation1(),
        animation2(),
        animation3(),
    ];
}

animations(
    parseInt(new URL(window.location.href).searchParams.get("value")) ||
    (
        Math.floor(1 + Math.random() * 9) * 100 +
        Math.floor(1 + Math.random() * 9) * 10 +
        Math.floor(1 + Math.random() * 9)
    ),
    false,
);
