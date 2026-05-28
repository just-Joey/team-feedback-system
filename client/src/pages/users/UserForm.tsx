import { useState } from 'react';
import type { User, CreateUserPayload, UserRole } from '../../types';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: CreateUserPayload) => void;
  onCancel: () => void;
}

export default function UserForm({ initialData, onSubmit, onCancel }: UserFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [email, setEmail] = useState(initialData?.email ?? '');
  const [role, setRole] = useState<UserRole>(initialData?.role ?? 'MEMBER');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, role });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Select
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}
        options={[
          { value: 'MEMBER', label: 'Member' },
          { value: 'MANAGER', label: 'Manager' },
        ]}
      />
      <div className="flex gap-3 pt-2">
        <Button type="submit">{initialData ? 'Update' : 'Create'} User</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
