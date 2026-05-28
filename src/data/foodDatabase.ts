export interface FoodItem {
  id: string;
  nameEn: string;
  nameZh: string;
  category: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const commonFoods: FoodItem[] = [
  { id: 'egg', nameEn: 'Egg (1 large)', nameZh: '鸡蛋', category: 'Protein', serving: '1个', calories: 72, protein: 6.3, carbs: 0.4, fat: 4.8 },
  { id: 'egg-white', nameEn: 'Egg white', nameZh: '蛋白', category: 'Protein', serving: '1个', calories: 17, protein: 3.6, carbs: 0.2, fat: 0 },
  { id: 'chicken-breast', nameEn: 'Chicken breast', nameZh: '鸡胸肉', category: 'Protein', serving: '100g', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 'chicken-thigh', nameEn: 'Chicken thigh', nameZh: '鸡腿肉', category: 'Protein', serving: '100g', calories: 209, protein: 26, carbs: 0, fat: 11 },
  { id: 'beef-lean', nameEn: 'Beef (lean)', nameZh: '瘦牛肉', category: 'Protein', serving: '100g', calories: 250, protein: 26, carbs: 0, fat: 15 },
  { id: 'pork-lean', nameEn: 'Pork (lean)', nameZh: '瘦猪肉', category: 'Protein', serving: '100g', calories: 242, protein: 27, carbs: 0, fat: 14 },
  { id: 'salmon', nameEn: 'Salmon', nameZh: '三文鱼', category: 'Protein', serving: '100g', calories: 208, protein: 20, carbs: 0, fat: 13 },
  { id: 'shrimp', nameEn: 'Shrimp', nameZh: '虾仁', category: 'Protein', serving: '100g', calories: 99, protein: 24, carbs: 0.2, fat: 0.3 },
  { id: 'tofu', nameEn: 'Tofu (firm)', nameZh: '老豆腐', category: 'Protein', serving: '100g', calories: 76, protein: 8, carbs: 1.9, fat: 4.8 },
  { id: 'whey', nameEn: 'Whey protein (1 scoop)', nameZh: '乳清蛋白粉', category: 'Supplements', serving: '1勺/30g', calories: 120, protein: 25, carbs: 3, fat: 1.5 },
  { id: 'casein', nameEn: 'Casein protein', nameZh: '酪蛋白', category: 'Supplements', serving: '1勺/30g', calories: 120, protein: 24, carbs: 3, fat: 1 },
  { id: 'creatine', nameEn: 'Creatine (5g)', nameZh: '肌酸', category: 'Supplements', serving: '5g', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { id: 'rice-white', nameEn: 'White rice (cooked)', nameZh: '白米饭', category: 'Carbs', serving: '150g/1碗', calories: 195, protein: 4, carbs: 43, fat: 0.4 },
  { id: 'rice-brown', nameEn: 'Brown rice (cooked)', nameZh: '糙米饭', category: 'Carbs', serving: '150g', calories: 165, protein: 4, carbs: 34, fat: 1.4 },
  { id: 'bread-whole', nameEn: 'Whole wheat bread', nameZh: '全麦面包', category: 'Carbs', serving: '1片', calories: 81, protein: 4, carbs: 14, fat: 1.4 },
  { id: 'bread-white', nameEn: 'White bread', nameZh: '白面包', category: 'Carbs', serving: '1片', calories: 79, protein: 2.7, carbs: 14, fat: 1 },
  { id: 'oatmeal', nameEn: 'Oatmeal (cooked)', nameZh: '燕麦粥', category: 'Carbs', serving: '250g/1碗', calories: 154, protein: 5.3, carbs: 27, fat: 2.8 },
  { id: 'sweet-potato', nameEn: 'Sweet potato', nameZh: '红薯', category: 'Carbs', serving: '150g/1个', calories: 129, protein: 2.3, carbs: 30, fat: 0.2 },
  { id: 'pasta', nameEn: 'Pasta (cooked)', nameZh: '意面', category: 'Carbs', serving: '200g/1份', calories: 262, protein: 9, carbs: 50, fat: 2.3 },
  { id: 'banana', nameEn: 'Banana', nameZh: '香蕉', category: 'Carbs', serving: '1根', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { id: 'apple', nameEn: 'Apple', nameZh: '苹果', category: 'Carbs', serving: '1个', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { id: 'milk-whole', nameEn: 'Whole milk', nameZh: '全脂牛奶', category: 'Dairy', serving: '250ml', calories: 150, protein: 8, carbs: 12, fat: 8 },
  { id: 'milk-skim', nameEn: 'Skim milk', nameZh: '脱脂牛奶', category: 'Dairy', serving: '250ml', calories: 83, protein: 8, carbs: 12, fat: 0.2 },
  { id: 'yogurt-greek', nameEn: 'Greek yogurt', nameZh: '希腊酸奶', category: 'Dairy', serving: '150g', calories: 97, protein: 15, carbs: 5, fat: 1.5 },
  { id: 'cheese', nameEn: 'Cheddar cheese', nameZh: '切达芝士', category: 'Dairy', serving: '30g/1片', calories: 113, protein: 7, carbs: 0.4, fat: 9.3 },
  { id: 'almond', nameEn: 'Almonds', nameZh: '杏仁', category: 'Fats', serving: '30g/一小把', calories: 173, protein: 6, carbs: 6, fat: 15 },
  { id: 'peanut-butter', nameEn: 'Peanut butter', nameZh: '花生酱', category: 'Fats', serving: '2tbsp/32g', calories: 188, protein: 8, carbs: 6, fat: 16 },
  { id: 'avocado', nameEn: 'Avocado', nameZh: '牛油果', category: 'Fats', serving: '100g/半个', calories: 160, protein: 2, carbs: 9, fat: 15 },
  { id: 'olive-oil', nameEn: 'Olive oil', nameZh: '橄榄油', category: 'Fats', serving: '1tbsp/15ml', calories: 119, protein: 0, carbs: 0, fat: 13.5 },
  { id: 'broccoli', nameEn: 'Broccoli', nameZh: '西兰花', category: 'Vegetables', serving: '100g', calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  { id: 'spinach', nameEn: 'Spinach', nameZh: '菠菜', category: 'Vegetables', serving: '100g', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { id: 'mixed-veg', nameEn: 'Mixed vegetables', nameZh: '混合蔬菜', category: 'Vegetables', serving: '150g', calories: 50, protein: 3, carbs: 9, fat: 0.5 },
];

export const searchFoods = (query: string): FoodItem[] => {
  const q = query.toLowerCase();
  return commonFoods.filter(
    (f) =>
      f.nameEn.toLowerCase().includes(q) ||
      f.nameZh.includes(query) ||
      f.category.toLowerCase().includes(q),
  );
};
