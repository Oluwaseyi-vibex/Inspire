import { motion } from "motion/react"
import { VideoIcon } from "lucide-react"

import { ContainerAnimated, ContainerScroll, ContainerStagger, ContainerSticky, GalleryCol, GalleryContainer } from "@/components/ui/animated-gallery"
import { Button } from "@/components/ui/button"

const IMAGES_1 = [
  "/hero1.jpeg",
  "/hero2.png",
  "/hero3.png",
  "/hero4.png",
]
const IMAGES_2 = [
  "/hero5.png",
  "/hero6.png",
  "/hero7.png",
  "/hero1.jpeg",
]
const IMAGES_3 = [
  "/hero2.png",
  "/hero3.png",
  "/hero4.png",
  "/hero5.png",
]

export default function GalleryPage() {
  return (
    <div className="relative">
      <ContainerStagger className="-mb-20 place-self-center px-6 pt-34 text-center">
        <ContainerAnimated>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[rgba(175,0,0,1)]">
            Our <span className="font-serif font-bold">Gallery</span>
          </h1>
        </ContainerAnimated>
        <ContainerAnimated>
          <p className="leading-normal tracking-tight text-[rgba(175,0,0,1)]/80 mt-4">
            Explore moments from our journey
          </p>
        </ContainerAnimated>

      </ContainerStagger>

      <ContainerScroll className="relative h-[350vh]">
        <ContainerSticky className="h-svh">
          <GalleryContainer>
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
              {IMAGES_1.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol className="mt-[-50%]" yRange={["15%", "5%"]}>
              {IMAGES_2.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
              {IMAGES_3.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  )
}
