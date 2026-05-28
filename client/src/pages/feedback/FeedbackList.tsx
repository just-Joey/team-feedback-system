import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getFeedback } from '../../api/feedback';
import { getUsers } from '../../api/users';
import { getTeams } from '../../api/teams';
import type { Feedback } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Rating from '../../components/ui/Rating';
import TagBadge from '../../components/ui/TagBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';

export default function FeedbackList() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Record<string, string>>({});

  const { data: users } = useFetch(getUsers);
  const { data: teams } = useFetch(getTeams);
  const { data: feedback, loading, error } = useFetch(
    () => {
      const activeFilters: Record<string, string> = {};
      Object.entries(filters).forEach(([k, v]) => { if (v) activeFilters[k] = v; });
      return getFeedback(Object.keys(activeFilters).length > 0 ? activeFilters : undefined);
    },
    [JSON.stringify(filters)]
  );

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Feedback</h1>
        <Button onClick={() => navigate('/feedback/new')}>Give Feedback</Button>
      </div>

      <Card className="mb-6">
        <div className="flex gap-4 flex-wrap">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">From</label>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={filters.fromUserId ?? ''}
              onChange={(e) => updateFilter('fromUserId', e.target.value)}
            >
              <option value="">All</option>
              {users?.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">To</label>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={filters.toUserId ?? ''}
              onChange={(e) => updateFilter('toUserId', e.target.value)}
            >
              <option value="">All</option>
              {users?.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Team</label>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={filters.teamId ?? ''}
              onChange={(e) => updateFilter('teamId', e.target.value)}
            >
              <option value="">All</option>
              {teams?.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
        </div>
      </Card>

      {feedback && feedback.length > 0 ? (
        <div className="space-y-4">
          {feedback.map((fb: Feedback) => (
            <Card
              key={fb.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <div onClick={() => navigate(`/feedback/${fb.id}`)}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-medium text-gray-900">{fb.fromUser?.name}</span>
                    <span className="text-gray-400 mx-2">&rarr;</span>
                    <span className="font-medium text-gray-900">{fb.toUser?.name}</span>
                  </div>
                  <Rating value={fb.rating} size="sm" />
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">{fb.body}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {fb.tags?.map((tag) => <TagBadge key={tag.id} label={tag.label} />)}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState message="No feedback found" actionLabel="Give Feedback" onAction={() => navigate('/feedback/new')} />
        </Card>
      )}
    </div>
  );
}
