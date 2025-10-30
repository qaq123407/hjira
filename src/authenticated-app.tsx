import React,{useState} from "react";
import { ProjectListScreen } from "./screens/project-list";
import { logout } from "./auth-provider";
import { useAuth } from "./screens/context/auth-context";
import styled from "@emotion/styled";
import {ButtonNoPadding ,Row } from "./components/lib";
import {ReactComponent as SoftwareLogo} from './assets/software-logo.svg'
import Dropdown from "antd/es/dropdown/dropdown";
import { Button, Menu } from "antd";
import { Navigate,Route,Routes } from "react-router";
import { ProjectScreen } from "./screens/project";
import { BrowserRouter as Router } from "react-router-dom";
import { resetRoute } from "./utils";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";
export const AuthenticatedApp =()=>{
     const [projectModalOpen, setProjectModalOpen] = useState(false);
    return <div>
        <Container>
       <PageHeader setProjectModalOpen={setProjectModalOpen} />
          <Main>
              <Router>
                  <Routes>
                    <Route
              path={"/projects"}
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
              }
            />
                     <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>}></Route>
                 <Navigate to={'/projects'}></Navigate>
                  </Routes>
                  
              </Router>
             
          </Main>
          <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
        </Container>
    </div>
}
const PageHeader = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
    return    <Header between={true}>
             <HeaderLeft gap={true}>
                <ButtonNoPadding type={'link'} onClick={resetRoute}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38.132,255)'} />
                </ButtonNoPadding>
                <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
                 <span>用户</span> 
                
             </HeaderLeft>
             <HeaderRight>
                <User/>
             </HeaderRight>
          </Header>
}
const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};


const Container=styled.div`
display:grid;
grid-template-rows:6rem 1fr 6rem;
grid-template-columns:20rem 1fr 20rem;
grid-template-areas:
"header header header"
"nav main aside"
"footer footer footer";
height:100vh;

`;
const Header = styled(Row)`
  grid-area: header;
    padding: 3.2rem;
    width: 100%;
    box-sizing: border-box;
    /* 强制 space-between */
    justify-content: space-between !important;
    box-shadow:0 0 5px 0 rgba(0,0,0,0.1);
    z-index:1`
;
const HeaderLeft=styled(Row)`
`;
const HeaderRight=styled.div`

`;


const Main=styled.main`grid-area:main`
const HeaderItem=styled.h3`margin-right:3rem;`