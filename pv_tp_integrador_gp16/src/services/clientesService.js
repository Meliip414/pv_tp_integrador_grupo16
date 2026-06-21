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

    return {
        listarTodosClientes
    };

})();

export default clientesService;