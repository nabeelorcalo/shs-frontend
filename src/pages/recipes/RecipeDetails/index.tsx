import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Avatar, Rate, Space, Button, Spin } from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import { PageHeader, Alert, Breadcrumb, Notifications } from "../../../components";
import { ROUTES_CONSTANTS } from '../../../config/constants';
import { IconPreparationTime, IconServing, IconEditRecipe, IconTrashRecipe } from '../../../assets/images';
import "./style.scss";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRecoilValue } from "recoil";
import { recipeState } from "../../../store";
import useRecipesHook from '../actionHandler';
import {currentUserState} from '../../../store';



const RecipeDetails = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const { recipeId } = useParams()
  const sliderRef = useRef(null);
  const { getRecipe, deleteRecipe } = useRecipesHook();
  const recipe:any = useRecoilValue(recipeState);
  const currentUser = useRecoilValue(currentUserState)
  const [modalRecipeDeleteOpen, setModalRecipeDeleteOpen] = useState(false);
  const [loadingDelRec, setLoadingDelRec] = useState(false);
  const [loading, setLoading] = useState(false);
  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    autoplay: false,
    variableWidth: true,
    speed: 1200,
    slidesToScroll: 1,
  };



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getRecipe(recipeId, setLoading);
  }, [])


  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleDelRecipe = async () => {
    
    try {
      const response:any = await deleteRecipe(Number(recipeId))
      if(!response.error) {
        Notifications({title: "Success", description: "The recipe has been deleted.", type: 'success'});
      }
    } catch(error) {
      return
    } finally {
      setLoadingDelRec(true)
      closeModalRecipeDelete()
      navigate(`/${ROUTES_CONSTANTS.RECIPES}`)
    }  
  }

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function openModalRecipeDelete() {
    setModalRecipeDeleteOpen(true)
  }

  function closeModalRecipeDelete() {
    setModalRecipeDeleteOpen(false)
  }


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="recipe-detail-page">
        <Spin spinning={loading} indicator={<LoadingOutlined />}>
        {recipe &&
          <>
            <PageHeader
              title={
                <Breadcrumb 
                  breadCrumbData={[
                    { name: recipe?.name },
                    { name: "Recipes", onClickNavigateTo: -1 },
                  ]}  
                />
              }
              bordered
            />
            
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
                    {recipe?.userId === currentUser?.id ? 
                      (
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
                      ) : ( <></> )
                    }
                  </div>
                  <div className="recipe-hero-description">{recipe?.description}</div>

                  <div className="recipe-hero-meta-info">
                    <div className="recipe-hero-meta-row">
                      <div className="recipe-hero-meta-col">
                        <div className="recipe-hero-meta">
                          <div className="meta-label">Prep Time</div>
                          <div className="meta-label-value">{(Number(recipe?.prepTimeHours) * 60) + Number(recipe?.prepTimeMins)} mins</div>
                        </div>
                      </div>
                      <div className="recipe-hero-meta-col">
                        <div className="recipe-hero-meta">
                          <div className="meta-label">Cook Time</div>
                          <div className="meta-label-value">{(Number(recipe?.cookTimeHours) * 60) + Number(recipe?.cookTimeMins)} mins</div>
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
                {recipe?.kitcherGear?.split(',').map((item:any) => {
                  return (
                    <li>{item}</li>
                  )
                })}
              </ul>

              <Typography.Title level={5}>Ingredients</Typography.Title>
              <ul>
                {recipe?.ingredients?.split(',').map((item:any) => {
                  return (
                    <li>{item}</li>
                  )
                })}
              </ul>

              <Typography.Title level={5}>Instructions</Typography.Title>
              <ul>
                {recipe?.instructions?.split(',').map((item:any) => {
                  return (
                    <li>{item}</li>
                  )
                })}
              </ul>

              <div className="recipe-carousel">
                <Slider {...settings} ref={sliderRef}>
                  {recipe?.ratings?.map((rate:any) => {
                    return (
                      <div key={rate?.id} className="carousel-item">
                        <div className="carousel-card">
                          <div className="carousel-card-avatar">
                            <Avatar src={rate.avatar} size={48}>
                              {rate?.ratedBy?.firstName.charAt(0)}{rate?.ratedBy?.lastName.charAt(0)}
                            </Avatar>
                          </div>
                          <div className="carousel-card-title">{rate?.ratedBy?.firstName} {rate?.ratedBy?.lastName}</div>
                          <div className="carousel-card-rate">
                            <Rate disabled defaultValue={rate?.rating} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </Slider>
              </div>
            </div>
          </>
        }
        </Spin>
      </div>

      <Alert
        type="error"
        width={570}
        state={modalRecipeDeleteOpen}
        setState={setModalRecipeDeleteOpen}
        children={<p>Are you sure you want to delete this?</p>}
        footer={[
          <Button className="button-secondary" ghost onClick={() => closeModalRecipeDelete()}>Cancel</Button>,
          <Button 
            className="button-secondary" 
            loading={loadingDelRec} 
            onClick={() => handleDelRecipe()}
          >
            Delete
          </Button>,
        ]}
      />
    </>
  )
}

export default RecipeDetails