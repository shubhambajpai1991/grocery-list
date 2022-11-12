import { Box } from '@mui/material';
import './style.css';
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ui-components
import ActionBar from './components/ActionBar';
import GroceryList from './components/GroceryList';
import GroceryForm from './components/GroceryForm';

function App() {
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState<any[]>([]);
    const [selectedItem, setSelectedItem] = React.useState<any>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    const onSubmission = (value: any) => {
        setItems([...items, value]);
        handleClose();
    };

    const onUpdate = (value: any) => {
        const updatedList = items.map((item) => {
            if (item.id === value.id) {
                return { ...item, name: value.name, quantity: value.quantity };
            } else {
                return item;
            }
        });

        setItems(updatedList);
        handleClose();
    };

    const onDelete = (id: string) => {
        const filteredList = items.filter((item) => item.id !== id);

        setItems(filteredList);
    };

    const onEdit = (row: any) => {
        setSelectedItem(row);
    };

    React.useEffect(() => {
        if (selectedItem === null) {
            handleClose();
        } else {
            handleOpen();
        }
    }, [selectedItem]);

    React.useEffect(() => {
        // JSON.stringify => converts any js value to string
        // JSON.parse => converts string its real form

        if (localStorage.getItem('itemsBackup')) {
            let savedItems: any = JSON.parse(localStorage.getItem('itemsBackup') || '');

            if (Array.isArray(savedItems) && savedItems.length > 0) {
                setItems(savedItems);
            }
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('itemsBackup', JSON.stringify(items));
    }, [items]);

    const printPDF = () => {
        const doc = new jsPDF();

        autoTable(doc, {
            head: [['S.No.', 'Name', 'Quantity']],
            body: items.map((item, index) => {
                return [index + 1, item.name, item.quantity];
            }),
            theme: 'striped',
        });

        doc.save('grocery-list.pdf');
    };

    const clearAll = () => {
        setItems([]);
    };

    return (
        <Box m="30px" sx={{ backgroundColor: '#ffffff' }}>
            <ActionBar handleOpen={handleOpen} printPDF={printPDF} clearAll={clearAll} />
            <GroceryList data={items} handleDelete={onDelete} handleEdit={onEdit} />
            <GroceryForm
                open={open}
                handleClose={handleClose}
                handleSubmit={onSubmission}
                selectedItem={selectedItem}
                handleUpdate={onUpdate}
            />
        </Box>
    );
}

export default App;

// 1. When we click on "Add new employee" button "handleOpen" function triggers
//    and setOpen turn to true and at the same time setOpen update open -> true.
// 2. We send open current value i.e.true to the form through "props" open ={open}
// 3. Likewise, when we click on close button in the form then "handleClose"
//    function triggers, and setOpen turn to false and at the same time setOpen
//    update open -> false
// 4. We send open current value i.e.false to the form through "props" open ={open}
