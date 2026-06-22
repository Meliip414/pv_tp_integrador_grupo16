const FilaCliente = ({ cliente, verDetalle, borrarCliente, esGerente }) => {

    const eliminarC = async () => {
        try {
            await borrarCliente(cliente.id);
            alert("Cliente eliminado correctamente");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <tr>
            <td>{cliente.id}</td>

            <td>
                {cliente.name.firstname}
                {" "}
                {cliente.name.lastname}
            </td>

            <td>{cliente.email}</td>
            <td>{cliente.phone}</td>
            <td>{cliente.address.city}</td>

            <td>

                <button onClick={() => verDetalle(cliente.id)} >Ver Ficha Completa</button>

                {
                    esGerente && (<button onClick={eliminarC}>Eliminar Cliente de la Base de Datos</button>)
                }

            </td>

        </tr>
    );
};

export default FilaCliente;