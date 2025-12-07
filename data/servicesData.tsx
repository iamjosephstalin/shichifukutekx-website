import React from 'react';
import { Cpu, Globe, Zap, Layers, Eye, Shield, Database, Cloud, BarChart } from 'lucide-react';

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ReactNode;
  tags: string[];
  benefits: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
}

export const servicesData: ServiceData[] = [
  {
    id: "01",
    slug: "enterprise-ai-integration",
    title: "Enterprise AI Integration",
    shortDescription: "We architect and deploy secure, private Large Language Models (LLMs) and neural networks directly within your existing infrastructure.",
    fullDescription: "In an era where data is the new oil, sovereignty is paramount. We don't just wrap public APIs; we build bespoke neural architectures that live within your firewall. Our Enterprise AI Integration service focuses on deploying Private GPTs and fine-tuned LLMs that learn from your proprietary data without ever exposing it to external providers. We ensure your AI assets are as secure as they are intelligent.",
    icon: <Cpu className="w-8 h-8" />,
    tags: ["LLM Ops", "Private GPT", "TensorFlow", "RAG Pipelines"],
    benefits: [
      { title: "Data Sovereignty", desc: "Your data never leaves your infrastructure. We deploy on-premise or in your private cloud VPC." },
      { title: "Zero Hallucination", desc: "Retrieval-Augmented Generation (RAG) pipelines grounded in your specific knowledge base." },
      { title: "Regulatory Compliance", desc: "Fully compliant with GDPR, HIPAA, and ISO 27001 standards for sensitive industries." }
    ],
    process: [
      { step: "01", title: "Data Audit", desc: "We analyze your unstructured data lakes to identify high-value training corpus." },
      { step: "02", title: "Model Selection", desc: "Choosing the right foundation model (Llama 3, Mistral, Falcon) for your specific use case." },
      { step: "03", title: "Fine-Tuning", desc: "Training the model on your proprietary data using LoRA/QLoRA techniques." },
      { step: "04", title: "RAG Deployment", desc: "Connecting the model to your live vector database for real-time context." }
    ]
  },
  {
    id: "02",
    slug: "cloud-architecture",
    title: "Cloud Architecture",
    shortDescription: "Designing resilient, scalable cloud-native ecosystems. We specialize in serverless microservices and container orchestration.",
    fullDescription: "Legacy infrastructure is the silent killer of innovation. Our Cloud Architecture practice transforms monolithic applications into agile, resilient microservices. We leverage the power of Kubernetes and Serverless computing to ensure your systems can scale infinitely to meet demand while optimizing costs. We build 'Self-Healing' infrastructure that detects anomalies and corrects them before they impact your users.",
    icon: <Cloud className="w-8 h-8" />,
    tags: ["AWS Advanced", "Azure Hybrid", "Kubernetes", "Event-Driven"],
    benefits: [
      { title: "Infinite Scalability", desc: "Systems that automatically expand and contract based on real-time traffic loads." },
      { title: "Cost Optimization", desc: "FinOps implementation to ensure you only pay for the compute you actually use." },
      { title: "High Availability", desc: "Multi-region active-active deployments for 99.999% uptime guarantees." }
    ],
    process: [
      { step: "01", title: "Infrastructure as Code", desc: "Defining your entire stack via Terraform or Pulumi for reproducible deployments." },
      { step: "02", title: "Containerization", desc: "Dockerizing applications and establishing CI/CD pipelines." },
      { step: "03", title: "Orchestration", desc: "Deploying EKS/AKS clusters with service mesh for observability." }
    ]
  },
  {
    id: "03",
    slug: "data-engineering",
    title: "Data Engineering",
    shortDescription: "Building the high-velocity data pipelines that feed your intelligence engines. We transform raw data lakes into structured assets.",
    fullDescription: "AI is only as good as the data that feeds it. Our Data Engineering team builds the high-velocity pipelines required to ingest, clean, and structure petabytes of data in real-time. We move beyond simple ETL to modern ELT architectures, enabling instant analytics and machine learning readiness. From streaming IoT sensors to transactional logs, we unify your data universe.",
    icon: <Database className="w-8 h-8" />,
    tags: ["ETL/ELT", "BigQuery", "Snowflake", "Apache Spark"],
    benefits: [
      { title: "Real-Time Insight", desc: "Streaming architectures that provide millisecond-latency analytics." },
      { title: "Data Quality", desc: "Automated validation frameworks that prevent garbage-in, garbage-out." },
      { title: "Unified Governance", desc: "A single source of truth across your entire enterprise." }
    ],
    process: [
      { step: "01", title: "Ingestion Strategy", desc: "Setting up Kafka/Kinesis for real-time data capture." },
      { step: "02", title: "Transformation", desc: "dbt (Data Build Tool) modeling to create business-ready datasets." },
      { step: "03", title: "Warehousing", desc: "Optimizing storage in Snowflake or BigQuery for query performance." }
    ]
  },
  {
    id: "04",
    slug: "cognitive-automation",
    title: "Cognitive Automation",
    shortDescription: "Beyond simple RPA. We deploy autonomous agent systems capable of reasoning, planning, and executing complex workflows.",
    fullDescription: "Traditional RPA breaks when the UI changes. Cognitive Automation adapts. We deploy autonomous AI agents capable of 'Reasoning'—breaking down complex goals into sub-tasks and executing them across your browser, terminal, and API stack. These agents act as digital employees, handling complex workflows like procurement, customer onboarding, and fraud detection with minimal human oversight.",
    icon: <Zap className="w-8 h-8" />,
    tags: ["AutoGPT", "Semantic Search", "Process Mining", "Python"],
    benefits: [
      { title: "Adaptive Execution", desc: "Agents that learn and adapt to changing interfaces and workflows." },
      { title: "24/7 Operations", desc: "Digital workers that never sleep and scale instantly with demand." },
      { title: "Human-in-the-Loop", desc: "Systems designed to ask for help when confidence scores drop." }
    ],
    process: [
      { step: "01", title: "Workflow Mapping", desc: "Using process mining to identify high-friction manual tasks." },
      { step: "02", title: "Agent Design", desc: "Configuring LangChain agents with specific tools and permissions." },
      { step: "03", title: "Sandboxed Testing", desc: "Running agents in controlled environments to verify decision logic." }
    ]
  },
  {
    id: "05",
    slug: "immersive-ui-ux",
    title: "Immersive UI/UX",
    shortDescription: "Complex systems shouldn't feel complicated. We build award-winning, motion-rich interfaces for intuitive AI interaction.",
    fullDescription: "The most powerful algorithm is useless if users can't interact with it. We bridge the gap between machine intelligence and human intuition through immersive, motion-rich design. Using WebGL, Three.js, and advanced motion physics, we create interfaces that make complex data feel tangible. We design for the 'Flow State', ensuring that professionals can wield AI tools with surgical precision.",
    icon: <Eye className="w-8 h-8" />,
    tags: ["Figma", "React Three Fiber", "WebGL", "Motion Design"],
    benefits: [
      { title: "Reduced Cognitive Load", desc: "Interfaces designed to visualize high-dimensional data simply." },
      { title: "Higher Adoption", desc: "Enterprise tools that feel like consumer-grade experiences." },
      { title: "Accessibility", desc: "Designs that are inclusive and compliant with WCAG 2.1 standards." }
    ],
    process: [
      { step: "01", title: "User Research", desc: "Shadowing stakeholders to understand their mental models." },
      { step: "02", title: "Prototyping", desc: "High-fidelity Figma prototypes with full interaction flows." },
      { step: "03", title: "Creative Dev", desc: "Implementing micro-interactions and shaders in React." }
    ]
  }
];