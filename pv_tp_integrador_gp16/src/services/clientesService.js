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


    const eliminarClientes = async (id) => {
        try {
            const eliminar = await axios.delete(`${URL}/${id}`);
            return eliminar.data;

        } catch (error) {
            console.error("Error al eliminar:", error);
            throw new Error(
                error.response?.data?.message || "Error al eliminar cliente"
            );
        }
    }


    return {
        listarTodosClientes, agregarClientes, eliminarClientes
    };

})();


export default clientesService;