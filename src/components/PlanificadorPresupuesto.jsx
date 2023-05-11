import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";
 import {convertirMoneda} from '../helpers/index.js'


function PlanificadorPresupuesto({presupuesto,setPresupuesto,setGastos,gastos,setPresupuestoDefinido}){

    const [disponible,setDisponible] = useState(0)
    const [gastado,setGastado] = useState(0)
    const [porcentaje,setPorcentaje] = useState(0)

    //EN CASO DE QUE HAYA UN NUEVO GASTO O MODIFICACION EN UNO DE ELLOS VA A HABER CAMBIOS ACA:
    useEffect(()=>{ 
        const totalGastado = gastos.reduce((total, gasto)=>{
            return gasto.gastoLocal+ total;
        },0)
        setGastado(totalGastado)

        const totalDisponible = presupuesto-totalGastado;
        setDisponible(totalDisponible)

        let nuevoPorcentaje = ((presupuesto-totalDisponible)*100 )/(presupuesto);
        
        if(nuevoPorcentaje>=100){
            nuevoPorcentaje=100;
        } else if( !nuevoPorcentaje){
            nuevoPorcentaje=0;
        }
   
        setTimeout(()=>{
            setPorcentaje(nuevoPorcentaje.toFixed(2))
        },1000)
   

    },[gastos])

    function handleResetApp(){
        const resultado = confirm("¿Deseas reiniciar presupuesto y gastos?");
        if(resultado){
                <div className="alerta">
                {swal({
                    title: "App reseteada",
                    text:"La APP se ha Reseteado correctamente",
                    icon:"success",
                    button:"Entendido"
                })}
          </div>
            setTimeout(()=>{
                setGastos([])
                setPresupuesto(0)
                setPresupuestoDefinido(false)
            },500)
        }
    }



    return(
        
        <div className="containerg-planificador">

            <div className="container-planificador">

                <div className="circular-progress">
                    <CircularProgressbar
                        value={porcentaje}
             
                        text={`${porcentaje}% Gastado`}
                   
                        styles={buildStyles({
                            textSize: "10px",
                            trailColor: "black",
                            textColor: porcentaje>=100 ? '#DC2626' : '#646CFF',
                            pathColor:porcentaje>=100 ? '#DC2626' : '#646CFF'
                           

                        })
                        
                        }
                    
                    
                    />

       
                </div>

                <div className="texto-planificador">
                    <button className="btn-restart" type="button" onClick={handleResetApp}>Resetear App</button>

                   <p><span>Presupuesto:{' '}</span>{convertirMoneda(presupuesto)}</p>
                   <p className={`${disponible<0 ? 'negativo' : ''}`}><span className={`${disponible<0 ? 'negativo': ''}`}>Disponible:{' '}</span>{convertirMoneda(disponible)}</p>
                   <p><span>Gastado:{' '}</span>{convertirMoneda(gastado)}</p>


                </div>
                
            </div>
        
        </div>

        
    );



}
export default PlanificadorPresupuesto;