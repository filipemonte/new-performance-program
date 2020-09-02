import React from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import FormPerfilTreinador from '../../components/form-perfil-treinador';

class PerfilTreinador extends React.Component {

  render() {
    return (
        <div>
          <Menu></Menu>
          <div className="main-panel">
            <Navbar></Navbar>
            <div className="content">
              <div className="row">
                <FormPerfilTreinador></FormPerfilTreinador>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default PerfilTreinador;

