'use client';

import React from 'react';

import IconButtons from './components/icon-buttons';

const handleSignUpClick = () => {
  console.log('TEST');
};

export default function Home() {
  return (
    // NOTE - 테스트 코드
    <div className="flex h-screen flex-col items-center justify-center">
      <IconButtons variant="setting" onClick={handleSignUpClick} />
      <br />
      <IconButtons variant="dashboard" onClick={handleSignUpClick} />
      <br />
      <IconButtons variant="invite" onClick={handleSignUpClick} />
    </div>
  );
}
