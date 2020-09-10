import React from 'react';

import moment from 'moment'
import { trackPromise } from 'react-promise-tracker';
import Switch from "react-switch";
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';
import CalendarioAtleta from '../../components/calendario-atleta';
import TreinoAtleta from '../../components/treino-atleta';
import Footer from '../../components/footer';
import { myConfig } from '../../config';
import authHeader from '../../auth/auth-header';
import authService from '../../auth/auth-service';



class Atletas extends React.Component {
  constructor(props) {
    super(props);

    console.log()

    this.state = {
      atletas: [],
      fetched: false,
      checked: false
    };
  }

  componentDidMount() {
    this.setState({ fetched: false })
  }

  componentDidUpdate(prevState) {
    if (!this.state.fetched) {
      trackPromise(
        fetch(`${myConfig.apiUrl}/atletas/1`, { headers: authHeader() })
          .then(res => res.json())
          .then((data) => {
            this.setState({ atletas: data })
            this.setState({ fetched: true })
          })
          .catch(console.log)
      );
    }
  }

  handleChange(id, checked) {

    let status = 'ativo';

    if (!checked) {
      status = 'cancelado';
    }

    let body = {
      status: status
    };

    body = JSON.stringify(body)

    trackPromise(
      fetch(`${myConfig.apiUrl}/statusatleta/${id}`, { method: 'PUT', headers: authHeader(), body })
        .then((data) => {
          let temp = [...this.state.atletas];
          temp.find(x => x.id == id).status = status;
          this.setState({ atletas: temp })
        })
        .catch(console.log)
    );



  }

  render() {

    return (
      // Pass user state as value to context.Provider so it can be consumed by context.Consumer
      <div>
        <Menu></Menu>
        <div className="main-panel">
          <Navbar></Navbar>
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="card ">
                  <div className="card-header ">
                    <h5 className="card-title">Atletas</h5>
                  </div>
                  <div className="card-body ">
                    <table className="table-striped table">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Planilha</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.atletas.map(item => (
                          <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>{item.planilha}</td>
                            <td>
                              <Switch
                                checked={item.status == "ativo"}
                                onChange={this.handleChange.bind(this, item.id)}
                                onColor="#86d3ff"
                                onHandleColor="#2693e6"
                                handleDiameter={30}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={20}
                                width={48}
                                className="react-switch"
                                id="material-switch"
                              />
                            </td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default Atletas;

