import React, { useState } from 'react';
import axios from 'axios';
import {  Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import logo from '../imagenes/arepagif.gif';
import '../css/Menu.css'

export const Register = () => {

  const [fromData, setFormData] = useState({
    Email: "",
    Password: "",
    FirstName: "",
    LastName: "",
    BirthofDate: "",
    RegisterDate: "",
    Address: "",
    PhoneNumber: ""
  });

  const handleFormSubmit = async (e) => {

    let response = await axios.post('http://localhost:3000/usuarios', fromData);

    if (response) {
      alert("dato enviado con exito");
    } else {
      alert("algo salio mal");
    }

    setFormData({
      Email: "",
      Password: "",
      FirstName: "",
      LastName: "",
      BirthofDate: "",
      RegisterDate: "",
      Address: "",
      PhoneNumber: ""
    });
  }

  return (
    <Container className='mt-9'>
    <h1 className='text-light letrica'>Registro</h1>
    <div className='pt-3'></div>
    <div className='border-bottom border border-white mx-auto'></div>
    <Form.Group className="form-group mb-3" controlId="formBasicEmail">
    <p></p>
      <div className="one-half last">
      <div className='justify-content-start text-light letrica'>
      <h4 className="center">Correo electronico</h4>
      </div>
      <input placeholder='su correo' type="Email"  className="form-control-lg" id="ControlInputCorreo" value={fromData.Email} onChange={(e) => setFormData({ ...fromData, Email: e.target.value })} size={25} />
      <p></p>
      <div className='justify-content-start text-light letrica'>
      <h4 className="center">Contraseña </h4>
      </div>
      <input placeholder='contraseña' type="Password" className="form-control-lg" id="ControlInputContraseña" value={fromData.Password} onChange={(e) => setFormData({ ...fromData, Password: e.target.value })} size={25} />
      <p></p>
      <div className='justify-content-start text-light letrica'>
      <h4 className="center">Nombre</h4>
      </div>
      <input placeholder='Su Nombre' type="name" className="form-control-lg" id="exampleFormControlInput1" value={fromData.FirstName} onChange={(e) => setFormData({ ...fromData, FirstName: e.target.value })} size={25} />
      <p></p>
      <div className='justify-content-start text-light letrica'>
      <h4 className="center">Apellido</h4>
      </div>
      <input placeholder='Su Apellido' type="name" className="form-control-lg" id="exampleFormControlInput1" value={fromData.LastName} onChange={(e) => setFormData({ ...fromData, LastName: e.target.value })} size={25} />
      </div>
      <p></p>
      <div className="one-half">
      <div className='justify-content-start text-light letrica'>
      <h4 className="center">Fecha de Nacimiento</h4>
      </div>
      <input placeholder='Su fecha de nacimiento' type="date" className="form-control-lg" id="exampleFormControlInput1" value={fromData.BirthofDate} onChange={(e) => setFormData({ ...fromData, BirthofDate: e.target.value })} />

      <p></p>
      <div className='justify-content-start text-light letrica'>
      <h4 className="center">Fecha de Registro</h4>
      </div>
      <input placeholder='Su fecha de Registro' type="date" className="form-control-lg" id="exampleFormControlInput1" value={fromData.RegisterDate} onChange={(e) => setFormData({ ...fromData, RegisterDate: e.target.value })} />

      <p></p>      
      <div className='justify-content-start text-light letrica'>
      <h4 className="center">Dirección</h4>
      </div>
      <input placeholder='Su dirección' type="Address" className="form-control-lg" id="exampleFormControlInput1" value={fromData.Address} onChange={(e) => setFormData({ ...fromData, Address: e.target.value })} size={25} />
      <p></p> 
      <div className='justify-content-start text-light letrica'>
      <h4 className="center">Telefono</h4>
      </div>
      <input placeholder='Su telefono' type="phone" className="form-control-lg" id="exampleFormControlInput1" value={fromData.PhoneNumber} onChange={(e) => setFormData({ ...fromData, PhoneNumber: e.target.value })} size={25} />
      <p></p>
      </div>
      <div className="mb-3">
        <button className='btn btn-success' onClick={handleFormSubmit}>Registrate</button>
      </div>
      <img src={logo} className="img-fluid" alt='lol' width="260" height="220" />
    </Form.Group>
  </Container>
  )
}