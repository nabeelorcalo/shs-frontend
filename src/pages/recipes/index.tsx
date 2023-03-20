import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Row, Col } from 'antd'
import { PageHeader, RecipeCard, ExtendedButton, SearchBar } from "../../components"
import { IconAddRecipe } from '../../assets/images'
import "./style.scss";

// Temporary data
import recipeThumb from '../../assets/images/gallery/recipeCard.png'
import recipeThumb1 from '../../assets/images/gallery/recipeCard1.png'
import recipeThumb2 from '../../assets/images/gallery/recipeCard2.png'
const data = [
  {id: '01', title: 'Sticky Orange Chicken', thumb: recipeThumb, description: 'This dish is a real crowd-pleaser. The sweet citrus glaze makes the chicken sticky and delicious—and it’s easy to make!', rating: 3, status: 'published' },
  {id: '02', title: 'Chicharos Cubanos', thumb: recipeThumb1, description: 'These chicharos Cubanos are Cuban-style split pea soup. Made with dried green split pleas, smoked pork, potatoes, and butternut squash.', rating: 3, status: 'published' },
  {id: '03', title: 'Succotash', thumb: recipeThumb2, description: 'This succotash is a warm vegetable dish packed with buttery corn, blistered cheery tomatoes, and tender lima beans, green beans, red on...', rating: 3, status: 'draft' },
  {id: '04', title: 'Succotash', thumb: recipeThumb2, description: 'This succotash is a warm vegetable dish packed with buttery corn, blistered cheery tomatoes, and tender lima beans, green beans, red on...', rating: 3, status: 'draft' },
]

const Recipes = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const [rateValue, setRateValue] = useState(3)
  


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
      <PageHeader
        title="Recipes"
        bordered
      />

      <div className="page-filterbar">
        <div className="page-filterbar-left">
          <div className="searchbar-wrapper">
            <SearchBar handleChange={() => console.log('i am changed')}/>
          </div>
        </div>
        <div className="page-filterbar-right">
          <ExtendedButton onClick={() => navigate('/add-recipe')} customType="tertiary" icon={<IconAddRecipe />}>
            Add New Recipe
          </ExtendedButton>
        </div>
      </div>

      <div className="recipes-content-body">
        <Row gutter={30}>
          {data.map((recipe, index) => {
            return (
              <Col key={index} xs={24} sm={12} xl={8} xxl={6}>
                <RecipeCard
                  title={recipe.title}
                  thumb={recipe.thumb}
                  description={recipe.description}
                  rating={rateValue}
                  status={recipe.status}
                  onCardClick={() => navigate(`/recipe/${recipe.id}`)}
                  onRateChange={handleRateChange}
                />
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

export default Recipes