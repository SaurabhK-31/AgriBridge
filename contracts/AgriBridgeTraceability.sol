// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AgriBridgeTraceability
 * @dev Intelligent Agricultural Supply Chain Traceability Smart Contract for AgriBridge AI
 */
contract AgriBridgeTraceability {
    struct BatchRecord {
        string batchId;
        string cryptographicHash;
        uint256 timestamp;
        address registeredBy;
        bool exists;
    }

    struct SupplyChainEvent {
        string eventType;
        string location;
        string metadata;
        uint256 timestamp;
        address recordedBy;
    }

    // Mapping from batchId to BatchRecord
    mapping(string => BatchRecord) private batches;

    // Mapping from batchId to array of SupplyChainEvents
    mapping(string => SupplyChainEvent[]) private batchEvents;

    // Events emitted on-chain
    event BatchRegistered(
        string indexed batchId,
        string cryptographicHash,
        address indexed registeredBy,
        uint256 timestamp
    );

    event SupplyChainEventAdded(
        string indexed batchId,
        string eventType,
        string location,
        address indexed recordedBy,
        uint256 timestamp
    );

    /**
     * @dev Register a new crop batch on Polygon Blockchain with SHA-256 hash.
     */
    function registerBatch(string memory _batchId, string memory _cryptographicHash) public {
        require(!batches[_batchId].exists, "AgriBridge: Batch ID already registered");
        require(bytes(_batchId).length > 0, "AgriBridge: Invalid Batch ID");
        require(bytes(_cryptographicHash).length > 0, "AgriBridge: Invalid Cryptographic Hash");

        batches[_batchId] = BatchRecord({
            batchId: _batchId,
            cryptographicHash: _cryptographicHash,
            timestamp: block.timestamp,
            registeredBy: msg.sender,
            exists: true
        });

        // Add initial registration event
        batchEvents[_batchId].push(SupplyChainEvent({
            eventType: "FARM_REGISTERED",
            location: "Farm Location Registered",
            metadata: _cryptographicHash,
            timestamp: block.timestamp,
            recordedBy: msg.sender
        }));

        emit BatchRegistered(_batchId, _cryptographicHash, msg.sender, block.timestamp);
    }

    /**
     * @dev Add a supply chain event to an existing batch.
     */
    function addSupplyChainEvent(
        string memory _batchId,
        string memory _eventType,
        string memory _location,
        string memory _metadata
    ) public {
        require(batches[_batchId].exists, "AgriBridge: Batch ID does not exist");

        batchEvents[_batchId].push(SupplyChainEvent({
            eventType: _eventType,
            location: _location,
            metadata: _metadata,
            timestamp: block.timestamp,
            recordedBy: msg.sender
        }));

        emit SupplyChainEventAdded(_batchId, _eventType, _location, msg.sender, block.timestamp);
    }

    /**
     * @dev Verify if a batch exists and retrieve its cryptographic hash and owner info.
     */
    function verifyBatch(string memory _batchId) public view returns (
        string memory cryptographicHash,
        uint256 timestamp,
        address registeredBy,
        bool exists
    ) {
        BatchRecord memory record = batches[_batchId];
        return (record.cryptographicHash, record.timestamp, record.registeredBy, record.exists);
    }

    /**
     * @dev Retrieve cryptographic hash for a batch ID.
     */
    function getBatchHash(string memory _batchId) public view returns (string memory) {
        require(batches[_batchId].exists, "AgriBridge: Batch ID does not exist");
        return batches[_batchId].cryptographicHash;
    }

    /**
     * @dev Get total supply chain events for a batch.
     */
    function getBatchEventsCount(string memory _batchId) public view returns (uint256) {
        return batchEvents[_batchId].length;
    }
}
