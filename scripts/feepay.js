
//Contract address and ABI
const contractAddress = ""Your Fee_payment_NFT Address"";
const contractABI = ["Your Fee_payment_NFT ABI"];
// When the form with ID feeForm is submitted, this async function runs. It prevents the default behavior (e.preventDefault()) .
document.getElementById('feeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    //Initialising the data form the form.
    const stu_name = document.getElementById("studentName").value;
    const semester = document.getElementById("semester").value;
    const amount = document.getElementById("feeAmount").value;

   


    if (!window.ethereum) return alert("Install Metamask!");

    //Connects to metamask and gets the account and required wallet addresses
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    // Upload metadata to IPFS(pinata) and wait for the response
    const response = await fetch("http://localhost:5000/upload-semester-fee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({stu_name,semester,amount})
    });

    //Extract data and token URI from the response
    const data = await response.json();
    const tokenURI = data.ipfsURL;

    //Mint NFT and pay the fee entered
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.mint_fee_NFT(userAddress, tokenURI, {
        value: ethers.utils.parseEther(amount)
    });
    // Wait for Confirmation and Showing Token ID
    const receipt = await tx.wait();

    const tokenId = receipt.events[0].args[2].toString(); 
    alert(`Fee NFT Minted! Token ID: ${tokenId}`);
});
