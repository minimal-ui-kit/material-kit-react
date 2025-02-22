import 
{ _users,
  _id,
  _contact,
} from 'src/_mock';
import type { UserProps } from './user-table-row';

// ----------------------------------------------------------------------

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
} as const;

// ----------------------------------------------------------------------

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

// ----------------------------------------------------------------------

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// ----------------------------------------------------------------------

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (
  a: {
    [key in Key]: number | string;
  },
  b: {
    [key in Key]: number | string;
  }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: UserProps[];
  filterName: string;
  roleType: string;
  comparator: (a: any, b: any) => number;
};

export function applyFilter({ inputData, comparator, filterName, roleType }: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (roleType !== 'all') {
    inputData = inputData.filter((user) => user.roleType === roleType);
  }

  return inputData;
}

// ----------------------------------------------------------------------

export type addStaffProps = {
  name: string,
  number: string,
  role: string, 
  roleType: string
}
export function addStaff({name, number, role, roleType}: addStaffProps) {
    const index = _users.length + 1;
    const newStaff = {
        id: _id(index),
        name,
        contact: number,
        roleType,
        avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
        status: 'active',
        role,
    }
    // store in db
    _users.push(newStaff);
}
