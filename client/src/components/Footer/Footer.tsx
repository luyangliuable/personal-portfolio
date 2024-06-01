import React, { useRef, useMemo, useState, RefObject } from "react";
import "./Footer.css";
import Button from "../Button/Button";
import { CiLock } from "react-icons/ci";
import InlineLink from "../Atoms/InlineLink/InlineLink";
import connectionsData from "../../configs/connections.json";
import linksData from "../../configs/links.json";
import IconButton from "../Atoms/IconButton/IconButton";

const Footer: React.FC = () => {
    const linksToMyOtherSocialMedia = connectionsData.connections;
    const [buttonClassName, setButtonClassName] = useState("");
    const [buttonChildren, setButtonChildren] = useState("Send me a Message");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const messageEmailRef: RefObject<HTMLInputElement> = useRef(null);
    const messageDescriptionRef: RefObject<HTMLTextAreaElement> = useRef(null);
    const messageSendButtonRef: RefObject<any> = useRef(null);

    const deepCopyJson = (jsonObject: any) => {
        return JSON.parse(JSON.stringify(jsonObject));
    }

    const getSectionData = (name: string): any => {
        const footerLinkCapacity = 5;
        const result = deepCopyJson(linksData.links.filter((item: any) => item.name === name)[0]);
        // get only footerLinkCapacity number of sublinks due to lack of space in the footer
        result.sublinks = result.sublinks?.slice(0, footerLinkCapacity);
        return result;
    }

    const about = useMemo(() => getSectionData("About"), [linksData]);
    const tools = useMemo(() => getSectionData("Tools"), [linksData]);
    const resume = useMemo(() => getSectionData("Resume"), [linksData]);

    const renderFooterSection = (section: any, className: string, target?: string) => {
        return (
            <section className={className}>
                <h3 className="mb-0">{section.name}</h3>
                {
                    section.sublinks?.map(
                        (item: any, index: number) => {
                            return (
                                <InlineLink target={target} key={index} to={item.isLocked ? null : item.to} className="mt-5">
                                    {item.name} {item.isLocked && <CiLock className="ml-2" />}
                                </InlineLink>
                            )
                        }
                    )
                }
            </section>
        )
    }

    return (
        <footer className="footer flex flex-col">
            <div className="footer__main flex flex-row justify-evenly w-full">
                <form className="footer__get-in-touch flex flex-col items-start">
                    <h3>Get In Touch</h3>
                    <input ref={messageEmailRef} className="box-border" type="text" placeholder="Email" />
                    <textarea ref={messageDescriptionRef} className="box-border" placeholder="Message" />
                    <Button
                        ref={messageSendButtonRef}
                        type="submit"
                        className={buttonClassName}
                        disabled={buttonDisabled}
                        onClick={(e) => {
                            e.preventDefault();
                            const messageDetails = {
                                "name": messageEmailRef.current!.value,
                                "description": messageDescriptionRef.current!.value
                            };
                            const BASE_URL: string = process.env.REACT_APP_WEATHER_API_BASE_URL || "https://llcode.tech/api";
                            fetch(`${BASE_URL}/message`, {
                                method: "POST",
                                cache: "no-cache",
                                credentials: 'include',
                                headers: {},
                                body: JSON.stringify(messageDetails)
                            }).then(_ => {
                                setButtonClassName("button__done");
                                setButtonChildren("Message Sent!");
                                setButtonDisabled(true);
                            }).catch(_ => {
                                setButtonClassName("button__error");
                                setButtonChildren("Error Sending Message");
                                setButtonDisabled(true);
                            });

                        }}>{buttonChildren}</Button>
                </form>

                <div className="flex flex-col">
                    <section className="footer__connect-with-me mb-20">
                        <h3 className="mb-0">Connect with Me</h3>
                        <div className="flex flex-row flex-wrap">
                            {
                                linksToMyOtherSocialMedia.map(
                                    (item: any, index: number) => (
                                        <IconButton target="_blank" key={index} to={item.link} className="mt-5" logoName={item.name} buttonColor="%23eaeaea"></IconButton>
                                    )
                                )
                            }
                        </div>
                    </section>

                    <section className="footer__sponser mb-20">
                        <h3 className="mb-0">Sponser Me</h3>
                        <InlineLink target="_blank" to="https://ko-fi.com/D1D1PFTTH" className="mt-5">Kofi</InlineLink>
                    </section>
                </div>

                <div className="flex flex-col">
                    {renderFooterSection(about, "footer__about")}

                    <section className="footer__resources">
                        <h3 className="mb-0">Resources</h3>
                        <InlineLink to={resume.to} className="mt-5">{resume.name}</InlineLink>
                    </section>
                </div>

                {renderFooterSection(tools, "footer__tools")}

            </div>
            <div className="footer__bottom position-relative w-full flex justify-around">
                <p>LLcode.tech © 2024 All Rights Reserved</p>
                <p>Made with Typescript, Rust and Love 💖 v0.5.0</p>
            </div>
        </footer>
    )
}

export default React.memo(Footer);
