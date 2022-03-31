import React, {useState} from 'react';
import { AddContacto } from './AddContacto';


export const ViewContacto = (props) => {

  const [contactoEditado, setContactoEditado] = useState(false);

  const getValue = (e) => {
    props.setContacto(props.contacto)
    props.handleClose(true)
  }

  const removeContacto = (e) => {
    props.setInputContacto(props.inputContacto.filter((c,idx) => {
      return idx !== props.id
    }))
  }


  return (
    <div className='card-contacto'>
      <img alt="" height={"200px"} width={"200px"} src={props.contacto.img} />
      <h4>Nombre</h4>
      <p>{props.contacto.nombre}</p>
      <h4>Apellido</h4>
      <p>{props.contacto.apellido}</p>
      <h4>Email</h4>
      <p>{props.contacto.email}</p>
      <h4>Numero de Telefono</h4>
      <p>{props.contacto.nro_celular}</p>
      <div className='botones-contactos'>
        <button onClick={getValue}>Editar</button>
        <button onClick={removeContacto}>Borrar</button>
      </div>
    </div>
  )
}
