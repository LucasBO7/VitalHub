import { mask, unMask } from "remask";

// CEP
export const maskCep = (cepText) => mask(cepText, "99999-999");
export const unmaskCep = (cepTextMasked) => unMask(cepTextMasked);

// RG
export const maskRg = (rgText) => mask(rgText, "99.999.999-9");
export const unmaskRg = (rgTextMasked) => unMask(rgTextMasked);

// CPF
export const maskCpf = (cpfText) => mask(cpfText, "999.999.999-99");
export const unmaskCpf = (cpfTextMasked) => unMask(cpfTextMasked);

// Data Nascimento
// export const maskDate = (dataText) => mask(dataText, "99/99/9999");
export const maskDate = (dataText) => mask(dataText, "9999/99/99");
export const unmaskDate = (dataTextMasked) => unMask(dataTextMasked);

// 0000-00-00 --> 00/00/0000
// export const maskDateFormat = (dataText) => {
//   if (dataText.includes("-")) {
//     let [year, month, day] = dataText.split("-");
//     dataText = `${day}/${month}/${year}`;
//   } else {
//     mask(dataText, "99/99/9999");
//   }
// };

// 0000/00/00 --> 0000-00-00
export const unmaskDateToApi = (dataTextMasked) => {
  return dataTextMasked.replace(/\//g, "-");
};
