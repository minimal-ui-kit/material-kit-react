import _ from 'lodash';

import { FinanceSheet } from './etsy/etsy-utils.ts';

export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a, b, orderBy) {
  if (_.get(a, orderBy) === null) {
    return 1;
  }
  if (_.get(b, orderBy) === null) {
    return -1;
  }
  if (_.get(b, orderBy) < _.get(a, orderBy)) {
    return -1;
  }
  if (_.get(b, orderBy) > _.get(a, orderBy)) {
    return 1;
  }
  return 0;
}
export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applyFilter({ inputData, comparator, filterName, statuses }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user: FinanceSheet) =>
        user.shopReceipt?.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        user.shopReceipt?.receipt_id.toString().indexOf(filterName.toLowerCase()) !== -1,
    );
  }

  // filter by status
  if (statuses.length) {
    inputData = inputData.filter((user: FinanceSheet) => {
      console.log(user);
      return statuses.includes(user.shopReceipt?.status?.toLowerCase());
    });
  }

  return inputData;
}
