import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import FamilyTree from './familyTree/FamilyTree'
import FamilyTreePage from './FamilyTreePage/FamilyTreePage'
import FamilyTreeContent from './FamilyTreePage/FamilyTreeContent'
import App from "./AppSelector/App";
import { Card, Container } from "@mui/material";
import Welcome from "./FamilyTreePage/Welcome";

export default function PageRouter() {

    
    function AppSelection(){
        const navigate = useNavigate()
        return <>
        <div onClick={()=>navigate('/page')}>Select Page</div>
        <div>Select Family Tree content</div>
        <div>Select Chart Test</div>
        <Container>
            <Card onClick={()=>navigate('/page')}>Page</Card>
        </Container>
        </>
    }
  return <BrowserRouter>
    <Routes>
      <Route path="/selection" element={<AppSelection/>}></Route>
      <Route path="/login-page" element={<FamilyTreePage/>}></Route>
      <Route path="/family-tree-app" element={<FamilyTreeContent/>}></Route>
      <Route path="/welcome" element={<Welcome/>}></Route>
      <Route path="/descendant-chart" element={<FamilyTree/>}></Route>
      <Route path="*" element={<App/>}></Route>
    </Routes>
  </BrowserRouter>;
}
