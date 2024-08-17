import { useEffect, useMemo, useRef, useState } from "react";
import { TabButton as Button } from "../../components/tabButton";
import ArtWrapper from "./artWrapper";
import styles from "../../styles/art/ArtGallery.module.css";
import { ArtPropertiesInterface } from "../../model/art.interface";
import ExpandedArt from "./expandedArt";
import artworksData from "../../model/artworks.json";
import { Skeleton } from "../skeleton";

/* eslint-disable-next-line */
export interface ArtGalleryProps {}

type ArtCategory = "drawing" | "painting" | "digital" | "pixel" | "generative";

export function ArtGallery(props: ArtGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<ArtCategory>("drawing");

  const currentArt = useMemo(() => {
    switch (activeCategory) {
      case "drawing":
        return artworksData.find((category) => category.drawing)?.drawing || [];
      case "painting":
        return (
          artworksData.find((category) => category.painting)?.painting || []
        );
      case "digital":
        return artworksData.find((category) => category.digital)?.digital || [];
      case "pixel":
        return artworksData.find((category) => category.pixel)?.pixel || [];
      case "generative":
        return (
          artworksData.find((category) => category.generative)?.generative || []
        );
      default:
        return [];
    }
  }, [activeCategory]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const [expandedArt, setExpandedArt] = useState<any>(null);
  const [expandedArtIndex, setExpandedArtIndex] = useState(-1);
  const [expandedCurrArray, setExpandedCurrArray] = useState<
    ArtPropertiesInterface[]
  >([]);

  useEffect(() => {
    const desktopButtonBar = document.getElementById("desktopButtonBar");
    const mobileButtonBar = document.getElementById("mobileButtonBar");
    const spacer = document.getElementById("buttonBarSpacer");

    const handleDesktopScroll = () => {
      if (window.scrollY > spacer.offsetTop - 150 && window.innerWidth >= 640) {
        desktopButtonBar.classList.add(
          "fixed",
          "bg-[#FCFCF8]",
          "top-[4.5rem]",
          "py-2",
          "left-0",
          "right-0",
          "z-50"
        );
        spacer.classList.add("h-[56px]");
      } else {
        desktopButtonBar.classList.remove(
          "fixed",
          "bg-[#FCFCF8]",
          "top-[4.5rem]",
          "py-2",
          "left-0",
          "right-0",
          "z-50"
        );
        spacer.classList.remove("h-[56px]");
      }
    };

    const handleMobileScroll = () => {
      if (window.scrollY > spacer.offsetTop - 150 && window.innerWidth < 640) {
        mobileButtonBar.classList.remove("mb-3");
        mobileButtonBar.classList.add(
          "fixed",
          "bg-[#FCFCF8]",
          "bottom-0",
          "pt-1",
          "pb-[1.1rem]",
          "left-0",
          "right-0",
          "z-50"
        );
        spacer.classList.add("h-[88px]");
      } else {
        mobileButtonBar.classList.add("mb-3");
        mobileButtonBar.classList.remove(
          "fixed",
          "bg-[#FCFCF8]",
          "bottom-0",
          "pt-1",
          "pb-[1.1rem]",
          "left-0",
          "right-0",
          "z-50"
        );
        spacer.classList.remove("h-[88px]");
      }
    };

    window.addEventListener("scroll", handleDesktopScroll);
    window.addEventListener("scroll", handleMobileScroll);

    return () => {
      window.removeEventListener("scroll", handleDesktopScroll);
      window.removeEventListener("scroll", handleMobileScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollSpot = document.getElementById("artInfoTitle");
    if (scrollSpot && window.scrollY > 600) {
      scrollSpot.scrollIntoView();
    }
  };

  const setNewActiveCategory = (category: ArtCategory) => {
    scrollToTop();
    setIsLoading(true);
    setImagesLoaded(0);
    setActiveCategory(category);
  };

  const handleImageLoad = (numImages: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setImagesLoaded((prevState) => {
      const updatedState = prevState + 1;

      if (updatedState >= numImages) {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }

      return updatedState;
    });

    // set a maximum load time, ensuring it doesn't load forever
    const maxLoadTime = 1250;
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, maxLoadTime);
  };

  const handleVideoLoad = (numVideos: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setImagesLoaded((prevState) => {
      const updatedState = prevState + 1;

      if (updatedState >= numVideos) {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }

      return updatedState;
    });

    // set a maximum load time, ensuring it doesn't load forever
    const maxLoadTime = 1250;
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, maxLoadTime);
  };

  const handleExpandArt = (
    art: ArtPropertiesInterface,
    currArtArray: ArtPropertiesInterface[],
    index: number
  ) => {
    setExpandedArtIndex(index);
    setExpandedArt(art);
    setExpandedCurrArray(currArtArray);
  };

  const closeExpandedArt = () => {
    setExpandedArtIndex(-1);
    setExpandedArt(null);
  };

  return (
    <section className={styles["container"]}>
      {expandedArt && (
        <ExpandedArt
          art={expandedArt}
          artArray={expandedCurrArray}
          currentIndex={expandedArtIndex}
          onClose={closeExpandedArt}
        />
      )}
      {/* TODO: refactor button nav to another component */}
      {/* Desktop view */}
      <nav
        id="desktopButtonBar"
        className={`hidden sm:flex items-center justify-center mb-3 `}
      >
        <Button
          label="Digital"
          active={activeCategory === "digital"}
          onClick={() => setNewActiveCategory("digital")}
        />
        <Button
          label="Painting"
          active={activeCategory === "painting"}
          onClick={() => setNewActiveCategory("painting")}
        />
        <Button
          label="Drawing"
          active={activeCategory === "drawing"}
          onClick={() => setNewActiveCategory("drawing")}
        />
        <Button
          label="Generative"
          active={activeCategory === "generative"}
          onClick={() => setNewActiveCategory("generative")}
        />
        <Button
          label="Pixel"
          active={activeCategory === "pixel"}
          onClick={() => setNewActiveCategory("pixel")}
        />
      </nav>
      {/* mobile view */}
      <nav
        id="mobileButtonBar"
        className={`flex flex-col sm:hidden items-center justify-center mb-3 `}
      >
        <div className="flex pb-1 gap-1 items-center justify-center">
          <Button
            label="Digital"
            active={activeCategory === "digital"}
            onClick={() => setNewActiveCategory("digital")}
          />
          <Button
            label="Painting"
            active={activeCategory === "painting"}
            onClick={() => setNewActiveCategory("painting")}
          />
          <Button
            label="Drawing"
            active={activeCategory === "drawing"}
            onClick={() => setNewActiveCategory("drawing")}
          />
        </div>
        <div className="flex gap-1 items-center justify-center">
          <Button
            label="Generative"
            active={activeCategory === "generative"}
            onClick={() => setNewActiveCategory("generative")}
          />
          <Button
            label="Pixel"
            active={activeCategory === "pixel"}
            onClick={() => setNewActiveCategory("pixel")}
          />
        </div>
      </nav>
      <div id="buttonBarSpacer"></div>
      {isLoading && (
        <div className="flex flex-wrap justify-center gap-5 w-full px-4 md:justify-start md:w-[700px] lg:w-[1000px] xl:w-[1250px]">
          <Skeleton className="w-full md:w-[500px] h-[400px]" />
          <Skeleton className="w-full md:w-[270px] h-[400px]" />
          <Skeleton className="w-full md:w-[340px] h-[400px]" />
          <Skeleton className="w-full md:w-[250px] h-[400px]" />
          <Skeleton className="w-full md:w-[380px] h-[400px]" />
          <Skeleton className="w-full md:w-[360px] h-[400px]" />
          <Skeleton className="w-full md:w-[600px] h-[400px]" />
          <Skeleton className="w-full md:w-[200px] h-[400px]" />
          <Skeleton className="w-full md:w-[400px] h-[400px]" />
        </div>
      )}
      <div
        className={`${styles["art-grid-container"]} ${
          isLoading ? styles["hidden"] : ""
        }`}
      >
        {currentArt.map((art: ArtPropertiesInterface, index: number) => (
          <div key={art.link}>
            {art.isVideo ? (
              <ArtWrapper
                type="video"
                art={art}
                imgName={art.name}
                videoSrc={art.link}
                cover={art.cover}
                onLoad={() => handleVideoLoad(currentArt.length)}
                onError={() => handleVideoLoad(currentArt.length)}
                onExpandArt={() =>
                  console.log("use video controls for fullscreen")
                }
              />
            ) : (
              <ArtWrapper
                type="image"
                art={art}
                imgName={art.name}
                thumbnailSrc={art.link}
                onLoad={() => handleImageLoad(currentArt.length)}
                onError={() => handleImageLoad(currentArt.length)}
                onExpandArt={() => handleExpandArt(art, currentArt, index)}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ArtGallery;
