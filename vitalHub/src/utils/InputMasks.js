import { mask, unMask } from "remask";

export const mascararCep = (cepText) => mask(cepText, "99999-999")

export const desmascararCep = (cepTextMasked) => unMask(cepTextMasked)

export const mascararRg = (rgText) => mask(rgText, "99.999.999-9")

export const desmascararRg = (rgTextMasked) => unMask(rgTextMasked)

export const mascararCpf = (cpfText) => mask(cpfText, "999.999.999-99")

export const desmascararCpf = (cpfTextMasked) => unMask(cpfTextMasked)

export const maskData = (dataText) => mask(dataText, "99/99/9999")