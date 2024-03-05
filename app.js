// app.js
document.addEventListener("DOMContentLoaded", async () => {
    // Initialize Web3.js
    if (typeof window.ethereum !== "undefined") {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request user permission
    } else {
        console.error("Web3 not found. Please install MetaMask or use an Ethereum-compatible browser.");
        return;
    }

    // Replace with your deployed contract addresses
    const userManagementContractAddress = "YOUR_USER_MANAGEMENT_CONTRACT_ADDRESS";
    const paymentContractAddress = "YOUR_PAYMENT_CONTRACT_ADDRESS";

    // Load your smart contracts
    const userManagementContract = new web3.eth.Contract(USER_MANAGEMENT_ABI, userManagementContractAddress);
    const paymentContract = new web3.eth.Contract(PAYMENT_ABI, paymentContractAddress);

    // Register User Button Click
    document.getElementById("registerUser").addEventListener("click", async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const username = "Alice"; // Replace with the desired username
            await userManagementContract.methods.registerUser(username).send({ from: accounts[0] });
            console.log(`User ${username} registered successfully!`);
        } catch (error) {
            console.error("Error registering user:", error);
        }
    });

    // Transfer Funds Button Click
    document.getElementById("transferFunds").addEventListener("click", async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const recipient = "0xRecipientAddress"; // Replace with recipient's address
            const amount = web3.utils.toWei("0.1", "ether"); // 0.1 ETH
            await paymentContract.methods.transfer(recipient, amount).send({ from: accounts[0] });
            console.log(`Funds transferred to ${recipient} successfully!`);
        } catch (error) {
            console.error("Error transferring funds:", error);
        }
    });
});
