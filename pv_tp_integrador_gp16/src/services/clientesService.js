const clientesService = (() => {

    const URL = "https://fakestoreapi.com/users";

    const listarTodosClientes = async () => {
        const respuesta = await fetch(URL);
        if (!respuesta.ok) {
            throw new Error("Error al obtener clientes");
        }
        const datos = await respuesta.json();
        return datos;
    };

    const agregarClientes = async (nuevoCliente) => {
        const peticion = await fetch(URL,
            {
                method:"POST",
                headers:{ "Content-Type":"application/json"},
                body:JSON.stringify(nuevoCliente)
            }
        );
        return await peticion.json();
    }



    return {
        listarTodosClientes, agregarClientes
    };

})();


export default clientesService;