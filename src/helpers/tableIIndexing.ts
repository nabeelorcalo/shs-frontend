export const handleIndexCount = (value: string | number, page: string | number) => {
  const result = Number(value) + ((Number(page) - 1) * 10);
  return (result < 10 ? `0${result}` : result)
}