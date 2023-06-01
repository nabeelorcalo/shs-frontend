import { useState, useEffect } from "react"
import { Row, Col, Empty } from 'antd'
import { useRecoilState, useResetRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom"
import { PageHeader, RecipeCard, ExtendedButton, SearchBar, Loader } from "../../components"
import { IconAddRecipe } from '../../assets/images'
import constants, { ROUTES_CONSTANTS } from '../../config/constants'
import api from '../../api';
import endpoints from "../../config/apiEndpoints";
import { allRecipesState, recipesParamsState } from "../../store";
import useRecipesHook from './actionHandler'
import "./style.scss";


const Recipes = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { GET_ALL_RECIPES } = endpoints;
  const {getAllRecipes} = useRecipesHook();
  const navigate = useNavigate();
  const location = useLocation();
  const [rateValue, setRateValue] = useState(3);
  const [allRecipes, setAllRecipes]: any = useRecoilState(allRecipesState);
  const [recipesParams, setRecipesParams] = useRecoilState(recipesParamsState);
  const resetAllRecipes = useResetRecoilState(allRecipesState)
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0)
  const [hasMore, setHasMore] = useState(false);


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    fetchDataOnScroll()
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])


  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  async function fetchData () {
    setLoadingRecipes(true)
    resetAllRecipes()
    const response:any = await api.get(GET_ALL_RECIPES, {page: 1, limit: 8});
    await setAllRecipes(response.data);
    setTotalCount(response.count)
    setLoadingRecipes(false);
  }

  async function fetchDataOnScroll () {
    setLoadingRecipes(true)
    const {data}: any = await api.get(GET_ALL_RECIPES, {page: page, limit: 8});
    setAllRecipes([...allRecipes, ...data]);
    setLoadingRecipes(false)
  }

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if (totalCount > allRecipes.length) {
        setPage((prev) => prev + 1);
      }
    }
  };

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function handleRateChange(value: number) {
    setRateValue(value)
  }

  function handleSearch(value:any) {
    console.log("Value:::: ", value)
  }



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="recipes-page-content">
      <PageHeader title="Recipes" bordered />
      <Row gutter={[20,20]}>
        <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
          <SearchBar handleChange={handleSearch} />
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
                  thumb={`${constants.MEDIA_URL}/${recipe?.recipeImage?.mediaId}.${recipe?.recipeImage?.metaData.extension}`}
                  description={recipe?.description}
                  rating={rateValue}
                  status={recipe?.status}
                  onCardClick={() => navigate(`/${ROUTES_CONSTANTS.RECIPE_DETAILS}/${recipe.id}`, {state: {from: location.pathname}})}
                  onRateChange={handleRateChange}
                />
              </Col>
            )
          })}
          {loadingRecipes &&
          <Col xs={24}>
            <div className="scroll-loader">
              <Loader />
            </div>
          </Col>
          }
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