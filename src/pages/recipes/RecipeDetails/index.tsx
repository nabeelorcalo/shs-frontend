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

// Temporary
import recipeSingleThumb from '../../../assets/images/gallery/recipe-single.png'
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
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    variableWidth: true,
    speed: 1200,
    slidesToScroll: 1,
  };
  const [modalRecipeDeleteOpen, setModalRecipeDeleteOpen] = useState(false)



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



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

        <div className="recipe-detail-card">
          <div className="recipe-detail-hero">
            <div className="recipe-image">
              <figure>
                <img src={recipeSingleThumb} alt={'Sticky Orange Chicken'} />
              </figure>
            </div>
            <div className="recipe-hero-content">
              <div className="recipe-hero-title">
                <Typography.Title level={1}>
                  Sticky Orange Chicken
                </Typography.Title>
                <div className="recipe-hero-actions">
                  <Space size={20}>
                    <div
                      className="recipe-action update-recipe"
                      onClick={() => navigate(`/recipe-update/${recipeId}`)}
                    >
                      <IconEditRecipe />
                    </div>
                    <div className="recipe-action update-recipe" onClick={openModalRecipeDelete}>
                      <IconTrashRecipe />
                    </div>
                  </Space>
                </div>
              </div>
              <div className="recipe-hero-description">This dish is a real crowd-pleaser. The sweet citrus glaze makes the chicken sticky and delicious—and it’s easy to make! Tip: Grate the zest before you juice the orange.</div>

              <div className="recipe-hero-meta-info">
                <div className="recipe-hero-meta-row">
                  <div className="recipe-hero-meta-col">
                    <div className="recipe-hero-meta">
                      <div className="meta-label">Prep Time</div>
                      <div className="meta-label-value">15 mins</div>
                    </div>
                  </div>
                  <div className="recipe-hero-meta-col">
                    <div className="recipe-hero-meta">
                      <div className="meta-label">Total Time</div>
                      <div className="meta-label-value">45 mins</div>
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
                      <div className="meta-label-value">4 servings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Typography.Title level={5}>Kitchen Gear</Typography.Title>
          <ul>
            <li>Cutting board</li>
            <li>Sharp knife (adult needed)</li>
            <li>Measuring cups</li>
            <li>Measuring spoons</li>
            <li>Rimmed baking sheet</li>
            <li>Small pot</li>
            <li>Wooden spoon or heatproof spatula</li>
            <li>Pot holders</li>
          </ul>

          <Typography.Title level={5}>Ingredients</Typography.Title>
          <ul>
            <li>8 bone-in, skin-on chicken thighs, excess fat removed</li>
            <li>1 teaspoon salt</li>
            <li>1/2 teaspoon black pepper</li>
            <li>For the sauce:</li>
            <li>Grated zest and juice of 1 orange</li>
            <li>1 tablespoon honey</li>
            <li>1 tablespoon mustard</li>
            <li>1/4 teaspoon low-sodium soy sauce</li>
            <li>For topping (if you like):</li>
            <li>2 scallions, roots trimmed off, green and white parts chopped</li>
            <li>1/4 cup chopped fresh cilantro leaves</li>
          </ul>

          <Typography.Title level={5}>Instructions</Typography.Title>
          <ul>
            <li>Turn the oven on and set the heat to 400 degrees.</li>
            <li>Put the chicken thighs on the baking sheet, skin side up, and sprinkle with the salt and pepper. Transfer to the oven and bake for 30 minutes.</li>
            <li>While the chicken is cooking, make the sauce: Put the orange zest and juice, honey, mustard, and soy sauce in the pot. Put the pot on the stove and turn the heat to medium low. Bring the liquid to a boil and cook, stirring occasionally, until slightly reduced (this means that the volume of liquid gets smaller as it steams), about 5 minutes. Set aside.</li>
            <li>Using pot holders, take the chicken out of the oven and carefully drizzle each piece with a generous amount of sauce. Return the chicken to the oven and cook until the chicken is deeply browned and sticky, 10 to 15 minutes. If you like, top with the sesame seeds, scallions, and cilantro and serve right away.</li>
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
      </div>

      <Alert
        type="error"
        width={570}
        state={modalRecipeDeleteOpen}
        setState={setModalRecipeDeleteOpen}
        cancelBtntxt={'Cancel'}
        okBtntxt={'Delete'}
        // okBtnFunc={}
        children={<p>Are you sure you want to delete this?</p>}
      />
    </>
  )
}

export default RecipeDetails