export type Project = {
  name: string;
  oneLiner: string;
  tech: string[];
  challenge: string;
  metric: string;
  aestheticClass: string;
  github: string;
  demo?: string;
  motif: string;
};

export const projects: Project[] = [
  {
    name: "Golfero",
    oneLiner:
      "Physics-first golf simulation with wind fields, terrain response, and trajectory planning.",
    tech: ["TypeScript", "Three.js", "Rust", "WebWorkers"],
    challenge:
      "Built deterministic trajectory prediction while maintaining real-time frame budgets.",
    metric: "2.8x faster path simulation via vectorized collision integration.",
    aestheticClass: "from-sky-400/30 via-cyan-300/10 to-emerald-300/25",
    github: "https://github.com/Shaenpai24/PROJECT-GOLFERO",
    motif: "Trajectories • Wind vectors • Terrain response",
  },
  {
    name: "ChainForge",
    oneLiner:
      "Graph-native orchestration engine for chaining tools, prompts, and multi-stage reasoning.",
    tech: ["Python", "FastAPI", "Neo4j", "React"],
    challenge:
      "Designed DAG execution guarantees with checkpointing and replay for reproducible experiments.",
    metric: "43% reduction in workflow failures using topology-aware retries.",
    aestheticClass: "from-indigo-300/25 via-blue-300/10 to-teal-300/20",
    github: "https://github.com/Shaenpai24/Paste-athon_Team_Lovedathon",
    motif: "Directed acyclic graphs • Dependency propagation",
  },
  {
    name: "NetReaper",
    oneLiner:
      "Adversarial network-defense simulator with anomaly pulses and adaptive threat scoring.",
    tech: ["Go", "Kafka", "PyTorch", "gRPC"],
    challenge:
      "Modeled stealth attack signatures without overfitting to synthetic traffic patterns.",
    metric: "18-point lift in F1 score on adversarially perturbed traces.",
    aestheticClass: "from-red-300/20 via-orange-300/10 to-cyan-300/20",
    github: "https://github.com/Chimera418/Netreaper",
    motif: "Defense telemetry • Anomaly pulses • Threat adaptation",
  },
  {
    name: "RL Budget Planner",
    oneLiner:
      "Constrained RL planner for long-horizon budget optimization with uncertainty-aware policy shifts.",
    tech: ["PyTorch", "Gymnasium", "NumPy", "Plotly"],
    challenge:
      "Balanced exploration against strict financial constraints with interpretable policy updates.",
    metric: "22% better reward-to-risk ratio versus heuristic baselines.",
    aestheticClass: "from-emerald-300/30 via-lime-200/10 to-sky-300/20",
    github: "https://github.com/Shaenpai24",
    demo: "https://huggingface.co/spaces/OldM0nk24/Rl-Budget-Planner",
    motif: "Decision trees • Policy evolution • State transitions",
  },
  {
    name: "FlowState",
    oneLiner:
      "Event-driven workflow runtime for real-time automation and resilient task orchestration.",
    tech: ["Node.js", "PostgreSQL", "Redis", "Temporal"],
    challenge:
      "Maintained strict workflow consistency across retries, partial failures, and delayed events.",
    metric: "99.95% task completion reliability in soak tests.",
    aestheticClass: "from-fuchsia-300/25 via-pink-300/10 to-blue-300/20",
    github: "https://github.com/Shaenpai24/FlowState",
    motif: "Workflow orchestration • Retry safety • Event consistency",
  },
];
