import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import admins from '../../data/admins.json';

const ListaClientes = () => {

  const columns = [
    {
      width: 180,
      label: 'Nombre',
      dataKey: 'nombre',
    },
    {
      width: 180,
      label: 'Sector',
      dataKey: 'sector',
    },
  ];

  const rows = admins.map((admin, index) => ({
    id: index + 1,
    ...admin,
  }));

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
    TableRow,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  const fixedHeaderContent = () => {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{ width: column.width }}
            sx={{ backgroundColor: 'background.paper' }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const rowContent = (_index, row) => {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  //export default function ReactVirtualizedTable() {
    return (
      <Paper style={{ height: 400, width: '100%' }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    );
  //}

}

export default ListaClientes;