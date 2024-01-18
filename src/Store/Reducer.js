

const initialState = {
    user: null,
    recipes: [],
    shoppingList: [],
    currentRecipe: null
}
const Reducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_USER": {
            return { ...state, user: action.payload }
        }
        case "SET_RECIPES": {
            return { ...state, recipes: action.payload }
        }
        case "SET_SHOPPINGLIST": {
            return { ...state, shoppingList: action.payload }
        }
        case "DELETE_PRODUCT": {
            const shoppingList = state.shoppingList.filter(x => x.Name != action.payload.Name)
            return { ...state, shoppingList }
        }
        case "EDIT_PRODUCT": {
            console.log("action.payload",action.payload);
            const shoppingList = [...state.shoppingList];
            let index = shoppingList.findIndex(x => x.Name == action.payload.Name);
            if (index == -1)
                shoppingList.push(action.payload);
            else
                if (action.payload.Count == 0)
                    shoppingList.splice(index, 1)
                else
                    shoppingList[index] = action.payload
            return { ...state, shoppingList }
        }
        // case "SET_RECIPE":
        //     return { ...state, recipes: action.data }
        // case "ADD_RECIPE":
        //     const recipes = [...state.recipes];
        //     state.recipes.push(action.recipe);
        //     return { ...state, recipes }
        // case "EDIT_RECIPE": {
        //     const recipes = [...state.recipes];
        //     const findIndex = recipes.findIndex(x => x.Id == action.recipe.Id);
        //     recipes[findIndex] = action.recipe;
        //     return { ...state, recipes }
        // }
        // case "DELETE_RECIPE": {
        //     const recipes = state.recipes.filter(x => x.id != action.id);
        //     return { ...state, recipes }
        // }
        default: return { ...state }
    }

}
export default Reducer;