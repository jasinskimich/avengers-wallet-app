import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrencies } from '../../redux/currency/selectors';
import { getCurrency } from '../../redux/currency/currencyThunk';
import { Loader } from '../Loader/Loader';
import css from './Currency.module.css';

export const Currency = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const [isLoading, setIsLoading] = useState(true);

  const currencyValues = () => {
    const localHour = localStorage.getItem('hasHourPassed');
    if (localHour !== null && date.getTime() / 1000 - localHour <= 3600) {
      setIsLoading(false);
      return;
    }
    dispatch(getCurrency());
    const hasHourPassed = date.getTime() / 1000;
    localStorage.setItem('hasHourPassed', hasHourPassed);
    setIsLoading(true);
  };

  useEffect(() => {
    setTimeout(() => {
      currencyValues();
    }, 0); // Simulating a 2-second delay
  }, );

  const values = useSelector(selectCurrencies);

  return isLoading ? (
    <div className={css.loaderBox}>
      <Loader />
    </div>
  ) : (
    <div className={css.currencyTableWrapper}>
      <table className={css.currencyTable}>
        <thead className={css.currencyTableHead}>
          <tr>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody className={css.currencyTableBody}>
          <tr>
            <td className={css.currencyTableRow}>USD</td>
            <td className={css.currencyTableRow}>{values[0].ask}</td>
            <td className={css.currencyTableRow}>{values[0].bid}</td>
          </tr>
          <tr>
            <td>EUR</td>
            <td>{values[3].ask}</td>
            <td>{values[3].bid}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
