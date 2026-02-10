/* eslint-disable @next/next/no-img-element */
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { Link, useTransitionRouter } from "next-view-transitions";
import { carbons } from "../data";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  const router = useTransitionRouter();

  useGSAP(() => {
    const lenis = new Lenis();
    gsap.ticker.add((t) => {
      lenis.raf(t * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const descriptions: gsap.DOMTarget[] = gsap.utils.toArray(".description");
    const headings: gsap.DOMTarget[] = gsap.utils.toArray(".heading");

    const splits: SplitText[] = [];

    descriptions.forEach((description) => {
      const split = new SplitText(description, {
        type: "words",
        mask: "words",
      });
      splits.push(split);

      gsap.set(split.words, {
        yPercent: 100,
      });

      gsap.to(split.words, {
        yPercent: 0,
        stagger: 0.0075,
        delay: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: description,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play reset restart reset",
        },
      });
    });
    headings.forEach((heading) => {
      const split = new SplitText(heading, {
        type: "chars",
        mask: "chars",
      });
      splits.push(split);

      gsap.set(split.chars, {
        yPercent: 100,
      });

      gsap.to(split.chars, {
        yPercent: 0,
        stagger: 0.0075,
        delay: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heading,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play reset restart reset",
        },
      });
    });

    return () => {
      lenis.destroy();
      splits.map((s) => s.revert());
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-8 pb-12">
      {/* Hero Section */}
      <section className="h-screen py-8 max-w-6xl mx-auto flex flex-col items-center justify-end mb-32">
        <h1 className="heading text-6xl md:text-9xl font-regular leading-tight text-center tracking-tight">
          Hydrocarbons
        </h1>
        <p className="description text-gray-300 text-md leading-5 md:text-xl max-w-3xl text-center">
          Dive into the core molecules that power industry and chemistry.
          Explore alkanes, alkenes, and alkynes, their structures, properties,
          and applications.
        </p>
      </section>

      {/* Alternating Sections */}
      <section className="max-w-6xl mx-auto flex flex-col gap-32">
        {carbons.map((carbon, index) => (
          <div
            key={carbon.title}
            className={`view-transition-image-card flex flex-col md:flex-row items-center gap-12 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div 
                className="w-full md:w-1/2 shadow-xl cursor-pointer transition-transform"
            >
              <Link href={`/${carbon.id}`}>
                <img
                  style={{ viewTransitionName: `image-${carbon.id}` }}
                  src={carbon.img}
                  alt={carbon.title}
                  />
              </Link>
                </div>

            {/* Description */}
            <div className="md:w-1/2 flex flex-col gap-2">
              <h2 className="heading text-4xl font-bold">{carbon.title}</h2>
              <p className="description text-gray-300 text-md leading-5">
                {carbon.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-32 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Hydrocarbon Explorer. Industrial style
        design.
      </footer>
    </main>
  );
}
