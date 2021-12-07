
function addressShow(address){
	var b = address.substring(0,6);
	var a = address.substring(address.length-4);
	return b + "****" + a;
}

module.exports = {
	"addressShow": addressShow
};

