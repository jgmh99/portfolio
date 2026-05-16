import { projectShowcases } from "@/data/projects";
import PortfolioSections from "@/components/PortfolioSections";

export const metadata = {
  title: "Projects | Jegal Minhyuk",
};

export default function ProjectsPage() {
  return (
    <PortfolioSections projects={projectShowcases} />
  );
}
