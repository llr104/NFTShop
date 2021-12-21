pragma solidity ^0.5.0;

contract Const{
    string public constant NOT_CURRENT_OWNER = "018001";
    string public constant CANNOT_TRANSFER_TO_ZERO_ADDRESS = "018002";
    string public constant NOT_CURRENT_MANAGER = "018003";
    
    string public constant NFT_NOT_ONSALE = "001001";
    string public constant NFT_INVALID = "001002";
    string public constant NFT_SAME_ADDRESS = "001003";
    string public constant BANLANCE_NOT_ENOUGH = "001004";
    string public constant NOT_VALID_BBCFG = "001005";
    string public constant NOT_VALID_BBCFG_ELE = "001006";
    string public constant NOT_VALID_BB_IS_MINT = "001007";
    string public constant NOT_OWNER = "01008";
    string public constant NOT_BLINDBOX = "01009";
    string public constant BB_ELEM_IS_EMPTY = "01010";
    string public constant BB_HAS_RES = "01011";
    string public constant BB_NO_RES = "01012";
    
    string public constant ZERO_ADDRESS = "003001";
    string public constant NOT_VALID_NFT = "003002";
    string public constant NOT_OWNER_OR_OPERATOR = "003003";
    string public constant NOT_OWNER_APPROWED_OR_OPERATOR = "003004";
    string public constant NOT_ABLE_TO_RECEIVE_NFT = "003005";
    string public constant NFT_ALREADY_EXISTS = "003006";
    string public constant IS_OWNER = "003008";
    string public constant INVALID_INDEX = "005007";
    string public constant INVALID_BlindBox = "005008";
    string public constant INVALID_PAGE = "005009";

}