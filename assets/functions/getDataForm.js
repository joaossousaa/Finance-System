export function getDataForm(form) {
  const formData = new FormData(form)
  const data = {}

  formData.forEach((value, key) => {
    if (key === "amount") {
      data[key] = parseFloat(value)
    } else {
      data[key] = value
    }
  })

  return data
}