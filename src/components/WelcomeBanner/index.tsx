import React from 'react';
import './styles.css';

interface WelcomeBannerProps {
  userName?: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ userName = 'Usuário' }) => {
  const currentHour = new Date().getHours();
  let greeting = 'Bom dia';
  
  if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Boa tarde';
  } else if (currentHour >= 18 || currentHour < 5) {
    greeting = 'Boa noite';
  }
  
  return (
    <div className="welcome-banner">
      <div className="welcome-content">
        <h1 className="welcome-title">{greeting}, {userName}!</h1>
        <p className="welcome-subtitle">
          Bem-vindo ao Sistema de Gerenciamento de Recursos. Gerencie todos os recursos da sua organização em um só lugar.
        </p>
      </div>
      <div className="welcome-decoration">
        <div className="decoration-circle"></div>
        <div className="decoration-circle"></div>
        <div className="decoration-circle"></div>
      </div>
    </div>
  );
};

export default WelcomeBanner;