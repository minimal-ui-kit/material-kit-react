import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import SimpleBar from 'simplebar-react';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Diff() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  
  const myscrollLeft = () => {
    scroller.scrollTo('inside_id', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: "containerLeft"
    });
  };
  const myscrollRight = () => {
    scroller.scrollTo('secondInsideContainer', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: "containerElement"
    });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        
{
//        HEADER
}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={myscrollLeft}>
            New User
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={myscrollRight}>
            New User
          </Button>
      </Stack>
{
//        Working
}
    <ScrollSync>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <ScrollSyncPane>
          <div id="containerLeft" style={{overflow: 'auto', height: '200px'}}>
                <h1>Left Pane Content</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
                  dolorum
                  est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
                  possimus quasi rerum sed soluta veritatis.</p>
                <p>sadf</p>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <Element name="inside_id"/>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
          </div>
        </ScrollSyncPane>
          <div style={{width:200}} />
        <ScrollSyncPane>
          <div id="containerElement" style={{overflow: 'auto', height: '200px'}}>
                <h1>Left Pane Content</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
                  dolorum
                  est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
                  possimus quasi rerum sed soluta veritatis.</p>
                <p>sadf</p>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <Element name="secondInsideContainer"/>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
          </div>
        </ScrollSyncPane>
      </Stack>
    </ScrollSync> 
          
          
          
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
