import React from 'react';
import styles from './App.module.css';
import { Table } from './Components/table/Table';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.newContainer}>
        <Table />
      </div>
    </div>
  );
}

export default App;
