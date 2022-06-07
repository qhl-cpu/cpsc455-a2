import "../css/form.css"
import React, { useState} from "react";
import AddedRecipe from './AddedRecipe'
import PreLoaded from '../json/preloaded.json'
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../actions/index.js'
import RecipePopUp from './RecipePopUp';

function newRecipe(title, ingredient, instruction, cookingTime) {
  return {
    id: Date.now(), title: title, ingredient: ingredient,
    instruction: instruction, cookingTime: cookingTime, complete: false
  }
}

export default function Form() {
  const count = useSelector(state => state.buttonCount);
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [instruction, setInstruction] = useState('')
  const [cookingTime, setCookingTime] = useState(1)

  const [list, setList] = React.useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);

  const recipe = {
    id: Date.now(), title: PreLoaded[0].RecipeTitle, ingredient: PreLoaded[0].Ingredients,
    instruction: PreLoaded[0].Instructions, cookingTime: PreLoaded[0].EstimatedCookingTime
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(increment(newRecipe(title, ingredient, instruction, cookingTime)))
    const newList = list.concat({
      id: Date.now(), title: title, ingredient: ingredient,
      instruction: instruction, cookingTime: cookingTime
    });
    setList(newList);
  }

  return (
    <div id="container-div">
      <div id="form-container">
        <img src={require('../ArtResources/cooking-1.gif')} alt="this is a cooking gif" className="cookingGif" width="276" height="232" />
        <form id="recipeForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="RecipeTitle">Recipe title</label>
            <input onChange={e => setTitle(e.target.value)}
              type="text" name="Recipe Title" id="RecipeTitle" placeholder="title goes here" required />
          </div>

          <div>
            <label htmlFor="Ingredients">Ingredients</label>
            <input onChange={e => setIngredient(e.target.value)}
              type="text" name="Ingredients" id="Ingredients" placeholder="Ingredients goes here" required />
          </div>

          <div>
            <label htmlFor="Instructions">Instructions</label>
            <input onChange={e => setInstruction(e.target.value)}
              type="text" name="Instructions" id="Instructions" placeholder="Instructions goes here" required />
          </div>

          <div>
            <label htmlFor="CookingTime">Estimated cooking time(mins)</label>
            <input onChange={e => setCookingTime(e.target.value)}
              type="number" name="Estimated cooking time(mins)" id="CookingTime" min="1" max="1440" value={cookingTime} step={1} required />
          </div>
          <div>
            <button type="submit" id="addRecipe" >Submit</button>
            <button type="reset" id="resetRecipe">Clear All</button>
          </div>
        </form>
      </div>
      <div>
        <ul id="RecipeCards">
          <li id="preloaded">
            {"RecipeTitle: " + recipe.title} <br />
            {"Ingredients: " + recipe.ingredient} <br />
            {"Instructions: " + recipe.instruction} <br />
            {"EstimatedCookingTime(mins): " + recipe.cookingTime} <br />
            <button type="button" id="openRecipeButton"
              onClick={() => setButtonPopup(true)}>Open Recipe</button>

            <div>
              <RecipePopUp trigger={buttonPopup} setTrigger={setButtonPopup}
                title={recipe.title} instruction={recipe.instruction}>
              </RecipePopUp>
            </div>
          </li>
        </ul>
        
      </div>
      
      {list.map((item) => {
            return <AddedRecipe key={item.id} recipe={item} />
          })}
    </div>
  );
}
