import React, { useState, useEffect } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import ILandingPageProps from "./Interface/ILandingPageProps";
import Experiences from "../../components/ExperienceSection/ExperienceSection";
import FeaturedContentSection from "../../components/FeaturedContentSection/FeaturedContentSection";
import LandingPageCard from "../../components/LandingPageCard/LandingPageCard";
import ConnectWithMeSection from "../../components/ConnectWithMeSection/ConnectWithMeSection";
import BlogPage from "../BlogPage/BlogPage";

const LandingPage: React.FC<ILandingPageProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <></>;
  }

  return (
    <main className="landing-page-content">
      <HeroSection scrolling={props.scrolling} />
      <FeaturedContentSection />
      <div className="experience-section-wrapper">
        <Experiences scrolled={props.scrolled} />
      </div>
      <LandingPageCard landingPageCardType="fitContent" className="blend-with-background">
        <section className="flex-column-centered-centered">
          <BlogPage />
        </section>
      </LandingPageCard>
    </main>
  );
}

export default LandingPage;
