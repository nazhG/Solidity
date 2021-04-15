// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Inbox {

    bytes32 message;

    constructor(bytes32 _message) {
        message = _message;
    }

    function getMessage() public view returns (bytes32){
        return message;
    }
    
    function setMessage(bytes32 _message) public {
        message = _message;
    }
}