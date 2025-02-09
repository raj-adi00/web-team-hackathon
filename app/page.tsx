"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfessorHero, { ProfessorData } from "@/components/ProfessorHero";
import Loader from "@/components/Loader";
import EducationList from "@/components/EducationList";

interface Education {
  _id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  yearOfCompletion: number;
}
const ProfessorPage = () => {
  const [professor, setProfessor] = useState<ProfessorData | null>(null);
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const response = await fetch("/api/hero");

        if (!response.ok) {
          router.push("/404");
        }

        const data = await response.json();
        setProfessor(data.data);

        const res = await fetch("/api/education");
        if (!response.ok) throw new Error("Failed to fetch education data");

        const val: Education[] = await res.json();
        setEducationList(val);
      } catch (error) {
        console.error("Error fetching professor data:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchHomePage();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return professor ? (
    <>
      <ProfessorHero professorData={professor} />, null;
      <h2 className="text-2xl font-semibold text-center mb-4 text-blue-950">
        Education
      </h2>
      <EducationList educationList={educationList} />
    </>
  ) : null;
};

export default ProfessorPage;
