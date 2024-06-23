import emailIcon from '@/public/icons/email_icon.svg';
import facebookIcon from '@/public/icons/facebook_icon.svg';
import instagramIcon from '@/public/icons/instagram_icon.svg';
import pointImg1 from '@/public/images/landing/landing1.png';
import pointImg2 from '@/public/images/landing/landing2.png';
import mainImg from '@/public/images/landing/main.png';
import textLogo from '@/public/images/text_logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import AdCard from './components/landing/ad-card';

export default function Home() {
  return (
    <div className="h-full w-screen bg-black text-white">
      <header>
        <h1>로고</h1>
        <Link href="/signin">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </header>
      <main>
        <section>
          <Image
            src={mainImg}
            alt="사람 형태의 다섯 캐릭터가 책상에 일렬로 앉아 책과 노트북을 펴고 서로 의논하는 형태의 그림"
          />
          <p>
            새로운 일정 관리
            <span>
              <Image src={textLogo} alt="보라색 Taskify 글자" />
            </span>
          </p>
          <p>스마트하게 나의 일정을 관리해보자!</p>
        </section>
        <section>
          <h2>Point 1</h2>
          <p>일의 우선순위를 관리하세요</p>
          <Image src={pointImg1} alt="대시보드 페이지 화면" />
        </section>
        <section>
          <h2>Point 2</h2>
          <p>해야 할 일을 등록하세요</p>
          <Image src={pointImg2} alt="할 일 생성 모달창 이미지" />
        </section>
        <h3>생산성을 높이는 다양한 설정 ⚡️</h3>
        <section>
          <AdCard
            imgUrl="/images/landing/landing3.png"
            yPadding="dashboard"
            title="대시보드 설정"
            description="대시보드 사진과 이름을 변경할 수 있어요."
          />
          <AdCard
            imgUrl="/images/landing/landing4.png"
            yPadding="invite"
            title="초대"
            description="새로운 팀원을 초대할 수 있어요."
          />
          <AdCard
            imgUrl="/images/landing/landing5.png"
            yPadding="member"
            title="구성원"
            description="구성원을 초대하고 내보낼 수 있어요."
          />
        </section>
      </main>
      <footer>
        <p>Ⓒcodeit - 2023</p>
        <nav>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">FAQ</Link>
        </nav>
        <nav>
          <Link href="/">
            <Image src={emailIcon} alt="편지 모양 아이콘" />
          </Link>
          <Link href="/">
            <Image src={facebookIcon} alt="페이스북 로고" />
          </Link>
          <Link href="/">
            <Image src={instagramIcon} alt="인스타그램 로고" />
          </Link>
        </nav>
      </footer>
    </div>
  );
}
