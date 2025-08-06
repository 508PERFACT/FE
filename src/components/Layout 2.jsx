import React from 'react';
import styles from '@/styles/components/Layout.module.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  );
};
