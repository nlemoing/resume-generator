function addButton(container, action) {
    const button = document.createElement("button");
    button.addEventListener("click", action);
    container.appendChild(button);
}

function Canvas({
    id,
    objects = [],
    width = 1280,
    height = 720,
    animationLength = 1000,
}) {
    const canvasContainer = document.getElementById(id);
    if (!canvasContainer) {
        console.warn(`No element found with id ${id}. Canvas failed to load.`);
        return;
    }

    // Add the canvas element
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute("style", "max-width: 100%;");
    canvasContainer.appendChild(canvas);

    const context = canvas.getContext("2d");

    // Set the font properties
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Add the controls
    const { togglePause, restart } = animate(animationLength);
    addButton(canvasContainer, togglePause);
    addButton(canvasContainer, restart);
    
    function draw(t) {
        // Clear the canvas from the previous frame
        context.clearRect(0, 0, width, height);

        // Draw all the objects
        for (const drawObject of objects) {
            const { 
                type, 
                color, 
                position: { x, y },
                ...options
            } = drawObject(t);
            context.fillStyle = color;
            switch (type) {
                case 'rect':
                    const { size: { w, h} } = options;
                    context.fillRect(x - (w / 2), y - (h / 2), w, h);
                    break;
                case 'text':
                    const { font, text, width } = options;
                    if (font) context.font = font;
                    context.fillText(text, x, y, width);
                    break;
                default:
                    console.warn(`Unsupported object type ${type}`);
            }
            
        }
    }

    function animate(duration) {
        let pause = true;
        let timePaused = 0;
        let gap = 0;
        // Draw the first frame
        draw(0);

        const restart = () => {
            pause = true;
            requestAnimationFrame(t => {
                draw(0);
                gap = t;
                timePaused = t;
            })
        }

        const play = () => {
            if (!pause) {
                requestAnimationFrame(t => { 
                    frame(t - gap)
                });
            }
        }

        const togglePause = () => {
            pause = !pause;
            if (!pause) {
                requestAnimationFrame(t => gap += t - timePaused)
                play();
            } else {
                requestAnimationFrame(t => timePaused = t)
            }
        };
        
        const frame = (t) => {
            if (t >= duration) {
                draw(1);
                return;
            }
            draw(t / duration);
            play();
        }

        return {
            togglePause,
            restart,
        }
    }

    return {
        animate,
    }
}

const rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`;
const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`;

const font = size => `${size}px sans-serif`;

const interpolate = (t, a, b) => a + (b - a) * t;
const bezier = (t, a, b) => interpolate(t * t * (3 - 2 * t), a, b);

const clamp = (f, l, h) => t => f(Math.max(Math.min((t - l) / (h - l), 1), 0));
