function animations(value) {
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
        });
    }

    return [
        animation1()
    ];
}

animations(
    parseInt(new URL(window.location.href).searchParams.get("value")) ||
    (
        Math.floor(1 + Math.random() * 9) * 100 +
        Math.floor(1 + Math.random() * 9) * 10 +
        Math.floor(1 + Math.random() * 9)
    )
);
