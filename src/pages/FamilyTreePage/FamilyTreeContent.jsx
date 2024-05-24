import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Dashboard from './Dashboard/Dashboard';
import './FamilyTreeContent.scss'
import { AcUnit, AccountTree, DashboardRounded, EscalatorWarning, KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon, Map as MapIcon, People, TravelExplore } from '@mui/icons-material';
import PeopleGraph from './Tree/PeopleGraph';
import D3Graph from './Tree/AncestorView';
import Places from './Places/Places';
import PeopleView from './People/PeopleView';
import ChildrenView from './Descendant/Descendantview';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function FamilyTreeContent() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menus = [
    {label:'Dashboard',icon:<DashboardRounded />},
    {label:'People',icon:<People />},
    {label:'Tree',icon:<AcUnit />},
    {label:'Places',icon:<MapIcon />},
    {label:'Descendants',icon:<KeyboardDoubleArrowDownIcon  />},
    {label:'Ancestors',icon:<KeyboardDoubleArrowUpIcon />},
    ];

  const [selectedMenu,setSelectedMenu] = React.useState(menus[0])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Family Tree
          </Typography>
          <Box sx={{width:'100%',display:'flex',justifyContent:'end'}}>
          <Box sx={{display:'flex',gap:'3'}}>
          <FormControl sx={{width:"15rem",marginTop:'5px'}}>
              <InputLabel id="demo-simple-select-label">Family</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
                // onChange={handleChange}
                sx={{backgroundColor:'white'}}
              >

                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{width:"15rem",marginTop:'5px'}}>
              <InputLabel id="demo-simple-select-label">Person</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
                sx={{backgroundColor:'white'}}
                // onChange={handleChange}
              >

                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            </Box>
            </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menus.map((menu, index) => (
            <ListItem key={menu.label} disablePadding sx={{ display: 'block' }} onClick={()=>setSelectedMenu(menu)}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon 
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box className="main" component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {selectedMenu.label=='Dashboard'?<Dashboard/>:<></>}
        {selectedMenu.label=='Tree'?<PeopleGraph/>:<></>}
        
        {selectedMenu.label=='Places'?<Places/>:<></>}
        {selectedMenu.label=='People'?<PeopleView/>:<></>}
        {selectedMenu.label=='Descendants'?<D3Graph/>:<></>}
        {selectedMenu.label=='Ancestors'?<ChildrenView/>:<></>}
        
      </Box>
    </Box>
  );
}