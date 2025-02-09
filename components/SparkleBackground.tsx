import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  size: number;
  style: {
    top: string;
    left: string;
    opacity: number;
  };
}

const SparkleBackground = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Create initial sparkles
    const initialSparkles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random()
      }
    }));
    setSparkles(initialSparkles);

    // Update sparkle positions periodically
    const interval = setInterval(() => {
      setSparkles(prev => prev.map(sparkle => ({
        ...sparkle,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random()
        }
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={sparkle.style}
          animate={{
            top: sparkle.style.top,
            left: sparkle.style.left,
            opacity: [0, sparkle.style.opacity, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 2
          }}
          className="absolute"
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              fill="#FFF5D1"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default SparkleBackground;