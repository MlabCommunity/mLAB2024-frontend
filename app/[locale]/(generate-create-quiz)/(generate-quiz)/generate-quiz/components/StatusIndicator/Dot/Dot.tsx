import { motion } from "framer-motion";
import { cn } from "@/lib";

const Dot = ({
  step,
  visited,
  currentRouteProp,
}: {
  step: number;
  currentRouteProp: string;
  visited: boolean;
}) => {
  const dotVariants = {
    initial: { scale: 0.8, opacity: 1 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    visited: {
      scale: 1.2,
      backgroundColor: "#000",
      transition: { duration: 0.5 },
    },
  };

  const lineVariants = {
    initial: { width: 0 },
    animate: {
      width: "80px",
      backgroundColor: visited ? "black" : "#e5e7eb",
      transition: { duration: 1 },
    },
  };

  return (
    <section className="flex items-center">
      <motion.div
        className={cn(
          "size-8 rounded-full flex items-center justify-center pointer-events-none",
          visited ? "bg-black" : "bg-content2"
        )}
        variants={dotVariants}
        initial="initial"
        animate={visited ? "visited" : "animate"}
      >
        <div>
          <span className="text-foreground-300">{step + 1}</span>
        </div>
      </motion.div>
      {step < 2 && (
        <motion.div
          className={cn(
            "h-[2px] border-none",
            visited ? "bg-red-500" : "bg-content2"
          )}
          variants={lineVariants}
          initial="initial"
          animate="animate"
        />
      )}
    </section>
  );
};

export default Dot;
