import { ContractsRecieved } from '../../assets/images'
import { ContractCard } from '.'

const DemoCard = () => {
    return (
        <div className='p-4'>

            <div className='my-4'>
                <ContractCard
                    img={ContractsRecieved}
                    title='this is new title'
                    description='description'
                />
            </div>

            <ContractCard cardWithProgressBar
                userImg={ContractsRecieved}
                userName='umar malik'
                designation='ui/ux developer'
                totalHours='35hrs'
                progress={95}
                workedHours='27h 52m'
                strokeColor='#3DC575'
            />

        </div>
    )
}

export default DemoCard
