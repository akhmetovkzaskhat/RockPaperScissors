const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; 
const contractABI = [[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "playerChoice",
				"type": "uint8"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "opponent",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "opponentChoice",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "int8",
				"name": "result",
				"type": "int8"
			}
		],
		"name": "GameResult",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "choice",
				"type": "uint8"
			}
		],
		"name": "play",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PAPER",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ROCK",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SCISSORS",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]]; 


const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, signer);

let playerChoice = null;
let gameResult = null;

const choices = {
    'rock': {
        name: 'Rock',
        defeats: ['scissors']
    },
    'paper': {
        name: 'Paper',
        defeats: ['rock']
    },
    'scissors': {
        name: 'Scissors',
        defeats: ['paper']
    }
};

const playerChoiceButtons = document.querySelectorAll('.game-choice');
playerChoiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        playerChoice = button.dataset.choice;
        playerChoiceButtons.forEach(button => button.disabled = true);
        playGame();
    });
});

async function playGame() {
    const result = await contract.play(playerChoice);
    gameResult = result.toNumber();
    displayResult();
}

async function getBalance() {
    return await contract.getBalance();
  }
  
  async function displayResult() {
    const resultText = document.querySelector('.game-result');
    const balanceText = document.querySelector('.balance');
  
    switch(gameResult) {
        case 0:
            resultText.innerText = 'Tie game!';
            balanceText.innerText = 'Balance: ' + ethers.utils.formatEther(await getBalance()) + ' ETH';
            break;
        case 1:
            resultText.innerText = 'You won!';
            balanceText.innerText = 'Balance: ' + ethers.utils.formatEther(await getBalance()) + ' ETH';
            break;
        case 2:
            resultText.innerText = 'You lost!';
            balanceText.innerText = 'Balance: ' + ethers.utils.formatEther(await getBalance()) + ' ETH';
            break;
    }
  
    const refreshButton = document.querySelector('#refresh-button');
    refreshButton.style.display = 'block';
    refreshButton.addEventListener('click', () => {
        window.location.reload();
    });
  }
  