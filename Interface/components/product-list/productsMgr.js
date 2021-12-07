
const productsMgr = (function () {
    function _mgr() {
        this.name = 'productsMgr'
		this.plMap = new Map();
		uni.$on("TokensUpdate", (ref)=>{
			console.log("TokensUpdate");
			this.putProducts(ref);
			uni.$emit("ProductUpdate", ref);
		})
		
		this.show = ()=>{
			console.log("show:", this.name);
		}
		
		this.putProducts = (products)=>{
			for (var i = 0; i < products.length; i++) {
				let p = products[i];
				this.plMap.set(p.id, p);
			}
		}
		
		this.getProuducts = ()=>{
			return [...this.plMap.values()];
		}
		
		this.getProuductById = (id) =>{
			return this.plMap.get(Number(id));
		}
		
		this.clearProuducts = ()=>{
			this.plMap.clear();
		}
    }
    return function () {
        if (!_mgr.instance) {
            _mgr.instance = new _mgr()
        }
        return _mgr.instance
    }
	
})()()

productsMgr.show()
module.exports = productsMgr;
 