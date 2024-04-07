// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-loading-skeleton/dist/skeleton.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast, ToastContainer } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
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
import { useApi } from '../../../redux/api-calls';
import JiraProjectsTableRow from '../jira-projects-table-row';
import JiraProjectsTableHead from '../jira-projects-table-head';
import JiraProjectsTableToolbar from '../jira-projects-table-toolbar';

// ----------------------------------------------------------------------

export default function JiraProjectsPage() {
  const api = useApi();
  // const { files } = useContext(AppContext);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const jiraProjects = useSelector((state) => state.jiraProjects);
  const files = useSelector((state) => state.files);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(``);
  useEffect(() => {
    const funct = async () => {
      setLoading(true);
      console.log(query, "Query for project's list");
      await api.fetchFileDB();
      if (query.length > 0) {
        const success = await api.fetchJiraProjects(query);
        if (success) {
          setLoading(false);
        }
      }
      // setLoading(false);
    };
    funct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    setQuery(`?maxResults=${rowsPerPage}&query=${filterName}&startAt=${page * rowsPerPage}`);
  }, [rowsPerPage, filterName, page]);

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
      const newSelecteds = jiraProjects.values.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (value) => {
    setPage(0);

    setFilterName(value);
  };

  const handleProjectChange = async (fileId, projectId) => {
    console.log(fileId, projectId);
    const updated = await api.setProjectId(fileId, projectId);
    if (updated.updated) {
      toast(`Jira project is now bind with Project plan instance `, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        type: 'success',
      });
      return;
    }
    toast(`Something went wrong, we are inquiring`, {
      position: 'top-right',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'light',
      type: 'error',
    });
  };

  const notFound = !jiraProjects.values.length && !!filterName;
  return (
    <Container>
      <ToastContainer />

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box display="flex" alignItems="center" flexDirection="row">
          <Iconify icon="mdi:jira" sx={{ color: 'primary.main', marginRight: 1 }} width={40} />
          <Typography variant="h4">Jira Projects</Typography>
        </Box>
      </Stack>

      <Card>
        <JiraProjectsTableToolbar filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <SkeletonTheme
              // baseColor="#F4F6F8"
              // highlightColor="#F4F6F8"
              // borderRadius="0.5rem"
              duration={1}
            >
              <Table sx={{ minWidth: 800 }}>
                <JiraProjectsTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={jiraProjects.values.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: '', label: '', width: '10%' },
                    { id: 'name', label: 'Name', width: '40%' },
                    { id: 'key', label: 'Key', align: 'center', width: '20%' },
                    { id: 'msProjectId', label: 'Project Bind', width: '25%' },
                    { id: '', label: '', width: '5' },
                  ]}
                />
                {!loading ? (
                  <>
                    {jiraProjects.values.length > 0 ? (
                      <TableBody>
                        {jiraProjects.values.map((row) => (
                          <JiraProjectsTableRow
                            key={row.id}
                            id={row.id}
                            name={row.name}
                            avatarUrl={row.avatarUrls['24x24']}
                            jKey={row.key}
                            files={files}
                            handleProjectChange={handleProjectChange}
                          />
                        ))}

                        {/* <TableEmptyRows */}
                        {/*  height={77} */}
                        {/*  emptyRows={emptyRows(page, rowsPerPage, jiraProjects..length)} */}
                        {/* /> */}

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
          count={jiraProjects.total}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
