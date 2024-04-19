export const GlobalOptions = (list, name, value) => {
  let arr = [];
  if (list) {
    list.forEach((item) => {
      const obj = {
        label: item[name],
        value: item[value],
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const genInvoice = (sr) => {
  let invoice = ""
  let cYear = new Date().getFullYear();

  if (sr < 9) {
    invoice = cYear + "000" + sr
  } else if (sr < 99) {
    invoice = cYear + "00" + sr
  } else if (sr < 999) {
    invoice = cYear + "0" + sr
  } else {
    invoice = cYear + "" + sr
  }
  return invoice
}