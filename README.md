# 🎓 One Stop Service - IITDH

This is a decentralized application (DApp) built with NFT's that allows students of IIT DHARWAD to access Institute Services all at one place.

---

## 🛠️ Features

- **ADMIN**
- Generate ID_card type NFT's to the students with students data attached to the NFT and the NFT will be sent to the student's wallet.
- Generate Course/Degree Completion Certificates using NFT's to the students.
  
- **USERS**
- Can Login with their NFT.
- Can Register to Courses and can see their profile
- Can Verify their Course/Degree Completion Certificates
- Can Pay Fees and recieve a reciept as a NFT to their wallet.
- Can view IIT DHARWAD's Mess Menu and also submit Feedback.
- Can subkit Work Requests.

---



## 📦 Tech Stack

- **Smart Contracts**: Solidity, Truffle
- **Blockchain**: Ethereum (Sepolia Testnet or Ganache(locally) )
- **Storage**: IPFS (via Pinata)
- **Frontend**: HTML, JavaScript, CSS, node.js ,Express.js
- **Wallet**:MetaMask
---
## 🚀 Installation and Quick Start Guide

- **For testing on local network**
- **Step 1: Install & Set Up MetaMask and Ganache Local BlockChain Network**

1. **Install MetaMask**  
   - Download and install the MetaMask browser extension from [https://metamask.io](https://metamask.io).
   - Download and install Ganache.

2. **Create or Import Wallet**  
   - Click **"Get Started"**.
   - Choose **"Import Wallet"** if you already have a wallet, or **"Create a Wallet"** to generate a new one.
   - If creating a new one, be sure to **safely store your recovery phrase**.

3. **Connect Ganache Account**  
   - Launch **Ganache** and copy one of the account **private keys**.
   - In MetaMask, go to your profile icon → **"Add account or Hardware Wallet"**.
   - Paste the private key from Ganache and click **Private Key/Import Account**.
   - (You can do it later) Import multiple accounts from the ganache in the same manner(will be useful when testing the DAPP). 
   - You should now see the Ganache account in MetaMask.

4. **Add Ganache Local Blockchain Network**  
   - In MetaMask, go to **Networks(at left-top,Ethereum mainnet will be as default) → Add a network manually**.
   - Use the following values:
     ```
     Network Name: Ganache
     New RPC URL: http://127.0.0.1:7545
     Chain ID: 1337
     Currency Symbol: ETH
     ```
   - Save and switch to the newly added **Ganache** network.
  
-  **Step 2: Install Truffle & Setting Up the project directory**

1. **Create a folder with name of your choice**  
   - ```mkdir <folder name>``` for ubuntu.
   - Go inside the folder with ```cd <folder name>``` .

2. **Installing and Initialising truffle**  
   -  Make sure you have Node.js v22.14.0 and npm v10.9.2 installed. Then run:
      ```npm install -g truffle ```( **Ignore the warnings** )
   - Clone this git repo into the folder with ```git clone https://github.com/7Dheeraj7/OSS-IITDH.git```
   - Now you will get a folder with name OSS-IITDH in this folder.
   - Now run the following commands
    ```
    mv OSS-IITDH/* .
    mv OSS-IITDH/contracts/* contracts/
    mv OSS-IITDH/migrations/* migrations/
    rm -r OSS-IITDH
     ```
3. 





---
## 📂 Project Structure
- After doing Truffle init
```
├── contracts/ 
│   ├── Id_card_NFT.sol
│   ├── Certificate_NFT.sol
│   └── Fee_payment_NFT.sol
├── migrations/ 
│   └── 2_deploy_contracts.js
├── test/ 
│   └── test cases 
├── build/ # You will get this after running truffle compile --all / truffle migrate 
│   └── yourfile.json 
├── pages/ 
│   ├── admin.html
│   ├── cou_reg.html
│   ├── feepay.html
│   ├── mess_feedback.html
│   ├── user.html
│   └── work.html
├── scripts/ 
│   ├── admin.js
│   ├── cou_reg.js
│   ├── feepay.js
│   ├── mess_feedback.js
│   ├── user.js
│   └── work.js
├── all.css
├── index.html
├── index.css
├── index.js
├── login.html
├── login.js
├── truffle-config.js
├── server.js
├── scripts/ 
│   └── some images to insert as logos/favicons
├── .env
```




 


