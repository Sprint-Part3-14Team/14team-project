import Image from 'next/image';

interface ProfileImageProps {
  profileImageUrl: string | null;
  nickname: string;
}

export default function ProfileImage({
  profileImageUrl,
  nickname,
}: ProfileImageProps) {
  return profileImageUrl ? (
    <div className="relative size-[38px]">
      <Image src={profileImageUrl} alt="프로필 이미지" fill />
    </div>
  ) : (
    <div>프로필 이미지가 없습니다 {nickname}</div>
  );
}
