import { useMemo } from "react";
import { useUrlQueryParam } from "../../utils/url";
import { useProject } from "../../utils/project";
import { useSearchParams } from "react-router-dom";
import { useSetUrlSearchParam } from "../../utils/url";
export const useProjectSearchParams=()=>{
   const [param,setParam]=useUrlQueryParam(['name','personId'])
   return [
      useMemo(()=>({
          ...param,
          personId:param.personId?Number(param.personId):undefined
      }),[param]),
      setParam
   ] as const
}
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
 const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
 const setUrlParams = useSetUrlSearchParam();
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true"||Boolean(editingProject),
    open,
    close,
     startEdit,
    editingProject,
    isLoading,
  };
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};