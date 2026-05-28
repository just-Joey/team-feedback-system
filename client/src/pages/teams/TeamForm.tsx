import { useState } from 'react';
import type { CreateTeamPayload } from '../../types';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';

interface TeamFormProps {
  onSubmit: (data: CreateTeamPayload) => void;
  onCancel: () => void;
}

export default function TeamForm({ onSubmit, onCancel }: TeamFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description: description || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Team Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="flex gap-3 pt-2">
        <Button type="submit">Create Team</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
