import areas from '@shared/constants/areas.json';

export const useCategory = () => {
  const toId = (category) => {
    for (const areaId in areas) {
      if (areas[areaId].label === category) return areaId;
    }
    return undefined;
  };

  const toCategory = (id) => {
    let area = areas[id];
    return area ? area.label : '';
  };

  return { toCategory, toId };
};
