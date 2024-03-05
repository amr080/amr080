// Example smart contract
pragma solidity ^0.8.0;

contract pay {
    struct User {
        address walletAddress;
        string username;
    }

    mapping(address => User) public users;

    function signUp(string memory _username) public {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(users[msg.sender].walletAddress == address(0), "User already registered");

        users[msg.sender] = User(msg.sender, _username);
    }
}
