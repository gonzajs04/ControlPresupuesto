
import Gasto from './Gasto';
function ListadoGastos({ gastos, setGastoEditar, setGastoBorrar, filtro, gastosFiltrados }) {

    return (

        <div>
           
            {
                filtro ? (    
                    <>  

                    <h2>{gastosFiltrados.length  ? `Gastos en la categoria ${filtro}`   : ('Aun no hay gastos en estas categoria')}</h2>

                        {gastosFiltrados.map(gastoListado => ( //RECORREMOS GASTO 1 X 1
                            <Gasto
                                key={gastoListado.id}
                                gastoListado={gastoListado} //LE PASAMOS AL COMPONENTE GASTO, 1 POR 1 LOS GASTOS
                                setGastoEditar={setGastoEditar}
                                setGastoBorrar={setGastoBorrar}
                            /> //Va a contener cada uno de los gastos

                        ))}

                        </> 
                    
                ) : (

                    <>
                    <h2>{gastos.length ? 'Gastos' : 'Aun no hay gastos'}</h2>

                        { gastos.map(gastoListado => ( //RECORREMOS GASTO 1 X 1

                                <Gasto
                                    key={gastoListado.id}
                                    gastoListado={gastoListado} //LE PASAMOS AL COMPONENTE GASTO, 1 POR 1 LOS GASTOS
                                    setGastoEditar={setGastoEditar}
                                    setGastoBorrar={setGastoBorrar}
                                /> //Va a contener cada uno de los gastos



                            ))}
                    </>
                )





            }





        </div>


    )


}

export default ListadoGastos;