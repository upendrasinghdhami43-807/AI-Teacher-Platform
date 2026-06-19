import { motion } from 'framer-motion';
import type { ShapeElement } from '@/types/board.types';

interface ShapeRendererProps {
  element: ShapeElement;
}

export default function ShapeRenderer({ element }: ShapeRendererProps) {
  const { shape, dimensions, label, fillColor = 'rgba(99,102,241,0.08)', strokeColor = '#6366F1' } = element;
  const w = dimensions.width || 140;
  const h = dimensions.height || 120;
  const r = dimensions.radius || 60;

  const renderShape = () => {
    switch (shape) {
      case 'triangle': {
        const points = dimensions.points ||
          [[w / 2, 5], [5, h - 5], [w - 5, h - 5]];
        const pointsStr = points.map(p => p.join(',')).join(' ');
        return (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            <polygon
              points={pointsStr}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {label && (
              <text x={w / 2} y={h / 2 + 5} textAnchor="middle" fill={strokeColor} fontSize="14" fontFamily="Kalam, Caveat, cursive">
                {label}
              </text>
            )}
          </svg>
        );
      }
      case 'rectangle':
        return (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            <rect
              x="3" y="3" width={w - 6} height={h - 6}
              rx="4" ry="4"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
            {label && (
              <text x={w / 2} y={h / 2 + 5} textAnchor="middle" fill={strokeColor} fontSize="14" fontFamily="Kalam, Caveat, cursive">
                {label}
              </text>
            )}
          </svg>
        );
      case 'circle':
        return (
          <svg width={r * 2 + 10} height={r * 2 + 10} viewBox={`0 0 ${r * 2 + 10} ${r * 2 + 10}`}>
            <circle
              cx={r + 5} cy={r + 5} r={r}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
            {label && (
              <text x={r + 5} y={r + 10} textAnchor="middle" fill={strokeColor} fontSize="14" fontFamily="Kalam, Caveat, cursive">
                {label}
              </text>
            )}
          </svg>
        );
      case 'arrow':
        return (
          <svg width={w} height={40} viewBox={`0 0 ${w} 40`}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={strokeColor} />
              </marker>
            </defs>
            <line x1="5" y1="20" x2={w - 15} y2="20" stroke={strokeColor} strokeWidth="2" markerEnd="url(#arrowhead)" />
            {label && (
              <text x={w / 2} y="15" textAnchor="middle" fill={strokeColor} fontSize="12" fontFamily="Kalam, Caveat, cursive">
                {label}
              </text>
            )}
          </svg>
        );
      case 'line':
        return (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            <line x1="5" y1={h - 5} x2={w - 5} y2="5" stroke={strokeColor} strokeWidth="2" />
            {label && (
              <text x={w / 2} y={h / 2 - 5} textAnchor="middle" fill={strokeColor} fontSize="12" fontFamily="Kalam, Caveat, cursive">
                {label}
              </text>
            )}
          </svg>
        );
      default:
        return (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            <rect x="3" y="3" width={w - 6} height={h - 6} fill={fillColor} stroke={strokeColor} strokeWidth="2" rx="4" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="inline-block"
    >
      {renderShape()}
    </motion.div>
  );
}
