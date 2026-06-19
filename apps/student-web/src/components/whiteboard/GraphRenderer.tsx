import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { evaluate } from 'mathjs';
import type { GraphElement } from '@/types/board.types';

const colorMap: Record<string, string> = {
  default: '#1E293B',
  blue: '#3B82F6',
  green: '#22C55E',
  orange: '#F97316',
  red: '#EF4444',
};

interface GraphRendererProps {
  element: GraphElement;
}

export default function GraphRenderer({ element }: GraphRendererProps) {
  const color = colorMap[element.color || 'blue'];
  const width = 280;
  const height = 200;
  const padding = 35;

  const graphData = useMemo(() => {
    if (element.graphType === 'function' && element.fn) {
      const [minX, maxX] = element.domain || [-5, 5];
      const points: { x: number; y: number }[] = [];
      const samples = 100;
      const step = (maxX - minX) / samples;

      for (let i = 0; i <= samples; i++) {
        const x = minX + i * step;
        try {
          const y = evaluate(element.fn.replace(/x/g, `(${x})`));
          if (typeof y === 'number' && isFinite(y)) {
            points.push({ x, y });
          }
        } catch {
          // skip invalid evaluations
        }
      }
      return points;
    }
    return element.dataPoints || [];
  }, [element]);

  if (graphData.length === 0) return null;

  const xMin = Math.min(...graphData.map(p => p.x));
  const xMax = Math.max(...graphData.map(p => p.x));
  const yMin = Math.min(...graphData.map(p => p.y));
  const yMax = Math.max(...graphData.map(p => p.y));

  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;

  const scaleX = (x: number) => padding + ((x - xMin) / xRange) * (width - 2 * padding);
  const scaleY = (y: number) => (height - padding) - ((y - yMin) / yRange) * (height - 2 * padding);

  const pathD = graphData
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x).toFixed(1)} ${scaleY(p.y).toFixed(1)}`)
    .join(' ');

  // Axis origin
  const originX = xMin <= 0 && xMax >= 0 ? scaleX(0) : padding;
  const originY = yMin <= 0 && yMax >= 0 ? scaleY(0) : height - padding;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="inline-block"
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Grid */}
        {[...Array(5)].map((_, i) => {
          const x = padding + ((width - 2 * padding) / 4) * i;
          const y = padding + ((height - 2 * padding) / 4) * i;
          return (
            <g key={i}>
              <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="#E2E8F0" strokeWidth="0.5" />
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#E2E8F0" strokeWidth="0.5" />
            </g>
          );
        })}

        {/* Axes */}
        <line x1={padding} y1={originY} x2={width - padding} y2={originY} stroke="#94A3B8" strokeWidth="1.5" />
        <line x1={originX} y1={padding} x2={originX} y2={height - padding} stroke="#94A3B8" strokeWidth="1.5" />

        {/* Arrowheads */}
        <polygon points={`${width - padding},${originY - 4} ${width - padding},${originY + 4} ${width - padding + 6},${originY}`} fill="#94A3B8" />
        <polygon points={`${originX - 4},${padding} ${originX + 4},${padding} ${originX},${padding - 6}`} fill="#94A3B8" />

        {/* Function curve */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* Axis labels */}
        {element.axisLabels && (
          <>
            <text x={width - padding + 2} y={originY + 16} fontSize="11" fill="#64748B" fontFamily="Kalam, Caveat, cursive">
              {element.axisLabels.x}
            </text>
            <text x={originX - 20} y={padding - 6} fontSize="11" fill="#64748B" fontFamily="Kalam, Caveat, cursive">
              {element.axisLabels.y}
            </text>
          </>
        )}

        {/* Function label */}
        {element.fn && (
          <text x={width - padding - 5} y={padding + 15} fontSize="12" fill={color} fontFamily="Kalam, Caveat, cursive" textAnchor="end">
            f(x) = {element.fn}
          </text>
        )}
      </svg>
    </motion.div>
  );
}
