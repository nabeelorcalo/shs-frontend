import { useState, useEffect } from "react"
import { Row, Col, Empty } from 'antd'
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom"
import { PageHeader, RecipeCard, ExtendedButton, SearchBar, Loader } from "../../components"
import { IconAddRecipe } from '../../assets/images'
import constants, { ROUTES_CONSTANTS } from '../../config/constants'
import api from '../../api';
import endpoints from "../../config/apiEndpoints";
import { allRecipesState } from "../../store";
import "./style.scss";


const Recipes = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { GET_ALL_RECIPES } = endpoints
  const navigate = useNavigate();
  const location = useLocation();
  const [rateValue, setRateValue] = useState(3);
  const [allRecipes, setAllRecipes]: any = useRecoilState(allRecipesState)
  const [loadingRecipes, setLoadingRecipes] = useState(false)
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, page])


  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  async function fetchData () {
    setHasMore(false)
    setPage(1)
    setLoadingRecipes(true)
    try {
      const response:any = await api.get(GET_ALL_RECIPES, {page: page, limit: 8});
      setAllRecipes(response.data);
      setPage(page + 1);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingRecipes(false)
    }
  }

  async function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if(hasMore) {
        setLoadingRecipes(true)
        try {
          const {data}: any = await api.get(GET_ALL_RECIPES, {page: page, limit: 8});
          setAllRecipes([...allRecipes, ...data]);
          setPage(page + 1);
          setHasMore(data.length > 0);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoadingRecipes(false)
        }
      } else {
        setLoadingRecipes(true)
      }
    }
  };

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
          {/* {loadingRecipes && */}
          <Col xs={24}>
            <div className="scroll-loader">
              <Loader />
            </div>
          </Col>
          {/* } */}
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