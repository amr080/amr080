// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract User {
    struct UserInfo {
        address walletAddress;
        string username;
        string dateOfBirth; // Date of birth (e.g., "YYYY-MM-DD")
        string phoneNumber; // Phone number (e.g., "+1234567890")
        string email; // Email address
        // Add other relevant user data here
    }

    mapping(address => UserInfo) public users;

    event UserRegistered(address indexed userAddress, string username);

    function registerUser(string memory _username, string memory _dateOfBirth, string memory _phoneNumber, string memory _email) public {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(users[msg.sender].walletAddress == address(0), "User already registered");

        users[msg.sender] = UserInfo(msg.sender, _username, _dateOfBirth, _phoneNumber, _email);
        emit UserRegistered(msg.sender, _username);
    }

    function getUsernameByAddress(address _walletAddress) public view returns (string memory) {
        return users[_walletAddress].username;
    }
}
