'use client';

import React from 'react';

import Buttons from './components/Buttons';

const handleSignUpClick = () => {
  console.log('TEST 1');
};

const handleDashboardClick = () => {
  console.log('TEST 2');
};

export default function Home() {
  return (
    // NOTE - 테스트 코드
    <div className="flex h-screen items-center justify-center">
      <Buttons
        variant="loginSignup"
        className="mr-4 bg-violet-primary text-white"
        onClick={handleSignUpClick}
      >
        로그인
      </Buttons>

      <Buttons
        variant="dashboardFirst"
        className="bg-violet-primary text-white"
        onClick={handleDashboardClick}
      >
        생성
      </Buttons>
    </div>
  );
}
