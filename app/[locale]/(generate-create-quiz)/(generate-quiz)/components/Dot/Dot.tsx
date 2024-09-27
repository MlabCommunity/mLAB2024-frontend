import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib"; // Assuming cn is a utility for conditional classes

interface DotProps {
  step: number;
  visited: boolean;
}

const Dot = ({ step, visited }: DotProps) => {
  const dotVariants = {
    initial: { scale: 0.8, opacity: 0.7 },
    animate: {
      scale: [0.8, 1.2, 1],
      opacity: 1,
      transition: {
        duration: 0.6,
        times: [0, 0.3, 1],
        ease: "easeInOut",
      },
    },
    visited: {
      scale: 1.1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  const fillVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: visited ? 1 : 0,
      opacity: visited ? 1 : 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  };
  const lineVariants = {
    initial: { scaleX: 0, originX: 0 },
    animate: {
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  };
  const numberVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: visited ? 0 : 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <section className="flex items-center">
      {/* Outer Dot with Border */}
      <motion.div
        className={cn(
          "size-8 rounded-full flex items-center justify-center relative",
          visited ? "border-black" : "border-gray-300",
          "border-2"
        )}
        variants={dotVariants}
        initial="initial"
        animate={visited ? "visited" : "animate"}
      >
        {/* Inner Filled Dot */}
        <motion.div
          className="absolute inset-0.5 bg-black rounded-full"
          variants={fillVariants}
          initial="initial"
          animate="animate"
        />

        {/* Step number text */}
        <motion.span
          className={cn(
            "absolute z-10 text-sm font-medium",
            visited ? "text-white" : "text-gray-500"
          )}
          variants={numberVariants}
          initial="initial"
          animate="animate"
        >
          {step + 1}
        </motion.span>

        {/* Checkmark icon if visited */}
        {visited && (
          <motion.svg
            className="absolute w-4 h-4 text-white"
            viewBox="0 0 24 24"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <path
              fill="currentColor"
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
            />
          </motion.svg>
        )}
      </motion.div>

      {/* Connecting line (shown if it's not the last step) */}
      {step < 2 && (
        <motion.div
          className="h-0.5 w-20 bg-gray-300 relative overflow-hidden"
          variants={lineVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="absolute inset-0 bg-black origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: visited ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
          />
        </motion.div>
      )}
    </section>
  );
};

export default Dot;
