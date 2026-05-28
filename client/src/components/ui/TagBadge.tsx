interface TagBadgeProps {
  label: string;
  onDelete?: () => void;
}

export default function TagBadge({ label, onDelete }: TagBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
      {label}
      {onDelete && (
        <button
          onClick={onDelete}
          className="hover:text-indigo-900 cursor-pointer"
        >
          &times;
        </button>
      )}
    </span>
  );
}
