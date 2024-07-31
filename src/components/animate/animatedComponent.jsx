import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const AnimatedComponent = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0.1, // 10% ko'rinishda bo'lsa trigger qiladi
    triggerOnce: true, // faqat bir marta trigger qiladi
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};
export default AnimatedComponent;