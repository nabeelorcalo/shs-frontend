import { Space, Typography } from "antd";
import { Button } from "./components";
import { Progress } from "antd";
import { ColorfullIconsWithProgressbar } from "./components/ColorfullIconsWithProgressbar";
import { AddEventInCalendar } from "./components/AddEventInCalendar";
import icon from "./assets/images/AddEventInCalendar/icon.svg";
import { HorizonalLineCard } from "./components/HorizontalLineCard";

function App() {
  return (
    <div className="p-10">
      <Button type="dashed" label="new" />
      <Button type="primary" label="stuff" />
      <br />
      <Typography.Title level={1}>I'm h1</Typography.Title>

      <br />

      <Typography.Title level={2}>I'm h2</Typography.Title>

      <br />

      <Typography.Title level={3}>I'm h3</Typography.Title>

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
        {/* <ColorfullIconsWithProgressbar icon={icon} title="Media" storage='64GB' progressbar={<Progress percent={30}/>}/> */}
        <AddEventInCalendar />
        {/* <HorizonalLineCard
          icon={icon}
          title="Main Goal"
          subTitle="Create Balance in Life"
          percent="20%"
          progressbar={<Progress percent={30} showInfo={false}/>}
          content="10 of 10 tasks completed"
        /> */}
      </div>
    </div>
  );
}

export default App;
