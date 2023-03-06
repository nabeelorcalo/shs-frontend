import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecipeCard } from "../components/RecipeCard";
import icon from "../assets/images/RecipeCard/recipeCard.png"
export default {
  title: "Components/RecipeCard",
  component: RecipeCard,
} as ComponentMeta<typeof RecipeCard>;

const Template: ComponentStory<typeof RecipeCard> = (args) => (
  <RecipeCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    title: "Sticky Orange Chicken",
    description:"This dish is a real crowd-pleaser. The sweet citrus glaze makes the chicken sticky and delicious—and it’s easy to make! ",
    image: icon,
    ratingValue: 4,
    onClick: (() => console.log("ok"))
  
  
 
};
