const initialState = {
    user: null,
    recipes: [],
    shoppingList: [],
    categoryList: [],
    currentRecipe: null,
    difficulties: [{ Id: 1, Name: 'קל' }, { Id: 2, Name: 'בינוני' }, { Id: 3, Name: 'קשה' }]
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER": {
            return { ...state, user: action.payload }
        }
        case "SET_RECIPES": {
            return { ...state, recipes: action.payload }
        }
        case "DELETE_RECIPE": {
            console.log("payload", action.payload);
            const recipes = state.recipes.filter(r => r.Id !== action.payload)
            return { ...state, recipes }
        }
        case "SET_SHOPPINGLIST": {
            return { ...state, shoppingList: action.payload }
        }
        case "DELETE_PRODUCT": {
            const shoppingList = state.shoppingList.filter(x => x.Name != action.payload.Name)
            return { ...state, shoppingList }
        }
        case "EDIT_PRODUCT": {
            const shoppingList = [...state.shoppingList];
            let index = shoppingList.findIndex(x => x.Name == action.payload.Name);
            if (parseInt(index) === -1)
                shoppingList.push(action.payload);
            else
                if (parseInt(action.payload.Count) === 0)
                    shoppingList.splice(index, 1)
                else
                    shoppingList[index].Count = action.payload.Count
            return { ...state, shoppingList }
        }
        case "SET_CATEGORIES": {
            return { ...state, categoryList: action.payload }

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