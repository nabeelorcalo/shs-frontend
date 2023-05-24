import { log } from 'console';
import { DigiVaultPasswordState, DigiVaultState, DigiFileContent } from "../../store";
import api from "../../api";
import { useRecoilState } from "recoil";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import { Education } from "../../assets/images";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash";

// Chat operation and save into store
const useCustomHook = () => {
  const {
    GET_DIGIVAULT_DASHBOARD,
    POST_DIGIVAULT_PASSWORD,
    POST_CREATE_FOLDER_FILE,
    DEL_FOLDER_FILE,
    GET_FOLDER_CONTENT } = endpoints;
  const [studentVault, setStudentVault] = useRecoilState(DigiVaultState);
  const [folderContent, setFolderContent] = useRecoilState(DigiFileContent);
  const [newPassword, setNewPassword] = useRecoilState<any>(DigiVaultPasswordState);
  console.log("new password are ", newPassword);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  //get digivault password
  const getDigiVaultDashboard = async (value: any) => {
    const { data } = await api.get(GET_DIGIVAULT_DASHBOARD, { password: value });
    setStudentVault(data?.response);
  }

  // get folder content
  const getFolderContent = async (folderIdVal: any, rootVal: any) => {
    const params = {
      root: rootVal,
      folderId: folderIdVal
    }
    const { data } = await api.get(GET_FOLDER_CONTENT, params);
    setFolderContent(data);
  }

  // search Folder File
  const SearchFolderContent = async (title: any, search: any, folderId: any) => {
    const params = {
      root: title,
      search: search,
      folderId: folderId
    }
    const { data } = await api.get(GET_FOLDER_CONTENT, params);
    setFolderContent(data);
  };

  const debouncedResults = useMemo(() => {
    return debounce(SearchFolderContent, 500);
  }, []);

  //post passowrd for digivault password
  const postDigivaultPassword = async (values: any) => {
    const { password, isLock, lockTime } = values;
    const postData = {
      isLock: isLock,
      password: password,
      autoLockAfter: lockTime
    }
    const { data } = await api.post(POST_DIGIVAULT_PASSWORD, postData);
    setNewPassword(data)
  };

  // post create folder  / file
  const postCreateFolderFile = async (values: any) => {
    const { name, root, folderId, folderName } = values;
    const folderData = {
      title: folderName ? folderName : name,
      root: root.toUpperCase(),
      mode: folderName ? 'folder' : 'file',
      folderId: folderId ? folderId.toString() : '',
      file: ''
    }
    await api.post(POST_CREATE_FOLDER_FILE, folderData);
    getDigiVaultDashboard(null);
    getFolderContent(folderId, root)
    Notifications({ title: 'Sucess', description: 'File / Folder added successfully', type: 'success' })
  }

  //delete folder
  const deleteFolderFile = async (itemId: any, folderId: any, title: any) => {
    const { data } = await api.delete(DEL_FOLDER_FILE, {}, { id: itemId });
    if (data) {
      getDigiVaultDashboard(null);
      getFolderContent(folderId, title)
      Notifications({ title: 'Successs', description: 'Deleted Successfully', type: 'success' })
    }
    else {
      Notifications({ title: 'Error', description: '', type: 'error' })
    }
  }
  return {
    studentVault,
    folderContent,
    getDigiVaultDashboard,
    getFolderContent,
    SearchFolderContent,
    postDigivaultPassword,
    postCreateFolderFile,
    deleteFolderFile
  };
};

export default useCustomHook;