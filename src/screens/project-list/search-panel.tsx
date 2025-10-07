import { useEffect, useState } from "react"
import React from "react"
import { Select ,Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import {Form} from "antd";
export interface User{
   id:string;
   name:string;
   email:string;
   title:string;
   organization:string;
   token:string;
}
interface SearchPanelProps{
    users:User[],
    param:{
        name:string,
        personId:string,
    },
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
         <Select value={param.personId } onChange={value=>setParam({
        ...param,
        personId:value      
       })}>       
        <Select.Option value=''>负责人</Select.Option>
        {
            users.map(user=><option key={user.id} value={user.id}>{user.name}</option>)
        }
       </Select>
       </FormItem>
    </Form>

}