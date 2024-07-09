// component
import SvgColor from '../../../components/svg-color';


// const icon = (name) => <SvgColor src={`/assets/icons/${name}.png`} sx={{ width: 1, height: 1 }} />;
const icon = (name) => <img src={`/assets/icons2/${name}.png`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'étudiante',
    path: '/dashboard/home',
    icon: icon('student'),
    // icon: icon('dashboard'),
  },
  // {
  //   title: 'student',
  //   path: '/dashboard/students',
  //   icon: icon('student'),
  // },
  // {
  //   title: 'teacher',
  //   path: '/dashboard/teachers',
  //   icon: icon('teacher'),
  // },

  {
    title: 'rapports',
    path: '/dashboard/reports',
    icon: icon('report'),
  },
  {
    title: 'paramètres',
     path: '/dashboard/settings',
   
    icon: icon('settings'),
  },
  {
    title: 'Se déconnecter',
     path: '/logout',
    //path: '#',
    icon: icon('logout'),
  },
];

export default navConfig;
