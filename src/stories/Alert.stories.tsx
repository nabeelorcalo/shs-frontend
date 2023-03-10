import { ComponentStory } from '@storybook/react'
import { object } from 'prop-types';
import { Alert } from '../components';

export default {
  title: 'Components/Alert',
  componenet: Alert
}

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} ><p>This is a placeholer text just to show the default size and weight for body text typography in a popup.</p></Alert>

export const errorAlert = Template.bind({})
errorAlert.args = {
  
    showHide:true ,
    type:"error" ,
    width:500 ,
    okBtntxt:"Delete" ,
    cancelBtntxt:"Cancel",

}


export const successAlert = Template.bind({})
successAlert.args = {
    showHide:true ,
    type:"success" ,
    width:500 ,
    okBtntxt:"Delete" ,
    cancelBtntxt:"Cancel",

}

export const warningAlert = Template.bind({})
warningAlert.args = {
    showHide:true ,
    type:"warning" ,
    width:500 ,
    okBtntxt:"Delete" ,
    cancelBtntxt:"Cancel",

}