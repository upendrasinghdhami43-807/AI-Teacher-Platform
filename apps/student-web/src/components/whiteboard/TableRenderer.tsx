import { motion } from 'framer-motion';
import type { TableElement } from '@/types/board.types';

interface TableRendererProps {
  element: TableElement;
}

export default function TableRenderer({ element }: TableRendererProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto"
    >
      <table className="border-collapse font-[Kalam,Caveat,cursive] text-sm md:text-base">
        <thead>
          <tr>
            {element.headers.map((header, i) => (
              <th
                key={i}
                className="border-2 border-gray-300 px-4 py-2 bg-blue-50 text-blue-700 text-left font-bold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {element.rows.map((row, rowIdx) => (
            <motion.tr
              key={rowIdx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: rowIdx * 0.1, duration: 0.3 }}
            >
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="border border-gray-300 px-4 py-2 text-gray-700"
                >
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
