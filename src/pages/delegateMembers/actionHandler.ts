import api from '../../api';
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { delegateMembersState } from "../../store";
import { Notifications } from '../../components';
import constants from '../../config/constants';


const useDelegateHook = () => {
  const { GET_DELEGAE_MEMBERS } = endpoints
  const [delegateMembers, setDelegateMembers] = useRecoilState(delegateMembersState)


  // GET DELEGATE MEMBERS
  const getDelegateMembers = async (params:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    const response = await api.get(GET_DELEGAE_MEMBERS, params);
    setDelegateMembers(response.data)
    setLoading(false)
  }

  // Read Single Recipe
  // const getRecipe = async (id:any) => {
  //   const response = await api.get(`${GET_RECIPE}/${id}`);
  //   if(!response.error) {
  //     let {data} = response;
  //     const image = [{
  //       uid: data?.recipeImage?.mediaId,
  //       name: `${data?.recipeImage?.filename}.${data?.recipeImage.metaData.extension}`        ,
  //       url: `${constants.MEDIA_URL}/${data?.recipeImage?.mediaId}.${data?.recipeImage?.metaData.extension}`
  //     }]
  //     setRecipe({...data, image})
  //   }
  // }

  // Update Recipe
  // const updateRecipe = async (reqBody: any) => {
  //   const response =await api.post(`${UPDATE_RECIPE}`, reqBody, {headers: {'Content-Type': 'multipart/form-data'}});
  //   return response;
  //   // Notifications({title: "Success", description: response.message, type: 'success'});
  // }

  // Delete Agent Property
  // const deleteRecipe = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
  //   setLoading(true)
  //   const response = await api.delete(`${DELETE_RECIPE}?recipeId=${id}`,);
  //   Notifications({title: "Success", description: response.message, type: 'success'});
  //   setLoading(false);
  // }

  return {
    getDelegateMembers
  };
};

export default useDelegateHook;