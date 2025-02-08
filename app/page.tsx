"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfessorHero, { ProfessorData } from "@/components/ProfessorHero";
import Loader from "@/components/Loader";

const ProfessorPage = () => {
  const [professor, setProfessor] = useState<ProfessorData | null>(null);
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

  return professor ? <ProfessorHero professorData={professor} /> : null;
};

export default ProfessorPage;
