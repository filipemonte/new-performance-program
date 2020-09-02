import React from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import ListaPlanilhas from '../../components/lista-planilhas';

class PlanilhasAtleta extends React.Component {
  

  render() {
    return (
      <div>
        <Menu></Menu>
        <div className="main-panel">
          <Navbar></Navbar>
          <div className="content">
            <ListaPlanilhas></ListaPlanilhas>
          </div>
        </div>
      </div>
    );
  }
}

export default PlanilhasAtleta;

