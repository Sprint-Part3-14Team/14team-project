import { useProfileColor } from '@/hooks/useProfileColor';
import Image from 'next/image';

interface ProfileImageProps {
  profileImageUrl?: string | null;
  nickname: string;
  id: number;
  size: string;
}

export default function ProfileImage({
  profileImageUrl,
  nickname,
  id,
  size,
}: ProfileImageProps) {
  const profileColor = useProfileColor(id);
  return (
    <div>
      {profileImageUrl ? (
        <div
          className="relative size-[34px] rounded-full border-2 border-white"
          style={{ width: size, height: size }}
        >
          <Image src={profileImageUrl} alt="프로필 이미지" fill />
        </div>
      ) : (
        <div
          className="flex size-[34px] items-center justify-center rounded-full border-2 border-white text-sm font-semibold text-white"
          style={{ backgroundColor: profileColor, width: size, height: size }}
        >
          {nickname.charAt(0)}
        </div>
      )}
    </div>
  );
}
