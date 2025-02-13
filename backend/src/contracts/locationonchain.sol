// SPDX-License-Identifier: MIT
pragma solidity 0.8.20
 
import "@reclaimprotocol/verifier-solidity-sdk/contracts/Reclaim.sol";
import "@reclaimprotocol/verifier-solidity-sdk/contracts/Addresses.sol";
 
contract Attestor {
   address public reclaimAddress;
 
   constructor() {
      // Replace with the network you are deploying on
      reclaimAddress = Addresses.ETHEREUM;
   }
 
   function verifyProof(Reclaim.Proof memory proof) public view {
       Reclaim(reclaimAddress).verifyProof(proof);
       // Your business logic upon successful verification
       // Example: Verify that proof.context matches your expectations
   }
}