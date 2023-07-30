import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ModalLogout } from '../ModalLogout/ModalLogout';

import IconWallet from '../../images/Wallet.svg'
import styles from './Header.module.css'

export const Header = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      setName(userName);
    }
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.walletSection}>
        <NavLink to="/">
          <img src={IconWallet} alt="wallet icon"></img>
        </NavLink>
        <span className={styles.title}>Wallet</span>
      </div>
      <div className={styles.logoutDiv}>
        <p className={styles.name}>{name}</p>
        <span className={styles.line}> | </span>
        <ModalLogout/>
      </div>
    </div>
  );
};