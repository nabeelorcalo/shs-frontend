import { useState } from 'react'
import NewPasswordModal from '../newPasswordModal';
import SettingModal from '../settingModal';
import useCustomHook from '../../actionHandler';
import UnlockVault from '../newPasswordModal/unlockVaultModal/unlockVault';
import { Switch } from 'antd';

const DigiVaultModals = (props: any) => {
  const { setIsLockUnLockPassword, isLockUnLockPassword } = props;
  const { studentVault, postDigivaultPassword }: any = useCustomHook();
  const [state, setState] = useState(
    {
      isModalOpen: false,
      isEnable: false,
      isToggle: false,
      lockTime: 5,
      hasReset: false,
      isLock: studentVault?.lockResponse && studentVault?.lockResponse['isLock']
    });

  const onChange = (checked: boolean) => {
    setState((prevState: any) => ({
      ...prevState,
      isLock: checked,
      isModalOpen: checked && true
    }));
    setIsLockUnLockPassword({
      ...isLockUnLockPassword,
      isLockUnLockPassword: checked && true
    })
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
        defaultChecked={studentVault?.lockResponse && studentVault?.lockResponse['isLock']}
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