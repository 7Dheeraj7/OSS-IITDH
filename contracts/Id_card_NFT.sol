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


//Declaring a contract ID_card_NFT that inherits ERC721URIStorage and is Ownable
contract Id_card_NFT is ERC721URIStorage, Ownable {
    //Enabling the use of increment for Token_id.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    //Defining a event that happens when this NFT is minted with arguments.
    event Id_card_minted(address indexed recipient, uint256 tokenId, string tokenURI);

    //Constructor that runs when the contract is deployed
    constructor() ERC721("Id_card_NFT", "ID_NFT") {}

    //Public function to mint the id_NFT,Only the contract owner can call it (due to onlyOwner).
    function mint_id_NFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        //Increments the token ID counter so each NFT has a unique token ID.
        _tokenIds.increment();
        //New NFT will get the incremented token ID for minting.
        uint256 newItemId = _tokenIds.current();
        //Mints the NFT to the recipient with the  newItemId
        _mint(recipient, newItemId);
        //Sets the metadata URI for the newly minted token.
        _setTokenURI(newItemId, tokenURI);
        //Adds the Id_card_minted event to the blockchain
        emit Id_card_minted(recipient, newItemId, tokenURI);
        //Retuns the token ID to the caller.
        return newItemId;
    }
}
