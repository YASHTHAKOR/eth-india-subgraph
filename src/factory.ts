import { CollectionCreated as CollectionCreatedEvent, CollectionForked as CollectionForkedEvent } from "../generated/Factory/Factory"
import { Collection } from "../generated/schema"
import { Collection as CollectionDataSource } from '../generated/templates';
import { Collection as CollectionContract } from '../generated/templates/Collection/Collection';
import { log, BigInt } from '@graphprotocol/graph-ts';

export function handleCollectionCreation(event: CollectionCreatedEvent): void {
    let collectionAddress = event.params.Collection;

    CollectionDataSource.create(collectionAddress);

    let collection = Collection.load(collectionAddress.toHexString());
    if (!collection) {
        collection = new Collection(collectionAddress.toHexString());
        collection.name = event.params._collectionName.toString();
        collection.owner = event.params.Owner.toHexString();
        collection.children = 0;
    }
    collection.save();
}

export function handleCollectionForked(event: CollectionForkedEvent): void {
    let collectionAddress = event.params.Collection;

    CollectionDataSource.create(collectionAddress);

    let collection = Collection.load(collectionAddress.toHexString());
    if (!collection) {
        collection = new Collection(collectionAddress.toHexString());
        collection.name = event.params._collectionName.toString();
        collection.parent = event.params.parent.toHexString();
        collection.owner = event.params.Owner.toHexString();
        collection.children = 0;
    }
    collection.save();
}
