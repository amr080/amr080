const web3 = new Web3('https://mainnet.infura.io/v3/32df86fc7ced4997a2644eb1800a250c');

const contractABI = [[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "getUsernameByAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dateOfBirth",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_phoneNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "registerUser",
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
			},
			{
				"internalType": "string",
				"name": "dateOfBirth",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]]; 

const contractAddress = '0x...'; 

// Instantiate the contract
const userContract = new web3.eth.Contract(contractABI, contractAddress);

// Function to register a new user
async function registerUser() {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter a username.');
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; 
        await userContract.methods.registerUser(username).send({ from: sender });

        alert(`User ${username} registered successfully!`);
    } catch (error) {
        console.error('Error registering user:', error);
    }
}
