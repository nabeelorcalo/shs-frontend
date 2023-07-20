import { DigiVaultState, DigiFileContent } from "../../store";
import api from "../../api";
import { useRecoilState } from "recoil";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";

// Chat operation and save into store
const useCustomHook = () => {
  const {
    GET_DIGIVAULT_DASHBOARD,
    POST_DIGIVAULT_PASSWORD,
    POST_CREATE_FOLDER_FILE,
    DEL_FOLDER_FILE,
    GET_FOLDER_CONTENT,
    RESET_dIGIVAULT_PASSWORD
  } = endpoints;
  const [studentVault, setStudentVault] = useRecoilState(DigiVaultState);
  const [folderContent, setFolderContent] = useRecoilState(DigiFileContent);

  //get digivault password
  const getDigiVaultDashboard = async (value: any = null) => {
    const { data } = await api.get(GET_DIGIVAULT_DASHBOARD, { password: value });
    setStudentVault(data?.response);
  }

  // get folder content
  const getFolderContent = async (search: any = null, state: any = null) => {
    const params = {
      search: search,
      root: state?.title,
      folderId: state?.folderId
    }
    const { data } = await api.get(GET_FOLDER_CONTENT, params);
    setFolderContent(data);
  }

  //post passowrd for digivault password
  const postDigivaultPassword = async (values: any) => {
    const { password, isLock, lockTime } = values;
    const postData = {
      isLock: isLock,
      password: password,
      autoLockAfter: lockTime ? lockTime : '5'
    }
    const { data } = await api.post(POST_DIGIVAULT_PASSWORD, postData);
    getDigiVaultDashboard();
    (data && password) && Notifications({ title: "Success", description: `Your password will expire after ${lockTime ? lockTime : '5'} minutes` })
  };

  // post create folder  / file
  const postCreateFolderFile = async (values: any, state: any) => {
    const data = await api.post(POST_CREATE_FOLDER_FILE, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    data && Notifications({ title: 'Success', description: 'File / Folder added successfully', type: 'success' })
    getDigiVaultDashboard();
    getFolderContent(null, state)
  }

  //reset password
  const resetDigiVault = async (password: any) => {
    await api.post(RESET_dIGIVAULT_PASSWORD, { password: password })
  }
  //delete folder
  const deleteFolderFile = async (itemId: any, state: any) => {
    const { data } = await api.delete(DEL_FOLDER_FILE, {}, { id: itemId });
    if (data) {
      getDigiVaultDashboard();
      getFolderContent(null, state)
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
    deleteFolderFile,
    resetDigiVault
  };
};

export default useCustomHook;