import people from '../../../../assets/images/profile/propertyagent/people.svg'
import mob from '../../../../assets/images/profile/delegateagent/mob.svg'
import reward from '../../../../assets/images/profile/delegateagent/Rewards.svg'
import alone from '../../../../assets/images/profile/delegateagent/StandAloneAgent.svg'

export const cardDelegate = [
  {
    id: "1",
    img: people,
    bgColor: "#4CA4FD1A",
    cardTitle: 'Total Agents',
    cardNumber: "10",
    toolTip:true,
    toolTipData: [
      {
        
        title: "Total Agent",
        label: "Total Universities",
        totalNumber: "1220"
      },
      {
        title: "Total Agent",
        label: "Total Companies",
        totalNumber: "1220"
      },

      {
        title: "Total Agent",
        label: "Total Interns",
        totalNumber: "1220"
      },
      {
        title: "Total Agent",
        label: "Total Students",
        totalNumber: "1220"
      },
      {
        title: "Total Agent",
        label: "Delegate Agents",
        totalNumber: "1220"
      },
    ]
  },
  {
    id: "2",
    img: mob,
    bgColor: "#E96F7C1A",
    cardTitle: 'In-app Agents',
    cardNumber: "02",
    toolTip:true,
    toolTipData: [
      {
        title1: "Agent1",
        label1: "Total Universities",
        totalNumber: "1220"
      },
      {
        title1: "Agent2",
        label1: "Total Companies",
        totalNumber: "1220"
      },

      {
        title1: "Agent3",
        label1: "Total Interns",
        totalNumber: "1220"
      },
      {
        title1: "Agent4",
        label: "Total Students",
        totalNumber: "1220"
      }, 
    ]
  },
  {
    id: "3",
    img: reward,
    bgColor: "#FDC8711A",
    cardTitle: 'Distributed Rewards',
    cardNumber: "01",
    toolTip:true,
    toolTipData: [
      {
        title: "rewards1",
        label: "Total Universities ",
        totalNumber: "£1220",
        price:'£'
      },
      {
        title: "rewards2",
        label: "Total Companies ",
        totalNumber: "£1220",
        price:'£'
      },

      {
        title: "rewards3",
        label: "Total Interns ",
        totalNumber: "1220",
        price:'£'
      },
      {
        title: "rewards4",
        label: "Total Students ",
        totalNumber: "1220",
        price:'£'
      },
      {
        title: "rewards5",
        label: "Delegate Agents ",
        totalNumber: "1220",
        price:'£'
      },
    ]
  },
  {
    id: '4',
    img: alone,
    bgColor: "#3DC5751A",
    cardTitle: 'Standalone Agents',
    cardNumber: "07",
    toolTip:false,
    toolTipData: [
      {
        label: "Total Universities ",
        totalNumber: "1220"
      },
      {
        label: "Total Companies ",
        totalNumber: "1220"
      },

      {
        label: "Total Interns ",
        totalNumber: "1220"
      },
      {
        label: "Total Students ",
        totalNumber: "1220"
      },
      {
        label: "Delegate Agents ",
        totalNumber: "1220"
      },
    ]
  },

];
