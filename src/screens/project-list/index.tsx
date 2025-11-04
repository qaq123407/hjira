import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useDebounce,useDocumentTitle } from "../../utils"

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
import {ButtonNoPadding ,Row ,ErrorBox,ScreenContainer} from "../../components/lib"


const apiUrl=process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  useDocumentTitle("项目列表",false)
  const { open } = useProjectModal();
const [param,setParam]=useProjectSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
const {data:users}=useUsers()
 
    return<ScreenContainer>
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
    </ScreenContainer>
}
ProjectListScreen.whyDidYouRender=true;

