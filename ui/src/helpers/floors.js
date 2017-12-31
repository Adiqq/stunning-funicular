export const floorConverter = floorNumber => {
  switch (floorNumber) {
    case 0:
      return 'Parter';
    case 1:
    case 2:
    case 3:
    case 4:
      return floorNumber + ' piętro';
    case 5:
      return floorNumber + ' piętro lub wyższe';
  }
};
