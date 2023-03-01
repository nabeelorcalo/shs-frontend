import { ComponentStory, ComponentMeta } from '@storybook/react'
import GlobalTable from '../components/Table/Table'


export default {
    title: 'Components/Table',
    component: GlobalTable,
    docs: {
        source: {
            type: 'code'
        }
    },
    argTypes: {
    }
} as ComponentMeta<typeof GlobalTable>


const Template: ComponentStory<typeof GlobalTable> = (args) => <GlobalTable {...args} />

export const Primary = Template.bind({})
Primary.args = {
    columns: [{
        title: 'No',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'Date Applied',
        dataIndex: 'dateApplied',
        key: 'dateApplied',
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',

    },],
    tableData: [{
        no: '01',
        dateApplied: '01/07 /2022',
        company: 'kljdasfhuasd',
        typeOfWork: 'New York No. 1 Lake Park',
        internshipType: 'nice',
        natureOfWork: "asduhfuiyasdg",
        Position: "gjdifsdu",
        Status: "fjgvifd",
        Actions: "fduhguisd",
    },
    {
        no: '02',
        dateApplied: '01/07 /2022',
        company: 'kljdasfhuasd',
        typeOfWork: 'New York No. 1 Lake Park',
        internshipType: 'nice',
        natureOfWork: "asduhfuiyasdg",
        Position: "gjdifsdu",
        Status: "fjgvifd",
        Actions: "fduhguisd",
    },],
    pagination: false,
}
export const Expandable = Template.bind({})
Expandable.args = {
    columns: [{
        title: 'No',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'Date Applied',
        dataIndex: 'dateApplied',
        key: 'dateApplied',
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',

    },],
    tableData: [{
        no: '01',
        dateApplied: '01/07 /2022',
        company: 'kljdasfhuasd',
        typeOfWork: 'New York No. 1 Lake Park',
        internshipType: 'nice',
        natureOfWork: "asduhfuiyasdg",
        Position: "gjdifsdu",
        Status: "fjgvifd",
        Actions: "fduhguisd",
    },
    {
        no: '02',
        dateApplied: '01/07 /2022',
        company: 'kljdasfhuasd',
        typeOfWork: 'New York No. 1 Lake Park',
        internshipType: 'nice',
        natureOfWork: "asduhfuiyasdg",
        Position: "gjdifsdu",
        Status: "fjgvifd",
        Actions: "fduhguisd",
    },],
    pagination: false,
    expandable: {
        expandedRowRender: (data:any) => {<p>{data.key}</p> },
        rowExpandable: (data: any) => data?.anyArray?.length > 0,
    }


}
