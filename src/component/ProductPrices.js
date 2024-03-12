import { useState } from 'react';
import {
  Divider,
  Box,
  Button,
  TextField
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PricesBuilder from './PricesBuilder';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid'

// icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];

export default function ProductPrices({ particularData }) {
  const [rowModesModel, setRowModesModel] = useState({});
  const [rows, setRows] = useState(particularData)

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const [columns, setColumns] = useState([
    {
      field: 'parent',
      headerName: 'Parent',
      width: 120,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 240,
    },
    {
      field: 'price',
      headerName: 'Price',
      minWidth: 80,
      editable: true,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      field: 'unit',
      headerName: 'Unit',
      width: 180,
      align: 'center'
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 240,
      color: 'red'
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
            // onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              // onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />
        ];
      },
    },

    // {
    //   field: 'actions',
    //   headerName: 'Action',
    //   minWidth: 160,
    //   align: 'center',
    // }
  ])

  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%' }}>
      <Grid container spacing={4} alignItems='stretch'>
        <Grid lg={12} >
          <h1 style={{ color: '#000' }}>Particulars</h1>
          <Divider sx={{ borderBottomWidth: 3 }} />
        </Grid>
        <Grid lg={12} sx={{}}>
          <Box sx={{ boxShadow: 1, borderRadius: 3, backgroundColor: '#fff', width: 1 }} >
            {/* <PricesBuilder particularData={particularData} /> */}
            <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between', p: 2, height: 80 }}>
              <TextField
                label="Search"
                variant="outlined"
                // value={searchQuery}
                // onChange={handleSearchChange}
                sx={{ maxWidth: 400 }}
              />
              <Button variant="contained" color="primary" sx={{ maxWidth: 210 }} >
                Add Data
              </Button>
            </Box>
            <Box >
              <DataGrid
                rows={particularData}
                columns={columns}
                editMode='row'
                rowModesModel={rowModesModel}
                onRowEditStop={handleRowEditStop}
                pageSizeOptions={[25, 50, 100]}
                disableRowSelectionOnClick
                sx={{ border: 'none', p: 2 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
};
