// Utility functions for BMI calculation and category
export function calculateBMI(weightKg, heightCm) {
  const h = Number(heightCm) / 100;
  const w = Number(weightKg);
  if (!h || !w || h <= 0 || w <= 0) return null;
  const bmi = w / (h * h);
  return Number(bmi.toFixed(1));
}

export function bmiCategory(bmi) {
  if (bmi == null) return null;
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

export function bmiAdvice(bmi) {
  const cat = bmiCategory(bmi);
  switch (cat) {
    case 'underweight':
      return 'gain_weight_advice';
    case 'normal':
      return 'maintain_weight_advice';
    case 'overweight':
      return 'lose_weight_advice';
    case 'obese':
      return 'medical_advice';
    default:
      return null;
  }
}
