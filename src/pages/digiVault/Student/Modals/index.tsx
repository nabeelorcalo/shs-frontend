import { useState } from 'react'
import NewPasswordModal from '../newPasswordModal';
import SettingModal from '../settingModal';
import useCustomHook from '../../actionHandler';
import UnlockVault from '../newPasswordModal/unlockVaultModal/unlockVault';
import { Switch } from 'antd';

const DigiVaultModals = (props: any) => {
    const [settingModal, setSettingModal] = useState({ isToggle: false, isLock: false, lockTime: '5' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { studentVault } = useCustomHook();
    const onChange = (checked: boolean) => {
        setIsModalOpen(checked && true);
    }

    return (
        <>
            <Switch onChange={onChange} defaultChecked={studentVault === undefined ? false : true} />
            {(studentVault || studentVault === undefined) ?
                <UnlockVault
                    setIsEnablePassword={props.setIsEnablePassword}
                    isModal={isModalOpen}
                    setIsModal={setIsModalOpen}
                    settingModal={settingModal} />
                :
                <NewPasswordModal
                    setIsEnablePassword={props.setIsEnablePassword}
                    isModal={isModalOpen}
                    setIsModal={setIsModalOpen}
                    settingModal={settingModal} />
            }

            <SettingModal
                settingModal={settingModal}
                setSettingModal={setSettingModal}
                setIsModal={setIsModalOpen} />
        </>
    )
}

export default DigiVaultModals