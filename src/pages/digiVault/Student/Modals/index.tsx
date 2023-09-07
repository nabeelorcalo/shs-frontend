import { useState } from 'react'
import NewPasswordModal from '../newPasswordModal';
import SettingModal from '../settingModal';
import useCustomHook from '../../actionHandler';
import UnlockVault from '../newPasswordModal/unlockVaultModal/unlockVault';
import { Switch } from 'antd';

const DigiVaultModals = (props: any) => {
  const { setIsLockUnLockPassword, isLockUnLockPassword, isLock, autoLock } = props;
  const { studentVault }: any = useCustomHook();
  const [state, setState] = useState(
    {
      isModalOpen: false,
      isToggle: false,
      lockTime: autoLock,
      hasReset: false,
      isLock: isLock
    });

  const onChange = (checked: boolean) => {
    setState((prevState: any) => ({
      ...prevState,
      isModalOpen: checked
    }));
    setIsLockUnLockPassword(true)
  }

  return (
    <>
      <span>
        Lock
      </span>

      {(studentVault?.lockResponse || studentVault === undefined) ?
        <>
          <Switch onChange={onChange}
            checked={state.isLock}
            defaultChecked={state.isLock}
          />
          <UnlockVault
            isModal={isLockUnLockPassword}
            setIsModal={setIsLockUnLockPassword}
            state={state}
            setState={setState}
          />
        </>
        :
        <>
          <Switch onChange={onChange}
            checked={state.isModalOpen}
            defaultChecked={state.isModalOpen}
          />
          <NewPasswordModal
            setIsModal={setState}
            settingModal={state}
            setIsLockModal={setIsLockUnLockPassword}
          />
        </>
      }
      <SettingModal
        settingModal={state}
        setSettingModal={setState}
      />
    </>
  )
}

export default DigiVaultModals