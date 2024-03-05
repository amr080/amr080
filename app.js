// app.js
const Web3 = require('web3');

const web3 = new Web3('https://goerli.infura.io/v3/32df86fc7ced4997a2644eb1800a250c');

const contractABI = [[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "signUp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]]; 

const contractAddress = '0xE436197f79C4f40CE9221861C2DF9e8A5F045Eac';

const payContract = new web3.eth.Contract(contractABI, contractAddress);

async function signUp(username) {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; // Assuming the user is using the first account

        // Call the smart contract's signUp function
        await payContract.methods.signUp(username).send({ from: sender });

        console.log(`User ${username} signed up successfully!`);
    } catch (error) {
        console.error('Error signing up:', error);
    }
}

// Get username by wallet address
async function getUsernameByAddress(walletAddress) {
    try {
        const username = await payContract.methods.getUsernameByAddress(walletAddress).call();
        console.log(`Username for address ${walletAddress}: ${username}`);
    } catch (error) {
        console.error('Error retrieving username:', error);
    }
}

