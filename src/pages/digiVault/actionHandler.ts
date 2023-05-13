import { DigiVaultPasswordState, DigiVaultState } from "../../store";
import api from "../../api";
import { useRecoilState } from "recoil";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_DIGIVAULT_DASHBOARD, POST_DIGIVAULT_PASSWORD, POST_CREATE_FOLDER_FILE, DEL_FOLDER_FILE } = endpoints;
  const [studentVault, setStudentVault] = useRecoilState(DigiVaultState);
  const [newPassword, setNewPassword] = useRecoilState<any>(DigiVaultPasswordState);

  //get digivault password
  const getDigiVaultDashboard = async (checkEnabled: any) => {
    if (!checkEnabled) {
      const { data } = await api.get(GET_DIGIVAULT_DASHBOARD, { password: newPassword?.password });
      setStudentVault(data?.response);
    }
    else {
      Notifications({ title: 'Error', description: 'Please set your vault password', type: 'error' })
    }
  };

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
    setStudentVault(data)
    setNewPassword(data)
    getDigiVaultDashboard(null)
  };

  // post create folder  / file
  const postCreateFolderFile = async (values: any) => {
    const { folderName, root } = values;
    const folderData = {
      title: folderName,
      root: root,
      mode: 'folder',
      folderId: '',
      file: ''
    }
    const { data } = await api.post(POST_CREATE_FOLDER_FILE, folderData);
    setStudentVault(data)
  }

  //delete folder
  const deleteFolderFile = async (itemId: any) => {
    const { data } = await api.delete(`${DEL_FOLDER_FILE}?id=${itemId}`);
    if (data) {
      getDigiVaultDashboard(null);
      Notifications({ title: 'Successs', description: 'Deleted Successfully', type: 'success' })
    }
    else {
      Notifications({ title: 'Error', description: '', type: 'error' })
    }
  }
  return {
    getDigiVaultDashboard,
    studentVault,
    postDigivaultPassword,
    postCreateFolderFile,
    deleteFolderFile
  };
};

export default useCustomHook;