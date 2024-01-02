import { ReactNode } from "react";

type LandingPageCardType = "normal" | "fitUnderNavbar" | "fitContent";

interface ILandingPageCardProps {
    className?: string,
    heading?: string,
    children?: ReactNode,
    landingPageCardType?: LandingPageCardType,
    blendWithBackground?: boolean
}

export { ILandingPageCardProps, LandingPageCardType };
