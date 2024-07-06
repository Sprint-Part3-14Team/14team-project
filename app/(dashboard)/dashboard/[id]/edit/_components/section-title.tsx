interface SectionTitleProps {
  sectionTitle: string;
  listTitle?: string;
}

export default function SectionTitle({
  sectionTitle,
  listTitle,
}: SectionTitleProps) {
  return (
    <div>
      <h2 className="text-xl font-bold">{sectionTitle}</h2>
      <h3 className="mb-5 mt-6 text-sm text-gray-400 md:mb-6 md:mt-8 md:text-base">
        {listTitle}
      </h3>
    </div>
  );
}
