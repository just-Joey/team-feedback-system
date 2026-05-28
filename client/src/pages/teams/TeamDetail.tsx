import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getTeam, addTeamMember } from '../../api/teams';
import type { AddTeamMemberPayload, TeamMember } from '../../types';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import AddMemberForm from './AddMemberForm';

export default function TeamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const teamId = Number(id);
  const { data: team, loading, error, refetch } = useFetch(() => getTeam(teamId), [teamId]);
  const [showAddMember, setShowAddMember] = useState(false);

  const handleAddMember = async (data: AddTeamMemberPayload) => {
    await addTeamMember(teamId, data);
    setShowAddMember(false);
    refetch();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!team) return <p className="text-gray-500">Team not found</p>;

  const memberColumns = [
    {
      key: 'name',
      header: 'Name',
      render: (m: TeamMember) => m.user?.name ?? 'Unknown',
    },
    {
      key: 'email',
      header: 'Email',
      render: (m: TeamMember) => m.user?.email ?? '',
    },
    { key: 'role', header: 'Team Role' },
  ];

  const existingMemberIds = team.members?.map((m) => m.userId) ?? [];

  return (
    <div>
      <button onClick={() => navigate('/teams')} className="text-sm text-indigo-600 hover:text-indigo-800 mb-4 inline-block cursor-pointer">
        &larr; Back to Teams
      </button>

      <Card className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{team.name}</h1>
        {team.description && <p className="text-gray-500 mt-1">{team.description}</p>}
      </Card>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Members</h2>
        <Button onClick={() => setShowAddMember(true)}>Add Member</Button>
      </div>

      <Card>
        {team.members && team.members.length > 0 ? (
          <Table columns={memberColumns} data={team.members} />
        ) : (
          <EmptyState message="No members yet" actionLabel="Add Member" onAction={() => setShowAddMember(true)} />
        )}
      </Card>

      <Modal isOpen={showAddMember} onClose={() => setShowAddMember(false)} title="Add Member">
        <AddMemberForm
          onSubmit={handleAddMember}
          onCancel={() => setShowAddMember(false)}
          existingMemberIds={existingMemberIds}
        />
      </Modal>
    </div>
  );
}
