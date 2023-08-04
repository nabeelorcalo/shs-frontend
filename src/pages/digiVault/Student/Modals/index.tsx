import { useState } from 'react'
import NewPasswordModal from '../newPasswordModal';
import SettingModal from '../settingModal';
import useCustomHook from '../../actionHandler';
import UnlockVault from '../newPasswordModal/unlockVaultModal/unlockVault';
import { Switch } from 'antd';

const DigiVaultModals = (props: any) => {
  const { setIsLockUnLockPassword, isLockUnLockPassword, isLock, autoLock } = props;
  const { studentVault, postDigivaultPassword }: any = useCustomHook();
  const [state, setState] = useState(
    {
      isModalOpen: false,
      isEnable: false,
      isToggle: false,
      lockTime: autoLock,
      hasReset: false,
      isLock: isLock
      // isLock: studentVault?.lockResponse && studentVault?.lockResponse['isLock']
    });

  const onChange = (checked: boolean) => {
    setState((prevState: any) => ({
      ...prevState,
      isLock: (checked || studentVault !== undefined) && !state.isLock,
      isModalOpen: checked && true
    }));
    setIsLockUnLockPassword(checked && true)
    const params = {
      isLock: !state.isLock
    };
    (studentVault?.lockResponse || studentVault === undefined) && postDigivaultPassword(params)
  }

  return (
    <>
      <span>
        Lock
      </span>
      <Switch onChange={onChange}
        checked={state.isLock}
        defaultChecked={state.isLock}
      />

      {(studentVault?.lockResponse || studentVault === undefined) ?
        <UnlockVault
          isModal={isLockUnLockPassword}
          setIsModal={setIsLockUnLockPassword}
        />
        :
        <NewPasswordModal
          isModal={state.isModalOpen}
          setIsModal={setState}
          settingModal={state}
        />
      }
      <SettingModal
        settingModal={state}
        setSettingModal={setState} />
    </>
  )
}

export default DigiVaultModals