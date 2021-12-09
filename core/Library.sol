pragma solidity ^0.5.0;
library SafeMath{
    
    /**
    * List of revert message codes. Implementing dApp should handle showing the correct message.
    * Based on 0xcert framework error codes.
    */
    string constant OVERFLOW = "008001";
    string constant SUBTRAHEND_GREATER_THEN_MINUEND = "008002";
    string constant DIVISION_BY_ZERO = "008003";

    /**
    * @dev Multiplies two numbers, reverts on overflow.
    * @param _factor1 Factor number.
    * @param _factor2 Factor number.
    * @return product The product of the two factors.
    */
    function mul(uint256 _factor1,uint256 _factor2)
    internal
    pure
    returns (uint256 product){
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (_factor1 == 0){return 0;}

        product = _factor1 * _factor2;
        require(product / _factor1 == _factor2, OVERFLOW);
    }

    /**
    * @dev Integer division of two numbers, truncating the quotient, reverts on division by zero.
    * @param _dividend Dividend number.
    * @param _divisor Divisor number.
    * @return quotient The quotient.
    */
    function div(uint256 _dividend,uint256 _divisor)
    internal
    pure
    returns (uint256 quotient){
        // Solidity automatically asserts when dividing by 0, using all gas.
        require(_divisor > 0, DIVISION_BY_ZERO);
        quotient = _dividend / _divisor;
        // assert(_dividend == _divisor * quotient + _dividend % _divisor); // There is no case in which this doesn't hold.
    }

    /**
    * @dev Substracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    * @param _minuend Minuend number.
    * @param _subtrahend Subtrahend number.
    * @return difference Difference.
    */
    function sub(uint256 _minuend,uint256 _subtrahend)
    internal
    pure
    returns (uint256 difference){
        require(_subtrahend <= _minuend, SUBTRAHEND_GREATER_THEN_MINUEND);
        difference = _minuend - _subtrahend;
    }

    /**
    * @dev Adds two numbers, reverts on overflow.
    * @param _addend1 Number.
    * @param _addend2 Number.
    * @return sum Sum.
    */
    function add(uint256 _addend1,uint256 _addend2)
    internal
    pure
    returns (uint256 sum){
        sum = _addend1 + _addend2;
        require(sum >= _addend1, OVERFLOW);
    }

    /**
    * @dev Divides two numbers and returns the remainder (unsigned integer modulo), reverts when
    * dividing by zero.
    * @param _dividend Number.
    * @param _divisor Number.
    * @return remainder Remainder.
    */
    function mod(uint256 _dividend,uint256 _divisor)
    internal
    pure
    returns (uint256 remainder){
        require(_divisor != 0, DIVISION_BY_ZERO);
        remainder = _dividend % _divisor;
    }
}

library AddressUtils{
    /**
   * @dev Returns whether the target address is a contract.
   * @param _addr Address to check.
   * @return addressCheck True if _addr is a contract, false if not.
   */
   function isContract(address _addr)
    internal
    view
    returns (bool addressCheck){
        // This method relies in extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        // According to EIP-1052, 0x0 is the value returned for not-yet created accounts
        // and 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470 is returned
        // for accounts without code, i.e. `keccak256('')`
        bytes32 codehash;
        bytes32 accountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
        assembly { codehash := extcodehash(_addr) } // solhint-disable-line
        addressCheck = (codehash != 0x0 && codehash != accountHash);
    }
}
