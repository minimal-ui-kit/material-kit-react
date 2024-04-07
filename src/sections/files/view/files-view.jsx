// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-loading-skeleton/dist/skeleton.css';
import { useRef, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast, ToastContainer } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import FileTableRow from '../file-table-row';
import FileTableHead from '../file-table-head';
import TableEmptyRows from '../table-empty-rows';
import { useApi } from '../../../redux/api-calls';
import FileTableToolbar from '../file-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import FileDeleteModal from '../../../components/file-delete-modal';
import FileUploadModal from '../../../components/file-upload-modal';

// ----------------------------------------------------------------------

export default function FilePage() {
  const api = useApi();
  // const { files } = useContext(AppContext);
  const files = useSelector((state) => state.files);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const funct = async () => {
      const success = await api.fetchFileDB();
      if (success) {
        setLoading(false);
      }
    };
    funct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [fileUploadLoader, setFileUploadLoader] = useState(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  // fetchFiles();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = files.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: files,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const handleDeleteClick = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const handleDeleteRequest = async () => {
    const success = await api.deleteFile(deleteId);
    if (success) {
      console.log('File Deleted');
      setDeleteModal(false);

      toast('File Deleted', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        type: 'success',
      });
    } else {
      toast('Something Went Wrong', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        type: 'error',
      });
    }
  };
  const handleFileChange = async (event) => {
    setFileUploadLoader(true);
    console.log(event.target.files);
    const fileObj = event.target.files && event.target.files[0];
    console.log(fileObj);
    event.target.value = null;

    const formData = new FormData();
    formData.append('file', fileObj);
    const upload = await api.uploadFile(formData);
    setFileUploadLoader(false);
    if (upload === true) {
      toast(`File ${fileObj.name} has been uploaded successfully`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        type: 'success',
      });
      // setFiles([...upload.files]);
    } else {
      toast(
        <div>
          {upload.message}
          <br /> {upload.error}
        </div>,
        {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'light',
          type: 'error',
        }
      );
    }
  };
  let updateFileId = null;
  const handleUpdateFileChange = async (event) => {
    setFileUploadLoader(true);
    console.log(event.target.files);
    const fileObj = event.target.files && event.target.files[0];
    console.log(fileObj);
    event.target.value = null;

    const formData = new FormData();
    formData.append('file', fileObj);
    const upload = await api.updateFile(updateFileId, formData);
    setFileUploadLoader(false);
    if (upload === true) {
      toast(`File ${fileObj.name} has been updated successfully`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        type: 'success',
      });
      // setFiles([...upload.files]);
    } else {
      toast(
        <div>
          {upload.message}
          <br /> {upload.error}
        </div>,
        {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'light',
          type: 'error',
        }
      );
    }
  };

  const notFound = !dataFiltered.length && !!filterName;
  const uploadRef = useRef();
  const updateRef = useRef();
  return (
    <Container>
      <ToastContainer />
      <input
        id="upload"
        ref={uploadRef}
        type="file"
        accept="text/xml"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <input
        id="update"
        ref={updateRef}
        type="file"
        accept="text/xml"
        onChange={handleUpdateFileChange}
        style={{ display: 'none' }}
      />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box display="flex" alignItems="center" flexDirection="row">
          <Iconify
            icon="file-icons:microsoft-project"
            sx={{ color: 'green', marginRight: 1 }}
            width={40}
          />
          <Typography variant="h4">Projects</Typography>
        </Box>

        <Button
          variant="contained"
          color="inherit"
          onClick={() => uploadRef.current.click()}
          startIcon={<Iconify icon="bi:filetype-xml" />}
        >
          Upload XML File
        </Button>
      </Stack>

      <Card>
        <FileTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <SkeletonTheme
              // baseColor="#F4F6F8"
              // highlightColor="#F4F6F8"
              // borderRadius="0.5rem"
              duration={1}
            >
              <Table sx={{ minWidth: 800 }}>
                <FileTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={files.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name', label: 'Name' },
                    { id: 'startDate', label: 'Start Date' },
                    { id: 'endDate', label: 'End Date' },
                    { id: 'totalRecordsUploaded', label: 'Records Uploaded', align: 'center' },
                    { id: 'jiraUpload', label: 'JIRA Upload Status', align: 'center' },
                    { id: 'jiraName', label: 'User Name', align: 'center' },
                    { id: '', label: '' },
                  ]}
                />
                {!loading ? (
                  <>
                    {dataFiltered.length > 0 ? (
                      <TableBody>
                        {dataFiltered
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <FileTableRow
                              key={row._id}
                              id={row._id}
                              name={row.name}
                              startDate={row.startDate}
                              endDate={row.endDate}
                              uploadedRecords={row.totalRecordsUploaded}
                              jiraUpload={row.jiraUpload}
                              username={row.jiraName}
                              jiraProfile={row.jiraProfile}
                              selected={selected.indexOf(row.name) !== -1}
                              handleClick={(event) => handleClick(event, row.name)}
                              handleDeleteClick={() => handleDeleteClick(row._id)}
                              handleUpdateUpload={(id) => {
                                updateFileId = id;
                                updateRef.current.click();
                              }}
                            />
                          ))}

                        <TableEmptyRows
                          height={77}
                          emptyRows={emptyRows(page, rowsPerPage, files.length)}
                        />

                        {notFound && <TableNoData query={filterName} />}
                      </TableBody>
                    ) : (
                      <TableNoData query={filterName} />
                    )}{' '}
                  </>
                ) : (
                  <TableBody>
                    {Array.from(Array(rowsPerPage).keys()).map((i, index) => (
                      <TableRow key={i + index}>
                        <TableCell>
                          <Skeleton height={30} />
                        </TableCell>
                        <TableCell>
                          <Skeleton height={30} />
                        </TableCell>
                        <TableCell>
                          <Skeleton height={30} />
                        </TableCell>
                        <TableCell>
                          <Skeleton height={30} />
                        </TableCell>
                        <TableCell>
                          <Skeleton height={30} />
                        </TableCell>
                        <TableCell>
                          <Skeleton height={30} />
                        </TableCell>
                        <TableCell>
                          <Skeleton height={30} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </SkeletonTheme>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={files.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <FileDeleteModal
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        deleteFile={handleDeleteRequest}
      />
      <FileUploadModal open={fileUploadLoader} />
    </Container>
  );
}
