import { ComponentStory } from '@storybook/react'
import EmojiMoodRating from '../components/EmojiMoodRating'
import { Terrible, Sad, Neutral, Happy, Awesome } from '../../src/assets/images';


const emojiData = [
    {
      name: "Terrible",
      comp: Terrible
    },
    {
      name: "Sad",
      comp: Sad
    },
    {
      name: "Neutral",
      comp: Neutral
    },
    {
      name: "Happy",
      comp: Happy
    },
    {
      name: "Awesome",
      comp: Awesome
    }
  ]

  const SingleEmoji = [
    {
      name: "Terrible",
      comp: Terrible
    }
  ]
  const SingleEmojiWithoutTitle= [
    {
      comp: Terrible
    }
  ]

export default {
  title: 'Components/Emoji Mood Rating',
  componenet: EmojiMoodRating
}

const Template: ComponentStory<typeof EmojiMoodRating> = (args) => <EmojiMoodRating {...args} ><p>Write your JSX here / Import Components</p></EmojiMoodRating>

export const MultipleEmojisWithNames = Template.bind({})
MultipleEmojisWithNames.args = {
    title:'How are you feeling today?',
    data:emojiData ,

}


export const SingleEmojiWithTitle = Template.bind({})
SingleEmojiWithTitle.args = {
    title:'How are you feeling today?',
    data:SingleEmoji ,

}

export const JustSingleEmojiWithoutTitle = Template.bind({})
JustSingleEmojiWithoutTitle.args = {
    title:'How are you feeling today?',
    data:SingleEmojiWithoutTitle ,

}