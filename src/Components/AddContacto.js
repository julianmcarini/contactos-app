import React, { useState } from 'react';

export const AddContacto = (props) => {

    let newContacto = {}

    newContacto = {
        id:0,
        nombre:'',
        apellido:'',
        email:'',
        nro_celular:0,
        img:{}
    };


    // const defaultImagen = <img alt="not fount" width={"250px"} src="./img/ContactoNoFoto.jpg" />;

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [nroCelular, setNroCelular] = useState(0)
    const [selectedImage, setSelectedImage] = useState(null);
    const [validateEmail, setValidateEmail] = useState("")
    const [validateNumero, setValidateNumero] = useState("")


    const handleInputChangeName = (e) =>{
        setNombre(e.target.value);
    }

    const handleInputChangeApellido = (e) =>{
        setApellido(e.target.value);
    }
    
    const handleInputChangeDireccion = (e) =>{
        setEmail(e.target.value);
    }

    const handleInputChangeNroCel = (e) =>{
        setNroCelular(e.target.value);
    }


    // const nombreValidation = () => {
        
    // }

    const emailValidation = (email) => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(email === ""){
            setValidateEmail("Campo Obligatorio");
            return false;                
        }else if(!email || regex.test(email) === false){
            setValidateEmail("Email invalido");
            return false;
        }
        setValidateEmail("");       
        return true;
    }


    const phoneValidation = (phone) => {
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        if(phone === 0){
            setValidateNumero("Campo Obligatorio");
            return false;    
        }else if (!phone || regex.test(phone) === false){
            setValidateNumero("Numero invalido");
            return false;
        }
        setValidateNumero("");
        return true;
      }


    const hundleSubmit = (e) => {
        e.preventDefault();
        newContacto.nombre = nombre;
        newContacto.apellido = apellido;
        newContacto.email = email;
        newContacto.nro_celular = nroCelular;
        newContacto.img = URL.createObjectURL(selectedImage);
        if (Object.keys(props.contacto).length === 0){
            let validateEmail = emailValidation(email);
            let validatePhone = phoneValidation(nroCelular);
            if (validateEmail && validatePhone){
                props.setInputContacto(cont => [...cont, newContacto]);
                props.handleClose(false);
            }
        }else{
            let validateEmail = emailValidation(email? email : props.contacto.email);
            let validatePhone = phoneValidation(nroCelular? nroCelular : props.contacto.nro_celular);
            if (validateEmail && validatePhone){
                props.setInputContacto(props.inputContacto.map((c,idx) => {
                    if (idx === props.contacto.id){
                        c.nombre = nombre? nombre : props.contacto.nombre;
                        c.apellido = apellido? apellido : props.contacto.apellido;
                        c.email = email? email : props.contacto.email;
                        c.nro_celular = nroCelular? nroCelular : props.contacto.nro_celular;
                        c.img = selectedImage? URL.createObjectURL(selectedImage) : props.contacto.img;
                    }
                    return c                
                }))
                props.handleClose(false);
            }
        }
            
    }

    return (
        <form className='popup-box'>
            <div className='box'>
                <span className="close-icon" onClick={props.changeStatePopUp}>x</span>
                <h2>Agregar contacto</h2>
                <hr/>
                <h3>Nombre</h3>
                <input
                    required
                    typeof='text'
                    name="nombre"
                    placeholder={props.contacto?.nombre}
                    value={nombre}
                    onChange={handleInputChangeName}
                />
                <h3>Apellido</h3>
                <input
                    typeof='text'
                    name="apellido"
                    placeholder={props.contacto?.apellido}
                    value={apellido}
                    onChange={handleInputChangeApellido}
                />
                <h3>Email</h3>
                <p style={{color:"red"}}>{validateEmail}</p>
                <input
                    typeof='text'
                    name="email"
                    placeholder={props.contacto?.email}
                    value={email}
                    onChange={handleInputChangeDireccion}
                                 
                />
                <h3>Numero de Celular</h3>
                <p style={{color:"red"}}>{validateNumero}</p>
                <input
                    typeof='text'
                    name="nro_celular"
                    placeholder={props.contacto?.nro_celular}
                    onChange={handleInputChangeNroCel}
                   
                />
                <br />
                
                <br /> 

                {selectedImage && (
                    <div>
                        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                        <br />
                        <button onClick={()=>setSelectedImage(null)}>Remove</button>
                    </div>
                    )}
                    <br />
                    
                    <br /> 
                    <input
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                            console.log(event.target.files[0]);
                            setSelectedImage(event.target.files[0]);
                        }}
                    />
                    <br />
                    
                    <br />                     

                <button className='boton-guardar-contacto' onClick={hundleSubmit}>Guardar</button>
            </div>
        </form>
    )
}
