const web3 = new Web3('https://sepolia.infura.io/v3/32df86fc7ced4997a2644eb1800a250c');

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

const contractAddress = '0x4B428Def82Cd18B6D123803153601f0316434902'; 


async function registerUser() {
    const username = document.getElementById('username').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;

    if (!username || !dateOfBirth || !phoneNumber || !email) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];

        await userContract.methods.registerUser(username, dateOfBirth, phoneNumber, email).send({ from: sender });
        alert(`User ${username} registered successfully!`);
    } catch (error) {
        console.error('Error registering user:', error);
        alert('Registration failed!');
    }
}

async function getUsername() {
    const walletAddress = document.getElementById('walletAddress').value;

    if (!walletAddress) {
        alert('Please enter a wallet address.');
        return;
    }

    try {
        const username = await userContract.methods.getUsernameByAddress(walletAddress).call();
        document.getElementById('retrievedUsername').textContent = `Username: ${username}`;
    } catch (error) {
        console.error('Error retrieving username:', error);
        alert('Failed to retrieve username!');
    }
}
