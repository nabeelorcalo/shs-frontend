import { DigiVaultPasswordState, DigiVaultState, DigiFileContent } from "../../store";
import api from "../../api";
import { useRecoilState } from "recoil";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import { Education } from "../../assets/images";

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

  //get digivault password
  const getDigiVaultDashboard = async () => {
    const { data } = await api.get(GET_DIGIVAULT_DASHBOARD, { password: newPassword?.password });
    setStudentVault(data?.response);
  }

  // get folder content
  const getFolderContent = async (values: any) => {
    const { folderId, search, root } = values;
    const params = {
      root: root,
      folderId: folderId
    }
    const { data } = await api.get(GET_FOLDER_CONTENT, params);
    setFolderContent(data);
  }
  //search Folder File
  // const SearchFolderFile = async () => {
  //     const { data } = await api.get(GET_DIGIVAULT_DASHBOARD, { password: newPassword?.password });
  //     setStudentVault(data?.response);
  // };

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
    const { data } = await api.post(POST_CREATE_FOLDER_FILE, folderData);
    setNewPassword(data)
    getDigiVaultDashboard();
    getFolderContent(null)
    Notifications({ title: 'Sucess', description: 'File / Folder added successfully', type: 'success' })
  }

  //delete folder
  const deleteFolderFile = async (itemId: any) => {
    const { data } = await api.delete(DEL_FOLDER_FILE, {}, { id: itemId });
    if (data) {
      getDigiVaultDashboard();
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
    postDigivaultPassword,
    postCreateFolderFile,
    deleteFolderFile
  };
};

export default useCustomHook;