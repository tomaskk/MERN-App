import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeZipCode = this.onChangeZipCode.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.setZipCode = this.setZipCode.bind(this);

    this.state = {
      person_name: '',
      person_lastname: '',
      city: '',
      person_address:'',
      zip_code: '',
      username: '',
      password: '',
      on_success: ''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4000/user/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                person_name: response.data.person_name,
                person_lastname: response.data.person_lastname,
                city: response.data.city,
                person_address: response.data.person_address,
                zip_code: response.data.zip_code,
                username: response.data.username,
                password: response.data.password
              });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value,
      on_success: ''
    });
  }
  onChangeLastname(e) {
    this.setState({
      person_lastname: e.target.value,
      on_success: ''
    })  
  }
  onChangeAddress(e) {
    this.setState({
      person_address: e.target.value,
      on_success: ''
    })
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      on_success: ''
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      on_success: ''
    })
  }
  onChangeZipCode(e) {
    this.setState({
      zip_code: e.target.value,
      on_success: ''
    })
  }
  onChangeCity(e) {
    this.setState({
      city: e.target.value,
      on_success: ''
    });
  }

  setZipCode(){
    const adr = this.state.person_address;
    const city = this.state.city;
    const postItKey = 'VnA1LRllhFyeOCJkJ7g4';

    var split = adr.split(" ");
    var middlePart = '';
    for(var i = 0; i < split.length; i++)
    {
      middlePart = middlePart + '+' + split[i];
    }

   const url = 'https://postit.lt/data/?address=' + middlePart + ',+' + city + '&key=' + postItKey;

    axios.get(url)
       .then(res => {
        console.log(res);

        this.setState({
           zip_code: 'LT-' + res.data.data[0].post_code,
           on_success: ''
         });

      }).catch(error => {
        console.log(error);
        alert("Address and/or City is/are incorrect, Postit.lt returned no results.");
        this.setState({
          zip_code: '',
          on_success: ''
        });
      });
  }

  onSubmit(e) {
    e.preventDefault();
    var obj;

    if(this.state.zip_code === '')
    {
       obj = {
        person_name: this.state.person_name,
        person_lastname: this.state.person_lastname,
        city: this.state.city,
        person_address: this.state.person_address,
        zip_code: "N/A",
        username: this.state.username,
        password: this.state.password
      }
    }
    else
    {
       obj = {
        person_name: this.state.person_name,
        person_lastname: this.state.person_lastname,
        city: this.state.city,
        person_address: this.state.person_address,
        zip_code: this.state.zip_code,
        username: this.state.username,
        password: this.state.password
      }
    }

    axios.post('http://localhost:4000/user/update/'+this.props.match.params.id, obj)
        .then(res => {
          console.log(res.data);
          this.setState({ on_success: 'User Updated Successfully' });
        });

    //window.location.reload();
    
    //this.props.history.push('/index');
  }

  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="left">Update User's Information</h3>
            <form onSubmit={this.onSubmit} style={{width:450}}>
            <div className="form-group">
                    <label>Person's Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.person_name}
                      onChange={this.onChangePersonName}
                      required
                      />
                </div>
                <div className="form-group">
                    <label>Person's Lastname: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.person_lastname}
                      onChange={this.onChangeLastname}
                      required
                      />
                </div>
                <div className="form-group">
                    <label>City: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.city}
                      placeholder="..."
                      onChange={this.onChangeCity}
                      />
                </div>
                <div className="form-group">
                    <label>Address: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.person_address}
                      onChange={this.onChangeAddress}
                      required
                      />
                </div>
                <div className="form-group">
                    <div>
                      <a style={{float:"left"}}> Set zip code using </a>
                      <a style={{marginLeft:8}} href="https://postit.lt/" title="Pašto kodų paieška"> pašto kodų paieška:</a>
                      <button style={{float:"right"}} onClick={this.setZipCode} type = "button"
                              className="btn btn-outline-info btn-sm">Find my zip code</button>
                    </div>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.zip_code}
                      onChange={this.onChangeZipCode}
                      readOnly
                      />
                </div>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      required
                      />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      required
                      />
                </div>
                <div className="form-group">

                <input type="submit" 
                      value="Update Information" 
                      className="btn btn-primary"/>
                </div>

                <div className="text-success">
                    <label>{this.state.on_success}</label>
                </div>
            </form>
        </div>
    )
  }
}