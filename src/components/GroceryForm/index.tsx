import { Box, Typography, Stack, Modal, TextField, Button } from '@mui/material';
import React from 'react';

function GroceryForm(props: any) {
    const [name, setName] = React.useState('');
    const [quantity, setQuantity] = React.useState(1);

    React.useEffect(() => {
        if (props.selectedItem !== null) {
            setName(props.selectedItem.name);
            setQuantity(props.selectedItem.quantity);
        } else {
            setName('');
            setQuantity(1);
        }
    }, [props.selectedItem]);

    return (
        // <copied>
        <Modal open={props.open} onClose={props.handleClose}>
            {/* Here we using props.open to see the current value of open
            updated by setOpen in the App.tsx file */}
            <Box
                sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}

                // <copied />
            >
                <Typography variant="h5" mb="40px" fontWeight="bold">
                    {props.selectedItem === null
                        ? 'New Item Details'
                        : 'Update Item Details'}
                </Typography>

                <Stack
                    id="my-form-id"
                    component="form"
                    noValidate
                    autoComplete="off"
                    spacing={'24px'}
                    // onSubmit={(event: any) => {
                    //     event.preventDefault();

                    //     const name = event.target.name.value;
                    //     const quantity = event.target.quantity.value;

                    //     props.handleSubmit({ id: String(Math.random()), name, quantity });
                    // }}
                >
                    <TextField
                        name="name"
                        placeholder="Please enter item name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        // new changes
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                    <TextField
                        name="quantity"
                        placeholder="Please enter item quantity"
                        label="Quantity"
                        variant="outlined"
                        type="number"
                        fullWidth
                        // new changes
                        value={quantity}
                        onChange={(event) => {
                            setQuantity(Number(event.target.value));
                        }}
                    />

                    <Stack
                        direction="row"
                        spacing="16px"
                        mt="40px"
                        justifyContent="flex-end"
                    >
                        <Button variant="outlined" onClick={() => props.handleClose()}>
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (props.selectedItem !== null) {
                                    props.handleUpdate({
                                        id: props.selectedItem.id,
                                        name: name,
                                        quantity: quantity,
                                    });
                                } else {
                                    props.handleSubmit({
                                        id: String(Math.random()),
                                        name: name,
                                        quantity: quantity,
                                    });
                                }

                                setName('');
                                setQuantity(1);
                            }}
                        >
                            {props.selectedItem !== null ? 'Update' : 'Add'}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}

export default GroceryForm;
