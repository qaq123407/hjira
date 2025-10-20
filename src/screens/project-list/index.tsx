import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useEffect, useState } from "react"
import { cleanObject,useDebounce,useMount } from "../../utils"
import * as qs from "qs"
import { useHttp } from "../../utils/http"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useAsync } from "../../utils/use-async"
import { Project } from "./list"
import { useProject } from "../../utils/project"
import { useUsers } from "../../utils/user"
const apiUrl=process.env.REACT_APP_API_URL
export const ProjectListScreen =()=>{
    const [param,setParam]=useState({
    name:'',
    personId:''
})
const debouncedParam=useDebounce(param,200)
const {isLoading,error,data:list}=useProject(debouncedParam)
const {data:users}=useUsers()
    return<Container>
        <h1>项目列表</h1>
        <SearchPanel users={users||[]} param={param} setParam={setParam}/>
       {error?<Typography.Text type={'danger'}>
        {error.message}
        </Typography.Text>:null}      
      <List users={users||[]} dataSource={list||[]} loading={isLoading}/>
    </Container>
}
const Container=styled.div`
padding:3.2rem;
`