import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Row, Col } from 'antd'
import { PageHeader, RecipeCard, ExtendedButton, SearchBar } from "../../components"
import { IconAddRecipe } from '../../assets/images'
import { ROUTES_CONSTANTS } from '../../config/constants'
import "./style.scss";

// Temporary data
import recipeThumb from '../../assets/images/gallery/recipeCard.png'
import recipeThumb1 from '../../assets/images/gallery/recipeCard1.png'
import recipeThumb2 from '../../assets/images/gallery/recipeCard2.png'
const data = [
  { id: '01', title: 'Sticky Orange Chicken', thumb: recipeThumb, description: 'This dish is a real crowd-pleaser. The sweet citrus glaze makes the chicken sticky and delicious—and it’s easy to make!', rating: 3, status: 'published' },
  { id: '02', title: 'Chicharos Cubanos', thumb: recipeThumb1, description: 'These chicharos Cubanos are Cuban-style split pea soup. Made with dried green split pleas, smoked pork, potatoes, and butternut squash.', rating: 3, status: 'published' },
  { id: '03', title: 'Succotash', thumb: recipeThumb2, description: 'This succotash is a warm vegetable dish packed with buttery corn, blistered cheery tomatoes, and tender lima beans, green beans, red on...', rating: 3, status: 'draft' },
  { id: '04', title: 'Succotash', thumb: recipeThumb2, description: 'This succotash is a warm vegetable dish packed with buttery corn, blistered cheery tomatoes, and tender lima beans, green beans, red on...', rating: 3, status: 'draft' },
]

const Recipes = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const location = useLocation();
  const [rateValue, setRateValue] = useState(3);



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

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
        {data.map((recipe, index) => {
            return (
              <Col key={index} xs={24} sm={12} xl={8} xxl={6}>
                <RecipeCard
                  title={recipe.title}
                  thumb={recipe.thumb}
                  description={recipe.description}
                  rating={rateValue}
                  status={recipe.status}
                  onCardClick={() => navigate(`/recipe/${recipe.id}`, {state: {from: location.pathname}})}
                  onRateChange={handleRateChange}
                />
              </Col>
            )
          })}
      </Row>
    </div>
  )
}

export default Recipes