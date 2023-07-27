import {useState, useEffect} from "react";
import {Row, Col, Empty, Spin, Pagination} from 'antd';
import type { PaginationProps } from 'antd';
import {useRecoilValue} from "recoil";
import {useNavigate, useLocation} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import {PageHeader, RecipeCard, ExtendedButton, SearchBar} from "../../components";
import {IconAddRecipe} from '../../assets/images';
import constants, {ROUTES_CONSTANTS} from '../../config/constants';
import {currentUserState} from "../../store";
import useRecipesHook from './actionHandler';
import "./style.scss";


const Recipes = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {MEDIA_URL} = constants;
  const currentUser = useRecoilValue(currentUserState);
  const {getAllRecipes, allRecipesData, totalRecipes, addRating} = useRecipesHook();
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const initParams = {
    page: 1,
    limit: 8
  }
  const [recipesParams, setRecipesParams] = useState(initParams);


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    setPageRefresh(false)
    getAllRecipes(recipesParams, setLoadingRecipes);
  }, [recipesParams]);

  useEffect(() => {
    getAllRecipes(recipesParams, setLoadingRecipes);
  }, [pageRefresh])


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  async function handleRateChange(value:number, recipeId:any) {
    // setLoadingRecipes(true)
    try {
      const response = await addRating(recipeId, value);
      if(!response.error) {
        setPageRefresh(!pageRefresh)
      }
    } catch (error) {
      return;
    }
  }

  function handleSearch(value:any) {
    setRecipesParams((prev) => {
      return {
        ...prev,
        q: value
      }
    })
  }

  const handlePagination:PaginationProps['onChange'] = (page:any) => {
    setCurrentPage(page)
    setRecipesParams((prev:any) => {
      return {...prev, page: page}
    })
  };


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="recipes-page-content">
      <PageHeader title="Recipes" bordered />
      <Row gutter={[20,20]}>
        <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
          <SearchBar
            value={undefined} 
            handleChange={handleSearch}
          />
        </Col>
        <Col xxl={18} xl={18} lg={16} md={24} sm={24} xs={24} className="flex gap-4 md:justify-end">
          <ExtendedButton onClick={() => navigate(`/${ROUTES_CONSTANTS.RECIPE_ADD}`)} customType="tertiary" icon={<IconAddRecipe />}>
            Add New Recipe
          </ExtendedButton>
        </Col>
        <Col xs={24}>
          <Spin spinning={loadingRecipes} indicator={<LoadingOutlined />}>
            {allRecipesData.length !== 0 &&
            <Row gutter={[20,20]}>
              {allRecipesData?.map((recipe:any) => {
                return (
                  <Col key={recipe.id} xs={24} sm={12} xl={8} xxl={6}>
                    <RecipeCard
                      title={recipe?.name}
                      thumb={`${MEDIA_URL}/${recipe?.recipeImage?.mediaId}.${recipe?.recipeImage?.metaData.extension}`}
                      description={recipe?.description}
                      defaultValue={recipe?.averageRating}
                      status={recipe?.status}
                      onCardClick={() => navigate(`/${ROUTES_CONSTANTS.RECIPE_DETAILS}/${recipe.id}`, {state: {from: location.pathname}})}
                      onRateChange={(value:number) => handleRateChange(value, recipe.id)}
                      disabledRate={recipe?.userId === currentUser?.id}
                    />
                  </Col>
                )
              })}
              {totalRecipes > 8 &&
                <Col xs={24}>
                  <div className="pagination-wrapper">
                    <Pagination
                      pageSize={8}
                      current={currentPage}
                      total={totalRecipes}
                      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                      onChange={handlePagination}
                    />
                  </div>
                </Col>
              }
            </Row>
            }
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