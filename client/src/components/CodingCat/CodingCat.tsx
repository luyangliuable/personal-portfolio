import React, { useEffect, useRef, useState } from 'react';
import "./CodingCat.css";
import { gsap } from 'gsap';
import ICodingCatProps from "./Interface/ICodingCatProps";

const CodingCat: React.FC<ICodingCatProps> = ({showAnimation}) => {
    const codingCatRef = useRef<SVGGElement | null>(null);
    const [animation, setAnimation] = useState<gsap.core.Timeline | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (!isLoaded) return;

        const ID = "coding-cat";
        const s = (selector: string) => `#${ID} ${selector}`;

        const cat = {
            pawRight: {
                up: s(".paw-right .up"),
                down: s(".paw-right .down"),
            },
            pawLeft: {
                up: s(".paw-left .up"),
                down: s(".paw-left .down"),
            },
        };

        const style = getComputedStyle(document.documentElement),
            green = style.getPropertyValue("--green"),
            pink = style.getPropertyValue("--pink"),
            blue = style.getPropertyValue("--blue"),
            orange = style.getPropertyValue("--orange"),
            cyan = style.getPropertyValue("--cyan");

        const animatePawState = (selector: string) =>
            gsap.fromTo(
                selector,
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 0.01,
                    repeatDelay: 0.19,
                    yoyo: true,
                    repeat: -1,
                }
            );

        const tl: gsap.core.Timeline = gsap.timeline();

        tl.add(animatePawState(cat.pawLeft.up), "start")
            .add(animatePawState(cat.pawRight.down), "start")
            .add(animatePawState(cat.pawLeft.down), "start+=0.19")
            .add(animatePawState(cat.pawRight.up), "start+=0.19")
            .timeScale(1.6);

        gsap.from(".terminal-code line", {
            duration: 0.1,
            stagger: 0.1,
            ease: "none",
            repeat: -1,
        });

        setAnimation(tl);
        tl.pause();

        return () => {
            tl.kill();
        };
    }, [isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;
        if (showAnimation && animation) {
            animation.resume();
        } else if (!showAnimation && animation) {
            animation.pause();
        }
    }, [isLoaded, showAnimation, animation]);

    const togglePixelatedFilter = () => {
        const svgGroup = codingCatRef.current!;
        if (!svgGroup) return;
        if (svgGroup.getAttribute("filter") !== "url(#pixelate)") {
            svgGroup.setAttribute("filter", "url(#pixelate)");
        } else {
            svgGroup.setAttribute("filter", "")
        }
    };

    const className = ["coding-cat-container"];

    useEffect(() => {
        setIsLoaded(true);
    }, [])

    if (!isLoaded) {
        return (<></>);
    }

    return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 783.55 354.91" className={className.join(" ")}>
                <defs>
                <filter id="pixelate" x="0" y="0">
                    <feFlood x="1" y="1" height="2" width="2" />
                    <feComposite width="10" height="10" />
                    <feTile result="a" />
                    <feComposite in="SourceGraphic" in2="a" operator="in" />
                    <feMorphology operator="dilate" radius="3" />
                </filter>
                </defs>
                <g id="coding-cat" ref={codingCatRef} onClick={() => togglePixelatedFilter()}>
                    <g className="head">
                        <path d="M280.4,221l383.8,62.6a171.4,171.4,0,0,0-9.2-40.5,174,174,0,0,0-28.7-50.5,163.3,163.3,0,0,0,3.2-73.8c-11.6-1.9-42,14.2-44.5,17.5-19.6-24-88.5-52.7-153.7-48.1A78.8,78.8,0,0,0,398,67.1c-9.8,2.9-19,29.7-19.4,33.7a320,320,0,0,0-31.7,23.6c-14,11.8-28.9,24.4-42.5,44.3A173,173,0,0,0,280.4,221Z"></path>
                        <path d="M396.6,178.6c.4.9,2.7,6.5,8.5,8.4s13.4-1.2,17.2-7.9c-.9,7.5,3.8,14.3,10.4,16a14.4,14.4,0,0,0,15-5.7"></path>
                        <path d="M474,179.2a6.6,6.6,0,0,0-4.9,3.6,6,6,0,0,0,1.5,7.3,6,6,0,0,0,7.9-1c2.3-2.6,2-7,.2-8s-5.9,1.6-5.7,3.5,1.9,2.8,3.2,2.3,1.1-2.2,1.1-2.3"></path>
                        <path d="M365.4,168.9c0,.3-.8,3.6,1.5,6a5.9,5.9,0,0,0,7.2,1.4,6.1,6.1,0,0,0,2.2-7.7c-1.5-3.1-5.7-4.5-7.3-3.2s-.8,6,1,6.6,3.3-.7,3.3-2.1-1.5-1.8-1.6-1.9"></path>
                    </g>
                    <g className="headphone headphone-right">
                        <g className="speaker">
                            <path d="M400.7,80.2c-14.1-20.8-40.2.3-50.7,15-8.7,12.2-9.7,30.3,2.8,37.3,5.4-9,11.8-15.6,21-26.2A214.1,214.1,0,0,1,400.7,80.2Z"></path>
                            <path d="M381.5,79.4c-6.6-7.5-9.6-5.8-12.3-5.5-16.3,1.3-32,20.3-27.8,33.9a21.8,21.8,0,0,0,5.9,8.5c1.7-2.6,3.5-5.1,5.4-7.7A150.7,150.7,0,0,1,381.5,79.4Z"></path>
                            <path d="M367.3,77.8a13.1,13.1,0,0,0-5.1-1.8c-8.5-.9-18.7,7.5-18.4,16.1a12.8,12.8,0,0,0,2.6,7c3.1-3.3,6.3-6.8,9.6-10.2S363.6,81.3,367.3,77.8Z"></path>
                        </g>
                        <path className="band" d="M515,40.6c-15.9-4.6-57-14.1-104,2.3a166.9,166.9,0,0,0-60.9,37.3"></path>
                    </g>
                    <g className="headphone headphone-left">
                        <g className="speaker">
                            <path d="M609.5,137.3c-17.1,6.3-20.7,51.4-4.5,67.3,1.4,1.5,5.5,5.5,11.3,5.9,8.2.5,14.5-6.3,16.9-8.9,10.1-11,11.5-27.5,8.1-40.1-1.4-4.8-3.9-14-12.7-19.9C627.4,140.8,617.7,134.3,609.5,137.3Z"></path>
                            <path d="M626.5,196.1c2.7-.4,5.9-2.6,9.3-6,6.6-6.6,6.8-16.6,5.8-24s-4.2-16.1-11.3-19.7a18.7,18.7,0,0,0-10.9-1.9C614,149.3,615.3,192.6,626.5,196.1Z"></path>
                            <path d="M631.6,151c-4.5,3.3-.5,27.1,3.8,28.2s6.9-6.6,6.2-13.1S637.4,153.5,631.6,151Z"></path>
                        </g>
                        <path className="band" d="M638.9,157.7c-4-16.8-25.9-61.9-75.3-95.3A155.5,155.5,0,0,0,515,40.6"></path>
                    </g>
                    <polygon className="laptop-base" points="103.2 263.6 258.9 219.3 636.5 294.4 452.1 339 103.2 263.6"></polygon>
                    <g className="laptop-keyboard">
                        <polygon points="369.6 265.6 255.3 244.3 255.5 243.5 264.7 241.9 380.9 262.3 380.8 263.1 369.6 265.6"></polygon>
                        <polygon points="235.9 256.4 219.8 253.2 219.9 252.5 228.7 251 245.3 253.4 245.1 254.2 235.9 256.4"></polygon>
                        <polygon points="473.1 303.7 248.4 258.9 248.6 258.1 257.7 256.6 486.2 300.4 486 301.3 473.1 303.7"></polygon>
                        <polygon points="410.3 300.2 202.7 257.5 202.9 256.8 211.4 255.3 422.4 297.1 422.2 298 410.3 300.2"></polygon>
                        <polygon points="448.5 308.1 427 303.7 427.3 302.8 439.2 301.4 461.2 304.9 461 305.8 448.5 308.1"></polygon>
                        <polygon points="200.1 264.7 186 261.7 186.2 261 194.5 259.5 208.9 261.8 208.8 262.5 200.1 264.7"></polygon>
                        <polygon points="221.1 269.1 206.6 266.1 206.8 265.3 215.4 263.9 230.3 266.2 230.1 267 221.1 269.1"></polygon>
                        <polygon points="361.4 298.9 230 271 230.2 270.3 239.2 268.9 372.7 295.9 372.5 296.7 361.4 298.9"></polygon>
                        <polygon points="442.8 279.2 383.7 268.2 383.9 267.3 395.1 265.7 455.4 275.9 455.2 276.7 442.8 279.2"></polygon>
                        <polygon points="524.6 294.4 458.6 282.1 458.8 281.2 471.3 279.7 538.6 291 538.4 291.9 524.6 294.4"></polygon>
                        <polygon points="424.7 312.4 374.6 301.7 374.8 300.9 385.9 299.5 437 309.3 436.8 310.2 424.7 312.4"></polygon>
                        <polygon points="409.1 277.3 397.6 278.8 397.4 279.6 498.4 299.1 511.8 296.7 512 295.8 409.1 277.3"></polygon>
                        <polygon points="394.2 274.5 394.4 273.6 246.7 246.5 237.7 248.1 237.5 248.8 382.8 276.8 394.2 274.5"></polygon>
                    </g>
                    <g className="paw paw-right">
                        <path className="down" d="M289.1,181.7c-12.1,9.8-20.6,20.7-20.7,32.1-.2,9,3.8,20.4,13.3,25.2s20.1.6,29.6-3.4c13.4-5.7,23.9-14.6,29.4-21.5"></path>
                        <g className="up">
                            <path d="M327.3,170c-.4-1.4-6.3-18.8-23.5-23.5-.8-.2-18.6-4.7-28.9,6.3-8.4,9.1-6,22.5-4.6,30.2a54.3,54.3,0,0,0,8.1,19.9"></path>
                            <g className="pads">
                                <path d="M297.2,154.8c1-.5,2.7-.1,3,.6s-1.4,2.4-2.6,2.1a1.6,1.6,0,0,1-1.1-1.2A1.6,1.6,0,0,1,297.2,154.8Z"></path>
                                <path d="M285.8,159.4c.3-.4,1-1.1,1.7-.8s.9,1.4.8,2.2-1.8,2.1-2.5,1.5S285.2,160.4,285.8,159.4Z"></path>
                                <path d="M276.9,171c.5-.4,2.7-.3,3.2.6s-.6,1.8-1.4,1.8S276.2,171.6,276.9,171Z"></path>
                                <path d="M296.4,168.6c2.3-.9,6.4,6.3,7.6,9s-5.2,4.5-7.4,6-5.1-6.1-5.9-8.3S293.7,169.8,296.4,168.6Z"></path>
                            </g>
                        </g>
                    </g>
                    <polygon className="terminal-frame" points="70.8 43.3 334.1 54 375.9 245.5 120.2 197.6 70.8 43.3"></polygon>
                    <g className="terminal-code">
                        <line x1="260.2" y1="92.3" x2="212.2" y2="88.7"></line>
                        <line x1="197.3" y1="87.5" x2="145.2" y2="83.5"></line>
                        <line x1="251" y1="104.2" x2="223.4" y2="101.8"></line>
                        <line x1="209.4" y1="100.5" x2="154.4" y2="95.6"></line>
                        <line x1="256.4" y1="117.9" x2="227.5" y2="114.7"></line>
                        <line x1="215.9" y1="113.4" x2="183.5" y2="109.8"></line>
                        <line x1="169.1" y1="108.2" x2="142.9" y2="105.3"></line>
                        <line x1="275.4" y1="132.8" x2="249.4" y2="129.6"></line>
                        <line x1="234.4" y1="127.8" x2="197.3" y2="123.3"></line>
                        <line x1="185.6" y1="121.9" x2="149.1" y2="117.5"></line>
                        <line x1="261" y1="144.6" x2="244.5" y2="142.5"></line>
                        <line x1="235.5" y1="141.3" x2="214.9" y2="138.7"></line>
                        <line x1="203.4" y1="137.2" x2="180.4" y2="134.3"></line>
                        <line x1="169.3" y1="132.9" x2="155.1" y2="131.1"></line>
                        <line x1="264.7" y1="158.3" x2="221.9" y2="152.1"></line>
                        <line x1="208.2" y1="150.1" x2="191.7" y2="147.7"></line>
                        <line x1="291.3" y1="174.3" x2="268.8" y2="170.9"></line>
                        <line x1="257.8" y1="169.2" x2="226.5" y2="164.4"></line>
                        <line x1="217.3" y1="163" x2="185" y2="158.1"></line>
                        <line x1="173.8" y1="156.4" x2="152.9" y2="153.2"></line>
                        <line x1="278.5" y1="185.6" x2="257.3" y2="182.2"></line>
                        <line x1="243.8" y1="179.9" x2="230.3" y2="177.7"></line>
                        <line x1="216.5" y1="175.8" x2="196.7" y2="172.5"></line>
                        <line x2="262.1" y2="196.1" x1="280.5" y1="199.2"></line>
                        <line x2="213.8" y2="187.9" x1="251.1" y1="194.2"></line>
                        <line x2="180.8" y2="182.3" x1="202.7" y1="186"></line>
                    </g>
                    <polygon className="laptop-cover" points="103.2 263.6 452.1 339 360.8 12.4 2 2 103.2 263.6"></polygon>
                    <g className="paw paw-left">
                        <g className="up">
                            <path d="M586.6,208.8c-.6-2.3-4.2-15.6-17.2-22.2-2.7-1.3-12.8-6.4-23.6-1.8s-14.6,16.5-14.8,18.4c-1.2,9-.7,18.4,2.4,26.1,2.4,6,7.5,17.2,9.7,20.2"></path>
                            <g className="pads">
                                <path d="M561.4,194.9a2.7,2.7,0,0,1,3,.5c.4,1-1.4,2.4-2.6,2.2a1.5,1.5,0,0,1-1.1-1.3A1.2,1.2,0,0,1,561.4,194.9Z"></path>
                                <path d="M550.7,200.4c.4-.5,1.1-1.1,1.7-.8a2,2,0,0,1,.8,2.2c-.3,1.2-1.8,2-2.5,1.5S550.1,201.3,550.7,200.4Z"></path>
                                <path d="M541.1,211.1c.5-.4,2.7-.4,3.2.5s-.6,1.8-1.5,1.9S540.4,211.6,541.1,211.1Z"></path>
                                <path d="M560.6,209.2c2.3-.9,6.4,6.3,7.6,9s-5.3,4.5-7.4,6-5.1-6-5.9-8.3S557.9,210.4,560.6,209.2Z"></path>
                            </g>
                        </g>
                        <path className="down" d="M534.1,231.4c-19.7,6-32.9,18.4-34.2,29.1a30.1,30.1,0,0,0,1.7,14.1,24.8,24.8,0,0,0,6.1,8.8c6,5.1,16.8,4,38-3.9a288.7,288.7,0,0,0,46.5-22.1"></path>
                    </g>
                </g>
            </svg >
        );
}

export default React.memo(CodingCat);
