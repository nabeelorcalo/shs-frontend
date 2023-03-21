import { ComponentStory } from '@storybook/react'
import { object } from 'prop-types';
import { Alert } from '../components';

export default {
  title: 'Components/Alert',
  componenet: Alert
}

const okBtnFunc = (type)=>{
    console.log( type + " Alert submit button clicked")
}

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} ><p>This is a placeholer text just to show the default size and weight for body text typography in a popup.</p></Alert>

export const errorAlert = Template.bind({})
errorAlert.args = {
  
    state:true ,
    type:"error" ,
    width:500 ,
    okBtntxt:"Delete" ,
    cancelBtntxt:"Cancel",
    okBtnFunc: okBtnFunc
}


export const successAlert = Template.bind({})
successAlert.args = {
    state:true ,
    type:"success" ,
    width:500 ,
    okBtntxt:"Delete" ,
    cancelBtntxt:"Cancel",
    okBtnFunc: okBtnFunc

}

export const warningAlert = Template.bind({})
warningAlert.args = {
    state:true ,
    type:"warning" ,
    width:500 ,
    okBtntxt:"Delete" ,
    cancelBtntxt:"Cancel",
    okBtnFunc: okBtnFunc

}