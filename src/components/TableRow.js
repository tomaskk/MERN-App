import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
      console.log("clicked delete in tablerow");
      
        axios.get('http://localhost:4000/user/delete/'+this.props.obj._id)
            .then(res => {console.log(res.data)})
            .then(this.props.updateState())
            .catch(err => {
              console.log(err);
              this.props.updateState();
            })
    }// <button onClick={this.handleDelete} className="btn btn-danger">Delete</button>
    
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.person_name}
          </td>
          <td>
            {this.props.obj.person_lastname}
          </td>
          <td>
            {this.props.obj.city}
          </td>
          <td>
            {this.props.obj.person_address}
          </td>
          <td>
            {this.props.obj.zip_code}
          </td>
          <td>
            {this.props.obj.username}
          </td>
          <td>
            {this.props.obj.password}
          </td>
          <td>
            <Link to={{pathname:"/edit/"+this.props.obj._id}}  className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button className="btn btn-danger" onClick={() => {
              if(window.confirm('Delete this user?: ' + this.props.obj.person_name + ' ' + this.props.obj.person_lastname))
              {
                this.handleDelete();
              }}}>
            Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;