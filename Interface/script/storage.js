
const storage = (function () {
	function _mgr() {
		
		this.load = ()=>{
			this.hashToTokenId = {};
			this.tokenToHash = {};
			
			try {
			    const hashToTokenId = uni.getStorageSync('hashToTokenId');
			    if (hashToTokenId) {
			        this.hashToTokenId = hashToTokenId;
			    }
				const tokenToHash = uni.getStorageSync('tokenToHash');
				if (tokenToHash) {
				    this.tokenToHash = tokenToHash;
				}
				
			} catch (e) {
			    console.log("load:", e);
			}
		}
		
		this.setTransactionPennding = (tokenId, hash)=>{
			 
			  this.hashToTokenId[hash] = Number(tokenId);
			  this.tokenToHash[tokenId+""] = hash;
			  
			  try {
			     uni.setStorageSync("hashToTokenId", this.hashToTokenId);
			     uni.setStorageSync("tokenToHash", this.tokenToHash);
			  	
			  } catch (e) {
			      console.log("setTransactionPennding:", e);
			  }
			 
		}
		
		this.getTransactionPennding = (tokenId) => {
			  return this.tokenToHash[tokenId+""];
		}
		
		this.deleteHash = (hash) => {
			console.log("deleteHash:", hash);
			var tokenId = this.hashToTokenId[hash];
			delete this.tokenToHash[tokenId+""];
			delete this.hashToTokenId[hash];
		}
		
		this.getHashs = () => {
			return this.hashToTokenId;
		}
	}
	 
	return function () {
		if (!_mgr.instance) {
			_mgr.instance = new _mgr();
			console.log("instance:", _mgr.instance);
			_mgr.instance.load();
		}
		return _mgr.instance
	}
})()()

module.exports = storage;