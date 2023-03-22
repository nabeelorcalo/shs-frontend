import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecipeCard } from "../components/RecipeCard";
import icon from "../assets/images/RecipeCard/recipeCard.png";
import { Button } from "../components";
const arraydata: any = [
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
const arraydata1 = [
  {
    image: icon,
    title: "Sticky Orange Chicken",
    description:
      "This dish is a real crowd-pleaser. The sweet citrus glaze makes the chicken sticky and delicious—and it’s easy to make! ",
    storage: "128GB",
    ratingValue: 4,
           button:  <Button color="#4ed185" label="Published" onClick={() => {}} size="small"  type="primary" />
  },
  {
    image: icon,
    title: "Sticky Orange Chicken",
    description:
      "This dish is a real crowd-pleaser. The sweet citrus glaze makes the chicken sticky and delicious—and it’s easy to make! ",
    storage: "128GB",
          button:  <Button color="#4ed185" label="Published" onClick={() => {}} size="small"  type="primary" />,
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
  // arraydata: arraydata,
  // onClick: () => console.log("ok"),
};
export const Secondary = Template.bind({});
Secondary.args = {
  // arraydata: arraydata1,
  // onClick: () => console.log("ok"),
};
