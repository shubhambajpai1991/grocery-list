import {
    Box,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    IconButton,
} from '@mui/material';

import { AiFillDelete } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';

import React from 'react';

function GroceryList(props: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.quantity}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => {
                                                props.handleEdit(row);
                                            }}
                                        >
                                            <BiEditAlt color="blue" />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                props.handleDelete(row.id);
                                            }}
                                        >
                                            <AiFillDelete color="red" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={props.data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
            />
        </Box>
    );
}

export default GroceryList;

// page
// rowsPerPage
