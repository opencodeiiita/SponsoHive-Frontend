import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface CoreFeature {
  title: string;
  description: string;
  link?: string;
  bgImage: string;
}

const FeatureCard: React.FC<CoreFeature> = ({ title, description, link, bgImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out w-80 h-80 overflow-hidden group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
      }}
    >
      
      <motion.div
        className="absolute inset-0 bg-yellow-400"
      />

      <motion.div
        className="absolute inset-6 p-4 bg-cover bg-center"  
        style={{ backgroundImage: `url(${bgImage})` }}
        animate={{ opacity: isHovered ? 0.7 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Background Overlay */}
      <motion.div
        className="absolute inset-4 bg-black"  
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isHovered ? 0.7 : 0.1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="bg-black bg-opacity-70 rounded-lg p-4 mt-auto"
              initial={{ opacity: 0, y: "150%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0, y: "150%" }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 1,
              }}
            >
              <p className="text-gray-200 text-center mb-4">{description}</p>
              <Link to={link || "#"} className="block w-full">
                <motion.div
                  className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg text-center hover:bg-yellow-400 transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Border Effect */}
      <motion.div
        className="absolute inset-0 border-2 border-yellow-400 rounded-xl opacity-0"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 0.98 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default FeatureCard;
