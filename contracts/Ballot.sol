// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Ballot {

    address public manager;
    address payable[] public players; 

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether); // if coninue

        players.push(payable(msg.sender));
    }

    //pure ?
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp)));
    }
    function pickWinner() restricted public {
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address payable[](0);
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}