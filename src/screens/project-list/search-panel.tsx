import { useEffect, useState } from "react"
import React from "react"
import { Select ,Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import {Form} from "antd";
import { Project } from "../../types/project";
import { UserSelect } from "../../components/user.select";
export interface User{
   id:number;
   name:string;
   email:string;
   title:string;
   organization:string;
   token:string;
}
interface SearchPanelProps{
    users:User[],
    param:Partial<Pick<Project,'name'|'personId'>>
    setParam:(param:SearchPanelProps['param'])=>void;
}
export const SearchPanel =({users,param,setParam}:SearchPanelProps)=>{

    return <Form style={{marginBottom:'2rem'}} layout={"inline"}>
       <Form.Item>
         <Input 
          placeholder={"项目名"}
          type="text" 
          value={param.name} 
          onChange={evt=>setParam({
            ...param,
            name:evt.target.value
         })}/>
         
       </Form.Item>

       <FormItem>
        <UserSelect 
         defaultOptionName={'负责人'}
        value={param.personId} 
        onChange={(value:number|undefined)=>{
       setParam({
        ...param,
        personId:value      
       })
        }}/>
       
       </FormItem>
    </Form>

}