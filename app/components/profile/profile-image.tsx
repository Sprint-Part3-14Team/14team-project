import { useProfileColor } from '@/hooks/useProfileColor';
import Image from 'next/image';

interface ProfileImageProps {
  profileImageUrl?: string | null;
  nickname: string;
  id: number;
  size: string;
  textSize?: string;
}

export default function ProfileImage({
  profileImageUrl,
  nickname,
  id,
  size,
  textSize,
}: ProfileImageProps) {
  const profileColor = useProfileColor(id);
  return (
    <div>
      {profileImageUrl ? (
        <div
          className="relative size-[34px] border-2 border-white"
          style={{ width: size, height: size }}
        >
          <Image
            src={profileImageUrl}
            alt="프로필 이미지"
            fill
            className="rounded-full"
          />
        </div>
      ) : (
        <div
          className="flex size-[34px] items-center justify-center rounded-full border-2 border-white text-sm font-semibold text-primary-foreground"
          style={{
            backgroundColor: profileColor,
            width: size,
            height: size,
            fontSize: textSize,
          }}
        >
          {nickname.charAt(0)}
        </div>
      )}
    </div>
  );
}
