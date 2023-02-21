const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; 
// contract.js
const CONTRACT_ABI = [
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
  ];
  const CONTRACT_ADDRESS = '0xd9145CCE52D386f254917e481eB44e9943F39138';
  
  // game.js
  const provider = new ethers.providers.Web3Provider(window.ethereum, 97);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
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
   
  