import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useEffect } from "react"
import { cleanObject,useDebounce,useDocumentTitle,useMount } from "../../utils"
import * as qs from "qs"
import { useHttp } from "../../utils/http"
import styled from "@emotion/styled"
import {Button, Typography } from "antd"
import { useAsync } from "../../utils/use-async"
import { Project } from "./list"
import { useUsers } from "../../utils/user"
import { Helmet } from "react-helmet"
import { useUrlQueryParam } from "../../utils/url"
import { useProjectSearchParams } from "./util"
import { useProjects } from "../../utils/project"
import { useDispatch } from "react-redux"
import {store} from "../../store"
import { projectListActions } from "./project-list.slice"
import {ButtonNoPadding ,Row } from "../../components/lib"
const apiUrl=process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  useDocumentTitle("项目列表",false)
const [param,setParam]=useProjectSearchParams()
const { isLoading, error, data: list, retry } = useProjects(
    useDebounce(param, 200)
  );
const {data:users}=useUsers()
const dispatch = useDispatch();
  console.log(store.getState());
 
    return<Container>
         <Row between={true}>
        <h1>项目列表</h1>
       <ButtonNoPadding
          onClick={() => dispatch(projectListActions.openProjectModal())}
          type={"link"}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
        
        <SearchPanel users={users||[]} param={param} setParam={setParam}/>
       {error?<Typography.Text type={'danger'}>
        {error.message}
        </Typography.Text>:null}      
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
}
ProjectListScreen.whyDidYouRender=true;

const Container=styled.div`
padding:3.2rem;
`