



const ID_contr_addr = "Your ID_card_NFT Address";


const ID_contr_ABI = ["Your ID_card_NFT_ABI"];;


//Function to get signer and contract
async function getSignerAndContract() {
  if (!window.ethereum) {
    alert("MetaMask not found. Please install it.");
    return null;
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  //Extracting the data from the metamask
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  //Initializing the contract
  const contract = new ethers.Contract(ID_contr_addr, ID_contr_ABI, signer);

  return { signer, contract };
}

// Mint function for minting the NFT
async function mintForUser() {
  //Getting the data from the form
  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const phone = document.getElementById("phone").value;
  const recipient = document.getElementById("recipient").value.trim();




//Uploading the data to pinata
  const res = await fetch("http://localhost:5000/upload-to-ipfs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, dob, phone })
  });

  //Getting the tken URI from pinata
  const data = await res.json();
  const tokenURI = data.ipfsURL;
  console.log("Token URI:", tokenURI);


  if (!ethers.utils.isAddress(recipient)) {
    alert("Please enter a valid Ethereum address.");
    return;
  }

  //Checing if a valid signer and contract returns
  const { signer, contract } = await getSignerAndContract();
  if (!signer || !contract) return;

  try {

    //Getting the signer Address from metamask and contract owner from asking the NFT.
    const signer_addr = await signer.getAddress();
    const contract_own = await contract.owner();

    //The signer should be the owner then only we can mint NFT's
    if (signer_addr.toLowerCase() !== contract_own.toLowerCase()) {
      alert("Only the contract owner can mint NFTs.");
      return;
    }

    //Calling the mint_id_NFT function of the NFT.
    const tx = await contract.mint_id_NFT(recipient, tokenURI);
    console.log("Transaction sent:", tx.hash);

    //Storing the reciept
    const receipt = await tx.wait();

    //Reading the IdentityMinted emitted event after the NFT has been minted.
    const event = receipt.events.find(event => event.event === "Id_card_minted");

    //Validation
    if (event && event.args) {
      const tokenId = event.args.tokenId.toString();
      alert(`Id_NFT Minted Successfully! Token ID: ${tokenId}`);
      console.log("Minted Token ID:", tokenId);
    } else {
      alert("Id_NFT Minted, but couldn't fetch Token ID.");
    }

  } catch (error) {
    console.error("Minting failed:", error);
    alert("Minting failed. Check console for details.");
  }
}






const CERT_contr_addr = "Your Certificate_NFT Address";
const CERT_contr_ABI = ["Your Certificate_NFT ABI"];

// Mint function for minting the Certificate NFT
async function mintCertificate() {
  //Getting the data from the form
  const cert_type = document.querySelector('input[name="certType"]:checked').value;
  const courseName = document.getElementById("courseName").value;
  const recipient = document.getElementById("certRecipient").value.trim();

  if (!ethers.utils.isAddress(recipient)) {
    alert("Please enter a valid Ethereum address.");
    return;
  }

  //Making the message to confirm the completion of course/degree
  let message = "";
  if (cert_type === "degree") {
    message = `You have successfully completed your ${courseName}.`;
  } else {
    if (!courseName) {
      alert("Please enter the course name.");
      return;
    }
    message = `You have successfully completed ${courseName}.`;
  }
  
  //Uploading them to pinata IPFS and then waiting for its response
  const res = await fetch("http://localhost:5000/upload-certificate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cert_type, message })
  });

  //Extracting data and tokenURI from the response
  const data = await res.json();
  const tokenURI = data.ipfsURL;
  console.log("Certificate Token URI:", tokenURI);

  //Getting the provider i.e(metamask) and extracting the present logged in address.
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  //Initializing the NFT of the certificate
  const contract = new ethers.Contract(CERT_contr_addr, CERT_contr_ABI, signer);

  try {
    //Getting the signer Address from metamask and contract owner from asking the NFT.
    const signer_addr = await signer.getAddress();
    const contract_own = await contract.owner();

    //The signer should be the owner then only we can mint NFT's
    if (signer_addr.toLowerCase() !== contract_own.toLowerCase()) {
      alert("Only the contract owner can mint Certificate NFTs.");
      return;
    }
//Calling the mintCertificate function of the NFT.
    const tx = await contract.mint_certificate(recipient, tokenURI);
    console.log("Transaction sent:", tx.hash);

 //Storing the reciept
    const receipt = await tx.wait();

    //Reading the Certificate Minted emitted event after the NFT has been minted.
    const event = receipt.events.find(event => event.event === "Certificate_minted");

     //Validation
    if (event && event.args) {
      const tokenId = event.args.certificateId.toString();
      alert(`Certificate NFT Minted Successfully! Token ID: ${tokenId}`);
      console.log("Minted Token ID:", tokenId);
    } else {
      alert("NFT Minted, but couldn't get Token ID.");
    }

  } catch (err) {
    console.error("Minting failed", err);
    alert("Minting failed. See console for details.");
  }
}
