import { useFetch } from '../../hooks/useFetch';
import { getTags, deleteTag } from '../../api/tags';
import Card from '../../components/ui/Card';
import TagBadge from '../../components/ui/TagBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';

export default function TagList() {
  const { data: tags, loading, error, refetch } = useFetch(getTags);

  const handleDelete = async (id: number) => {
    await deleteTag(id);
    refetch();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
        <p className="text-sm text-gray-500 mt-1">Tags are created when giving feedback. You can delete unused tags here.</p>
      </div>

      <Card>
        {tags && tags.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <TagBadge key={tag.id} label={tag.label} onDelete={() => handleDelete(tag.id)} />
            ))}
          </div>
        ) : (
          <EmptyState message="No tags yet. Tags are created when you give feedback." />
        )}
      </Card>
    </div>
  );
}
