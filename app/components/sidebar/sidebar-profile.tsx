import ProfileImage from '../profile/profile-image';

export default function SidebarProfile() {
  // NOTE - 테스트 유저 정보
  // TODO - 로그인 시 user 정보를 전역 상태에 저장?
  const nickname = '서영';
  const profileImageUrl = null;
  const id = 3950;

  return (
    <section>
      <ProfileImage
        nickname={nickname}
        profileImageUrl={profileImageUrl}
        id={id}
        size="34"
      />
    </section>
  );
}
