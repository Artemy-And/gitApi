import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

type HeaderPropsType = {
  input: string
  setValue: (value: string) => void
};

export const Header: React.FC<HeaderPropsType> = ({ input, setValue }) => (
  <div className={styles.searcContainer}>
    <input
      value={input}
      placeholder="Please write smth to search"
      onChange={(e) => {
        setValue(e.currentTarget.value);
      }}
    />
    <FontAwesomeIcon
      icon={faSearch}
      className={styles.faSearch}
    />
  </div>
);
