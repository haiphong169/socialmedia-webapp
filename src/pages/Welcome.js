import React from 'react';
import AppIcon from '../Hornet.png';
import './css/Welcome.css';

export default function Welcome() {
  return (
    <div className="welcome-container">
      <img src={AppIcon} />
      <h1>Welcome!</h1>
    </div>
  );
}
