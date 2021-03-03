export const translateCuisine = (translator, cuisine) => {
  const cuisineComponent = cuisine.toLowerCase();
  return translator.formatMessage({
    id: `cuisine.${cuisineComponent}`,
    defaultMessage: cuisineComponent,
  });
};
