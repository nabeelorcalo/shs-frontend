import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecipeCard } from "../components/RecipeCard";
import icon from "../assets/images/RecipeCard/recipeCard.png";
const arraydata = [
  {
    image: icon,
    title: "Sticky Orange Chicken",
    description:
      "This dish is a real crowd-pleaser. The sweet citrus glaze makes the chicken sticky and delicious—and it’s easy to make! ",
    storage: "128GB",
    ratingValue: 4,
  },
  {
    image: icon,
    title: "Sticky Orange Chicken",
    description:
      "This dish is a real crowd-pleaser. The sweet citrus glaze makes the chicken sticky and delicious—and it’s easy to make! ",
    storage: "128GB",
    ratingValue: 4,
  },
];
export default {
  title: "Components/RecipeCard",
  component: RecipeCard,
} as ComponentMeta<typeof RecipeCard>;

const Template: ComponentStory<typeof RecipeCard> = (args) => (
  <RecipeCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  arraydata: arraydata,
  // onClick: () => console.log("ok"),
};
