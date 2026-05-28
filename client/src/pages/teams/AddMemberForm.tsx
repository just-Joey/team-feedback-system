import { useState } from 'react';
import type { User, AddTeamMemberPayload } from '../../types';
import { useFetch } from '../../hooks/useFetch';
import { getUsers } from '../../api/users';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface AddMemberFormProps {
  onSubmit: (data: AddTeamMemberPayload) => void;
  onCancel: () => void;
  existingMemberIds: number[];
}

export default function AddMemberForm({ onSubmit, onCancel, existingMemberIds }: AddMemberFormProps) {
  const { data: users, loading } = useFetch(getUsers);
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');

  const availableUsers = users?.filter((u: User) => !existingMemberIds.includes(u.id)) ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ userId: Number(userId), role });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="User"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        options={[
          { value: '', label: 'Select a user...' },
          ...availableUsers.map((u: User) => ({ value: String(u.id), label: u.name })),
        ]}
        required
      />
      <Input label="Role in Team" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Developer, Designer" required />
      <div className="flex gap-3 pt-2">
        <Button type="submit">Add Member</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
