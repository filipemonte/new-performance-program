import React from 'react';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import PersonalRecord from '../../components/personal-record';

class PR extends React.Component {

  render() {
    return (
      <div>
        <Menu></Menu>
        <div className="main-panel">
          <Navbar></Navbar>
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <PersonalRecord></PersonalRecord>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default PR;

