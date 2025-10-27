import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useEffect } from "react"
import { cleanObject,useDebounce,useDocumentTitle,useMount } from "../../utils"
import * as qs from "qs"
import { useHttp } from "../../utils/http"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useAsync } from "../../utils/use-async"
import { Project } from "./list"
import { useProject } from "../../utils/project"
import { useUsers } from "../../utils/user"
import { Helmet } from "react-helmet"
import { useUrlQueryParam } from "../../utils/url"
import { useProjectSearchParams } from "./util"
const apiUrl=process.env.REACT_APP_API_URL
export const ProjectListScreen =()=>{
const [param,setParam]=useProjectSearchParams()
const {isLoading,error,data:list}=useProject(useDebounce(param,200))
const {data:users}=useUsers()
 useDocumentTitle("项目列表")
    return<Container>
        
        <h1>项目列表</h1>
        <SearchPanel users={users||[]} param={param} setParam={setParam}/>
       {error?<Typography.Text type={'danger'}>
        {error.message}
        </Typography.Text>:null}      
      <List users={users||[]} dataSource={list||[]} loading={isLoading}/>
    </Container>
}
ProjectListScreen.whyDidYouRender=true;

const Container=styled.div`
padding:3.2rem;
`