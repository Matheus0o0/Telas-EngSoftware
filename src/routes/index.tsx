import { Routes, Route } from 'react-router-dom';
import CadastroUsuario from '../screens/CadastroUsuario/index.tsx'; 
import LoginUsuario from '../screens/auth/LoginUsuario/index.tsx'; 
import Relatorio from '../screens/Relatorio'; 
import TelaPrincipal from '../screens/TelaPrincipal'; 
import Configuracoes from '../screens/Configuracoes';
import Historico from '../screens/Historico';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginUsuario />} />
      <Route path="/CadastroUsuario" element={<CadastroUsuario />} />
      <Route path="/LoginUsuario" element={<LoginUsuario />} />
      <Route path="/relatorio" element={<Relatorio />} />
      <Route path="/TelaPrincipal" element={<TelaPrincipal />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
      <Route path="/historico" element={<Historico />} />
    </Routes>
  );
};

export default AppRoutes;