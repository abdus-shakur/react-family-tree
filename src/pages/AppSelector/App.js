import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import AppCard from './AppCard';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import { useNavigate } from 'react-router-dom';

const applications = [
  { name: 'Login Page', description: 'Login Page for Family Tree Application',url:'/login-page' },
  { name: 'Family Tree Application', description: 'Family Tree Application with all modules' ,url:'/family-tree-app'},
  { name: 'Descendant Chart with D3 js', description: 'To Determine data structure and the way of representings peoples' ,url:'/descendant-chart'},
  // Add more applications as needed
];

const App = () => {
  const navigate = useNavigate();
  function navToUrl(url){
    console.log(url)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Container sx={{marginTop:'4rem'}} >
        <Grid container spacing={4}>
          {applications.map((app, index) => (
            <Grid  onClick={()=>navigate(app.url)} item key={index} xs={12} sm={6} md={4}>
              <AppCard  name={app.name} description={app.description} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
