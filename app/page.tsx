import ProfessorHero, { ProfessorData } from "./ProfessorHero/page";

export default function Home() {
  const professorData: ProfessorData = {
    name: "Dr. Alexandra Richardson",
    title: "Professor of Quantum Physics",
    credentials: "Ph.D., M.Sc., B.Sc.",
    department: "Department of Physics and Astronomy",
    university: "Cambridge University",
    specialization: "Quantum Mechanics & Theoretical Physics",
    tagline:
      "Advancing the frontiers of quantum physics through research and education",
    image:
      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3",
    linkedinUrl: "https://www.linkedin.com/in/alexandra-richardson",
  };
  return (
    <>
      <ProfessorHero professorData={professorData} />
    </>
  );
}
