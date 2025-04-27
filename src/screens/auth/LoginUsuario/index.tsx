import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faFileLines, faSwatchbook, faHouseLaptop } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, remember });
    // Simulação de login - redirecionaria para o dashboard em uma implementação real
    window.location.href = '/TelaPrincipal';
  };
  
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Seção de Login (sempre visível) */}
        <div className="col-12 col-md-6 bg-light d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h2 className="mb-2">LOGIN</h2>
            <p className="text-muted small mb-4">INFORME SEU E-MAIL E SENHA E ACESSE SUA CONTA</p>
            
            <form onSubmit={handleSubmit}>
              {/* Campo de E-mail */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {/* Campo de Senha */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {/* Lembre-me e Esqueceu a Senha */}
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="remember">Lembre-me</label>
                </div>
                <a href="#" className="text-primary text-decoration-none">Esqueceu a senha?</a>
              </div>
              
              {/* Botão de Entrar */}
              <button type="submit" className="btn btn-primary w-100 mb-3">ENTRAR</button>
              
              {/* Link para Cadastro */}
              <p className="text-center text-muted small">
                Não tem uma conta? <Link to="/RegistroUsuario" className="text-primary text-decoration-none">Cadastre-se gratuitamente</Link>
              </p>
            </form>
          </div>
        </div>
        
        {/* Seção de Imagem/Informações (visível apenas em telas médias e maiores) */}
        <div className="col-md-6 bg-primary text-white d-none d-md-flex flex-column justify-content-center p-5">
          <div className="text-center mb-5">
            <img src="/rastro.png" alt="Rastro" className="img-fluid mb-4" style={{ maxWidth: '200px' }} />
            <h1 className="display-5 fw-bold mb-4">Bem-vindo ao Rastro</h1>
            <p className="lead mb-5">
              Sistema de gerenciamento e rastreamento de recursos para sua organização
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-6">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-white text-primary p-3 rounded-circle me-3">
                  <FontAwesomeIcon icon={faListCheck} size="lg" />
                </div>
                <h5 className="mb-0">Controle de Recursos</h5>
              </div>
              <p className="text-white-50">Gerencie todos os recursos da sua organização em um só lugar.</p>
            </div>
            
            <div className="col-6">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-white text-primary p-3 rounded-circle me-3">
                  <FontAwesomeIcon icon={faFileLines} size="lg" />
                </div>
                <h5 className="mb-0">Relatórios Detalhados</h5>
              </div>
              <p className="text-white-50">Acesse relatórios completos sobre o uso de recursos.</p>
            </div>
            
            <div className="col-6">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-white text-primary p-3 rounded-circle me-3">
                  <FontAwesomeIcon icon={faSwatchbook} size="lg" />
                </div>
                <h5 className="mb-0">Categorização</h5>
              </div>
              <p className="text-white-50">Organize recursos por categorias para facilitar a gestão.</p>
            </div>
            
            <div className="col-6">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-white text-primary p-3 rounded-circle me-3">
                  <FontAwesomeIcon icon={faHouseLaptop} size="lg" />
                </div>
                <h5 className="mb-0">Acesso Remoto</h5>
              </div>
              <p className="text-white-50">Acesse o sistema de qualquer lugar, a qualquer momento.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;