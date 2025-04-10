//This NFT code is based on the code in the link of alchemy that was shared in the problem statement.


// SPDX-License-Identifier: MIT
//Solidity compiler vesrion 0.8.19 should be used to compiler
pragma solidity ^0.8.19;

//These import reusable components from the OpenZeppelin library:

   // ERC721URIStorage: An ERC721 token that allows each token to have its own metadata URI.

    //Ownable: Adds an owner to the contract with special privileges (like minting).

    //Counters: A utility for incrementing token IDs safely.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



//Declaring a contract Certificate_NFT that inherits ERC721URIStorage and is Ownable
contract Certificate_NFT is ERC721URIStorage, Ownable {
    //Enabling the use of increment for Certificate_id.
    using Counters for Counters.Counter;
    Counters.Counter private _certificateIds;

     //Defining a event that happens when this NFT is minted with arguments.
    event Certificate_minted(address indexed recipient, uint256 certificateId, string tokenURI);

    //Constructor that runs when the contract is deployed
    constructor() ERC721("Certificate", "CERT_NFT") {}


    //Public function to mint the Certificate_NFT,Only the contract owner can call it (due to onlyOwner).
    function mint_certificate(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        //Increments the Certificate ID counter so each NFT has a unique token ID.
        _certificateIds.increment();
         //New NFT will get the incremented token ID for minting.
        uint256 newCertificateId = _certificateIds.current();
        //Mints the NFT to the recipient with the  new Certificate Id
        _mint(recipient, newCertificateId);
        //Sets the metadata URI for the newly minted token.
        _setTokenURI(newCertificateId, tokenURI);
        //Adds the Certificate_minted event to the blockchain
        emit Certificate_minted(recipient, newCertificateId, tokenURI);
        //Retuns the Certificate ID to the caller.
        return newCertificateId;
    }
}
