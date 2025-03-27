import { Routes, Route } from 'react-router-dom';
import CadastroUsuario from '../screens/auth/CadastroUsuario/index.tsx'; 
import LoginUsuario from '../screens/auth/LoginUsuario/index.tsx'; 
import Relatorio from '../screens/Relatorio'; 
import TelaPrincipal from '../screens/TelaPrincipal'; 

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

export default AppRoutes;""