import { useEffect, useState } from 'react'
import IconoCerrar from '../img/cerrar.svg'
function Modal({ setModal, animarModal, 
                setAnimarModal,presupuesto,
                setPresupuesto,
                setGastos,
                gastos,gastoEditar,setGastoEditar }) 

    {

        const[nombre,setNombre] = useState('');
        const[categoria,setCategoria] = useState('');
        const[gastoLocal,setGastoLocal] = useState(0);

        const[id,setId] = useState('')

        useEffect(()=>{
            if(Object.keys(gastoEditar).length>0){
                    setNombre(gastoEditar.nombre);
                    setCategoria(gastoEditar.categoria);
                    setGastoLocal(gastoEditar.gastoLocal);
                    setId(gastoEditar.id);
            
            }
        },[])



   

    function generarId(){
        const date = Date.now().toString(36);
        const rand = Math.random().toString(35).substring(2) //SIRVE PARA ELIMINAR PUNTOS DE CADENAS;
        const id = date+rand;
        return id;
    }

    function ocultarModal() {

        setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 500)

        setGastoEditar({}) //CUANDO CIERRO EL MODAL, VACIO EL STATE DE EDITAR
    }


  
    function handleGastos(e){
        e.preventDefault();
        if(!nombre || !categoria || !gastoLocal){
            alert('Debes llenar todos los campos')
            return 
        }
       
        const dataGasto = {
          
            nombre,
            categoria,
            gastoLocal,
            fecha : formatearFecha()
        } 

        if(!id){ //SI NO HAY UNA ID DEL USE EFFECT DE GASTO EDITAR, GUARDA, SINO, EDITA
            guardarGasto(dataGasto);

        }else{
            editarGasto(dataGasto,id) //LE PASAMOS LA ID DE GASTOEDITAR
        }

      
        setAnimarModal(false)
        setTimeout(()=>{
            setModal(false);
        },500)

   
    }

    function editarGasto(dataGasto,id){
        dataGasto.id=id; //AL OBJETO DE DATAGASTO, COMO NO TENEMOS ID, LE GUARADMOS LA YA EXISTENTE DE GASTOEDITAR
        const gastosActualizados = gastos.map((gastoState)=>{
            
            return gastoState.id === dataGasto.id ? dataGasto : gastoState; //SI LA ID ES IGUAL, HAY QUE ACTUALIZAR(GASTOEDITAR), SINO, DEJAR COMO ESTA (GASTOSTATE)
        })
        setGastos(gastosActualizados); //GUARDAMOS EL ARRAY DE OBJETOS ACTUALIZADO
        setGastoEditar({})
    }

    function guardarGasto(dataGasto){
        
        dataGasto.id = generarId();


        setGastos([...gastos,dataGasto]);
        
        
     

    }


    function formatearFecha(){ //FORMATEAMOS FECHA SIN USO DE LIBRERIAS
        const date = new Date();
        const estructura={
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }
         return date.toLocaleDateString('es-ES',estructura)
    }



    return (
        <div className='modal'>
       
            <div className="cerrar-modal">
                <img src={IconoCerrar} alt=""
                    onClick={ocultarModal}
                />
            </div>

            <div className="container-modal">
                <form action="" className={`formulario ${animarModal ? "animar" : 'cerrar'}`} >
                    <legend>{Object.keys(gastoEditar).length<=0 ? 'Nuevo Gasto' : 'Editar Gasto'}
                    
                    </legend>

                    <label htmlFor="nombre">Nombre gasto</label>
                    <input type="text"
                        id='nombre'
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={(e)=>{
                            setNombre(e.target.value)
                        }}

                    />

                    <label htmlFor="cantidad">Cantidad gastada</label>
                    <input type="text"
                        id='cantidad'
                        value={gastoLocal}
                        placeholder='Añade la cantidad del gasto Ej 300'
                        onChange={(e) => {setGastoLocal(Number(e.target.value))}}
                    />


                    <label htmlFor="categoria">Categoria</label>
                     <select name="categoria" id="categoria" value={categoria} onChange={(e)=>{setCategoria(e.target.value)}} >
                        <option value="">---Seleccione ----</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="varios">Gastos Varios</option>
                        <option value="diversion">Diversion</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                     </select>

                     <input className="btn-añadir" type="submit" value={!gastoEditar.nombre ? 'Añadir Gasto' : 'Guardar Cambios'}
                     onClick={handleGastos}
                     />
                     

                </form>
                
            </div>

        </div>
    )

}
export default Modal;