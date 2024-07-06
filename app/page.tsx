import pointImg1 from '@/public/images/landing/landing1.png';
import pointImg2 from '@/public/images/landing/landing2.png';
import mainImg from '@/public/images/landing/main.png';
import logo from '@/public/images/logo_small.svg';
import textLogo from '@/public/images/text_logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Buttons from './components/button';
import AdCard from './components/landing/ad-card';
import PointCard from './components/landing/point-card';
import SnsLinkIcon from './components/landing/sns-link-icon';

// TODO: 로그인 여부 확인 후 대시보드 페이지로 리다이렉트

export default function Home() {
  return (
    <div className="h-full w-full bg-black text-primary-foreground">
      <header className="flex h-[60px] items-center justify-between px-6 md:h-[70px] md:px-10 xl:px-20">
        <h1>
          <div className="flex">
            <Image src={logo} alt="사이트 로고" />
            <div className="hidden md:block">
              <Image src={textLogo} alt="Taskify 글자" />
            </div>
          </div>
          <span className="sr-only">Taskify</span>
        </h1>
        <div>
          <Link className="mr-5 md:mr-9" href="/login">
            로그인
          </Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </header>

      <main className="mx-4 mt-[42px] md:mx-10 md:mt-[94px] xl:mx-auto xl:w-[1200px]">
        <section>
          <div className="relative h-[168px] w-full md:h-[422px] md:px-[103px]">
            <Image
              className="object-contain"
              fill
              src={mainImg}
              alt="사람 형태의 다섯 캐릭터가 책상에 일렬로 앉아 책과 노트북을 펴고 서로 의논하는 형태의 그림"
            />
          </div>
          <div className="mt-7 flex flex-col items-center justify-center gap-2 md:mt-12 md:flex-row md:gap-5">
            <p className="text-4xl font-bold md:text-[56px] xl:text-7xl">
              새로운 일정 관리
            </p>
            <div className="relative h-[51px] w-[150px] md:h-[65px] md:w-[253px]">
              <Image fill src={textLogo} alt="Taskify 글자" />
            </div>
          </div>
          <p className="mt-5 text-center md:mt-11">
            스마트하게 나의 일정을 관리해보자!
          </p>
          <div className="my-[80px] text-center">
            <Buttons
              variant="mobile235x42"
              href="/login"
              className="rounded-lg bg-primary text-primary-foreground"
            >
              로그인하기
            </Buttons>
          </div>
        </section>

        <section>
          <PointCard
            pointNum={1}
            firstDesc="일의 우선순위를"
            secondDesc="관리하세요"
            isReverse={false}
          >
            <div className="absolute bottom-0 right-0 h-[248px] w-[296px] md:h-[435px] md:w-[520px] xl:h-[498px] xl:w-[594px]">
              <Image fill src={pointImg1} alt="대시보드 페이지 화면" />
            </div>
          </PointCard>
          <div className="h-[90px]" />
          <PointCard
            pointNum={2}
            firstDesc="해야 할 일을"
            secondDesc="등록하세요"
            isReverse
          >
            <div className="absolute bottom-0 left-1/2 h-[250px] w-[216px] translate-x-[-50%] md:h-[415px] md:w-[360px] xl:left-[108px] xl:h-[502px] xl:w-[436px] xl:translate-x-0">
              <Image fill src={pointImg2} alt="할 일 생성 모달 창 이미지" />
            </div>
          </PointCard>
        </section>

        <section>
          <h3 className="mb-[40px] mt-[90px] text-center text-2xl font-bold md:mb-[36px] md:text-3xl xl:text-left">
            생산성을 높이는 다양한 설정 ⚡️
          </h3>
          <div className="xl:gap flex flex-col gap-10 md:items-center md:gap-12 xl:flex-row">
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
          </div>
        </section>
      </main>

      <footer className="font-xs flex flex-col items-center justify-between py-[90px] text-gray-400 md:h-[100px] md:w-full md:flex-row md:px-[40px] md:pt-[160px] xl:px-[140px]">
        <p className="mb-3 md:mb-0">Ⓒcodeit - 2023</p>
        <nav className="mb-16 md:mb-0">
          <Link className="md:mr-[32px]" href="/">
            Privacy Policy
          </Link>
          <Link href="/">FAQ</Link>
        </nav>
        <nav className="flex gap-5 md:gap-4">
          <SnsLinkIcon
            href="#"
            imgUrl="/icons/email_icon.svg"
            alt="편지 모양 아이콘"
          />
          <SnsLinkIcon
            href="#"
            imgUrl="/icons/facebook_icon.svg"
            alt="페이스북 로고"
          />
          <SnsLinkIcon
            href="#"
            imgUrl="/icons/instagram_icon.svg"
            alt="인스타그램 로고"
          />
        </nav>
      </footer>
    </div>
  );
}
