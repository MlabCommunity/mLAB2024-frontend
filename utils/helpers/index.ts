export const getPluralForm = (count: number, key: string) => {
    if (count === 1) return (`${key}_one`);
    if (count > 1 && count < 5) return (`${key}_few`);
    return (`${key}_many`);
  };