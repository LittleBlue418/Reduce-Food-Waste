export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const labelFromKey = (key) => capitalize(key.replace(/_/g, ' '))
