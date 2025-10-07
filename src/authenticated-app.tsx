import React from "react";
import { ProjectListScreen } from "./screens/project-list";
import { logout } from "./auth-provider";
import { useAuth } from "./screens/context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import {ReactComponent as SoftwareLogo} from './assets/software-logo.svg'
import Dropdown from "antd/es/dropdown/dropdown";
import { Menu } from "antd";

export const AuthenticatedApp =()=>{
    const {logout,user}=useAuth()
    console.log(user)
    return <div>
        <Container>
          <Header between={true}>
             <HeaderLeft gap={true}>
                <SoftwareLogo width={'18rem'} color={'rgb(38.132,255)'} />
                <h2>用户</h2>
                <h2>项目</h2>
                
             </HeaderLeft>
             <HeaderRight>
                 <Dropdown overlay={<Menu>
                    <Menu.Item key={"logout"}>
                        <a onClick={logout}>登出</a>
                    </Menu.Item>
                 </Menu>}>
                 <a onClick={e=>e.preventDefault()}>
                    Hi{user?.name}
                 </a>
                 </Dropdown>
             </HeaderRight>
          </Header>
          <Main>
              <ProjectListScreen/>
          </Main>
        </Container>
    </div>
}

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