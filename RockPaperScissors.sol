
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RockPaperScissors{
    uint8 public constant ROCK = 1;
    uint8 public constant PAPER = 2;
    uint8 public constant SCISSORS = 3;

    mapping (uint8 => mapping (uint8 => int8)) outcomes;

    event GameResult(address indexed player, uint8 playerChoice, address indexed opponent, uint8 opponentChoice, int8 result);

    constructor() {
        outcomes[ROCK][ROCK] = 0;
        outcomes[ROCK][PAPER] = -1;
        outcomes[ROCK][SCISSORS] = 1;
        outcomes[PAPER][ROCK] = 1;
        outcomes[PAPER][PAPER] = 0;
        outcomes[PAPER][SCISSORS] = -1;
        outcomes[SCISSORS][ROCK] = -1;
        outcomes[SCISSORS][PAPER] = 1;
        outcomes[SCISSORS][SCISSORS] = 0;
    }

    function play(uint8 choice) public payable {
        require(msg.value == 0.01 ether, "You must send 0.01 ether to play.");
        require(choice == ROCK || choice == PAPER || choice == SCISSORS, "Invalid choice.");
        uint8 botChoice = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 3 + 1);
        int8 result = outcomes[choice][botChoice];
        if (result == 1) {
            payable(msg.sender).transfer(0.02 ether);
        } else if (result == -1) {
            address payable opponent = payable(tx.origin);
            opponent.transfer(0.02 ether);
        }
        emit GameResult(msg.sender, choice, address(this), botChoice, result);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
