pragma solidity ^0.5.0;

contract Const{
    string internal constant NOT_CURRENT_OWNER = "018001";
    string internal constant CANNOT_TRANSFER_TO_ZERO_ADDRESS = "018002";
    string internal constant NOT_CURRENT_MANAGER = "018003";
    
    string internal constant NFT_NOT_ONSALE = "001001";
    string internal constant NFT_INVALID = "001002";
    string internal constant NFT_SAME_ADDRESS = "001003";
    string internal constant BANLANCE_NOT_ENOUGH = "001004";
    string internal constant NOT_VALID_BBCFG = "001005";
    string internal constant NOT_VALID_BBCFG_ELE = "001006";
    string internal constant NOT_VALID_BB_IS_MINT = "001007";
    string internal constant NOT_OWNER = "01008";
    string internal constant NOT_BLINDBOX = "01009";
    string internal constant BB_ELEM_IS_EMPTY = "01010";
    string internal constant BB_HAS_RES = "01011";
    string internal constant BB_NO_RES = "01012";
    string internal constant BB_RES_NOT_MATCH = "01013";
    string internal constant BB_MINT_NOT_MATCH = "01014";
    
    string internal constant ZERO_ADDRESS = "003001";
    string internal constant NOT_VALID_NFT = "003002";
    string internal constant NOT_OWNER_OR_OPERATOR = "003003";
    string internal constant NOT_OWNER_APPROWED_OR_OPERATOR = "003004";
    string internal constant NOT_ABLE_TO_RECEIVE_NFT = "003005";
    string internal constant NFT_ALREADY_EXISTS = "003006";
    string internal constant IS_OWNER = "003008";
    string internal constant INVALID_INDEX = "005007";
    string internal constant INVALID_BlindBox = "005008";
    string internal constant INVALID_PAGE = "005009";

}