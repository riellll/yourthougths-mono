export const stopPropagation = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>
  ) => {
    e.stopPropagation();
  };