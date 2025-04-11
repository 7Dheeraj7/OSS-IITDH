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
- Can submit Work Requests.

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
   - Launch **Ganache** and copy the first acoounts' **private key**.
   - In MetaMask, go to your profile icon → **"Add account or Hardware Wallet"**.
   - Click **Private Key/Import Account** and Paste the private key from Ganache.
   - Import multiple accounts different from the one before from ganache in the same manner(will be useful when testing the DAPP). 
   - You should now see the Ganache accounts in MetaMask.

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
      ```sudo npm install -g truffle ```( **Ignore the warnings** )
   - Clone this git repo into the folder with ```git clone https://github.com/7Dheeraj7/OSS-IITDH.git```
   - Now you will get a folder with name OSS-IITDH in this folder.
   - Now run the following commands
    ```
    mv OSS-IITDH/* .
    if contracts and migrations didn't move to the contracts and migrations folders (ls contracts/ is empty) in our project folder then:
    {mv OSS-IITDH/contracts/* contracts/
    mv OSS-IITDH/migrations/* migrations/}
    rm -r OSS-IITDH
    npm install
     ```
   - **npm install** installs the required packages.

-  **Step 3: Contracts Compilation ,Deployment and setting up the Contracts in the js files**
  
1. **Contracts Compilation and Deployment**
   - Open truffle_config.js file present in the folder.
   - Configure the networks section to your local host and the port as seen in ganache.
   - Configure the compiler verison to 0.8.19.
   - Now compile the contracts using ```truffle compile```
   - After compilation deploy the contracts using ```truffle deploy```

2. **Setting up the contract Addresses and ABI's**
   - After deploying we will get a folder named **build** in our project folder.
   - Open the ```build/contracts/Id_card_NFT.json``` file copy the abi of the contract.
   - Now paste this abi as the value of ```Id_contr_ABI``` in ```login.js``` and value of ```Id_contr_ABI ``` in ```scripts/admin.js```.
   - After deploying we will get the details of deployment on our terminal.
   - Copy the contract address of ```Id_card_NFT.sol``` and paste it as the value of  ```Id_contr_addr``` in ```login.js``` and value of ```Id_contr_addr ``` in ```scripts/admin.js```.
   - Open the ```build/contracts/Certificate_NFT.json``` file copy the abi of the contract.
   - Now paste this abi as the value of ```CERT_contr_ABI``` in ```scripts/user.js``` and value of ```CERT_contr_ABI ``` in ```scripts/admin.js```.
   - Copy the contract address of ```Certificate_NFT.sol``` and paste it as the value of  ```CERT_contr_addr``` in ```scripts/user.js``` and value of ```CERT_contr_addr ``` in ```scripts/admin.js```.
   - Open the ```build/contracts/Fee_payment_NFT.json``` file copy the abi of the contract.
   - Now paste this abi as the value of ```contractABI``` in ```scripts/feepay.js```.
   - Copy the contract address of ```Fee_payment_NFT.sol``` and paste it as the value of  ```contractAddress``` in ```scripts/feepay.js```.
  

-  **Step 4: Setting up the PINATA IPFS database and linking it to the backend**

    
1. **Setting up PINATA**
   - Open [Pinata](https://pinata.cloud/) and sign in or create an account.
   - Now you have your IPFS database interface to interact with it.
   - Open **API KEYS** section in **Developer** Section in **PINATA**.
   - Click New Key and enter any name and select **Admin** and click generate API key.
   - Copy the **API KEY** and **API SECRET KEY**.

2. **Setting up the PINATA API keys and PINATA Gateway**
   - Create a ```.env``` file in the project directory using the command ```touch .env```.
   - Now open the ```.env``` file and fill the file with
    ```
     PINATA_API_KEY=<Your API Key>
     PINATA_SECRET_API_KEY=<Your Secret API Key>
     ```
   - Open **Gateways**  Section in **PINATA**.
   - Copy the gateway domain from here.
   - Open ```server.js``` file and you will find a variable named ```gateway``` with value ```https://<your-gateway-domain>/ipfs/``` and replace the placeholder with your gateway domain.
   - Now that the setup is done we can go to the next step.

-  **Step 5: Launching the Servers and Using our Dapp**

1. **Launching the Servers**
   - Run the command ```node server.js``` in the same folder in the terminal.
   - Run the command ```python3 -m http.server``` in the same folder in a different terminal.
   - Now open a window ```http://localhost:8000/pages/admin.html``` in firefox and ```http://localhost:8000/login.html``` in another window.
  
2. **Using the DAPP**
   - **You need to use the metamask extension carefully(Chainging the account to the one we are trying to use.)**
   -  **Everytime you change the metamask account check if it got connected to the network on your extensions->metamask before doing any function in the DAPP.**
   - **ADMIN**
   - In metamask select the account that we deployed our NFT's.
   - Copy wallet address of a different account(these are our users) in metamask.
   - Now in the admin page we can generate Id_NFT's and certificate NFT's by filling the details and entering this user's wallet address.
   - The admin shares the token id and contract address of the user's NFT with the User.
   - The User then can import these NFT's in their metamask wallets by entering their contract address and token ID. 
   - **USER**
   - In metamask now select the account that we want to login with into our OSS-IITDH portal.
   - Now we can login to this portal with the token ID of the user's respective ID_NFT.
   - Once we login we can use the token ID of the certificate NFT for verification of the certificates.
   - We can use the remaining functionalities such as (mess menu & feedack,work requests,fee payment,course registration,certificate verification) also securely once we log in to it.
   - The Fee Payment will mint a NFT as the reciept and gives the token ID of it and also the transaction gets recorded in the ganache blockchain network.
   - The user can then import this reciept to his wallet by going to NFT section and then clicking import NFT and using its token ID and contract address.

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
│   └── contracts/
|        └── yourfile.json  
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
├── package.json
├── package-lock.json
```




 


