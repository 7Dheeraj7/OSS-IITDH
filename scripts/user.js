
//Contract address and ABI
const CERT_contr_addr = ""Your Certificate_NFT Address""; 
    const CERT_contr_ABI = ["Your Certificate_NFT ABI"];



    //Verifies the onwership of a certifictate 
    async function verifyOwnership() {
      //Gets the Token ID entered by the user.
      const tokenId = document.getElementById("tokenId").value.trim();
      //Prepares to show a result message.
      const resultEl = document.getElementById("result");

      if (!window.ethereum) {
        resultEl.textContent = "Please install MetaMask.";
        return;
      }

      try {
        //Connects to metamask and gets the account and required wallet addresses
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const usr_addr = await signer.getAddress();

        //Initialising the NFT
        const contract = new ethers.Contract(CERT_contr_addr, CERT_contr_ABI, provider);
        //Getting the owner of the NFT
        const owner = await contract.ownerOf(tokenId);

        //DIsplaying the result
        if (owner.toLowerCase() === usr_addr.toLowerCase()) {
          resultEl.textContent = " This certificate is valid and owned by you.";
        } else {
          resultEl.textContent = " This certificate is not owned by you.";
        }
      } catch (err) {
        console.error(err);
        resultEl.textContent = " Error verifying certificate. Make sure the Token ID is correct.";
      }
    }

  
