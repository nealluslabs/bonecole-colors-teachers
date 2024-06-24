import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SavingsIcon from '@mui/icons-material/Savings';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import { saveThemeColor, saveThemeImage } from 'src/redux/reducers/settings.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <>
          <NavItem key={item.title} item={item}/>
           {
             item?.children?.map((c) => (
              <SubNavItem key={c.title} item={c}/>
            ))
           }
          </>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, iconLabel, info } = item;
  const location = useLocation()
  const dispatch = useDispatch()

  const { themeColor } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);


  useEffect(()=>{

 if(!themeColor){
 dispatch(saveThemeColor( user && user.settings &&  user.settings.themeColor))
 dispatch(saveThemeImage(user && user.settings &&  user.settings.themeImage))
 }


  },[])



  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        color: '#FFFFFF',
        fontSize: '18px',
         bgcolor:title==='reports' &&  (location.pathname === '/dashboard/view-exam-report'||location.pathname === '/dashboard/action-reports' )  &&  (themeColor?themeColor:"#D72A34")|| title==='student' &&  (location.pathname === '/dashboard/edit-student' )  &&  (themeColor?themeColor:"#D72A34"),
        
        '&.active': {
          color: 'grey',
          // bgcolor: '#66000000',
          backgroundColor: path != '#' && ' #D72A34',
          fontWeight: 'fontWeightBold',
          // borderBottomLeftRadius: '26px',
        },
        '&.hover': {
          bgcolor:title==='reports' &&  (location.pathname === '/dashboard/view-exam-report'||location.pathname === '/dashboard/action-reports'  )  &&  (themeColor?themeColor:"#D72A34")|| title==='student' &&  (location.pathname === '/dashboard/edit-student' )  &&  (themeColor?themeColor:"#D72A34"),
        }
      }}
    >
      {/* {iconLabel === 'dashboard' && iconLabel != 'settings' && <StyledNav/>ItemIcon sx={{ fontSize: '20px'}}>{icon && icon}</StyledNavItemIcon>} */}
      {iconLabel != 'msg' && iconLabel != 'settings' && <StyledNavItemIcon sx={{ fontSize: '20px'}}>{icon && icon}</StyledNavItemIcon>}
      {iconLabel === 'msg' && <StyledNavItemIcon sx={{fontSize: '20px'}}><MessageIcon /></StyledNavItemIcon>}
      {/* {iconLabel === 'settings' && <StyledNavItemIcon sx={{fontSize: '20px'}}><SettingsIcon /></StyledNavItemIcon>} */}

      <ListItemText disableTypography primary={title} sx={{color: title.toLowerCase() === 'cooler' && 'white'}}/>
      {/* sx={{ color: '#130C66', fontSize: '18px'}}/> */}
      {/* <ListItemText disableTypography primary={title} sx={{ color: '#FFFFFF', fontSize: '18px'}}/> */}

      {info && info}
    </StyledNavItem>
  );
}
function SubNavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
      <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        color: '#FFFFFF',
        '&.active': {
          color: 'grey',
          backgroundColor: path != '#' && ' #D72A34',
          fontWeight: 'fontWeightBold',
          // borderBottomLeftRadius: '26px',
        },
      }}
    >
      {/* <StyledNavItemIcon sx={{color: '#FFFFFF', fontSize: '20px'}}>{icon && icon}</StyledNavItemIcon> */}
      <StyledNavItemIcon sx={{fontSize: '18px', ml: 5}}>
        {icon === 'LockIcon' && <LockIcon />}
        {icon === 'LockOpen' && <LockOpenIcon />}
        {icon === 'Savings' && <SavingsIcon />}
      </StyledNavItemIcon>

      <ListItemText disableTypography primary={title} sx={{fontSize: '15px'}}/>

      {info && info}
    </StyledNavItem>
  );
}
