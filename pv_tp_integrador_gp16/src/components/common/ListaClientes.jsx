import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import FilaCliente from './FilaCliente';

const ListaClientes = ({
    clientes = [],
    verDetalle,
    borrarCliente,
    esGerente
}) => {

    return (
        <Paper elevation={3}>
            <TableContainer>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre Completo</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Ciudad</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {clientes.map(cliente => (
                            <FilaCliente
                                key={cliente.id}
                                cliente={cliente}
                                verDetalle={verDetalle}
                                borrarCliente={borrarCliente}
                                esGerente={esGerente}
                            />
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ListaClientes;