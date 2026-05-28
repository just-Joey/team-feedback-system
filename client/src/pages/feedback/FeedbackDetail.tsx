import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getFeedbackById } from '../../api/feedback';
import Card from '../../components/ui/Card';
import Rating from '../../components/ui/Rating';
import TagBadge from '../../components/ui/TagBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function FeedbackDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const feedbackId = Number(id);
  const { data: fb, loading, error } = useFetch(() => getFeedbackById(feedbackId), [feedbackId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!fb) return <p className="text-gray-500">Feedback not found</p>;

  return (
    <div>
      <button onClick={() => navigate('/feedback')} className="text-sm text-indigo-600 hover:text-indigo-800 mb-4 inline-block cursor-pointer">
        &larr; Back to Feedback
      </button>

      <Card>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-lg">
                <span
                  className="font-semibold text-indigo-600 cursor-pointer hover:underline"
                  onClick={() => navigate(`/users/${fb.fromUserId}`)}
                >
                  {fb.fromUser?.name}
                </span>
                <span className="text-gray-400">&rarr;</span>
                <span
                  className="font-semibold text-indigo-600 cursor-pointer hover:underline"
                  onClick={() => navigate(`/users/${fb.toUserId}`)}
                >
                  {fb.toUser?.name}
                </span>
              </div>
              {fb.team && (
                <p className="text-sm text-gray-500 mt-1">
                  Team: <span className="font-medium">{fb.team.name}</span>
                </p>
              )}
            </div>
            <Rating value={fb.rating} size="lg" />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-wrap">{fb.body}</p>
          </div>

          {fb.tags && fb.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {fb.tags.map((tag) => <TagBadge key={tag.id} label={tag.label} />)}
            </div>
          )}

          <div className="flex gap-6 text-xs text-gray-400 border-t pt-4">
            <span>Created: {new Date(fb.createdAt).toLocaleString()}</span>
            <span>Updated: {new Date(fb.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
