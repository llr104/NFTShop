
const storage = (function () {
	function _mgr() {
		
		this.load = ()=>{
			this.hashToTokenId = {};
			this.tokenIdToHash = {};
			
			try {
			    const hashToTokenId = uni.getStorageSync('hashToTokenId');
			    if (hashToTokenId) {
			        this.hashToTokenId = hashToTokenId;
			    }
				const tokenIdToHash = uni.getStorageSync('tokenIdToHash');
				if (tokenIdToHash) {
				    this.tokenIdToHash = tokenIdToHash;
				}
				
			} catch (e) {
			    console.log("load:", e);
			}
		}
		
		this.opType = {
			ApprovingToken:0,
			ApprovingNFT:1,
			UpSaling:2,
			DownSaling:3,
			Buying:4
		}
		
		this.update = () =>{
			try {
				uni.setStorageSync("hashToTokenId", this.hashToTokenId);
				uni.setStorageSync("tokenIdToHash", this.tokenIdToHash);
			} catch (e) {
				console.log("setTransactionPennding:", e);
			}
		}
		
		this.setTransactionPennding = (tokenId, hash, op)=>{

			let key = tokenId + "";
			this.hashToTokenId[hash] = Number(tokenId);
			if(!this.tokenIdToHash[key]){
				this.tokenIdToHash[key] = [];
			}
			
			let obj = {
				hash: hash,
				op: op,
				tokenId: tokenId
			}
			
			this.tokenIdToHash[key].push(obj);
			this.update();
		}
		
		this.getTransactionPennding = (tokenId) => {
			return this.tokenIdToHash[tokenId+""];
		}
		
		this.getHashObj = (hash) => {
			var tokenId = this.hashToTokenId[hash];
			let key = tokenId + "";
			if(this.tokenIdToHash[key]){
				for (var i = 0; i < this.tokenIdToHash[key].length; i++) {
					if (this.__isSame__(this.tokenIdToHash[key][i], hash)){
						return this.tokenIdToHash[key][i];
					}
				}
			}
			return null;
		}
		
		this.__isSame__ = (hashObj, hash) => {
			if(hashObj.hash.toString().toLowerCase() == hash.toString().toLowerCase()){
				return true;
			}
			return false;
		}
		
		this.deleteHash = (hash) => {
			console.log("deleteHash 1111:", hash);
			var tokenId = this.hashToTokenId[hash];
			let key = tokenId + "";
			
			delete this.hashToTokenId[hash];
			if(this.tokenIdToHash[key]){
				for (var i = 0; i < this.tokenIdToHash[key].length; i++) {
					if (this.__isSame__(this.tokenIdToHash[key][i], hash)){
						console.log("deleteHash 2222:", hash);
						this.tokenIdToHash[key].splice(i, 1);
						break;
					}
				}
			}
			this.update();
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