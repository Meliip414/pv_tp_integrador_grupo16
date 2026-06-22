import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const FilaCliente = ({ cliente, verDetalle, borrarCliente, esGerente }) => {

    const eliminarC = async () => {
        try {
            await borrarCliente(cliente);
            alert("Cliente eliminado correctamente");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <TableRow>

            <TableCell>{cliente.id}</TableCell>

            <TableCell>
                {cliente.name.firstname}
                {" "}
                {cliente.name.lastname}
            </TableCell>

            <TableCell>{cliente.email}</TableCell>

            <TableCell>{cliente.phone}</TableCell>

            <TableCell>{cliente.address.city}</TableCell>

            <TableCell>

                <button onClick={() => verDetalle(cliente.id)}>
                    Ver Ficha Completa
                </button>

                {
                    esGerente && (
                        <button onClick={eliminarC}>
                            Eliminar Cliente de la Base de Datos
                        </button>
                    )
                }

            </TableCell>

        </TableRow>
    );
};

export default FilaCliente;