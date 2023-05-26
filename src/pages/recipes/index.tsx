import { useState, useEffect } from "react"
import { Row, Col, Empty } from 'antd'
import { useRecoilValue } from "recoil";
import { useNavigate, useLocation } from "react-router-dom"
import { PageHeader, RecipeCard, ExtendedButton, SearchBar } from "../../components"
import { IconAddRecipe } from '../../assets/images'
import { ROUTES_CONSTANTS } from '../../config/constants'
import { allRecipesState } from "../../store";
import useRecipesHook from './actionHandler'
import "./style.scss";


const Recipes = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const location = useLocation();
  const [rateValue, setRateValue] = useState(3);
  const {getAllRecipes} = useRecipesHook();
  const allRecipes = useRecoilValue(allRecipesState)
  const [loadingRecipes, setLoadingRecipes] = useState(false)



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getAllRecipes(setLoadingRecipes)
  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function handleRateChange(value: number) {
    setRateValue(value)
  }



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="recipes-page-content">
      <PageHeader title="Recipes" bordered />
      <Row gutter={[20,20]}>
        <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
          <SearchBar handleChange={() => console.log('i am changed')} />
        </Col>
        <Col xxl={18} xl={18} lg={16} md={24} sm={24} xs={24} className="flex gap-4 md:justify-end">
          <ExtendedButton onClick={() => navigate(`/${ROUTES_CONSTANTS.RECIPE_ADD}`)} customType="tertiary" icon={<IconAddRecipe />}>
            Add New Recipe
          </ExtendedButton>
        </Col>
        {allRecipes?.map((recipe:any) => {
            return (
              <Col key={recipe.id} xs={24} sm={12} xl={8} xxl={6}>
                <RecipeCard
                  title={recipe?.name}
                  thumb={`http://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${recipe?.recipeImage?.mediaId}.${recipe?.recipeImage?.metaData.extension}`}
                  description={recipe?.description}
                  rating={rateValue}
                  status={recipe?.status}
                  onCardClick={() => navigate(`/${ROUTES_CONSTANTS.RECIPE_DETAILS}/${recipe.id}`, {state: {from: location.pathname}})}
                  onRateChange={handleRateChange}
                />
              </Col>
            )
          })}
          {!allRecipes && !loadingRecipes &&
            <Col xs={24}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Col>
          }
      </Row>
    </div>
  )
}

export default Recipes