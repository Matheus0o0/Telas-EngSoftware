import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, FileText, Users, Settings, Plus, Clock, AlertTriangle, CheckCircle, Bell } from 'lucide-react';
import Header from '../../components/sideBar';
import DashboardCard from '../../components/DashboardCard';
import StatCounter from '../../components/StatCounter';
import WelcomeBanner from '../../components/WelcomeBanner';
import './style.css';

// Interface para notificações
interface Notification {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'success';
  time: string;
}

function Home() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState({
    totalResources: 0,
    inUse: 0,
    overdue: 0,
    available: 0
  });

  // Simular carregamento de dados
  useEffect(() => {
    // Simular estatísticas
    const loadStats = setTimeout(() => {
      setStats({
        totalResources: 124,
        inUse: 45,
        overdue: 8,
        available: 71
      });
    }, 1000);

    // Simular notificações
    const loadNotifications = setTimeout(() => {
      setNotifications([
        {
          id: 1,
          message: 'Projetor da Sala 101 foi devolvido',
          type: 'success',
          time: '10 minutos atrás'
        },
        {
          id: 2,
          message: 'Empréstimo do Notebook #15 está atrasado',
          type: 'warning',
          time: '1 hora atrás'
        },
        {
          id: 3,
          message: 'Novo recurso cadastrado: Sala de Reuniões 203',
          type: 'info',
          time: '3 horas atrás'
        }
      ]);
    }, 1500);

    return () => {
      clearTimeout(loadStats);
      clearTimeout(loadNotifications);
    };
  }, []);

  // Função para navegar para outras telas
  const navigateTo = (path: string) => {
    navigate(path);
  };

  // Renderizar ícone baseado no tipo de notificação
  const renderNotificationIcon = (type: 'info' | 'warning' | 'success') => {
    switch (type) {
      case 'info':
        return <Bell size={16} className="notification-icon info" />;
      case 'warning':
        return <AlertTriangle size={16} className="notification-icon warning" />;
      case 'success':
        return <CheckCircle size={16} className="notification-icon success" />;
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="app-content" style={{ 
        marginLeft: '250px',
        marginTop: '60px', 
        minHeight: 'calc(100vh - 60px)',
        padding: '2rem',
        position: 'relative'
      }}>
        <div className="container">
          {/* Banner de Boas-vindas */}
          <WelcomeBanner userName="Administrador" />

          {/* Estatísticas */}
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="section-title">Visão Geral</h2>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <StatCounter 
                title="Total de Recursos" 
                value={stats.totalResources} 
                icon={<Package size={20} />} 
                color="#4361ee" 
              />
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <StatCounter 
                title="Em Uso" 
                value={stats.inUse} 
                icon={<Clock size={20} />} 
                color="#4cc9f0" 
              />
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <StatCounter 
                title="Atrasados" 
                value={stats.overdue} 
                icon={<AlertTriangle size={20} />} 
                color="#f72585" 
              />
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <StatCounter 
                title="Disponíveis" 
                value={stats.available} 
                icon={<CheckCircle size={20} />} 
                color="#4cc9f0" 
              />
            </div>
          </div>

          {/* Cards de Acesso Rápido */}
          <div className="row mb-5">
            <div className="col-12">
              <h2 className="section-title">Acesso Rápido</h2>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <DashboardCard
                title="Recursos"
                description="Visualize, cadastre e gerencie todos os recursos disponíveis."
                icon={Package}
                iconBgColor="bg-primary-light"
                primaryAction={{
                  label: "Cadastrar",
                  onClick: () => navigateTo('/cadastroRecursos')
                }}
                secondaryAction={{
                  label: "Visualizar",
                  onClick: () => navigateTo('/rastreamentoRecursos')
                }}
              />
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <DashboardCard
                title="Relatórios"
                description="Acesse e gere relatórios detalhados sobre o uso de recursos."
                icon={FileText}
                iconBgColor="bg-success-light"
                primaryAction={{
                  label: "Acessar",
                  onClick: () => navigateTo('/relatorio')
                }}
              />
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <DashboardCard
                title="Usuários"
                description="Gerencie os usuários que podem acessar o sistema."
                icon={Users}
                iconBgColor="bg-warning-light"
                primaryAction={{
                  label: "Cadastrar",
                  onClick: () => navigateTo('/CadastroUsuario')
                }}
              />
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <DashboardCard
                title="Configurações"
                description="Personalize as configurações do sistema conforme necessário."
                icon={Settings}
                iconBgColor="bg-info-light"
                primaryAction={{
                  label: "Configurar",
                  onClick: () => navigateTo('/configuracoes')
                }}
              />
            </div>
          </div>

          {/* Notificações Recentes */}
          <div className="row">
            <div className="col-12">
              <h2 className="section-title">Notificações Recentes</h2>
              <div className="notifications-container">
                {notifications.length === 0 ? (
                  <div className="no-notifications">
                    <p>Nenhuma notificação recente</p>
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div key={notification.id} className={`notification-item ${notification.type}`}>
                      {renderNotificationIcon(notification.type)}
                      <div className="notification-content">
                        <p className="notification-message">{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;