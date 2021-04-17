// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Inbox {

    string message;

    constructor(string memory _message) {
        message = _message;
    }

    function getMessage() public view returns (string memory){
        return message;
    }
    
    function setMessage(string memory _message) public {
        message = _message;
    }
}