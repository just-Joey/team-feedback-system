import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getUsers, createUser } from '../../api/users';
import type { User, CreateUserPayload } from '../../types';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import UserForm from './UserForm';

export default function UserList() {
  const { data: users, loading, error, refetch } = useFetch(getUsers);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (data: CreateUserPayload) => {
    await createUser(data);
    setShowModal(false);
    refetch();
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      render: (user: User) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          user.role === 'MANAGER' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {user.role}
        </span>
      ),
    },
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <Button onClick={() => setShowModal(true)}>Add User</Button>
      </div>

      <Card>
        {users && users.length > 0 ? (
          <Table columns={columns} data={users} onRowClick={(user) => navigate(`/users/${user.id}`)} />
        ) : (
          <EmptyState message="No users yet" actionLabel="Add User" onAction={() => setShowModal(true)} />
        )}
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add User">
        <UserForm onSubmit={handleCreate} onCancel={() => setShowModal(false)} />
      </Modal>
    </div>
  );
}
