import React from 'react';
import Media from 'react-media';
import { NavLink } from 'react-router-dom';
import { ModalLogout } from '../ModalLogout/ModalLogout';

import IconWallet from '../../images/Wallet.svg'
import styles from './Header.module.css'
import { mediaQueries } from './media'
import verticalLine from '../../images/verticalLine.svg'
import { useEffect, useState } from 'react';

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
      <div className={styles.wallet}>
        <NavLink to="/">
          <img src={IconWallet} alt="wallet icon"></img>
        </NavLink>
        <p className={styles.title}>Wallet</p>
      </div>
      <div className={styles.logoutDiv}>
        <p className={styles.name}>{name}</p>

        <Media query={mediaQueries}>
          {matches =>
            (matches.tablet || matches.desktop) && (
              <img
                src={verticalLine}
                className={styles.lineSvg}
                alt="vertical line"
              ></img>
            )
          }
        </Media>

        <ModalLogout/>
      </div>
    </div>
  );
};