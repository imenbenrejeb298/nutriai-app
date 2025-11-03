/**
 * Mock AI engine that returns translation keys instead of hardcoded strings.
 */

const MEALS = {
  low_calorie: [
    { title: 'meal_grilled_chicken_salad', calories: 400, ingredients: [{ name: 'ing_chicken_breast', calories: 250 }, { name: 'ing_mixed_greens', calories: 50 }, { name: 'ing_light_vinaigrette', calories: 100 }] },
    { title: 'meal_lentil_soup', calories: 350, ingredients: [{ name: 'ing_lentils', calories: 120 }, { name: 'ing_veg_broth', calories: 30 }, { name: 'ing_carrots_celery_onions', calories: 200 }] },
  ],
  low_sugar: [
    { title: 'meal_baked_salmon', calories: 450, ingredients: [{ name: 'ing_salmon_filet', calories: 300 }, { name: 'ing_steamed_broccoli', calories: 100 }, { name: 'ing_olive_oil_lemon', calories: 50 }] },
    { title: 'meal_spinach_omelette', calories: 300, ingredients: [{ name: 'ing_eggs', calories: 160 }, { name: 'ing_spinach_mushrooms', calories: 90 }, { name: 'ing_goat_cheese', calories: 50 }] },
  ],
  low_salt: [
    { title: 'meal_chickpea_curry', calories: 420, ingredients: [{ name: 'ing_chickpeas', calories: 200 }, { name: 'ing_coconut_milk', calories: 120 }, { name: 'ing_spices', calories: 100 }] },
    { title: 'meal_stuffed_sweet_potato', calories: 380, ingredients: [{ name: 'ing_sweet_potato', calories: 180 }, { name: 'ing_black_beans', calories: 130 }, { name: 'ing_avocado_cilantro', calories: 70 }] },
  ],
  high_calorie: [
    { title: 'meal_pasta_pesto_chicken', calories: 600, ingredients: [{ name: 'ing_whole_pasta', calories: 220 }, { name: 'ing_pesto', calories: 180 }, { name: 'ing_diced_chicken', calories: 200 }] },
    { title: 'meal_protein_smoothie', calories: 500, ingredients: [{ name: 'ing_banana', calories: 100 }, { name: 'ing_peanut_butter', calories: 200 }, { name: 'ing_protein_powder', calories: 120 }, { name: 'ing_whole_milk', calories: 80 }] },
  ],
};

const EXERCISES = {
  cardio: [
    { name: 'ex_brisk_walking', minutes: 30, caloriesBurned: 200 },
    { name: 'ex_stationary_bike', minutes: 25, caloriesBurned: 250 },
  ],
  strength: [
    { name: 'ex_bodyweight_circuit', minutes: 20, caloriesBurned: 180 },
    { name: 'ex_light_weightlifting', minutes: 25, caloriesBurned: 150 },
  ],
  flexibility: [
    { name: 'ex_stretching_yoga', minutes: 15, caloriesBurned: 60 },
  ],
};

function calculateBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return null;
  const h = Number(heightCm) / 100;
  const w = Number(weightKg);
  if (h <= 0 || w <= 0) return null;
  return w / (h * h);
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

function generateMockPlan(profile) {
  const { name, weight, height, conditions } = profile || {};
  const bmi = calculateBMI(weight, height);
  const category = bmi ? bmiCategory(bmi) : 'normal';

  const result = {
    summary_key: 'summary_base',
    summary_params: { name: name || '' },
    meals: [],
    exercises: [],
  };

  // 1. Select meals and exercises based on conditions and BMI
  if (conditions && conditions.diabetes) {
    result.summary_key = 'summary_diabetic';
    result.meals.push(...MEALS.low_sugar);
    result.exercises.push(EXERCISES.cardio[0], EXERCISES.strength[0]);
  } else if (conditions && conditions.hypertension) {
    result.summary_key = 'summary_hypertension';
    result.meals.push(...MEALS.low_salt);
    result.exercises.push(EXERCISES.cardio[0], EXERCISES.flexibility[0]);
  } else if (category === 'overweight' || category === 'obese') {
    result.summary_key = 'summary_overweight';
    result.meals.push(...MEALS.low_calorie);
    result.exercises.push(EXERCISES.cardio[0], EXERCISES.strength[0]);
  } else if (category === 'underweight') {
    result.summary_key = 'summary_underweight';
    result.meals.push(...MEALS.high_calorie);
    result.exercises.push(EXERCISES.strength[0], EXERCISES.flexibility[0]);
  } else {
    // Default case for normal weight
    result.meals.push(MEALS.low_sugar[0], MEALS.low_calorie[0]);
    result.exercises.push(EXERCISES.cardio[1], EXERCISES.flexibility[0]);
  }

  // Ensure we always return a consistent number of items
  result.meals = result.meals.slice(0, 2);
  result.exercises = result.exercises.slice(0, 2);

  return result;
}

module.exports = { generateMockPlan };
