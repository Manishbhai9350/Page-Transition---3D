"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { useTransitionRouter } from "next-view-transitions";

gsap.registerPlugin(ScrollTrigger,SplitText)

export default function Home() {
  const nvt = useTransitionRouter();

  const sections = [
    {
      title: "Alkanes",
      desc: "Alkanes are saturated hydrocarbons consisting entirely of single bonds between carbon atoms. They are stable, non-reactive under normal conditions, and serve as the primary constituents of fuels such as natural gas, gasoline, and diesel. Their simple molecular structure makes them fundamental in organic chemistry and industrial applications, including lubrication and chemical synthesis.",
      img: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "/alkanes",
    },
    {
      title: "Alkenes",
      desc: "Alkenes are unsaturated hydrocarbons that contain at least one carbon-carbon double bond, making them more reactive than alkanes. They are crucial in the chemical industry for the production of polymers, plastics, and synthetic materials. Their unique double-bond structure allows them to participate in addition reactions, making them versatile building blocks for complex organic molecules.",
      img: "https://images.unsplash.com/photo-1693919653649-27492e78899d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "/alkenes",
    },
    {
      title: "Alkynes",
      desc: "Alkynes are highly reactive hydrocarbons characterized by at least one carbon-carbon triple bond. They are less common than alkanes and alkenes but are essential in specialized chemical processes and industrial applications. Alkynes are used in organic synthesis, pharmaceuticals, and materials science, where their reactivity allows the creation of complex molecular structures and chemical transformations.",
      img: "https://images.unsplash.com/photo-1651197122040-3ea0656161ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "/alkynes",
    },
  ];

  useGSAP(() => {
    
    const lenis = new Lenis()
    gsap.ticker.add((t) => {
      lenis.raf(t * 1000)
    })
    gsap.ticker.lagSmoothing(0)
    lenis.on("scroll", ScrollTrigger.update)

    const descriptions:gsap.DOMTarget[] = gsap.utils.toArray('.description')
    const headings:gsap.DOMTarget[] = gsap.utils.toArray('.heading')

    descriptions.forEach((description) => {
      const split = new SplitText(description,{
        type:'words',
        mask:'words'
      })

      gsap.set(split.words,{
        yPercent:100
      })

      gsap.to(split.words,{
        yPercent:0,
        stagger:0.0075,
        delay:.1,
        ease:'power4.out',
        scrollTrigger:{
          trigger:description,
          start:'top bottom',
          end:'bottom top',
          toggleActions:'play reset restart reset'
        }
      })
    })
    headings.forEach((heading) => {
      const split = new SplitText(heading,{
        type:'chars',
        mask:'chars'
      })

      gsap.set(split.chars,{
        yPercent:100
      })

      gsap.to(split.chars,{
        yPercent:0,
        stagger:0.0075,
        delay:.1,
        ease:'power4.out',
        scrollTrigger:{
          trigger:heading,
          start:'top bottom',
          end:'bottom top',
          toggleActions:'play reset restart reset'
        }
      })
    })


  
    return () => {
      lenis.destroy()
    }
  }, [])
  

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
        {sections.map((section, index) => (
          <div
            key={section.title}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <img
              src={section.img}
              alt={section.title}
              className="w-full md:w-1/2 shadow-xl cursor-pointer transition-transform"
              onClick={() => nvt.push(section.href)}
            />

            {/* Description */}
            <div className="md:w-1/2 flex flex-col gap-2">
              <h2 className="heading text-4xl font-bold">{section.title}</h2>
              <p className="description text-gray-300 text-md leading-5">{section.desc}</p>
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
