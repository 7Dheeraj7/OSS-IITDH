
//Contract address and ABI

const ID_contr_addr = "<Your ID_card_NFT Address>";//It will be like "0xgeduhfeu8eyeih".

const ID_contr_ABI = [<Your ID_card_NFT ABI>];//Will be in ID_card_NFT.json 3rd line abi:[{..}{..}{..}] you need to copy the part inside the square brackets

//Function to verify if the Token Id belongs to the respective wallet address.
    async function verifyIdentityNFT() {
      const tokenId = document.getElementById("tokenId").value.trim();
      const resultEl = document.getElementById("result");
  
      if (!window.ethereum) {
        resultEl.textContent = "Please install MetaMask.";
        return;
      }
  
      try {
        // Connect to MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
  
        // Load Id_card NFT contract
        const contract = new ethers.Contract(ID_contr_addr, ID_contr_ABI, provider);
        const owner = await contract.ownerOf(tokenId);
  
        if (owner.toLowerCase() !== userAddress.toLowerCase()) {
          alert("You do not own this Id_card NFT.")
          return;
        }
  
        // Get metadata from tokenURI
        const tokenURI = await contract.tokenURI(tokenId);
        const response = await fetch(tokenURI);
        const metadata = await response.json();
  
        // Extract student data from attributes
        const nameAttr = metadata.attributes.find(attr => attr.trait_type === "Name");
        const dobAttr = metadata.attributes.find(attr => attr.trait_type === "DOB");
        const phonnAttr = metadata.attributes.find(attr => attr.trait_type === "Phone");
        const studentName = encodeURIComponent(nameAttr ? nameAttr.value : "Unknown");
        const studentdob = encodeURIComponent(dobAttr ? dobAttr.value : "Unknown");
        const studentphone = encodeURIComponent(phonnAttr ? phonnAttr.value : "Unknown");
  
        //Display and redirect
        alert("Verified! Redirecting...");
        setTimeout(() => {
          window.location.href = `index.html?wallet=${userAddress}&tokenId=${tokenId}&name=${studentName}&dob=${studentdob}&phone=${studentphone}`;
        }, 1000);
  
      } catch (err) {
        console.error(err);
        alert("Verification failed. Check your Token ID (It may be invalid or not your's).");
      }
    }





    
