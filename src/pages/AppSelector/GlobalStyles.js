import { createGlobalStyle } from 'styled-components';
// import backgroundImage from 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Add your dark, abstract background image here

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: url(https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center center fixed;
    background-size: cover;
  }
`;

export default GlobalStyles;
