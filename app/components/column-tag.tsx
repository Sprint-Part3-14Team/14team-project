export default function ColumnTag({ title }: { title: string }) {
  return (
    <div className="flex h-[20px] items-center justify-center gap-x-[6px] rounded-[11px] bg-primary/10 px-[8px] py-[4px] md:h-[22px]">
      <div className="size-[6px] rounded-full bg-primary" />
      <p className="text-[10px] text-primary md:text-xs">{title}</p>
    </div>
  );
}
