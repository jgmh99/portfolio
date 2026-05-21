import { projectShowcases } from "@/data/projects";
import PortfolioSections from "@/components/PortfolioSections";

export default function Home() {
  return <PortfolioSections projects={projectShowcases} />;
}
