import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Typography, Avatar, Rate, Space } from 'antd'
import { PageHeader, Alert, Breadcrumb } from "../../../components"
import { ROUTES_CONSTANTS } from '../../../config/constants'
import { IconPreparationTime, IconServing, IconEditRecipe, IconTrashRecipe } from '../../../assets/images'
import "./style.scss";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRecoilValue } from "recoil";
import { recipeState } from "../../../store";
import useRecipesHook from '../actionHandler'

// Temporary
import avatar from '../../../assets/images/header/avatar.svg'
const data = [
  { id: '001', avatar: avatar, title: 'Austin Wade' },
  { id: '002', avatar: avatar, title: 'Amelia Clark' },
  { id: '003', avatar: avatar, title: 'Christopher Campbell' },
  { id: '004', avatar: avatar, title: 'David Miller' },
  { id: '005', avatar: avatar, title: 'Austin Wade' },
  { id: '006', avatar: avatar, title: 'Amelia Clark' },
  { id: '007', avatar: avatar, title: 'Austin Wade' },
  { id: '008', avatar: avatar, title: 'Christopher Campbell' },
  { id: '009', avatar: avatar, title: 'Austin Wade' },
]

const RecipeDetails = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const { recipeId } = useParams()
  const { getRecipe, deleteRecipe } = useRecipesHook();
  const recipe:any = useRecoilValue(recipeState);
  const [modalRecipeDeleteOpen, setModalRecipeDeleteOpen] = useState(false);
  const [loadingDelRec, setLoadingDelRec] = useState(false);
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    variableWidth: true,
    speed: 1200,
    slidesToScroll: 1,
  };



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getRecipe(recipeId)
  }, [])


  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDelRecipe = async () => {
    const response:any = await deleteRecipe(Number(recipeId), setLoadingDelRec)
    setModalRecipeDeleteOpen(false)
    navigate(`/${ROUTES_CONSTANTS.RECIPES}`)
  }

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function openModalRecipeDelete() {
    setModalRecipeDeleteOpen(true)
  }


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="recipe-detail-page">
        <PageHeader
          title={
            <Breadcrumb 
              breadCrumbData={[
                { name: "Sticky Orange Chicken" },
                { name: "Recipes", onClickNavigateTo: -1 },
              ]}  
            />
          }
          bordered
        />
        {recipe &&
          <div className="recipe-detail-card">
            <div className="recipe-detail-hero">
              <div className="recipe-image">
                <figure>
                  <img src={recipe?.image?.[0].url} />
                </figure>
              </div>
              <div className="recipe-hero-content">
                <div className="recipe-hero-title">
                  <Typography.Title level={1}>
                    {recipe?.name}
                  </Typography.Title>
                  <div className="recipe-hero-actions">
                    <Space size={20}>
                      <div
                        className="recipe-action update-recipe"
                        onClick={() => navigate(`/${ROUTES_CONSTANTS.RECIPE_UPDATE}/${recipeId}`)}
                      >
                        <IconEditRecipe />
                      </div>
                      <div className="recipe-action update-recipe" onClick={openModalRecipeDelete}>
                        <IconTrashRecipe />
                      </div>
                    </Space>
                  </div>
                </div>
                <div className="recipe-hero-description">{recipe?.description}</div>

                <div className="recipe-hero-meta-info">
                  <div className="recipe-hero-meta-row">
                    <div className="recipe-hero-meta-col">
                      <div className="recipe-hero-meta">
                        <div className="meta-label">Prep Time</div>
                        <div className="meta-label-value">{`${recipe?.prepTimeHours} hrs and ${recipe?.prepTimeMins} mins`}</div>
                      </div>
                    </div>
                    <div className="recipe-hero-meta-col">
                      <div className="recipe-hero-meta">
                        <div className="meta-label">Cook Time</div>
                        <div className="meta-label-value">{`${recipe?.cookTimeHours} hrs and ${recipe?.cookTimeMins} mins`}</div>
                      </div>
                    </div>
                    <div className="hero-meta-icons preparation">
                      <IconPreparationTime />
                    </div>
                    <div className="hero-meta-icons serving">
                      <IconServing />
                    </div>
                  </div>
                  <div className="recipe-hero-meta-row">
                    <div className="recipe-hero-meta-col full">
                      <div className="recipe-hero-meta">
                        <div className="meta-label">Servings</div>
                        <div className="meta-label-value">{recipe?.servings} servings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Typography.Title level={5}>Kitchen Gear</Typography.Title>
            <ul>
              <li>{recipe?.kitcherGear}</li>
            </ul>

            <Typography.Title level={5}>Ingredients</Typography.Title>
            <ul>
              <li>{recipe?.ingredients}</li>
            </ul>

            <Typography.Title level={5}>Instructions</Typography.Title>
            <ul>
              <li>{recipe?.instructions}.</li>
            </ul>

            <div className="recipe-carousel">
              <Slider {...settings}>
                {data.map((item) => {
                  return (
                    <div key={item.id} className="carousel-item">
                      <div className="carousel-card">
                        <div className="carousel-card-avatar">
                          <Avatar src={item.avatar} size={48} />
                        </div>
                        <div className="carousel-card-title">{item.title}</div>
                        <div className="carousel-card-rate">
                          <Rate value={3} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        }
      </div>

      <Alert
        type="error"
        width={570}
        state={modalRecipeDeleteOpen}
        setState={setModalRecipeDeleteOpen}
        cancelBtntxt={'Cancel'}
        okBtntxt={'Delete'}
        okBtnFunc={() => handleDelRecipe()}
        children={<p>Are you sure you want to delete this?</p>}
      />
    </>
  )
}

export default RecipeDetails