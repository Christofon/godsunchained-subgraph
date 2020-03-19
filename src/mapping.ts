import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  CardCreated,
  Transfer,
  Approval,
  ApprovalForAll,
  NewProtoCard,
  Pause,
  Unpause
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleCardCreated(event: CardCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.id = event.params.id
  entity.proto = event.params.proto

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.supportsInterface(...)
  // - contract.getProto(...)
  // - contract.name(...)
  // - contract.getApproved(...)
  // - contract.governor(...)
  // - contract.migrated(...)
  // - contract.totalSupply(...)
  // - contract.InterfaceId_ERC165(...)
  // - contract.addSpell(...)
  // - contract.tokenOfOwnerByIndex(...)
  // - contract.common(...)
  // - contract.getActiveCards(...)
  // - contract.mythic(...)
  // - contract.exists(...)
  // - contract.tokenByIndex(...)
  // - contract.burnCount(...)
  // - contract.seasonTradabilityLocked(...)
  // - contract.paused(...)
  // - contract.ownerOf(...)
  // - contract.balanceOf(...)
  // - contract.seasonTradable(...)
  // - contract.owns(...)
  // - contract.getShine(...)
  // - contract.cards(...)
  // - contract.getCard(...)
  // - contract.getLimit(...)
  // - contract.symbol(...)
  // - contract.limits(...)
  // - contract.NAME(...)
  // - contract.rare(...)
  // - contract.isTradable(...)
  // - contract.ownsAll(...)
  // - contract.tokenMetadataBaseURI(...)
  // - contract.packs(...)
  // - contract.currentSeason(...)
  // - contract.tokenURI(...)
  // - contract.getRandomCard(...)
  // - contract.addWeapon(...)
  // - contract.addProto(...)
  // - contract.protoCount(...)
  // - contract.epic(...)
  // - contract.addMinion(...)
  // - contract.addProtos(...)
  // - contract.getBurnCount(...)
  // - contract.isApprovedForAll(...)
  // - contract.legendary(...)
  // - contract.SYMBOL(...)
  // - contract.createCard(...)
}

export function handleTransfer(event: Transfer): void {}

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleNewProtoCard(event: NewProtoCard): void {}

export function handlePause(event: Pause): void {}

export function handleUnpause(event: Unpause): void {}
