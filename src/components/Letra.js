import React, {Fragment} from 'react';

const Letra = ({letra}) => {

    if (letra.length === 0) return (
        <Fragment>
            <p className="letra">Letra no encontrada.</p>
        </Fragment>
    ); // Previene que se muestre si no hay ninguna letra cargada

    return (
        <Fragment>
            <h2>Letra Canción</h2>
            <p className="letra">{letra}</p>
        </Fragment>
    );
}
 
export default Letra;