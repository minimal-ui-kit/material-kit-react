/* eslint-disable */

import React, { Component } from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
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
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
//
import USERLIST from '../_api_/user';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'ethnicity', label: 'Ethnicity', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'hours', label: 'Time', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: '' }
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
  if (array.length > 0) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
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
  return array;
}

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      order: 'asc',
      selected: [],
      orderBy: 'name',
      filterName: '',
      rowsPerPage: 5,
      ARRAY_TO_USE: []
    };
    this.forceUpdate();
    this.displayData = this.displayData.bind(this);
    this.displayData();
  }

  componentDidUpdate() {
    this.handleChangeRowsPerPage
    //this.render()
  }

  alertName = () => {
    alert(this.state.name);
  };

  handleNameInput = (e) => {
    this.setState({ name: e.target.value });
  };

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({ order: isAsc ? 'desc' : 'asc' });
    this.setState({ orderBy: property });
  };

  handleSelectAllClick = (event) => {
    this.displayData();
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  handleClick = (event, name) => {
    const { selected } = this.state;
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
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  handleFilterByName = (event) => {
    this.setState({ filterName: event.target.value });
  };

  emptyRows = (ARRAY_TO_USE) =>
    this.state.page > 0
      ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - ARRAY_TO_USE.length)
      : 0;

  filteredUsers = (ARRAY_TO_USE) =>
    applySortFilter(
      ARRAY_TO_USE,
      getComparator(this.state.order, this.state.orderBy),
      this.state.filterName
    );

  isUserNotFound = this.state?.filteredUsers?.length === 0;

  displayData = () => {
    USERLIST.then((ARRAY_TO_USE) => {
      console.log('Dude: => ', ARRAY_TO_USE);
      this.setState({ ARRAY_TO_USE: ARRAY_TO_USE });
    });
    this.forceUpdate();
  };


  render() {
    const { page, order, selected, orderBy, filterName, ARRAY_TO_USE, rowsPerPage } = this.state;

    return (
      <Page title="User | GCT">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Users
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/register"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New User
            </Button>
          </Stack>

          <Card>
            <UserListToolbar
              numSelected={selected?.length}
              filterName={filterName}
              onFilterName={this.handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={ARRAY_TO_USE.length}
                    numSelected={selected?.length}
                    onRequestSort={this.handleRequestSort}
                    onSelectAllClick={this.handleSelectAllClick}
                  />

                  <TableBody>
                    {this.filteredUsers(ARRAY_TO_USE)
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const {
                          id,
                          name,
                          company,
                          username,
                          avatarUrl,
                          ethnicity,
                          email,
                          hours,
                          gender,
                          status
                        } = row;
                        const isItemSelected = selected.indexOf(name) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => this.handleClick(event, name)}
                              />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={name} src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{company}</TableCell>
                            <TableCell align="left">{username}</TableCell>
                            <TableCell align="left">
                              <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                                {status}
                              </Label>
                            </TableCell>
                            <TableCell align="left">{ethnicity}</TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{hours}</TableCell>
                            <TableCell align="left">{gender}</TableCell>

                            <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell>
                          </TableRow>
                        );
                      })} {console.log('Inside: => ', ARRAY_TO_USE)}
                    {this.emptyRows(ARRAY_TO_USE) > 0 && (
                      <TableRow style={{ height: 53 * this.emptyRows(ARRAY_TO_USE) }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                 
                  {this.isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={ARRAY_TO_USE.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
    );
  }
}

export default User;
