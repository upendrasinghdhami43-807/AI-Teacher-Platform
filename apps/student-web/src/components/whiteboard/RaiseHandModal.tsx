import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Hand, Send } from 'lucide-react';

interface RaiseHandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (doubt: string) => void;
}

export default function RaiseHandModal({ isOpen, onClose, onSubmit }: RaiseHandModalProps) {
  const [doubt, setDoubt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubt.trim()) return;
    onSubmit(doubt);
    setDoubt('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Raise Hand - Ask a Doubt">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-text-secondary">
          Have a question about what the AI teacher is explaining? Ask it here. The teacher will process your question and explain it on the board.
        </p>
        
        <div className="relative">
          <Input
            value={doubt}
            onChange={setDoubt}
            placeholder="E.g. Why did you use that formula?"
            className="w-full"
            autoFocus
          />
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={!doubt.trim()}>
            <Send size={16} className="mr-2" /> Ask Question
          </Button>
        </div>
      </form>
    </Modal>
  );
}
