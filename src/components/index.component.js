import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = { user: [] };

      this.getDataFromDB = this.getDataFromDB.bind(this);
      this.handleState = this.handleState.bind(this);
    }
    componentDidMount(){
      this.getDataFromDB();
    }

    componentWillUnmount() {

    }



    /*componentDidUpdate(nextProps){
      if(nextProps.user !== this.state.user)
      {
        this.getDataFromDB();
      }
    }*/

    getDataFromDB(){
      axios.get('http://localhost:4000/user')
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    handleState() {
      this.getDataFromDB();
    }

    render() {
      return (
        <div>
          <h3 align="center">List of Users</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Lasname</th>
                <th>City</th>
                <th>Address</th>
                <th>Zip code</th>
                <th>Username</th>
                <th>Password</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.state.user.map(function(object, i)
                {
                    return <TableRow obj={object} key={i} updateState = {() => this.handleState()} />;
                }, this)
              }
            </tbody>
          </table>
        </div>
      );
    }
  }