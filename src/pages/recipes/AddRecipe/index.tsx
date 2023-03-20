import React, { useState, useEffect } from "react";
import { Typography, Avatar, Rate, Space } from 'antd'
import {PageHeader, Alert} from "../../../components";
import { IconPreparationTime, IconServing, IconEditRecipe, IconTrashRecipe } from '../../../assets/images'
import "./style.scss";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Temporary
import recipeSingleThumb from '../../../assets/images/gallery/recipe-single.png'
import avatar from '../../../assets/images/header/avatar.svg'

const data = [
  {id: '001', avatar: avatar, title: 'Austin Wade'},
  {id: '002', avatar: avatar, title: 'Amelia Clark'},
  {id: '003', avatar: avatar, title: 'Christopher Campbell'},
  {id: '004', avatar: avatar, title: 'David Miller'},
  {id: '005', avatar: avatar, title: 'Austin Wade'},
  {id: '006', avatar: avatar, title: 'Amelia Clark'},
  {id: '007', avatar: avatar, title: 'Austin Wade'},
  {id: '008', avatar: avatar, title: 'Christopher Campbell'},
  {id: '009', avatar: avatar, title: 'Austin Wade'},
]

const AddRecipe = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
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
      <div className="add-new-recipe">
        <PageHeader
          title={<>Add New Recipe <span>Recipes</span></>}
          bordered
        />

        
      </div>
    </>
  )
}

export default AddRecipe