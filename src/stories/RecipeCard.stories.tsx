import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
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
    radius:"8px",
    ratingValue: 4,
    ratingColor: "yellow",
    boxShadow:"1px 1px 5px 5px rgba(9, 161, 218, 0.1)",
    onClick: (() => console.log("ok"))
  
  
 
};
