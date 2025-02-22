const getFormattedDate =(): string => {
    return new Date().toISOString().split("T")[0];
  }

  export default getFormattedDate