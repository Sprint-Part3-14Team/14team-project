export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded bg-red-300 px-[6px] py-1 text-[10px] text-red-600 md:text-xs">
      {children}
    </p>
  );
}
