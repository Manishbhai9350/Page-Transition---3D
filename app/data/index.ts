
export type Carbon = {
  title: string;
  desc: string;
  img: string;
  href: string;
  id: number;
}

export const carbons: Carbon[] = [
  {
    title: "Alkanes",
    desc: "Alkanes are saturated hydrocarbons consisting entirely of single bonds between carbon atoms. They are stable, non-reactive under normal conditions, and serve as the primary constituents of fuels such as natural gas, gasoline, and diesel. Their simple molecular structure makes them fundamental in organic chemistry and industrial applications, including lubrication and chemical synthesis.",
    img: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/alkanes",
    id:1
  },
  {
    title: "Alkenes",
    desc: "Alkenes are unsaturated hydrocarbons that contain at least one carbon-carbon double bond, making them more reactive than alkanes. They are crucial in the chemical industry for the production of polymers, plastics, and synthetic materials. Their unique double-bond structure allows them to participate in addition reactions, making them versatile building blocks for complex organic molecules.",
    img: "https://images.unsplash.com/photo-1693919653649-27492e78899d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/alkenes",
    id:2
  },
  {
    title: "Alkynes",
    desc: "Alkynes are highly reactive hydrocarbons characterized by at least one carbon-carbon triple bond. They are less common than alkanes and alkenes but are essential in specialized chemical processes and industrial applications. Alkynes are used in organic synthesis, pharmaceuticals, and materials science, where their reactivity allows the creation of complex molecular structures and chemical transformations.",
    img: "https://images.unsplash.com/photo-1651197122040-3ea0656161ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/alkynes",
    id:3
  },
];
