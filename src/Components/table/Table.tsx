import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import style from './table.module.css';
import { searchInfoApp, setNewArrAC } from '../redux/table-reducer';
import { RootStateType } from '../redux/Store';
import { Header } from '../header/Header';
import { Spinner } from '../spinner/Spinner';

export type ArrayResponseType = {
  'id': number
  'name': string
  'html_url': string,
  'stargazers_count': number,
  'watchers_count': number
};

export const TableListOfUsersMemo = () => {
  const array = useSelector<RootStateType, Array<ArrayResponseType>>((state) => state.table.array);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const setSearching = useSelector<RootStateType, boolean>((state) => state.table.setSearching);
  const debouncedOnChange = useDebouncedCallback((value) => {
    if (value.length > 0) {
      dispatch(searchInfoApp(value));
    } else {
      dispatch(setNewArrAC([]));
    }
  }, 500);
  const setValue = useCallback((value: string) => {
    setInput(value);
    debouncedOnChange(value);
  }, []);

  const headerNames = [
    { id: 1, name: 'Project name' },
    { id: 2, name: 'Stargazers count' },
    { id: 3, name: 'Watchers count' },
  ];

  return (
    <div>
      <Header input={input} setValue={setValue} />
      {setSearching && <div className={style.spinner}><Spinner /></div>}
      <div className={style.table}>
        <div className={style.header}>
          {headerNames.map((el) => (
            <div key={el.id} className={style.cell}>{el.name}</div>
          ))}
        </div>

        {array.map((el) => (
          <div key={el.id} className={style.rowGroup}>
            <div className={style.row}>
              <div className={style.cell}><a href={el.html_url}>{el.name}</a></div>
              <div className={style.cell}>{el.stargazers_count}</div>
              <div className={style.cell}>{el.watchers_count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};
export const Table = React.memo(TableListOfUsersMemo);
