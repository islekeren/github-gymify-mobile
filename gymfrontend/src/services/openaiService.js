
import axios from 'axios';

const getRecipe = async (recipeData) => {
  try {
    const response = await axios.post('https://backend-ghoa.onrender.com/recipe', recipeData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Tarif alınırken bir hata oluştu');
  }
};

export default getRecipe;


//https://expo.dev/artifacts/eas/ptJhoyyYBtFcVezbqzZaEk.aabit.