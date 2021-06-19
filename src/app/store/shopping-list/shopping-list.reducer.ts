import { Ingredient } from "src/app/pages/shared/ingredient";
import * as ShoppingListActions from './shopping-list.action';



export interface State{
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}

const initialState :State = {
  ingredients: [
    new Ingredient('Apple', 4),
    new Ingredient('Banana', 4)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
    
}

export function ShoppingListReducer(state=initialState, action:ShoppingListActions.ShoppingListActions) {
  
 
  switch (action.type) {
    
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients:[...state.ingredients,action.payload]
      }
    
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients:[...state.ingredients, ...action.payload]
      }
    
      case ShoppingListActions.UPDATE_INGREDIENTS:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      // replacing/updating old object with new
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients]
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex:-1
      }
    
    
      case ShoppingListActions.DELETE_INGREDIENTS:
       
      return {
        ...state,
        ingredients: state.ingredients.filter((ig,igindex) => {
          return igindex !== state.editedIngredientIndex;          
        })
        ,
        editedIngredient: null,
        editedIngredientIndex:-1
      }
    
    
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.  payload] }
      }
      case ShoppingListActions.STOP_EDIT:
        return {
          ...state,
          editedIngredientIndex: -1,
          editedIngredient: null
        }
    
    default:
      return state;

  }
}