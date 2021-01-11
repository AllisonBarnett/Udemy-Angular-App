import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();

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

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}