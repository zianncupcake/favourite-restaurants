export const getTimeAgo = (timestamp) => {
  const now = Date.now();
  const secondsAgo = Math.floor((now - timestamp) / 1000);

  const units = [
    { max: 60, value: 60, suffix: "m" },
    { max: 24, value: 60, suffix: "h" },
    { max: 7, value: 24, suffix: "d" },
    { max: 52, value: 7, suffix: "w" },
    { max: Infinity, value: 52, suffix: "y" },
  ];

  let time = secondsAgo;
  for (const unit of units) {
    time = Math.floor(time / unit.value);
    if (time < unit.max) {
      return `${time}${unit.suffix}`;
    }
  }
};

export const sortRestaurants = (restaurants, sortBy) => {
  switch (sortBy) {
    case "Most recent":
      return [...restaurants].sort((a, b) => b.createdAt - a.createdAt);
    case "Least recent":
      return [...restaurants].sort((a, b) => a.createdAt - b.createdAt);
    case "A-Z":
      return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
    case "Favourited":
      return [...restaurants].sort((a, b) =>
        b.favourited === a.favourited ? 0 : b.favourited ? 1 : -1
      );
    case "Visited":
      return [...restaurants].sort((a, b) =>
        b.visited === a.visited ? 0 : b.visited ? 1 : -1
      );
    default:
      return restaurants;
  }
};

export const searchRestaurants = (restaurants, searchBy) => {
  if (!searchBy) return restaurants;

  const lowerCaseSearchBy = searchBy.toLowerCase();

  const filtered = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(lowerCaseSearchBy) ||
      restaurant.location.toLowerCase().includes(lowerCaseSearchBy) ||
      restaurant.description.toLowerCase().includes(lowerCaseSearchBy) ||
      restaurant.tags.some((tag) =>
        tag.toLowerCase().includes(lowerCaseSearchBy)
      )
  );
  return filtered;
};

export const getColumn1 = (restaurants) => {
  return restaurants.slice(0, Math.ceil(restaurants.length / 2));
};

export const getColumn2 = (restaurants) => {
  return restaurants.slice(Math.ceil(restaurants.length / 2));
};
