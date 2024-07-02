import { useTagColor } from '@/hooks/useTagColor';

export default function Tag({
  children,
  tag,
}: {
  children: React.ReactNode;
  tag: string;
}) {
  const { backgroundColor, textColor } = useTagColor(tag);
  return (
    <p
      className="rounded px-[6px] py-1 text-[10px] md:text-xs"
      style={{ backgroundColor, color: textColor }}
    >
      {children}
    </p>
  );
}
