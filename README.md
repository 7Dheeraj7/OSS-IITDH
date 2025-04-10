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
   - In MetaMask, go to your profile icon → **"Import Account"**.
   - Paste the private key from Ganache and click **Import**.
   - Import multiple accounts from the ganache in the same manner(will be useful when testing the DAPP). 
   - You should now see the Ganache account in MetaMask.

4. **Add Ganache Local Blockchain Network**  
   - In MetaMask, go to **Settings → Networks → Add a network manually**.
   - Use the following values:
     ```
     Network Name: Ganache
     New RPC URL: http://127.0.0.1:7545
     Chain ID: 1337
     Currency Symbol: ETH
     ```
   - Save and switch to the newly added **Ganache** network.


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




 


