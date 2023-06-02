import { Slider } from 'antd';
import useCustomHook from '../actionHandler';
import { Finance, Relationship, Health, Education, Development, Family, Social, Recreation } from '../../../assets/images';
import { lifeAssessmentState } from '../../../store';
import { useRecoilValue } from 'recoil';


export const LifeAssessmentGraph = ({monthName}: any) => {

  const action = useCustomHook();
  const lifeAssesmentData: any = useRecoilValue(lifeAssessmentState);
  const assessmentsName = ["Finance", "Relationship", "Health", "Education", "Development", "Family", "SocailLife", "Recreation"];

  const baseData = assessmentsName.map((name) => ({
    month: monthName,
    name,
    value: 1,
  }))

  function capitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  const filteredArray = (lifeAssesmentData && lifeAssesmentData.length > 0) ? Object.entries(lifeAssesmentData[0]).filter(
    ([key]) => key !== "id" && key !== "userId" && key !== "month" && key !== "createdAt" && key !== "updatedAt"
  ).map(
    ([key, value]) => ({ month: lifeAssesmentData[0].month, name: capitalizeFirstLetter(key), value: value || 1 })
  ) : baseData;
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Finance':
        return <Finance />;
      case 'Relationship':
        return <Relationship />;
      case 'Health':
        return <Health />;
      case 'Education':
        return <Education />;
      case 'Development':
        return <Development />;
      case 'Family':
        return <Family />;
      case 'SocailLife':
        return <Social />;
      case 'Recreation':
        return <Recreation />;
      default:
        return <></>;
    }
  }

  const postLifeAsse = async (data: any) => {
    await action.postLifeAssessment(data);
  }

  const sliderMoved = async (data: any, sliderValue: any) => {
    const key = (data.name);
    const assess = {
      month: data?.month?.toLowerCase(),
      [key?.toLowerCase()]: sliderValue,
    }
    await postLifeAsse(assess);
  }
  return (
    <>
      {assessmentsName.map((item, index) => (
        <div className="flex max-sm:flex-col items-center lifeAssesment_main max-sm:gap-6 gap-0">
          <div className="main-head flex">
          <div className='flex-none w-[120px]'>
            {item}
          </div>

          <div className='flex-none w-20'>
            {renderIcon(item)}
          </div>
          </div>
          <div className='flex-initial w-full'>
            <Slider
              min={1}
              max={5}
              tooltip={{
                open: true,
                formatter: (value: any) => `0${value}`,
              }}
              onAfterChange = {(val) => sliderMoved(filteredArray[index], val)}
              value={filteredArray[index].value as number || 1}
              trackStyle={{ background: 'transparent' }}
              className="life-assessment-slider"
            />
          </div>
        </div>
      ))}
      <div className="flex items-center">
        <div className='flex-none w-[120px]'></div>
        <div className='flex-none w-20'></div>
        <div className='flex-initial w-[345px] text-sm txtColor'>
          1
        </div>
        <div className='flex-initial w-[343px] text-sm txtColor'>
          2
        </div>
        <div className='flex-initial w-[345px] text-sm txtColor'>
          3
        </div>
        <div className='flex-initial w-[345px] text-sm txtColor'>
          4
        </div>
        <div className='flex-initial w-2 text-sm txtColor'>
          5
        </div>
      </div>
    </>
  )
};