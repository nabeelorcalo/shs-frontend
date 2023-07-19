import { useState } from 'react'
import NewPasswordModal from '../newPasswordModal';
import SettingModal from '../settingModal';
import useCustomHook from '../../actionHandler';
import UnlockVault from '../newPasswordModal/unlockVaultModal/unlockVault';
import { Switch } from 'antd';

const DigiVaultModals = (props: any) => {
  console.log(props.setIsLockUnLockPassword);

  const { studentVault, postDigivaultPassword }: any = useCustomHook();
  const [state, setState] = useState(
    {
      // isModalOpen: (studentVault === undefined && !studentVault?.lockResponse) ? true : false,
      isModalOpen: props.isLockUnLockPassword,
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
    const params = {
      isLock: !state.isLock
    }
    postDigivaultPassword(params)
  }

  return (
    <>
      <span>
        Lock
      </span>
      <Switch onChange={onChange}
        checked={state.isLock}
        defaultChecked={studentVault?.lockResponse ? true : false}
      />
      {(studentVault?.lockResponse || studentVault === undefined) ?
        <UnlockVault
          isModal={props.isLockUnLockPassword}
          setIsModal={props.setIsLockUnLockPassword}
        />
        :
        <NewPasswordModal
          setIsEnablePassword={props.setIsEnablePassword}
          isModal={state.isModalOpen}
          setIsModal={setState}
          settingModal={state} />
      }

      <SettingModal
        settingModal={state}
        setSettingModal={setState} />
    </>
  )
}

export default DigiVaultModals