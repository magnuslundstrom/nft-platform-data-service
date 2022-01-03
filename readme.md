# NFT-platform-data-service (POC)

The NFT-platform-data-service does, despite the singular spelling, consist of 3 core services contained in a docker-compose environment. 

## Database
The database contains data about contracts, tokens, and auctions. Both the listener and API speaks to the same database.

### API
The purpose of the API service is to provide the frontend with endpoints, where data can be fetched.

### Listener
The purpose of the listener service is to listen for specified contract events. The listener then performs CRUD operations.