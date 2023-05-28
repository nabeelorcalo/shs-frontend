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
  const getAllRecipes = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    const response = await api.get(GET_ALL_RECIPES);
    if(!response.error) {
      const { data } = response;
      setAllRecipes(data);
    }
    setLoading(false);
  }

  // Read Single Recipe
  const getRecipe = async (id:any) => {
    const response = await api.get(`${GET_RECIPE}/${id}`);
    if(!response.error) {
      setRecipe(response.data)
    }
  }

  // Update Recipe
  const updateRecipe = async (id:any, reqBody: any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    const response =await api.post(`${UPDATE_RECIPE}${id}`, reqBody);
    Notifications({title: "Success", description: response.message, type: 'success'});
    const updatedData:any = response.data;
    setAllRecipes(updatedData);
    setLoading(false);
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