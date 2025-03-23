import { Routes, Route } from 'react-router-dom';
import CadastroUsuario from '../components/CadastroUsuario'; 
import LoginUsuario from '../components/LoginUsuario'; 
import Relatorio from '../components/Relatorio'; 
import TelaPrincipal from '../components/TelaPrincipal'; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/CadastroUsuario" element={<CadastroUsuario />} />
      <Route path="/LoginUsuario" element={<LoginUsuario />} />
      <Route path="/relatorio" element={<Relatorio />} />
      <Route path="/TelaPrincipal" element={<TelaPrincipal />} />
    </Routes>
  );
};

export default AppRoutes;