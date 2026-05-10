export type Achievement = {
  value: number;
  suffix: string;
  label: string;
};

export const achievements: Achievement[] = [
  {
    value: 1,
    suffix: " yr",
    label: "Vice President, Math Club and active systems mentor.",
  },
  {
    value: 2,
    suffix: "+",
    label: "Hackathon podium finishes across AI and full-stack tracks.",
  },
  {
    value: 8,
    suffix: ".54",
    label: "Current CGPA, sustained while building research prototypes.",
  },
  {
    value: 4,
    suffix: "",
    label: "Core research themes: RL, simulation, graph learning, robust ML.",
  },
];
