import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Skeleton from 'react-loading-skeleton';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-loading-skeleton/dist/skeleton.css';
import { toast, ToastContainer } from 'react-toastify';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import { useApi } from '../../../redux/api-calls';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import EmailSelectModal from '../../../components/email-select-modal';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true);

  const resources = useSelector((state) => state.resources);
  const [changeEmailModal, setChangeEmailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [emailVerLoading, setEmailVerLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [syncButtonLoading, setSyncButtonLoading] = useState(false);
  const api = useApi();

  useEffect(() => {
    const funct = async () => {
      await api.fetchResources();
      setTimeout(() => {
        setLoading(false);
      }, [500]);
    };
    funct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
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
    inputData: resources,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleOpenModal = (userId) => {
    console.log(userId, 'ID');
    const user = resources.find((item) => item._id === userId);
    console.log(user, 'User');
    setSelectedUser(user);
    setChangeEmailModal(true);
  };

  const handleJiraCheck = async (email) => {
    setEmailVerLoading(true);
    const verify = await api.verifyEmail(email);
    setEmailVerLoading(false);
    if (verify) {
      toast(`User with the email: ${email} exists`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        type: 'success',
      });
      setEmailVerified(true);
      return;
    }
    toast(`Email: ${email} does not exist on Jira`, {
      position: 'top-right',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'light',
      type: 'error',
    });
  };
  const syncWithJira = async () => {
    setEmailVerLoading(true);
    const syncUser = await api.syncUser(selectedUser);
    if (syncUser) {
      await api.fetchResources();
      toast(`User is synced now with JIRA`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        type: 'success',
      });
    } else {
      toast(`Couldn't sync, try again`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        type: 'error',
      });
    }
    setEmailVerLoading(false);
    setChangeEmailModal(false);
  };
  const syncAll = async () => {
    setSyncButtonLoading(true);
    const syncAllUsers = await api.syncJiraUsers();
    if (syncAllUsers.synced) {
      await api.fetchResources();
      toast(`Users synced with Jira: ${syncAllUsers.count}`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        type: 'success',
      });
    } else {
      toast(`Couldn't sync, try again`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        type: 'error',
      });
    }
    setSyncButtonLoading(false);
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <ToastContainer />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <LoadingButton
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="material-symbols:sync" />}
          loading={syncButtonLoading}
          onClick={syncAll}
        >
          Sync Users with Jira
        </LoadingButton>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  // { id: '' },
                  { id: 'name', label: 'Name', align: 'left', width: '60%' },
                  // { id: 'email', label: 'Email' },
                  {
                    id: 'jiraIdentifier',
                    label: 'Is Synced with Jira',
                    align: 'center',
                    width: '20%',
                  },
                  { id: '' },
                ]}
              />
              {!loading ? (
                <>
                  {resources.length > 0 ? (
                    <TableBody>
                      {dataFiltered
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <UserTableRow
                            key={row._id}
                            name={row.name}
                            id={row._id}
                            handleJiraVerification={(id) => handleOpenModal(id)}
                            avatarUrl={row.avatarUrl}
                            isVerified={row.jiraIdentifier}
                            selected={selected.indexOf(row.name) !== -1}
                            handleClick={(event) => handleClick(event, row.name)}
                          />
                        ))}

                      <TableEmptyRows
                        height={77}
                        emptyRows={emptyRows(page, rowsPerPage, resources.length)}
                      />

                      {notFound && <TableNoData query={filterName} />}
                    </TableBody>
                  ) : (
                    <TableNoData query={filterName} />
                  )}
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
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={resources.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <EmailSelectModal
        open={changeEmailModal}
        handleClose={() => setChangeEmailModal(false)}
        loading={emailVerLoading}
        existingEmail={selectedUser?.email}
        handleEmailChange={(email) => {
          if (emailVerified) {
            setEmailVerified(false);
          }
          setSelectedUser({ ...selectedUser, email });
        }}
        checkEmail={(email) => {
          handleJiraCheck(email);
        }}
        emailVerified={emailVerified}
        syncWithJira={syncWithJira}
      />
    </Container>
  );
}
