import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Artichoke Pesto Pizza', 
        'Made with homemade pizza dough and fresh herbs', 
        'https://www.halfbakedharvest.com/wp-content/uploads/2019/01/Artichoke-Pesto-and-Burrata-Pizza-with-Lemony-Arugula-1.jpg',
        [
            new Ingredient('Pizza Dough', 1),  
            new Ingredient('Artichokes', 3)  

        ]),

        new Recipe('Greek Chicken Skillet', 
        'A great make-ahead freezer option', 
        'https://static.onecms.io/wp-content/uploads/sites/37/2019/12/RU325588.jpg',
        [
            new Ingredient('Chicken', 4),  
            new Ingredient('Garlic Cloves', 2)  
        ])
      ];

      constructor(private slService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients); 
    }
}