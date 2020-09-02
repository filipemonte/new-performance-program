import React from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import FormPerfilAtleta from '../../components/form-perfil-atleta';

class PerfilAtleta extends React.Component {

  render() {
    return (
        <div>
          <Menu></Menu>
          <div className="main-panel">
            <Navbar></Navbar>
            <div className="content">
              <div className="row">
                <FormPerfilAtleta></FormPerfilAtleta>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default PerfilAtleta;

