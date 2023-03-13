import React, { useState } from 'react'
import { PopUpModal } from '../../components/Model'
import PageHeader from '../../components/PageHeader'
import {Button} from 'antd'
import { Alert } from '../../components/Alert'

const NewInternships = () => {
    const [showState, setshowState] = useState(false)
    const [alertState, setAlertState] = useState(false)
    return (
        <>
            <PageHeader title="New Internship" />
            <div>
                <p>hello ddfrf</p>
                <Button onClick={()=>{setshowState(true)}}>open model</Button>
                <PopUpModal
                    cancelBtntxt="Cancel"
                    okBtntxt="Send"
                    state={showState}
                    setState={setshowState}
                    title="Modal Title Customizable"
                    width={800}
                >
                    <p>
                        Write your JSX here / Import Components
                    </p>
                </PopUpModal>
                <Button onClick={()=>{setAlertState(true)}}>open Alert</Button>
                <Alert
                    cancelBtntxt="Cancel"
                    okBtntxt="Hello"
                    state={alertState}
                    setState={setAlertState}
                    title="Modal Title Customizable"
                    type="error"
                    width={800}
                >
                    <p>
                        Write your JSX here / Import Components
                    </p>
                </Alert> 

            </div>
        </>
    )
}

export default NewInternships