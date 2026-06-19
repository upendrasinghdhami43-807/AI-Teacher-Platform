import { motion } from 'framer-motion';
import type { ChemistryElement } from '@/types/board.types';

interface ChemistryRendererProps {
  element: ChemistryElement;
}

/**
 * Renders chemical reaction equations with proper formatting.
 * V1 scope: equation-only, styled text with arrow glyph + sub/superscripts.
 * TODO: Full molecular structure (bond-line) diagrams in future stage.
 */
export default function ChemistryRenderer({ element }: ChemistryRendererProps) {
  const formatReaction = (reaction: string) => {
    // Replace -> or → with a styled arrow
    // Handle subscripts (H2, O2) and superscripts (2+, 3-)
    const parts = reaction.split(/(\s*(?:->|→|⟶)\s*)/);

    return parts.map((part, i) => {
      if (part.match(/->|→|⟶/)) {
        return (
          <span key={i} className="mx-3 text-2xl text-gray-500">→</span>
        );
      }

      // Format chemical formulas with subscripts/superscripts
      const formatted = formatFormula(part);
      return <span key={i}>{formatted}</span>;
    });
  };

  const formatFormula = (text: string) => {
    // Match patterns like H2, O2, CO2, H2O, etc.
    const regex = /([A-Za-z]+)(\d+)|(\d+)([A-Za-z])|([+\s])|([A-Za-z]+)/g;
    const elements: React.ReactNode[] = [];
    let match;
    let lastIndex = 0;

    const str = text.trim();

    // Simple regex approach for chemical notation
    const parts = str.split('');
    let result: React.ReactNode[] = [];
    let i = 0;

    while (i < parts.length) {
      const char = parts[i];
      // Check if next char is a digit after a letter (subscript)
      if (i + 1 < parts.length && /[A-Za-z]/.test(char) && /\d/.test(parts[i + 1])) {
        let subscript = '';
        result.push(<span key={`letter-${i}`}>{char}</span>);
        i++;
        while (i < parts.length && /\d/.test(parts[i])) {
          subscript += parts[i];
          i++;
        }
        result.push(<sub key={`sub-${i}`} className="text-[70%]">{subscript}</sub>);
      }
      // Leading coefficient (digit before letter)
      else if (/\d/.test(char) && (i === 0 || /[\s+]/.test(parts[i - 1] || ''))) {
        let coeff = char;
        i++;
        while (i < parts.length && /\d/.test(parts[i])) {
          coeff += parts[i];
          i++;
        }
        result.push(<span key={`coeff-${i}`} className="mr-0.5">{coeff}</span>);
      }
      else {
        result.push(<span key={`char-${i}`}>{char}</span>);
        i++;
      }
    }

    return result;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center flex-wrap gap-0 font-[Kalam,Caveat,cursive] text-xl md:text-2xl text-orange-600 bg-orange-50 px-4 py-3 rounded-lg border border-orange-200"
    >
      {formatReaction(element.reaction)}
    </motion.div>
  );
}
