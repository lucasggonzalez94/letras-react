import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios'
import Formulario from './components/Formulario'
import Letra from './components/Letra'
import Info from './components/Info'

function App() {

    // Definir el state
    const [busquedaletra, guardarBusquedaLetra] = useState({})
    const [letra, guardarLetra] = useState('')
    const [info, guardarInfo] = useState({})

    useEffect(() => {
        if (Object.keys(busquedaletra).length === 0) return // Revisa si el objeto esta vacio o no

        const consultarAPILetra = async () => {

            const {artista, cancion} = busquedaletra

            const urlLetra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
            const urlArtista = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`

            const [letra, informacion] = await Promise.all([ // Hago que las dos consultas se hagan al mismo tiempo
                axios(urlLetra),
                axios(urlArtista)
            ])

            // console.log(letra)
            // console.log(informacion)

            guardarLetra(letra.data.lyrics)
            guardarInfo(informacion.data.artists[0])
        }
        consultarAPILetra()
    }, [busquedaletra, info])

    return (
        <Fragment>
            <Formulario
                guardarBusquedaLetra={guardarBusquedaLetra}
            />

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <Info
                            info={info}
                        />
                    </div>
                    
                    <div className="col-md-6">
                        <Letra
                            letra={letra}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;