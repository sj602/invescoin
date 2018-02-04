export const addComma3letters = data => {
  return data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
