import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import logo from '../imagenes/arepagif.gif';
import axios from 'axios';
import Cookies from 'universal-cookie';
import "../css/NavBar.css";
import { useDispatch } from 'react-redux';
import {} from '../actions/actions'

const baseUrl = "http://localhost:3000/usuarios"; 
const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      Email: '',
      Password: ''
    }
  }

  handleChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  iniciarSesion = async () => {
    await axios.get(baseUrl, { params: { Email: this.state.form.Email, Password: (this.state.form.Password) } })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set('id', respuesta.id, { path: "/" });
          cookies.set('Email', respuesta.Email, { path: "/" });
          cookies.set('Password', respuesta.Password, { path: "/" });
          cookies.set('FirstName', respuesta.FirstName, { path: "/" });
          cookies.set('LastName', respuesta.LastName, { path: "/" });
          cookies.set('BirthofDate', respuesta.BirthofDate, { path: "/" });
          cookies.set('RegisterDate', respuesta.RegisterDate, { path: "/" });
          cookies.set('Address', respuesta.Address, { path: "/" });
          cookies.set('log', true, { path: "/" });
          alert(`Bienvenido de vuelta ${respuesta.FirstName} ${respuesta.LastName}`);
          window.location.href = "./";
        } else {
          alert('El usuario o la contraseña no son correctos');
        }
      })
      .catch(error => {
        console.log(error);
      })

  }

  componentDidMount() {
    if (cookies.get('username')) {
      window.location.href = "./";
    }
  }


  render() {
    return (
      <Container className='mt-3'>
        <h1 className='text-light letrica'>Inicio de sesión</h1>
        <div className='pt-3'></div>
        <div className='border-bottom border border-white mx-auto'></div>


        <Form.Group className="form-group mt-3" controlId="formBasicEmail">

          <div className='justify-content-start text-light letrica'>
          <h4 className="center">Correo electronico</h4>
          </div>
     
          <input
            type="text"
            className="form-control-lg "
            name="Email"
            onChange={this.handleChange}
            placeholder="ingrese su correo"
            size={25}
          />
        
          <p></p>
  <div className='justify-content-start text-light letrica'>
          <h4 className="center">Contraseña</h4>
          </div>
          <input
            type="password"
            className="form-control-lg"
            name="Password"
            onChange={this.handleChange}
            placeholder="ingrese su contraseña"
            size={25}
          />
          <br />
          <p></p>
          <button className="btn btn-primary" onClick={() => this.iniciarSesion()}>Iniciar Sesión</button>
        </Form.Group>
        <img src={logo} className="img-fluid" alt='lol'/>
      </Container>
    );
  }
}

export default Login;