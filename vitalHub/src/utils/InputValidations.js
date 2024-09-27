export const getInvalidInputsName = (inputs, inputsName) => {
  let names = "";

  for (let index = 0; index < inputs.length; index++) {
    if (
      inputs[index] == "" ||
      inputs[index] == " " ||
      inputs[index] == undefined ||
      inputs[index] == null
    ) {
      names = `${names} ${inputsName[index]}`;
    }
  }
  return `${names} inválidos`;
}
