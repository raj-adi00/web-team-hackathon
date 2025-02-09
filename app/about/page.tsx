"use client";

import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProfessorData {
  name: string;
  title: string;
  about: string;
}

const TypewriterText = ({ text }: { text: string }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.3 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function AboutPage() {
  const [professor, setProfessor] = useState<ProfessorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfessorData = async () => {
      try {
        const response = await fetch("/api/about");

        if (!response.ok) {
          if (response.status === 404) router.push("/404");
          else throw new Error("Failed to fetch professor data");
        }

        const data = await response.json();
        setProfessor(data);
      } catch (error) {
        console.error("Error fetching professor data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessorData();
  }, []);

  return (
    <motion.div
      className="min-h-screen p-6 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-black"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          About Me
        </motion.h1>

        {loading ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <Loader />
          </motion.div>
        ) : error ? (
          <motion.p
            className="text-center text-red-500"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Failed to load professor data.
          </motion.p>
        ) : professor ? (
          <motion.div
            className="space-y-8 text-blue-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="border-l-4 border-gray-800 pl-6 bg-gray-200 backdrop-blur-sm rounded-r-lg shadow-lg p-6"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div className="text-2xl font-semibold mb-2">
                <TypewriterText text={professor.name} />
              </motion.div>
              <motion.h3
                className="text-xl text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                {professor.title}
              </motion.h3>
            </motion.div>

            <motion.div
              className="prose prose-lg max-w-none bg-gray-100 backdrop-blur-sm rounded-lg shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div dangerouslySetInnerHTML={{ __html: professor.about }} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.p
            className="text-center text-red-500"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Professor data is not available.
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
