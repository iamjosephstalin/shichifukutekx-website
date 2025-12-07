import React from 'react';

interface ShapeProps {
  className?: string;
  size?: number;
  color?: string;
}

export const NeonCube: React.FC<ShapeProps> = ({ className = '', size = 100, color = '#00F0FF' }) => {
  const faceStyle = {
    position: 'absolute' as const,
    width: size,
    height: size,
    border: `1px solid ${color}`,
    backgroundColor: `${color}10`, // 10% opacity
    boxShadow: `0 0 15px ${color}40`,
  };

  const translate = size / 2;

  return (
    <div className={`perspective-1000 w-[${size}px] h-[${size}px] ${className}`}>
      <div className="relative w-full h-full transform-style-3d animate-spin-slow">
        <div style={{ ...faceStyle, transform: `rotateY(0deg) translateZ(${translate}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${translate}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${translate}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${translate}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${translate}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${translate}px)` }} />
      </div>
    </div>
  );
};

export const TechPyramid: React.FC<ShapeProps> = ({ className = '', size = 100, color = '#7B2CBF' }) => {
    // A simplified CSS tetrahedron/pyramid
    const height = size * 0.866; // Height of equilateral triangle
    
    return (
        <div className={`perspective-1000 ${className}`} style={{ width: size, height: size }}>
            <div className="relative w-full h-full transform-style-3d animate-spin-slow">
                {/* Base */}
                <div 
                    className="absolute top-0 left-0 origin-center"
                    style={{
                        width: size,
                        height: size,
                        background: `${color}20`,
                        border: `1px solid ${color}`,
                        transform: 'rotateX(90deg) translateZ(0px)',
                        boxShadow: `0 0 20px ${color}20`,
                    }} 
                />
                {/* Sides - simplified as rotating planes for visual effect since CSS pyramids are tricky without clip-path stacking */}
                <div 
                     className="absolute top-0 left-0"
                     style={{
                        width: size,
                        height: size,
                        border: `1px solid ${color}`,
                        transform: 'rotateY(0deg) translateZ(40px)',
                     }}
                />
                 <div 
                     className="absolute top-0 left-0"
                     style={{
                        width: size,
                        height: size,
                        border: `1px solid ${color}`,
                        transform: 'rotateY(90deg) translateZ(40px)',
                     }}
                />
            </div>
        </div>
    )
}