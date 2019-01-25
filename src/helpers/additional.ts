const convertToRupiah = (angka) => {
    var rupiah = '';		
	var angkarev = angka.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
	return rupiah.split('',rupiah.length-1).reverse().join('');
}

const exact = (angka) => {
	return String("0" + angka).slice(-2)
}

export default {
	convertToRupiah,
	exact
}