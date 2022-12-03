import {Mint  as MintEvent} from '../generated/Factory/Collection';
import {Mint} from "../generated/schema";

export function handleMint(event: MintEvent): void {
    let collectionAddress = event.address.toHexString();
    let tokenId = event.params.tokenId;

    let mintId = collectionAddress + '-' + tokenId.toString();

    let mintData = Mint.load(mintId);
    if(!mintData) {
        mintData = new Mint(mintId);
        mintData.collection = collectionAddress;
        mintData.tokenId = tokenId.toI32();
        mintData.save();
    }
}