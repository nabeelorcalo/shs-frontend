import { Space, Typography } from 'antd'
import { Button } from './components'
import { RecipeCard } from './components/RecipeCard';
import RecipeImage from "./assets/images/recipeCard.svg"
import icon from "./assets/images/g.svg"
import { ColorfullIconsWithProgressbar } from './components/Colorfull-Icons-with-progress-bar';

function App() {
  return (
    <div className="p-10">
      <Button type='dashed' label='new' />
      <Button type='primary' label='stuff' />
      <br />
      <Typography.Title level={1}>
        I'm h1
      </Typography.Title>

      <br />

      <Typography.Title level={2}>
        I'm h2
      </Typography.Title>

      <br />

      <Typography.Title level={3}>
        I'm h3
      </Typography.Title>

      <div>
      {/* <RecipeCard
        image={RecipeImage}
        title={"Sticky Orange Chicken"}
       
        description={
          "This dish is a real crowd-pleaser. The sweet citrus glaze makes the chicken sticky and delicious—and it’s easy to make! "
        }
        radius={"5px"}
        boxShadow={"0px 0px 8px 2px rgba(9, 161, 218, 0.1)"}
        ratingValue={4}

        
      /> */}
      <ColorfullIconsWithProgressbar icon={icon} title="media" storage='64gb'  />
      </div>
    </div>
  );
}

export default App;
