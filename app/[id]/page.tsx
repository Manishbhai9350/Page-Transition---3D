"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, ViewTransition } from "react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { type Carbon, carbons } from "../data";
import { Link, useTransitionRouter } from "next-view-transitions";

gsap.registerPlugin(SplitText);

const Page = () => {
  const router = useTransitionRouter();
  const { id }: { id: string } = useParams();

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const data: Carbon | undefined = carbons.find(
    (c) => Number(c.id) == Number(id),
  );

  useEffect(() => {
    if (!data) {
      router.push("/404");
      return;
    }
    if (!titleRef.current || !descRef.current) return;

    const titleSplit = new SplitText(titleRef.current, {
      type: "chars",
      mask: "chars",
    });

    const descSplit = new SplitText(descRef.current, {
      type: "lines",
      mask: "lines",
    });

    gsap.from(titleSplit.chars, {
      y: 60,
      opacity: 0,
      stagger: 0.01,
      duration: 0.8,
      ease: "power4.out",
    });

    gsap.from(descSplit.lines, {
      y: 40,
      opacity: 0,
      stagger: 0.075,
      duration: 0.8,
      ease: "power4.out",
      delay: 0.4,
    });

    return () => {
      titleSplit.revert();
      descSplit.revert();
    };
  }, []);

  if (!data) return null;

  return (
    <main className="min-h-screen flex flex-col justify-between bg-neutral-950 text-neutral-100 px-6 md:px-16 py-6">
      <nav className="pb-2">
        <Link
          href="/"
          aria-label="Go back"
          className="group flex items-center gap-1 text-neutral-300 hover:text-white transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className="text-sm tracking-wide">Home</span>
        </Link>
      </nav>

      {/* Top Content */}
      <section className="max-w-3xl">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight"
        >
          {data.title}
        </h1>

        <p
          ref={descRef}
          className="text-sm md:text-xl md:leading-5.5 text-neutral-400 leading-4.5"
        >
          {data.desc}
        </p>
      </section>

      {/* Bottom Image */}
      <ViewTransition name={`view-image-${id}`}>
        <section className="view-image-section mt-8 flex justify-start max-w-3xl max-h-[300px]">
          <img
            style={{ viewTransitionName: `view-image-${id}` }}
            src={data.img}
            alt={data.title}
            className="w-fit max-w-4xl object-cover aspect-[9/16]"
          />
        </section>
      </ViewTransition>
    </main>
  );
};

export default Page;
