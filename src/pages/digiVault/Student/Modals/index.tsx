import { useState } from 'react'
import NewPasswordModal from '../newPasswordModal';
import SettingModal from '../settingModal';
import useCustomHook from '../../actionHandler';
import UnlockVault from '../newPasswordModal/unlockVaultModal/unlockVault';
import { Switch } from 'antd';

const DigiVaultModals = (props: any) => {
  const { studentVault }: any = useCustomHook();
  const [state, setState] = useState(
    {
      isModalOpen: false,
      isEnable: false,
      isToggle: false,
      lockTime: '15',
      isLock: studentVault?.lockResponse && studentVault?.lockResponse['isLock']
    });

  const onChange = (checked: boolean) => {
    setState((prevState: any) => ({
      ...prevState,
      isLock: checked,
      isModalOpen: checked && true
    }));
  }
  console.log("modal lock is", state.isLock);

  return (
    <>
      <Switch onChange={onChange}
        //  defaultChecked={studentVault === undefined ? false : state.isLock}
        checked={state.isLock}
        defaultChecked={state.isLock}
      />
      {(studentVault || studentVault === undefined) ?
        <UnlockVault
          setIsEnablePassword={props.setIsEnablePassword}
          isModal={state.isModalOpen}
          setIsModal={setState}
          settingModal={state} />
        :
        <NewPasswordModal
          setIsEnablePassword={props.setIsEnablePassword}
          isModal={state.isModalOpen}
          setIsModal={setState}
          settingModal={state} />
      }

      <SettingModal
        settingModal={state}
        setSettingModal={setState}
        setIsModal={setState} />
    </>
  )
}

export default DigiVaultModals