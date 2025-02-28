export const selectFavorites = (state) => state.favorites.favorites || [];
export const selectFavoritesStatus = (state) => state.favorites.status;
export const selectFavoritesError = (state) => state.favorites.error;
