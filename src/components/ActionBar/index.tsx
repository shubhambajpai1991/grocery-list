import { Stack, Button, Typography } from '@mui/material'; // stack has auto flex property
import { MdAdd } from 'react-icons/md'; // used for icon import
import { AiFillFilePdf } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';

function ActionBar(props: any) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px="30px"
            py="20px"
            sx={{ backgroundColor: '#435d7d' }}
        >
            <Typography color="white" fontWeight="bold" variant="h4">
                Grocery List
            </Typography>
            <Stack direction="row" spacing="8px">
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<AiFillFilePdf color="#AD0B00" />}
                    onClick={props.printPDF}
                >
                    Export as PDF
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<TiDelete size={24} />}
                    onClick={props.clearAll}
                >
                    Clear All
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<MdAdd />} //imported icon from the internet
                    onClick={props.handleOpen}
                >
                    Add New Item
                </Button>
            </Stack>
        </Stack>
    );
}

export default ActionBar;
