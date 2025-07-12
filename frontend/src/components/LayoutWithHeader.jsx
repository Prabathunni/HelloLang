import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

function LayoutWithHeader() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LayoutWithHeader;
