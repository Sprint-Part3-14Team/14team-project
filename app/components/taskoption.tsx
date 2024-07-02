export default function TaskOption({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ul className="absolute right-0 top-8 z-[9999] flex w-[86px] flex-col items-center justify-center rounded-md border bg-white p-[6px] md:w-[93px]">
      {children}
    </ul>
  );
}
