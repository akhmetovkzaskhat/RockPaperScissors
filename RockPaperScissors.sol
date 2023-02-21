
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RockPaperScissors {
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
 
    address payable owner;
    

    event GamePlayed(address player1, address player2, uint8 player1Choice, uint8 player2Choice, address winner);
    
    
    constructor() payable {
        owner = payable(msg.sender);
    }
    
   
    function playGame(uint8 player1Choice, uint8 player2Choice) public payable returns (address) {
        
        
        require(player1Choice >= 1 && player1Choice <= 3 && player2Choice >= 1 && player2Choice <= 3, "Invalid choice");
        
        require(msg.value == 2 ether, "Please send 2 ether to play the game");
        
        address winner;
        if (player1Choice == 1 && player2Choice == 2) {
            winner = msg.sender;
        } else if (player1Choice == 1 && player2Choice == 3) {
            winner = address(this);
        } else if (player1Choice == 2 && player2Choice == 1) {
            winner = address(this);
        } else if (player1Choice == 2 && player2Choice == 3) {
            winner = msg.sender;
        } else if (player1Choice == 3 && player2Choice == 1) {
            winner = msg.sender;
        } else if (player1Choice == 3 && player2Choice == 2) {
            winner = address(this);
        } else {
            payable(msg.sender).transfer(msg.value / 2);
            payable(address(this)).transfer(msg.value / 2);
            return address(0);
        }
        
        payable(winner).transfer(msg.value);
        
        emit GamePlayed(msg.sender, address(this), player1Choice, player2Choice, winner);
        
        return winner;
    }
    
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
