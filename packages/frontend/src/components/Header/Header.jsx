import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ModalLogout } from '../ModalLogout/ModalLogout';
import { useParams } from "react-router-dom";
import IconWallet from '../../images/Wallet.svg'
import styles from './Header.module.css'

export const Header = () => {
  const [name, setName] = useState('');
  const { owner } = useParams();
  useEffect(() => {
    const fetchName = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/api/users/name/${owner}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }

        response = await response.json();

        setName(response.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchName();
  }, [owner]);

  return (
    <div className={styles.main}>
      <div className={styles.walletSection}>
      <NavLink to={`/home/${owner}`}>
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