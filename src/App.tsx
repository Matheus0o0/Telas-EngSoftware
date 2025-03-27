import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';  // Importe as rotas aqui


function App() {
  return (
    <Router>
      <div className="app-container">
        <AppRoutes />  {/* Aqui estão as rotas */}
      </div>
    </Router>
  );
}

export default App;
