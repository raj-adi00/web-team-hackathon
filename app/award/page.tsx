"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award as AwardIcon, Loader, Star } from "lucide-react";

interface Award {
  _id: string;
  title: string;
  organization: string;
  year: number;
  description?: string;
}

const AwardsPage = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch("/api/award");
        if (!response.ok) throw new Error("Failed to fetch awards");
        const data = await response.json();
        setAwards(data);
      } catch (err) {
        setError("Error fetching awards.");
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="flex items-center justify-center gap-3 mb-12 bg-blue-950"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AwardIcon className="w-8 h-8 text-yellow-400" />
          <h1 className="text-4xl font-bold text-white text-center">
            Awards & Achievements
          </h1>
          <AwardIcon className="w-8 h-8 text-yellow-400" />
        </motion.div>

        {loading && (
          <Loader/>
        )}

        {error && (
          <motion.p 
            className="text-center text-red-400 bg-red-900/20 py-4 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {!loading && !error && awards.length === 0 && (
          <motion.p 
            className="text-center text-gray-400 bg-white/5 py-8 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No awards available yet.
          </motion.p>
        )}

        {!loading && !error && awards.length > 0 && (
          <motion.ul 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {awards.map((award) => (
              <motion.li
                key={award._id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-shadow bg-blue-950"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {award.title}
                    </h2>
                    <div className="flex items-center gap-2 text-blue-300 mb-3">
                      <span>{award.organization}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                      <span>{award.year}</span>
                    </div>
                    {award.description && (
                      <p className="text-gray-300 leading-relaxed">
                        {award.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </div>
  );
};

export default AwardsPage;