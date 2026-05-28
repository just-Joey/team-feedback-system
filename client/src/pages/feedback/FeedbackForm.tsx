import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { createFeedback } from '../../api/feedback';
import { getUsers } from '../../api/users';
import { getTeams } from '../../api/teams';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Rating from '../../components/ui/Rating';
import Card from '../../components/ui/Card';
import TagBadge from '../../components/ui/TagBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function FeedbackForm() {
  const navigate = useNavigate();
  const { data: users, loading: loadingUsers } = useFetch(getUsers);
  const { data: teams, loading: loadingTeams } = useFetch(getTeams);

  const [fromUserId, setFromUserId] = useState('');
  const [toUserId, setToUserId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(0);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitting(true);
    try {
      const fb = await createFeedback({
        fromUserId: Number(fromUserId),
        toUserId: Number(toUserId),
        teamId: teamId ? Number(teamId) : undefined,
        body,
        rating,
        tags: tags.length > 0 ? tags : undefined,
      });
      navigate(`/feedback/${fb.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingUsers || loadingTeams) return <LoadingSpinner />;

  return (
    <div>
      <button onClick={() => navigate('/feedback')} className="text-sm text-indigo-600 hover:text-indigo-800 mb-4 inline-block cursor-pointer">
        &larr; Back to Feedback
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Give Feedback</h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="From"
              value={fromUserId}
              onChange={(e) => setFromUserId(e.target.value)}
              options={[
                { value: '', label: 'Select user...' },
                ...(users?.map((u) => ({ value: String(u.id), label: u.name })) ?? []),
              ]}
              required
            />
            <Select
              label="To"
              value={toUserId}
              onChange={(e) => setToUserId(e.target.value)}
              options={[
                { value: '', label: 'Select user...' },
                ...(users?.map((u) => ({ value: String(u.id), label: u.name })) ?? []),
              ]}
              required
            />
          </div>

          <Select
            label="Team (optional)"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            options={[
              { value: '', label: 'No team' },
              ...(teams?.map((t) => ({ value: String(t.id), label: t.name })) ?? []),
            ]}
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <Rating value={rating} onChange={setRating} size="lg" />
          </div>

          <Textarea
            label="Feedback"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your feedback here..."
            required
          />

          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                label="Tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Type a tag and press Enter"
                className="flex-1"
              />
              <div className="flex items-end">
                <Button type="button" variant="secondary" onClick={addTag}>Add</Button>
              </div>
            </div>
            {tags.length > 0 && (
              <div className="flex gap-1.5 flex-wrap">
                {tags.map((tag) => (
                  <TagBadge key={tag} label={tag} onDelete={() => setTags(tags.filter((t) => t !== tag))} />
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={submitting || rating === 0}>
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/feedback')}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
