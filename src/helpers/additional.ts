const convertToRupiah: any = (angka: number) => {
     let rupiah: string = '';
     const angkarev: any = Math.floor(angka).toString().split('').reverse().join('');
     for (let i = 0; i < angkarev.length; i++) { if (i % 3 == 0) { rupiah += angkarev.substr(i, 3) + '.'; } }
     return rupiah.split('', rupiah.length - 1).reverse().join('');
};

const exact: any = (angka: number) => {
  return String('0' + angka).slice(-2);
};

export default {
  convertToRupiah,
  exact,
};
