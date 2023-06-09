import { useState, useEffect } from "react"
import { Row, Col, Empty, Spin } from 'antd'
import { useRecoilState, useResetRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom"
import { PageHeader, RecipeCard, ExtendedButton, SearchBar, Loader } from "../../components"
import { IconAddRecipe } from '../../assets/images'
import constants, { ROUTES_CONSTANTS } from '../../config/constants'
import { allRecipesState, recipesParamsState } from "../../store";
import useRecipesHook from './actionHandler'
import "./style.scss";


const Recipes = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {MEDIA_URL} = constants;
  const {getAllRecipes, allRecipesData} = useRecipesHook();
  const navigate = useNavigate();
  const location = useLocation();
  const [rateValue, setRateValue] = useState(3);
  const [recipesParams, setRecipesParams] = useState({page: 1, limit: 100});
  const [loadingRecipes, setLoadingRecipes] = useState(false);


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    setRecipesParams({page: 1, limit: 100});
    getAllRecipes(recipesParams, setLoadingRecipes);
  }, [])

  useEffect(() => {
    getAllRecipes(recipesParams, setLoadingRecipes)
  }, [recipesParams])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function handleRateChange(value: number) {
    setRateValue(value)
  }

  function handleSearch(value:any) {
    setRecipesParams((prev) => {
      return {
        ...prev,
        q: value
      }
    })
  }



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="recipes-page-content">
      <PageHeader title="Recipes" bordered />
      <Row gutter={[20,20]}>
        <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
          <SearchBar value={undefined} handleChange={handleSearch} />
        </Col>
        <Col xxl={18} xl={18} lg={16} md={24} sm={24} xs={24} className="flex gap-4 md:justify-end">
          <ExtendedButton onClick={() => navigate(`/${ROUTES_CONSTANTS.RECIPE_ADD}`)} customType="tertiary" icon={<IconAddRecipe />}>
            Add New Recipe
          </ExtendedButton>
        </Col>
        <Col xs={24}>
          <Spin spinning={loadingRecipes} indicator={<Loader />}>
            <Row gutter={[20,20]}>
              {allRecipesData?.map((recipe:any) => {
                return (
                  <Col key={recipe.id} xs={24} sm={12} xl={8} xxl={6}>
                    <RecipeCard
                      title={recipe?.name}
                      thumb={`${MEDIA_URL}/${recipe?.recipeImage?.mediaId}.${recipe?.recipeImage?.metaData.extension}`}
                      description={recipe?.description}
                      rating={rateValue}
                      status={recipe?.status}
                      onCardClick={() => navigate(`/${ROUTES_CONSTANTS.RECIPE_DETAILS}/${recipe.id}`, {state: {from: location.pathname}})}
                      onRateChange={handleRateChange}
                    />
                  </Col>
                )
              })}
            </Row>
            {allRecipesData.length === 0 && !loadingRecipes &&
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
          </Spin>
        </Col>
      </Row>
    </div>
  )
}

export default Recipes