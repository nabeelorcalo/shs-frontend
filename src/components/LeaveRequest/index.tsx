import { CloseCircleFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { Select } from 'antd';

const LeaveRequest = ({title}:any) => {
  return (
    <div>
        <Modal
        title={title}
        open={true}
        width={720}
        closeIcon= {<CloseCircleFilled style={{color: "#A3AED0",fontSize: '20px'}} />}
        footer={[
            <Button key="Cancel" style={{ border: '1px solid #4a9d77', color:'#4a9d77', padding:'0px 20px' }}>
              Cancel
            </Button>,
            <Button key="submit" style={{ backgroundColor: '#4a9d77', color:'#fff', border: '1px solid #4a9d77', padding:'0px 20px'}}>
              Submit
            </Button>,
          ]}
        >
            <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: '1',
        label: 'Not Identified',
      },
      {
        value: '2',
        label: 'Closed',
      },
      {
        value: '3',
        label: 'Communicated',
      },
      {
        value: '4',
        label: 'Identified',
      },
      {
        value: '5',
        label: 'Resolved',
      },
      {
        value: '6',
        label: 'Cancelled',
      },
    ]}
  />
        </Modal>
    </div>
  )
}

export default LeaveRequest