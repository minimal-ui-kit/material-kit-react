import SvgColor from 'src/components/svg-color';
import { jwtDecode } from 'jwt-decode';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);
let alsorole="";
  if(localStorage.getItem("token")!==null)alsorole=(jwtDecode(localStorage.getItem("token")).role)

let navConfig = [
  {
    title: 'fixtures',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'leaderboard',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Employee Leaderboard',
    path: '/emp',
    icon: icon('ic_user'),
  },
  {
    title: 'results',
    path: '/products',
    icon: icon('ic_cart'),
  },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'adduser',
    path: '/adduser',
    icon: icon('ic_lock'),
  },
  {
    title: 'Send Notifictions',
    path: '/sendnoti',
    icon: icon('ic_lock'),
  },
  
  
];
if(alsorole==="executive"){
  navConfig = [
    {
      title: 'fixtures',
      path: '/',
      icon: icon('ic_analytics'),
    },
    {
      title: 'leaderboard',
      path: '/user',
      icon: icon('ic_user'),
    },
    {
      title: 'Employee Leaderboard',
      path: '/emp',
      icon: icon('ic_user'),
    },
    {
      title: 'results',
      path: '/products',
      icon: icon('ic_cart'),
    },
    // {
    //   title: 'blog',
    //   path: '/blog',
    //   icon: icon('ic_blog'),
    // },
    {
      title: 'login',
      path: '/login',
      icon: icon('ic_lock'),
    },
    
    {
      title: 'Send Notifictions',
      path: '/sendnoti',
      icon: icon('ic_lock'),
    },
    {
      title: 'Logs',
      path: '/logs',
      icon: icon('ic_user'),
    },
    
  ];
}
else if(alsorole==="volunteer"){
  navConfig = [
    
    {
      title: 'leaderboard',
      path: '/user',
      icon: icon('ic_user'),
    },
    {
      title: 'Employee Leaderboard',
      path: '/emp',
      icon: icon('ic_user'),
    },
    {
      title: 'results',
      path: '/products',
      icon: icon('ic_cart'),
    },
    // {
    //   title: 'blog',
    //   path: '/blog',
    //   icon: icon('ic_blog'),
    // },
    {
      title: 'login',
      path: '/login',
      icon: icon('ic_lock'),
    },
    {
      title: 'Logs',
      path: '/logs',
      icon: icon('ic_user'),
    },
    
    
    
  ];
}
else if(alsorole===""){
  navConfig = [
   
    // {
    //   title: 'blog',
    //   path: '/blog',
    //   icon: icon('ic_blog'),
    // },
    {
      title: 'login',
      path: '/login',
      icon: icon('ic_lock'),
    },
   
    
    
  ];
}

export default navConfig;
