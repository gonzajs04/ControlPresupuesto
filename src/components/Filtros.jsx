export default function Filtros({setFiltro,filtro}){

    return ( 
        <div className="container-filtros">
           <form action="">
                <div className="campo">
                    <label htmlFor="filtrar">FILTRAR GASTOS</label>
                    <select name="filtrar" id="filtrar" value={filtro} onChange={(e)=>{setFiltro(e.target.value)}}>
                    <option value="">---Seleccione ----</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="varios">Gastos Varios</option>
                        <option value="diversion">Diversion</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
           </form>
       </div>
    )

}