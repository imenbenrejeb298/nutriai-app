import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Recipes({ profile }) {
  const { t } = useTranslation();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Données simulées de recettes (dans une vraie application, cela viendrait d'une API)
  const mockRecipes = [
    {
      id: 1,
      name_key: 'meal_grilled_chicken_salad',
      ingredients: [
        { key: 'ing_chicken_breast' },
        { key: 'ing_mixed_greens' },
        { key: 'ing_light_vinaigrette' }
      ],
      calories: 350,
      protein: 35,
      prep_time: 20,
      difficulty: 'easy'
    },
    {
      id: 2,
      name_key: 'meal_lentil_soup',
      ingredients: [
        { key: 'ing_lentils' },
        { key: 'ing_veg_broth' },
        { key: 'ing_carrots_celery_onions' }
      ],
      calories: 280,
      protein: 18,
      prep_time: 45,
      difficulty: 'medium'
    },
    {
      id: 3,
      name_key: 'meal_baked_salmon',
      ingredients: [
        { key: 'ing_salmon_filet' },
        { key: 'ing_steamed_broccoli' },
        { key: 'ing_olive_oil_lemon' }
      ],
      calories: 420,
      protein: 38,
      prep_time: 25,
      difficulty: 'easy'
    },
    {
      id: 4,
      name_key: 'meal_spinach_omelette',
      ingredients: [
        { key: 'ing_eggs' },
        { key: 'ing_spinach_mushrooms' },
        { key: 'ing_goat_cheese' }
      ],
      calories: 320,
      protein: 25,
      prep_time: 15,
      difficulty: 'easy'
    },
    {
      id: 5,
      name_key: 'meal_chickpea_curry',
      ingredients: [
        { key: 'ing_chickpeas' },
        { key: 'ing_coconut_milk' },
        { key: 'ing_spices' }
      ],
      calories: 380,
      protein: 15,
      prep_time: 35,
      difficulty: 'medium'
    },
    {
      id: 6,
      name_key: 'meal_stuffed_sweet_potato',
      ingredients: [
        { key: 'ing_sweet_potato' },
        { key: 'ing_black_beans' },
        { key: 'ing_avocado_cilantro' }
      ],
      calories: 410,
      protein: 12,
      prep_time: 50,
      difficulty: 'medium'
    }
  ];

  useEffect(() => {
    setRecipes(mockRecipes);
  }, []);

  const toggleFavorite = (recipeId) => {
    if (favorites.includes(recipeId)) {
      setFavorites(favorites.filter(id => id !== recipeId));
    } else {
      setFavorites([...favorites, recipeId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">{t('menu_recipes')}</h1>
        <p className="text-gray-600 mt-1">{t('recipes_subtitle')}</p>
      </div>

      {selectedRecipe ? (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="flex items-center text-emerald-600 hover:text-emerald-700"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('back_to_recipes')}
            </button>
            <button
              onClick={() => toggleFavorite(selectedRecipe.id)}
              className={`p-2 rounded-full ${favorites.includes(selectedRecipe.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            >
              <svg className="w-6 h-6" fill={favorites.includes(selectedRecipe.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t(selectedRecipe.name_key)}</h2>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div className="bg-emerald-50 rounded-lg px-4 py-2">
                <div className="text-sm text-emerald-600">{t('calories')}</div>
                <div className="font-semibold text-emerald-800">{selectedRecipe.calories} kcal</div>
              </div>
              <div className="bg-blue-50 rounded-lg px-4 py-2">
                <div className="text-sm text-blue-600">{t('protein')}</div>
                <div className="font-semibold text-blue-800">{selectedRecipe.protein}g</div>
              </div>
              <div className="bg-amber-50 rounded-lg px-4 py-2">
                <div className="text-sm text-amber-600">{t('prep_time')}</div>
                <div className="font-semibold text-amber-800">{selectedRecipe.prep_time} min</div>
              </div>
              <div className="bg-purple-50 rounded-lg px-4 py-2">
                <div className="text-sm text-purple-600">{t('difficulty')}</div>
                <div className="font-semibold text-purple-800">{t(selectedRecipe.difficulty)}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('ingredients')}</h3>
              <ul className="space-y-3">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-emerald-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t(ingredient.key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('instructions')}</h3>
              <ol className="space-y-3">
                {[1, 2, 3, 4, 5].map((step) => (
                  <li key={step} className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mr-3">
                      {step}
                    </span>
                    <span className="text-gray-700">{t(`recipe_step_${step}`)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{t(recipe.name_key)}</h3>
                  <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className={`p-1 ${favorites.includes(recipe.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}
                  >
                    <svg className="w-5 h-5" fill={favorites.includes(recipe.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {recipe.calories} {t('calories')}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {recipe.protein}g {t('protein')}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {recipe.prep_time} min
                  </span>
                </div>
                
                <div className="mt-4">
                  <ul className="space-y-1">
                    {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <svg className="h-4 w-4 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {t(ingredient.key)}
                      </li>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <li className="text-sm text-gray-500">
                        + {recipe.ingredients.length - 3} {t('more_ingredients')}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className="w-full text-center text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  {t('view_recipe')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipes;