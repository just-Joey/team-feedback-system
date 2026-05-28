import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getUsers } from '../api/users';
import { getTeams } from '../api/teams';
import { getFeedback } from '../api/feedback';
import type { Feedback } from '../types';
import Card from '../components/ui/Card';
import Rating from '../components/ui/Rating';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: users, loading: l1 } = useFetch(getUsers);
  const { data: teams, loading: l2 } = useFetch(getTeams);
  const { data: feedback, loading: l3 } = useFetch(getFeedback);

  if (l1 || l2 || l3) return <LoadingSpinner />;

  const avgRating = feedback && feedback.length > 0
    ? feedback.reduce((sum: number, fb: Feedback) => sum + fb.rating, 0) / feedback.length
    : 0;

  const recentFeedback = feedback?.slice(0, 5) ?? [];

  const stats = [
    { label: 'Total Users', value: users?.length ?? 0, color: 'bg-blue-50 text-blue-700' },
    { label: 'Total Teams', value: teams?.length ?? 0, color: 'bg-green-50 text-green-700' },
    { label: 'Total Feedback', value: feedback?.length ?? 0, color: 'bg-purple-50 text-purple-700' },
    { label: 'Avg Rating', value: avgRating.toFixed(1), color: 'bg-amber-50 text-amber-700' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.color} inline-block px-2 rounded`}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <Card title="Recent Feedback">
        {recentFeedback.length > 0 ? (
          <div className="space-y-4">
            {recentFeedback.map((fb: Feedback) => (
              <div
                key={fb.id}
                onClick={() => navigate(`/feedback/${fb.id}`)}
                className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-900">{fb.fromUser?.name}</span>
                    <span className="text-gray-400">&rarr;</span>
                    <span className="font-medium text-gray-900">{fb.toUser?.name}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-0.5">{fb.body}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <Rating value={fb.rating} size="sm" />
                  <span className="text-xs text-gray-400">{new Date(fb.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No feedback yet</p>
        )}
      </Card>
    </div>
  );
}
