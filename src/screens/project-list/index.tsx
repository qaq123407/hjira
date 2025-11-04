import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useEffect } from "react"
import { useDebounce,useDocumentTitle } from "../../utils"
import * as qs from "qs"
import { useHttp } from "../../utils/http"
import styled from "@emotion/styled"
import {Button, Typography } from "antd"
import { useAsync } from "../../utils/use-async"
import { Project } from "../../types/project"
import { useUsers } from "../../utils/user"
import { Helmet } from "react-helmet"
import { useUrlQueryParam } from "../../utils/url"
import { useProjectSearchParams , useProjectModal } from "./util"
import { useProjects } from "../../utils/project"
import { useDispatch } from "react-redux"
import {store} from "../../store"
import { projectListActions } from "./project-list.slice"
import {ButtonNoPadding ,Row ,ErrorBox} from "../../components/lib"


const apiUrl=process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  useDocumentTitle("项目列表",false)
  const { open } = useProjectModal();
const [param,setParam]=useProjectSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
const {data:users}=useUsers()
 
    return<Container>
         <Row between={true}>
        <h1>项目列表</h1>
       <ButtonNoPadding
          onClick={open}
          type={"link"}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
        
        <SearchPanel users={users||[]} param={param} setParam={setParam}/>
        <ErrorBox error={error}/>
        <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
}
ProjectListScreen.whyDidYouRender=true;

const Container=styled.div`
padding:3.2rem;
`