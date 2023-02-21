const contractAddress = '0x204B8eBcD4372e411B407DE98583C68A8C2dE59F'; 
// contract.js
const CONTRACT_ABI = [[
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player1",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "player2",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "player1Choice",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "player2Choice",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			}
		],
		"name": "GamePlayed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "player1Choice",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "player2Choice",
				"type": "uint8"
			}
		],
		"name": "playGame",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]];


  const provider = new ethers.providers.Web3Provider(window.ethereum, 97);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
  const contractInstance = new web3.eth.Contract(abi, contractAddress);

// Function to play the game
async function playGame(player1Choice, player2Choice) {
    
    // Get the current account
    const account = await web3.eth.getCoinbase();
    
    // Send the transaction to the contract
    const result = await contractInstance.methods.playGame(player1Choice, player2Choice).send({
        from: account,
        value: web3.utils.toWei('2', 'ether')
    });
    
    // Log the result
    console.log(result);
}

// Function to withdraw the contract balance
async function withdraw() {
    
    // Get the current account
    const account = await web3.eth.getCoinbase();
    
    // Send the transaction to the contract
    const result = await contractInstance.methods.withdraw().send({
        from: account
    });
    
    // Log the result
    console.log(result);
}