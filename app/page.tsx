'use client';

import React from 'react';

import Buttons from './components/Buttons';

const handleSignUpClick = () => {
  console.log('Sign Up button clicked');
};

const handleDashboardClick = () => {
  console.log('Dashboard button clicked');
};

export default function Home() {
  return (
    // NOTE - 테스트 코드 입니다. 프로젝트 진행 시 편하게 삭제하셔도 됩니다.
    <div className="flex flex-col items-center justify-center">
      <div className="size-[200px] bg-violet-primary" />
      <div className="size-[200px] bg-violet-secondary" />
      <div className="flex flex-col items-center justify-center">
        <div className="size-[50px] bg-white" />
        <div className="size-[50px] bg-gray-100" />
        <div className="size-[50px] bg-gray-200" />
        <div className="size-[50px] bg-gray-300" />
        <div className="size-[50px] bg-gray-400" />
        <div className="size-[50px] bg-gray-500" />
        <div className="size-[50px] bg-gray-600" />
        <div className="size-[50px] bg-gray-700" />
        <div className="size-[50px] bg-gray-800" />
        <div className="size-[50px] bg-black" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-thin">Hello World!</h1>
        <h1 className="font-extralight">Hello World!</h1>
        <h1 className="font-light">Hello World!</h1>
        <h1 className="font-normal">Hello World!</h1>
        <h1 className="font-medium">Hello World!</h1>
        <h1 className="font-semibold">Hello World!</h1>
        <h1 className="font-bold">Hello World!</h1>
        <h1 className="font-extrabold">Hello World!</h1>
        <h1 className="font-black">Hello World!</h1>
      </div>
      <div>
        <Buttons
          variant="loginSignup"
          className="bg-red-500"
          onClick={handleSignUpClick}
        >
          Sign Up
        </Buttons>
        <Buttons
          variant="dashboardFirst"
          className="mt-4 bg-blue-500"
          onClick={handleDashboardClick}
        >
          Dashboard
        </Buttons>
      </div>
    </div>
  );
}
