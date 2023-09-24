import React from "react";

type IHeroState = {
    backgrounds: React.ReactNode[],
    mainContent: {
        heading: string,
        itemsToShow: string[],
        items: string[]
    },
    linkToMyOtherSocialMedia:
    {
        name: string,
        link: string,
        imageSrc: string,
    }[]
}

export default IHeroState;
