import { useState,useEffect } from 'react'
import Header from './components/Header';
import AgregarPresupuesto from './components/AgregarPresupuesto';
import PlanificadorPresupuesto from './components/PlanificadorPresupuesto';
import Modal from './components/Modal';
import swal from 'sweetalert'
import ListadoGastos from './components/ListadoGastos';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import Filtros from './components/Filtros';


function App() {

  const presupuestoLocalStorage =  Number(localStorage.getItem('presupuesto') ?? 0) //OBTENGO EL PRESUPUESTO DE LOCAL STORAGE. SI HAY LO PONGO EN EL STATE, SINO, LE ALMACENO 0
  const gastosLS = localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []; //CONVIERTO DE STRING A JSON EN CASO DE QUE HAYA ALGO
  //crear COMPONENTE PARA MOSTRAR LOS GASTOS
  const[presupuesto,setPresupuesto] = useState(presupuestoLocalStorage) //PONGO EL PRESUPUESTO DE LOCAL STORAGE EN EL STATE INICIAL.
  const [presupuestoDefinido,setPresupuestoDefinido] = useState(false)
  const [modal,setModal] = useState(false);
  const[animarModal,setAnimarModal] = useState(false);
  const [gastos,setGastos] = useState(gastosLS)
  const[gastoEditar,setGastoEditar] = useState({})
  const [gastoBorrar,setGastoBorrar] = useState({})
  const [filtro,setFiltro] = useState('');
  const [gastosFiltrados,setGastosFiltrados] = useState([]);

  useEffect(()=>{
    if(Object.keys(gastoEditar).length>0){ //VERIFICAMOS SI TIENE ALGUN GASTO PARA EDITAR
      handleNuevoGasto();
    }
  },[gastoEditar])


  useEffect(()=>{

    if(Object.keys(gastoBorrar).length>0){
      handleEliminarGasto()
    }

  },[gastoBorrar])

  //GUARDAR EN LOCAL STORAGE
  useEffect(()=>{
    localStorage.setItem('presupuesto',presupuesto ?? 0) //GUARDO EN LOCAL STORAGE EL PRESUPUESTO
  },[presupuesto])

  useEffect(()=>{
    if(presupuestoLocalStorage>0){ //EN CASO DE QUE ESTE DEFINIDO EL PRESUPUESTO EN LOCAL STORAGE, PONGO PRESUPUESTO DEFINIDO EN TRUE, PARA QUE NO ME PIDA ASIGNAR DE NUEVO EL PRESUPUESTO.
      return setPresupuestoDefinido(true);
    }
    setPresupuesto(false)
  },[])

  ////////////////////////////

  //GUARDAR GASTOS EN LOCALSTORAGE
  useEffect(()=>{
    localStorage.setItem('gastos',JSON.stringify(gastos) ?? []); //LO CONVIERTO A STRING YA QUE LOCAL STORAGE SOLO PUEDE GUARDAR STRINGS
  },[gastos])


  //USE EFFECT PARA FILTRO///////////////////////////  /////////////////////////////  /////////////////////////////  /////////////////////////////

      useEffect(()=>{
        //FILTRAR GASTOS POR CATEGORIA
        if(filtro){
          const gastosFiltrados = gastos.filter((gastoState)=>{
            return gastoState.categoria === filtro;
          })
         setGastosFiltrados(gastosFiltrados) //SETEO EN UN NUEVO STATE LOS GASTOS FILTRADOS PARA MOSTRARLOS
        }
        
      },[filtro]) //CUANDO HAYA CAMBIO EN FILTRO

      

  
  /////////////////////////////  /////////////////////////////  /////////////////////////////  /////////////////////////////


  function handleEliminarGasto(){

    const gastosBorrados = gastos.filter((gastoState)=>{
      return gastoBorrar.id != gastoState.id && gastoState;
    })

    setGastos(gastosBorrados)
    setGastoBorrar({})
     generarExito("Success")


  }

  function handleNuevoGasto(){
     setModal(true);
     setTimeout(()=>{
        setAnimarModal(true)
     },500)

  }

  function generarExito(icono){
    <div className="alerta">
      {swal({
        title: "Eliminado",
        text:"El gasto se ha eliminado correctamente",
        icon:icono,
        button:"Entendido"
      })}
    </div>

  }


  return (
    <>
    <div className="App">
      <div className="container-h-ap">

          <Header
            setPresupuesto={setPresupuesto}
            setGastos={setGastos}
          />

          {!presupuestoDefinido ? 
                (
                  <AgregarPresupuesto 
              
                  presupuesto={presupuesto}
                  setPresupuesto={setPresupuesto}
                  setPresupuestoDefinido = {setPresupuestoDefinido}
                  gastos={gastos}
      
                  />

                ) :
                
                ( //UNA VEZ DEFINIDO EL PRESUPUESTO, LLAMO AL COMPONENTE DE PLANIFICADOR DE PRESUPUESTO, EL CUAL NOS ARROJA NUESTRO PRESUPUESTO, GASTOS ETC..
              
                    <PlanificadorPresupuesto 
                    
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
            
                    setGastos={setGastos}
                    gastos={gastos}
                    setPresupuestoDefinido={setPresupuestoDefinido}
          
                 

                  />


                 
                )

                
      
          }
         
         {presupuestoDefinido && ( //SI HAY UN PRESUPUESTO, VOY A MOSTRAR TODOS LOS GASTOS DE UNA PERSONA
          <>
                 <Filtros 
                  setFiltro={setFiltro}
                  filtro={filtro}
                 />


                  <main className='gastos'>
                    <ListadoGastos
                      
                      gastos={gastos}
                      setGastoEditar={setGastoEditar}
                      setGastoBorrar={setGastoBorrar}
                      filtro={filtro}
                      gastosFiltrados={gastosFiltrados}


                    />
                  </main>
              </>
         )}
        

      </div>


        {presupuestoDefinido && ( ///PARA MOSTRAR EL LOGO UNA VEZ DEFINIDO EL PRESUPUESTO

              <div className="nuevo-gasto">
                   <img src={IconoNuevoGasto} alt="icono"
                   onClick={()=>{
                      setGastoEditar({}) //LO VACIO ACA, YA QUE SOLO CUANDO TOCAMOS, VA A ESTAR EN BLANCO EL MODAL

                      modal=== false && handleNuevoGasto() //SI MODAL ES FALSE, LLAMAMOS A LA FUNCION PARA SETEAR EL MODAL A TRUE
                   }}
                  />
            </div>

      
        )}

       
      
    </div>

    {modal &&( //ESTE MODAL SE DETERMINA CUANDO LE DAMOS CLICK A LA IMG PARA MOSTRAR MODAL, SE SETEA EL MODAL A TRUE Y SE MUESTRA EL MODAL
         /*LLAMAMOS A MODAL PARA MOSTRARLO*/ 
           <Modal 
            setModal={setModal}
            animarModal={animarModal}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setAnimarModal = {setAnimarModal}
            setGastos={setGastos}
            gastos={gastos}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />
    )}

    

       
  </>
  )
}

export default App
