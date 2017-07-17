export const showMenu = (show) => {
  return {type: 'SHOW_MENU', show}
}

export const showDialog = (show) => {
  return {type: 'SHOW_DIALOG', show}
}

export const jobDetails = (type, value, day) => {
  return {type, value, day}
}

export const storeRegistDetails = (type, value) => {
  return {type, value}
}