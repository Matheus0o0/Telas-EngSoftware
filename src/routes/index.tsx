import { Routes, Route } from 'react-router-dom';
import CadastroUsuario from '../screens/CadastroUsuario/index.tsx'; 
import LoginUsuario from '../screens/auth/LoginUsuario/index.tsx'; 
import RegistroUsuario from '../screens/auth/RegistroUsuario/index.tsx'; 
import Relatorio from '../screens/Relatorio'; 
import TelaPrincipal from '../screens/TelaPrincipal'; 
import Configuracoes from '../screens/Configuracoes';
import Historico from '../screens/Historico';
import RegistroEmprestimo from '../screens/RegistroEmprestimo';
import RegistroDevolucao from '../screens/RegistroDevolucao';
import RastreamentoRecursos from '../screens/RastreamentoRecursos';
import CadastroRecursos from '../screens/CadastroRecursos';
import CadastroCategorias from '../screens/CadastroCategorias';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginUsuario />} />
      <Route path="/CadastroUsuario" element={<CadastroUsuario />} />
      <Route path="/LoginUsuario" element={<LoginUsuario />} />
      <Route path="/RegistroUsuario" element={<RegistroUsuario />} />
      <Route path="/relatorio" element={<Relatorio />} />
      <Route path="/TelaPrincipal" element={<TelaPrincipal />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/registroEmprestimo" element={<RegistroEmprestimo />} />
      <Route path="/registroDevolucao/:id" element={<RegistroDevolucao />} />
      <Route path="/registroDevolucao" element={<RegistroDevolucao />} />
      <Route path="/RegistroDevolucao" element={<RegistroDevolucao />} />
      <Route path="/RegistroDevolução" element={<RegistroDevolucao />} />
      <Route path="/rastreamentoRecursos" element={<RastreamentoRecursos />} />
      <Route path="/cadastroRecursos" element={<CadastroRecursos />} />
      <Route path="/cadastroCategorias" element={<CadastroCategorias />} />
    </Routes>
  );
};

export default AppRoutes;