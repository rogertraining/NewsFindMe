export function defineCategoriesPrismaParams(categories) {
  const categories_prisma_params = []

  categories.forEach(category => {
    const param = {
      name: category
    }
    categories_prisma_params.push(param)
  });

  return categories_prisma_params
}