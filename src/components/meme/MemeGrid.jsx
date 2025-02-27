import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MemeCard from './MemeCard';

const MemeGrid = ({ memes, variant = 'default', columns = 3 }) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  if (memes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 text-lg">No memes found</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`grid ${columnClasses[columns]} gap-6`}
      variants={container}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {memes.map((meme) => (
        <motion.div key={meme.id} variants={item}>
          <MemeCard meme={meme} variant={variant} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MemeGrid;
