import React, { RefObject, useEffect, useRef } from "react";
import "./BlackHole.css";

const BlackHole: React.FC = () => {

    const back = useRef<HTMLCanvasElement>(null);
    const middle = useRef<HTMLCanvasElement>(null);
    const front = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let b = init(back).ctx,
            m = init(middle).ctx,
            f = init(front).ctx,
            bac: HTMLCanvasElement | null = init(back).canv,
            mid: HTMLCanvasElement | null = init(middle).canv,
            fro: HTMLCanvasElement | null = init(front).canv;

        if (b === null || m === null || f === null || bac === null || mid === null || fro === null) {
            return;
        }

        const w: number = 1500;
        const h: number = 1000;

        bac.width = w;
        mid.width = w;
        fro.width = w;
        bac.height = h;
        mid.height = h;
        fro.height = h;

        class Particle {
            ox: number;
            oy: number;
            br: number;
            re: number;
            col: string;
            tailIndex: number = 0; // Current index for the circular buffer
            a: number;
            size: number;
            q: number;
            h2p: number;
            x: number;
            y: number;
            tail: { x: number; y: number; a: number }[];
            tl: number;

            constructor(x: number, y: number, r: number) {
                this.ox = x;
                this.oy = y;
                this.br = r;
                this.re = Math.random() * r;
                this.col = `rgb(255,${Math.floor(100 + Math.random() * 50)},80,0.5)`;
                this.a = Math.random() * 2 * Math.PI;
                this.size = Math.random() * 4;
                this.q = 1 / 3 + Math.random() * (1 / 2 - 1 / 3);
                this.h2p = 10;
                this.x = this.ox + (this.br + this.re + this.size + this.h2p) * Math.cos(this.a);
                this.y = this.oy + (this.br + this.re + this.size + this.h2p) * this.q * Math.sin(this.a);
                /* this.tail = [{ x: this.x, y: this.y, a: this.a }]; */
                this.tl = Math.floor(Math.random() * 5 + 5);
                this.tail = Array(this.tl).fill({ x: this.x, y: this.y, a: this.a });

            }

            move(x: number, y: number): void {
                // Update positions
                this.ox = x;
                this.oy = y;
                this.x = this.ox + (this.br + this.re + this.size + this.h2p) * Math.cos(this.a);
                this.y = this.oy + (this.br + this.re + this.size + this.h2p) * this.q * Math.sin(this.a);

                // Update the tail using circular buffer technique
                this.tail[this.tailIndex] = { x: this.x, y: this.y, a: this.a };
                this.tailIndex = (this.tailIndex + 1) % this.tl;

                this.a += (this.br - this.re) / 1000;
            }

            show(): void {
                for (let i = 0; i < this.tail.length; i++) {
                    if (Math.floor((this.tail[i].a + Math.random() * 0.2 - 0.1) / Math.PI) % 2 !== 0) {
                        b!.beginPath();
                        b!.arc(this.tail[i].x, this.tail[i].y, this.size, 0, 2 * Math.PI);
                        b!.fillStyle = this.col;
                        b!.fill();
                    } else {
                        f!.beginPath();
                        f!.arc(this.tail[i].x, this.tail[i].y, this.size, 0, 2 * Math.PI);
                        f!.fillStyle = this.col;
                        f!.fill();
                    }
                }
            }
        }

        let p: Particle[] = [],
            num = 140,
            i = 0;

        for (i = 0; i < num; i++) {
            p.push(new Particle(w / 2, h / 2, 100));
        }

        function draw() {
            b.globalCompositeOperation = "lighter";
            f.globalCompositeOperation = "lighter";
            //animation
            for (i = 0; i < num; i++) {
                p[i].move(w / 2, h / 2);
                p[i].show();
            }

            m.beginPath();
            m.arc(w / 2, h / 2, 100, 0, 2 * Math.PI);
            m.fillStyle = "black";
            m.fill();
        }

        function init(elem: RefObject<HTMLCanvasElement>): { canv: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null } {
            const canvas = elem.current;
            const c = canvas!.getContext("2d");
            return { canv: canvas, ctx: c };
        }

        (window as any).requestAnimFrame = function () {
            return (
                window.requestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback);
                }
            );
        };

        function loop() {
            (window as any).requestAnimFrame(loop);
            b.clearRect(0, 0, w, h);
            m.clearRect(0, 0, w, h);
            f.clearRect(0, 0, w, h);
            draw();
        }
        loop();
        setInterval(loop, 1500 / 60);

    }, [])

    return (
        <div className="black-hole">
            <canvas ref={back} className="back"></canvas>
            <canvas ref={middle} className="middle"></canvas>
            <canvas ref={front} className="front"></canvas>
        </div>
    );
};

export default React.memo(BlackHole);
