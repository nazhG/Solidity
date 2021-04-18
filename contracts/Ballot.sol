// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Ballot {

    address public manager;
    address[] public players; 

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether); // if coninue

        players.push(msg.sender);
    }
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp)));
    }
    function pickWinner() public {
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
    }
}