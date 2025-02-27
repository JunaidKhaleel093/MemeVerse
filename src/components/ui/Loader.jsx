import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({
  size = 'md',
  color = 'primary',
  text,
  fullScreen = false
}) => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const colorMap = {
    primary: 'text-purple-600',
    white: 'text-white',
    gray: 'text-gray-400'
  };

  const container = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        when: 'afterChildren'
      }
    }
  };

  const square = {
    initial: { opacity: 0, rotate: 0 },
    animate: {
      opacity: [0, 1, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const bounce = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="flex flex-col items-center">
          <motion.div
            className="flex space-x-2"
            variants={container}
            initial="initial"
            animate="animate"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`rounded ${sizeMap[size]} ${colorMap[color]}`}
                variants={square}
                style={{ backgroundColor: 'currentColor' }}
              />
            ))}
          </motion.div>
          {text && <p className="mt-4 text-gray-600">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="flex space-x-2"
        variants={container}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className={`rounded ${sizeMap[size]} ${colorMap[color]}`}
          variants={bounce}
          style={{ backgroundColor: 'currentColor' }}
        />
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`rounded ${sizeMap[size]} ${colorMap[color]}`}
            variants={square}
            style={{ backgroundColor: 'currentColor' }}
          />
        ))}
      </motion.div>
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
};

export default Loader;
