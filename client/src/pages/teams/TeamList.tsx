import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getTeams, createTeam } from '../../api/teams';
import type { Team, CreateTeamPayload } from '../../types';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import TeamForm from './TeamForm';

export default function TeamList() {
  const { data: teams, loading, error, refetch } = useFetch(getTeams);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (data: CreateTeamPayload) => {
    await createTeam(data);
    setShowModal(false);
    refetch();
  };

  const columns = [
    { key: 'name', header: 'Team Name' },
    {
      key: 'description',
      header: 'Description',
      render: (team: Team) => (
        <span className="text-gray-500">{team.description || '-'}</span>
      ),
    },
    {
      key: 'members',
      header: 'Members',
      render: (team: Team) => team.members?.length ?? 0,
    },
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
        <Button onClick={() => setShowModal(true)}>Create Team</Button>
      </div>

      <Card>
        {teams && teams.length > 0 ? (
          <Table columns={columns} data={teams} onRowClick={(team) => navigate(`/teams/${team.id}`)} />
        ) : (
          <EmptyState message="No teams yet" actionLabel="Create Team" onAction={() => setShowModal(true)} />
        )}
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Team">
        <TeamForm onSubmit={handleCreate} onCancel={() => setShowModal(false)} />
      </Modal>
    </div>
  );
}
