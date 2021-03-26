import * as React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const Spinner = () => (
  <div className="feedback">
    <Loader type="TailSpin" color="#0AC9E4" height={80} width={80} radius={0} />
  </div>
);
