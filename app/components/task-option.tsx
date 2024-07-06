export default function TaskOption({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ul className="absolute right-0 top-10 z-[9999] flex w-[86px] flex-col items-center justify-center rounded-md border bg-background p-[6px] md:w-[93px]">
      {children}
    </ul>
  );
}
