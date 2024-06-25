import Image from 'next/image';
import Link from 'next/link';

interface SnsLinkIconProps {
  href: string;
  imgUrl: string;
  alt: string;
}

export default function SnsLinkIcon({ href, imgUrl, alt }: SnsLinkIconProps) {
  return (
    <Link href={href}>
      <div className="relative h-5 w-5">
        <Image fill src={imgUrl} alt={alt} />
      </div>
    </Link>
  );
}
