import React, { useState, useEffect } from 'react';
import { AddContacto } from './Components/AddContacto';
import { ViewContacto } from './Components/ViewContacto';
import data from './Helper/data.json';


export const ContactApp = () => {

    const [showPopUp, setShowPopUp] = useState(false);
    const [inputContacto, setInputContacto] = useState(data);
    const [contacto, setContacto] = useState({});

    const changeStatePopUp = () => {
        setShowPopUp(!showPopUp);
        setContacto({})
    }

    return(
        <>
            <h2>Contacto</h2>
            <div className='guardar-contacto'>
                <button className='boton-guardar-contacto' onClick={changeStatePopUp}>Agregar Contacto</button>
                {showPopUp && <AddContacto
                    handleClose={setShowPopUp}
                    setInputContacto={setInputContacto}
                    inputContacto={inputContacto}
                    changeStatePopUp={changeStatePopUp}
                    contacto={contacto}
                    
                />}
            </div>
            <div className='tarjetas'>
                {inputContacto.map((contacto,idx) => 
                    <ViewContacto
                    key={idx}
                    id={idx}
                    handleClose={setShowPopUp}
                    contacto={contacto}
                    showPopUp={showPopUp}
                    setContacto={setContacto}
                    inputContacto={inputContacto}
                    changeStatePopUp={changeStatePopUp}
                    setInputContacto={setInputContacto}
            />)}
            </div>

        </>
    )
}