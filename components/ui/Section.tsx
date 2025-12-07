import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`py-20 md:py-32 px-4 md:px-12 w-full max-w-[1920px] mx-auto ${className}`}>
      {children}
    </section>
  );
};

export default Section;