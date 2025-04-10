//This NFT code is based on the code in the link of alchemy that was shared in the problem statement.

// SPDX-License-Identifier: MIT
//Solidity compiler vesrion 0.8.19 should be used to compile
pragma solidity ^0.8.19;


//These import reusable components from the OpenZeppelin library:

   // ERC721URIStorage: An ERC721 token that allows each token to have its own metadata URI.

    //Ownable: Adds an owner to the contract with special privileges (like minting).

    //Counters: A utility for incrementing token IDs safely.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

//Declaring a contract Fee_payment_NFT that inherits ERC721URIStorage and is Ownable
contract Fee_payment_NFT is ERC721URIStorage, Ownable {
     //Enabling the use of increment for Token_id.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //Defining a event that happens when this NFT is minted with arguments.
    event Fee_NFT_minted(address indexed student, uint256 tokenId, uint256 amount, string tokenURI);

    //Constructor that runs when the contract is deployed
    constructor() ERC721("Fee_payment_NFT", "FEE_NFT") {}

    //Public function to mint the Fee_payment_NFT.Through which eth transfer will be possible(due to payable)
    function mint_fee_NFT(address student, string memory tokenURI) public payable returns (uint256) {
        //Atleast 0.001 ETH should be transferred.
        require(msg.value > 0, "Payment required");

        //Increments the token ID counter so each NFT has a unique token ID.
        _tokenIds.increment();
        //New NFT will get the incremented token ID for minting.
        uint256 newTokenId = _tokenIds.current();
        //Mints the NFT to the recipient with the  newItemId
        _mint(student, newTokenId);
        //Sets the metadata URI for the newly minted token.
        _setTokenURI(newTokenId, tokenURI);
        //Adds the Fee_NFT_minted event to the blockchain
        emit Fee_NFT_minted(student, newTokenId, msg.value, tokenURI);

        //Pays the money to the admin(deployer of the contract).
        payable(owner()).transfer(msg.value);

        //Retuns the token ID to the caller.
        return newTokenId;
    }
}
