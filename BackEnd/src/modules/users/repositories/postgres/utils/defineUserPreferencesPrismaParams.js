export function defineUserPreferencesPrismaParams(preferences) {
  const preferences_prisma_params = []

  preferences.forEach(preference => {
    const param = {
      category: {
        connect: {
          id: preference.id
        }
      }
    }
    preferences_prisma_params.push(param)
  })

  return preferences_prisma_params
}