import api from '../../api';
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { allRecipesState, recipeState } from "../../store";
import { Notifications } from '../../components';


const useRecipesHook = () => {
  const [allRecipes, setAllRecipes] = useRecoilState(allRecipesState)
  const [recipe, setRecipe] = useRecoilState(recipeState)
  const { CREATE_RECIPE, GET_ALL_RECIPES, GET_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } = endpoints

  // Create Recipe
  const createRecipe = async (reqBody: any) => {
    return await api.post(CREATE_RECIPE, reqBody, {headers: {'Content-Type': 'multipart/form-data'}})
  }

  // Read Recipes
  const getAllRecipes = async (page:any) => {
    const response = await api.get(GET_ALL_RECIPES, {page: page, limit: 8});
    return response;
  }

  // Read Single Recipe
  const getRecipe = async (id:any) => {
    const response = await api.get(`${GET_RECIPE}/${id}`);
    if(!response.error) {
      let {data} = response;
      const image = [{
        uid: data?.recipeImage?.mediaId,
        name: `${data?.recipeImage?.filename}.${data?.recipeImage.metaData.extension}`        ,
        url: `http://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${data?.recipeImage?.mediaId}.${data?.recipeImage?.metaData.extension}`
      }]
      setRecipe({...data, image})
    }
  }

  // Update Recipe
  const updateRecipe = async (id:any, reqBody: any) => {
    const response =await api.post(`${UPDATE_RECIPE}/${id}`, reqBody, {headers: {'Content-Type': 'multipart/form-data'}});
    return response;
    // Notifications({title: "Success", description: response.message, type: 'success'});
  }

  // Delete Agent Property
  const deleteRecipe = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    const response = await api.delete(`${DELETE_RECIPE}${id}`);
    Notifications({title: "Success", description: response.message, type: 'success'});
    const updatedRecipes = allRecipes.filter((item:any) => item.id !== id);
    setAllRecipes(updatedRecipes);
    setLoading(false);
  }

  return {
    createRecipe,
    getAllRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe
  };
};

export default useRecipesHook;