import api from '../../api';
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { allRecipesState, recipeState } from "../../store";
import { Notifications } from '../../components';
import constants from '../../config/constants';
import { useState } from 'react';


const useRecipesHook = () => {
  const [allRecipesData, setAllRecipesData] = useRecoilState(allRecipesState);
  const [totalRecipes, setTotalRecipes] = useState(0)
  const [recipe, setRecipe] = useRecoilState(recipeState)
  const { CREATE_RECIPE, GET_ALL_RECIPES, GET_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, ADD_RATING } = endpoints

  // Create Recipe
  const createRecipe = async (reqBody: any) => {
    return await api.post(CREATE_RECIPE, reqBody, {headers: {'Content-Type': 'multipart/form-data'}})
  }

  // Read Recipes
  const getAllRecipes = async (params: any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const response = await api.get(`${GET_ALL_RECIPES}`, params);
      setAllRecipesData(response?.data);
      setTotalRecipes(response?.count)
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Read Single Recipe
  const getRecipe = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    try {
      const response = await api.get(`${GET_RECIPE}/${id}`);
      if(!response.error) {
        let {data} = response;
        const image = [{
          uid: data?.recipeImage?.mediaId,
          name: `${data?.recipeImage?.filename}.${data?.recipeImage.metaData.extension}`        ,
          url: `${constants.MEDIA_URL}/${data?.recipeImage?.mediaId}.${data?.recipeImage?.metaData.extension}`
        }]
        setRecipe({...data, image})
      }
    } catch (error) {
      return;
    } finally {
      setLoading(false)
    }
    
  }

  // Update Recipe
  const updateRecipe = async (reqBody: any) => {
    const response =await api.post(`${UPDATE_RECIPE}`, reqBody, {headers: {'Content-Type': 'multipart/form-data'}});
    return response;
    // Notifications({title: "Success", description: response.message, type: 'success'});
  }

  // Delete Agent Property
  const deleteRecipe = async (id:any) => {
    const response = await api.delete(`${DELETE_RECIPE}?recipeId=${id}`,);
    return response;
  }

  // Add Rating
  const addRating = async (id:any, rating:any) => {
    return await api.post(`${ADD_RATING}?recipeId=${id}&rating=${rating}`)
  }

  return {
    createRecipe,
    getAllRecipes,
    allRecipesData,
    totalRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe,
    addRating
  };
};

export default useRecipesHook;