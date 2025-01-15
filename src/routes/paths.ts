// ----------------------------------------------------------------------

function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

export const paths = {
  auth: {
    login: path(ROOTS.AUTH, '/login'),
    register: path(ROOTS.AUTH, '/register'),
    forgotPassword: path(ROOTS.AUTH, '/forgot-password'),
    verify: path(ROOTS.AUTH, '/verify'),
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    overview: path(ROOTS.DASHBOARD, '/overview'),
    user: path(ROOTS.DASHBOARD, '/user'),
    products: path(ROOTS.DASHBOARD, '/products'),
    blog: path(ROOTS.DASHBOARD, '/blog'),
    partners: {
      root: path(ROOTS.DASHBOARD, '/company'),
      list: path(ROOTS.DASHBOARD, '/company'),
      new: path(ROOTS.DASHBOARD, '/company/new'),
      edit: (id: string) => path(ROOTS.DASHBOARD, `/company/${id}/edit`),
      view: (id: string) => path(ROOTS.DASHBOARD, `/company/${id}`),
    },
  },
} as const; 