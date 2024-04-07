// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-loading-skeleton/dist/skeleton.css';
import { toast, ToastContainer } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import WbsTableRow from '../wbs-table-row';
import WbsTableHead from '../wbs-table-head';
import Iconify from '../../../components/iconify';
import { useRouter } from '../../../routes/hooks';
import { useApi } from '../../../redux/api-calls';
import WbsTableToolbar from '../wbs-table-toolbar';
import { applyFilter, getComparator } from '../utils';
import WbsUploadModal from '../../../components/wbs-upload-modal';
import TicketsUploadModal from '../../../components/tickets-upload-modal';

// ----------------------------------------------------------------------

export default function WBSPage() {
  // const { files } = useContext(AppContext);
  const { fileId } = useParams();
  // const [wbs, setWBS] = useState([]);
  const wbs = useSelector((state) => state.wbs);
  const file = useSelector((state) => state.files.find((item) => item._id === fileId));
  const resources = useSelector((state) => state.resources);
  const api = useApi();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const funct = async () => {
      const success = await api.fetchWBSDb(fileId);
      if (file) {
        await api.fetchIssueTypes(file.jiraProject);
        await api.fetchResources();
      } else {
        router.push('/files');
      }
      // setWBS([...data]);
      if (success) {
        setLoading(false);
      }
    };
    funct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  const router = useRouter();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('wbs');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(20);

  const [wbsFilter, setWbsFilter] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);
  const [selectedWBS, setSelectedWBS] = useState([]);
  const [uploadModalProgress, setUploadModalProgress] = useState(false);
  const [uploadText, setUploadText] = useState('');
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  // fetchFiles();
  const createWBSToUpload = (data) => {
    const wbsData = [];
    data.forEach((item) => {
      if (item.resource.length < 1) {
        wbsData.push({ ...item });
      } else {
        item.resource.forEach((res) => {
          wbsData.push({ ...item, resource: res });
        });
      }
    });
    return [...wbsData];
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      console.log('Selected');
      const newSelecteds = dataFiltered.map((n) => n._id);
      setSelected([...newSelecteds]);
      setSelectedWBS(
        createWBSToUpload(
          dataFiltered.filter(
            (item) => item._id === newSelecteds.find((element) => element === item._id)
          )
        )
      );
      return;
    }
    console.log('Not Selected');
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
    console.log(newSelected, 'Selected');
    setSelected(newSelected);
    setSelectedWBS(
      createWBSToUpload(
        dataFiltered.filter(
          (item) => item._id === newSelected.find((element) => element === item._id)
        )
      )
    );
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

  const handleWbsFilter = (wbsItems) => {
    setPage(0);
    setWbsFilter([...wbsItems]);
  };

  const dataFiltered = applyFilter({
    inputData: wbs,
    comparator: getComparator(order, orderBy),
    filterName,
    wbsFilter,
  });
  const handleClearFilter = () => {
    setFilterName('');
    setWbsFilter([]);
  };

  const wbsMains = wbs.filter(
    (item) =>
      item.wbsItem === item.wbsItem.split('.')[0] ||
      item.wbsItem === `${item.wbsItem.split('.')[0]}.${item.wbsItem.split('.')[1]}` ||
      item.wbsItem ===
        `${item.wbsItem.split('.')[0]}.${item.wbsItem.split('.')[1]}.${item.wbsItem.split('.')[2]}`
  );

  const notFound = !dataFiltered.length && !!filterName;
  const onUploadModalClick = () => {
    setUploadModal(true);
    // setSelectedWBS()
  };
  const baseURLLocalhost = import.meta.env.VITE_BASE_URL;
  const bearerToken = localStorage.getItem('token');
  const handleUpload = async (data) => {
    console.log(data);
    const token = `Bearer ${bearerToken}`;
    setUploadModal(false);
    setUploadModalProgress(true);
    setUploadText(`Tasks created: 0/${data.tickets.length} `);
    try {
      const response = await fetch(`${baseURLLocalhost}/jira-cruds/create-tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(data),
      });
      // const response = await axios.post(`${baseURLLocalhost}/jira-cruds/create-tickets`, data, {
      //   responseType: 'stream',
      // });
      if (!response.ok) {
        console.log(response.status);
        toast(`Something went wrong during upload`, {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'light',
          type: 'error',
        });
      }
      const reader = response.body.getReader();
      const handleChunk = async () => {
        const { done, value } = await reader.read();
        if (done) {
          console.log('Tickets Uploaded');
          setUploadText('Tickets Uploaded');
          await api.fetchWBSDb(fileId);
          toast(`All Tickets Uploaded Successfully`, {
            position: 'top-right',
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'light',
            type: 'success',
          });
          setTimeout(() => {
            setUploadModalProgress(false);
          }, 1000);
          // break;
        } else {
          console.log(new TextDecoder().decode(value));
          setUploadText(new TextDecoder().decode(value));
          await handleChunk();
        }
      };
      await handleChunk();
    } catch (e) {
      console.log(e);
      toast(`Something went wrong during upload`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        type: 'error',
      });
      setUploadModalProgress(false);
    }
  };
  return (
    <Container>
      <ToastContainer />

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Tooltip title="Go back to Projects">
          <IconButton onClick={() => router.push('/files')}>
            <Iconify icon="ic:baseline-arrow-back-ios-new" />
          </IconButton>
        </Tooltip>
        <Typography variant="h4">
          {!loading ? wbs[0].file.name : <Skeleton width={250} height={40} />}
        </Typography>

        {/* <Button */}
        {/*  variant="contained" */}
        {/*  color="inherit" */}
        {/*  startIcon={<Iconify icon="material-symbols:upload-file" />} */}
        {/* > */}
        {/*  Upload File */}
        {/* </Button> */}
      </Stack>

      <Card>
        <WbsTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          wbsData={wbsMains}
          onWbsFilteredData={handleWbsFilter}
          wbsFilteredData={wbsFilter}
          onFilterClear={handleClearFilter}
          onUploadClick={onUploadModalClick}
          disableUpload={!file?.fieldDetails}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <SkeletonTheme duration={1}>
              <Table sx={{ minWidth: 800 }}>
                <WbsTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={dataFiltered.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'wbsItem', label: 'No.' },
                    { id: 'name', label: 'Name', width: '30%' },
                    { id: 'startDate', label: 'Start Date' },
                    { id: 'endDate', label: 'End Date' },
                    { id: 'estimate', label: 'Estimate', align: 'center' },
                    { id: 'resource', label: 'Resource', align: 'center' },
                    { id: 'uploaded', label: 'JIRA Link', align: 'center' },
                  ]}
                />
                {!loading ? (
                  <TableBody>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <WbsTableRow
                          key={row._id}
                          name={row.name}
                          wbsIndent={row.wbsItem}
                          wbsNext={
                            dataFiltered.length === index + 1
                              ? dataFiltered[index].wbsItem
                              : dataFiltered[index + 1].wbsItem
                          }
                          jiraIdentifier={{
                            key: row.jiraIdentifier,
                            icon: row.taskTypeLogo,
                            url: row.jiraURL,
                          }}
                          startDate={row.startDate}
                          endDate={row.endDate}
                          estimate={row.estimate}
                          uploaded={row.uploaded}
                          resource={row.resource}
                          selected={selected.indexOf(row._id) !== -1}
                          handleClick={(event) => handleClick(event, row._id)}
                        />
                      ))}

                    {/* <TableEmptyRows */}
                    {/*  height={77} */}
                    {/*  emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)} */}
                    {/* /> */}

                    {notFound && <TableNoData query={filterName} />}
                  </TableBody>
                ) : (
                  <TableBody>
                    {Array.from(Array(rowsPerPage).keys()).map(() => (
                      <TableRow>
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
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <WbsUploadModal
        resources={resources}
        wbs={selectedWBS}
        open={uploadModal}
        handleClose={() => setUploadModal(false)}
        domHeight={window.innerHeight}
        handleUpload={handleUpload}
        fileDetails={file?.fieldDetails}
      />
      <TicketsUploadModal open={uploadModalProgress} text={uploadText} />
    </Container>
  );
}
