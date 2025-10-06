import React from "react";
import { ProjectListScreen } from "./screens/project-list";
import { logout } from "./auth-provider";
import { useAuth } from "./screens/context/auth-context";

export const AuthenticatedApp =()=>{
    const {logout}=useAuth()
    return <div>
        <button onClick={logout}>登出</button>
        <ProjectListScreen/>
    </div>
}