
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list';
import "react-swipeable-list/dist/styles.css"

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

const diccionarioIconos={
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    varios: IconoGastos,
    diversion:IconoOcio,
    salud: IconoSalud,
    suscripciones:IconoSuscripciones
}

function Gasto({gastoListado,setGastoEditar,setGastoBorrar}){ //LO RECIBO DE LISTADO GASTOS.JSX

    const leadingActions = ()=>(
        <LeadingActions> 
            <SwipeAction 
            onClick={()=>{setGastoEditar(gastoListado)}  /*A UN STATE LE GUARDO EL GASTO QUE VOY A EDITAR */}

            >
            
                Editar
              
            </SwipeAction>
        </LeadingActions>
    )
        
    const trailingActions = ()=>(
    <TrailingActions> 
            <SwipeAction onClick={()=>{setGastoBorrar(gastoListado)}}
                        destructive={true}
            >
              Eliminar
            </SwipeAction>
    </TrailingActions>
    )

    return(
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
        <div className="gasto sombra">

            <div className="contenido-gasto">
            
                <img src={diccionarioIconos[gastoListado.categoria]} alt="Icono del gasto" />

                <div className="descripcion-gasto">

                    <p className="categoria">

                        {gastoListado.categoria}
                    </p>

                    <p className="nombre-gasto">{gastoListado.nombre}</p>
                
                    <p className="fecha">Agregado el :  <span> {gastoListado.fecha}</span></p>

                </div>

            </div>
            
            <p className="cantidad-gasto">${gastoListado.gastoLocal}</p>
        </div>

            </SwipeableListItem>
        </SwipeableList>
    )


}

export default Gasto;