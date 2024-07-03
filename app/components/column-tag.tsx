export default function ColumnTag({ title }: { title: string }) {
  return (
    <div className="flex h-[20px] w-[55px] items-center justify-center gap-x-[6px] rounded-[11px] bg-violet-primary/10 md:h-[22px] md:w-[60px]">
      <div className="size-[6px] rounded-full bg-violet-primary" />
      <p className="text-[10px] text-violet-primary md:text-xs">{title}</p>
    </div>
  );
}
