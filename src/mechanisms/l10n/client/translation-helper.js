export const translateCuisine = (translator, cuisine) => {
  const cuisineComponent = cuisine.toLowerCase();
  return translator.formatMessage({
    id: `taxonomy.cuisine.${cuisineComponent}`,
    defaultMessage: cuisineComponent,
  });
};
