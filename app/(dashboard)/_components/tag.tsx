export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex h-full items-center justify-center rounded bg-red-300 px-[6px] py-1 text-[10px] text-red-600 md:text-xs">
      {children}
    </p>
  );
}
