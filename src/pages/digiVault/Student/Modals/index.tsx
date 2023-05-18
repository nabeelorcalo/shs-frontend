import { useState } from 'react'
import NewPasswordModal from '../newPasswordModal';
import SettingModal from '../settingModal';
import useCustomHook from '../../actionHandler';
import UnlockVault from '../newPasswordModal/unlockVaultModal/unlockVault';
import { Switch } from 'antd';

const DigiVaultModals = (props: any) => {
  const [state, setState] = useState(
    {
      isModalOpen: false,
      isEnable:false,
      isToggle: false,
      isLock: false,
      lockTime: '15',
    });
  const { studentVault } = useCustomHook();

  const onChange = (checked: boolean) => {
    setState((prevState: any) => ({
      ...prevState,
      isEnable: checked,
      isModalOpen: checked && true
    }));
  }

  return (
    <>
      <Switch onChange={onChange} defaultChecked={studentVault === undefined ? false : true} />
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