import { useState } from 'react'
import NewPasswordModal from '../newPasswordModal';
import SettingModal from '../settingModal';

const DigiVaultModals = (props: any) => {
    const [settingModal, setSettingModal] = useState({ isToggle: false, isLock: false, lockTime: '5' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <NewPasswordModal
                setIsEnablePassword={props.setIsEnablePassword}
                isModal={isModalOpen}
                setIsModal={setIsModalOpen}
                settingModal={settingModal} />
            <SettingModal
                settingModal={settingModal}
                setSettingModal={setSettingModal}
                setIsModal={setIsModalOpen} />
        </>
    )
}

export default DigiVaultModals