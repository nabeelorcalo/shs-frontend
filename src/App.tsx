import { Space } from "antd";
import { Button } from "./components";
import { RecipeCard } from "./components/RecipeCard";
import recipeCard from "./assets/images/recipeCard.svg";

function App() {
  return (
    <div className="p-10">
      <Space>
        <Button type="dashed" label="new" />
        <Button type="primary" label="stuff" />
      </Space>
      <RecipeCard
        image={recipeCard}
        title={"Sticky Orange Chicken"}
        padding={"20px"}
        description={
          "This dish is a real crowd-pleaser. The sweet citrus glaze makes the chicken sticky and delicious—and it’s easy to make! "
        }
      />
    </div>
  );
}

export default App;
