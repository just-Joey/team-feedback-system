import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getUser, updateUser, deleteUser } from '../../api/users';
import type { CreateUserPayload } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import UserForm from './UserForm';

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = Number(id);
  const { data: user, loading, error, refetch } = useFetch(() => getUser(userId), [userId]);
  const [showEdit, setShowEdit] = useState(false);

  const handleUpdate = async (data: CreateUserPayload) => {
    await updateUser(userId, data);
    setShowEdit(false);
    refetch();
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    await deleteUser(userId);
    navigate('/users');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return <p className="text-gray-500">User not found</p>;

  return (
    <div>
      <button onClick={() => navigate('/users')} className="text-sm text-indigo-600 hover:text-indigo-800 mb-4 inline-block cursor-pointer">
        &larr; Back to Users
      </button>

      <Card>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 mt-1">{user.email}</p>
            <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
              user.role === 'MANAGER' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {user.role}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setShowEdit(true)}>Edit</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </div>
        </div>
      </Card>

      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)} title="Edit User">
        <UserForm initialData={user} onSubmit={handleUpdate} onCancel={() => setShowEdit(false)} />
      </Modal>
    </div>
  );
}
