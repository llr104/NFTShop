
function addressShow(address){
	var b = address.substring(0,6);
	var a = address.substring(address.length-4);
	return b + "****" + a;
}


/**
 * 时间对象的格式化;
 */
Date.prototype.format = function(format) {
    /*
     * eg:format="YYYY-MM-dd hh:mm:ss";
     */
    var o = {
        "M+" :this.getMonth() + 1, // month
        "d+" :this.getDate(), // day
        "h+" :this.getHours(), // hour
        "m+" :this.getMinutes(), // minute
        "s+" :this.getSeconds(), // second
        "q+" :Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" :this.getMilliseconds()
    // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    }
    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}


function copy(text, cb){
	var input = text + '';
	const el = document.createElement('textarea');
	el.value = input;
	el.setAttribute('readonly', '');
	el.style.contain = 'strict';
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	el.style.fontSize = '12pt'; // Prevent zooming on iOS

	const selection = getSelection();
	var originalRange = false;
	if (selection.rangeCount > 0) {
		originalRange = selection.getRangeAt(0);
	}
	document.body.appendChild(el);
	el.select();
	el.selectionStart = 0;
	el.selectionEnd = input.length;

	var ret = false;
	try {
		ret = document.execCommand('copy');
	} catch (err) {
		if(cb){
			cb(err);
		}
	}
	document.body.removeChild(el);
	if (originalRange) {
		selection.removeAllRanges();
		selection.addRange(originalRange);
	}
	
	if(cb){
		cb(null);
	}
}

module.exports = {
	"addressShow": addressShow,
	"copy": copy
};

