import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import favicon from './assets/images/logo-mini.png';
import backgroundImage from './assets/images/background.jpg';

// dynamically change the favicon
const changeFavicon = (iconPath) => {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.rel = 'icon';
  link.href = iconPath;
  document.head.appendChild(link);
};
changeFavicon(favicon);

// // apply background image
// document.body.style.background = `url(${backgroundImage}) no-repeat center center fixed`;
// document.body.style.backgroundSize = 'cover';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
