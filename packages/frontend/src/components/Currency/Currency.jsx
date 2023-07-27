import { useDispatch, useSelector } from 'react-redux';
import { selectCurrencies } from '../../redux/currency/selectors';
import { getCurrency } from '../../redux/currency/currencyThunk'
// import { CircularIndeterminate } from 'components/Spinner/CircularIndeterminate';
import css from './Currency.module.css';

export const Currency = () => {
  const dispatch = useDispatch();
  const date = new Date();

  const currencyValues = () => {
    const localHour = localStorage.getItem('hasHourPassed');
    if (localHour !== null && date.getTime() / 1000 - localHour <= 3600) {
      return;
    }
    const currencies = dispatch(getCurrency());
    const hasHourPassed = date.getTime() / 1000;
    localStorage.setItem('hasHourPassed', hasHourPassed);
    return currencies;
  };

  currencyValues();

  const values = useSelector(selectCurrencies);

  return values.length === 0 ? (
    <div className={css.currencyTableWrapper}>
      <table className={css.currencyTable}>
        <div className={css.spinnerBox}>
          {/* <CircularIndeterminate /> */}
        </div>
        <thead className={css.currencyTableHead}>
          <tr>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody className={css.currencyTableBody}>
          <tr>
            <td>USD</td>
            <td>000</td>
            <td>000</td>
          </tr>
          <tr>
            <td>EUR</td>
            <td>000</td>
            <td>000</td>
          </tr>
        </tbody>
      </table>
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
            <td>USD</td>
            <td>{values[0].ask}</td>
            <td>{values[0].bid}</td>
          </tr>
          <tr>
            <td>EUR</td>
            <td>{values[1].ask}</td>
            <td>{values[1].bid}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};