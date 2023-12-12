# Frontend Masters Course - Web Storage APIs

## What will be covered
- State of Browser Storage
- Debugging Tools
- Quotas
- Persistance
- Web Storage
- IndexedDB
- Cache Storage
- FileSystem

## APIs Browser Data Storage
- Why is this important?
-- Increase user exp
-- Increase Performance
-- Offline Support
-- We can store: app state, cached assets, auth tokens, analytics, user content
- How it works?
-- Uses JS to store/retrieve data on device
-- Browser managed implementation and security
-- Data should be treated as if it can disappear at any time
-- Data will persist between browsing sessions
-- Most APIs will not require a permission from user
-- Works for PWA or Hybrid apps
-- Data is NOT shared to the server or other apps (with different origin)
- Important Concepts
-- Origin: Internet Domain + protocol + host + port
-- Web Client: Safari, Chrome, Firefox etc 
-- Device: obvious
-- User: person user the computer
- APIs for Browser Data Storage
-- Cookies: very limited, not suitible
-- Web Storage: Session/Local storage -> not recommended anymore, has problems but main reason is performance due to async state and threading
-- WebSQL: Deprecated
-- Application Cache: Deprecated
-- IndexedDB: NoSQL database client-side
-- File and Directories: To Be Deprecated aka FileSystem API
-- Cache Storage: Storing HTTP responses, includes the whole response
-- FileSystem Access: Compatibility is not 100% across browsers

| Data Storage | Stores | Using key of | Grouped in... | Up to... |
| ------ | ------ | ------ | ------ | ------ |
| IndexedDB | JS object, binary data | A keyPath within the object | Object Stores in Databases | Available Quota |
| Cache Storage | HTTP Responses | HTTP Request | Caches | Available Quota |
| Web Storage | strings | String | N/A | 12/5 MB |
| FileSystem Access | files | N/A | N/A | N/A |

### Quotas and Persistence
- Quota - one quota for all storages
-- All data from APIs - local, indexedDB, cache, filesystem
-- Service Worker registrations
-- Web App Manifests from installed PWAs
- Does not include
-- Cookies, Files cached by browser, session storage, files created by FSAccess
- Quotas per Browser
-- Chromimun - 60% of total disk space per origin
-- Firefox - 50% of total disk space with max of 2GB per group (eTLD+1)
-- Safari - 1gb per partition with increments of 200mb with users permission
- Default Storage States per origin
- Best Effort can clear the storage
-- On Storage Pressure (low storage)
-- After some time of inactivity
-- With user invervention
- Persistent Storagen - Will persist unless...
-- User Invervention
-- Device reset
- Browser Defaults
-- Safari: "Best Effort" - eviction can happen
-- Installed PWA: Persistant Storage
-- Firefox + Chromiums: "Best Effort" -> when uninstalled PWA, user may have option to delete data

## Web Storage
- Simple API
-- Stores one key per string
-- Key for entries is also a string
- Synchronous API
-- Warning! - Performance issues
-- Warning! - not available on Workers or Service Workerks
- Can be emulated with IndexedDB


## IndexedDB
- It is a NoSQL data store
- Stores JS objects or bytes, where every entry has a key
-- When storing object, IDB clones them syncrounously 
- API is asynchronous
- Available on Windows, Workers and Service Workers

## Cache Storage
- Part of the Service Wroker spec but not tied to the scope
- Able to create  different storages (caches) under a name
- Every cache store HTTP responses with headers+body
-- Stored under an HTTP key
- Typically used within a Service Working, but available in the Window's scope
- Common Scenarios
-- Pre-chache Assets
-- Cache Assets on the fly
-- Can serve assets from a Service Worker for performance and offline access
-- Query assets available for offline usage
-- Create offline page
- Serve Resources
-- The SW will respond for every request the PWA makes
-- Can synthesize a response
-- Anything is possible
- Cache Serving Strategies
-- Cache First - prioritze speed over freshness
-- Network First - prioritize fresshness over speed
-- Stale while Revalidate - balance of the two above

## FileSystem Access API
- READ + WRITE fiels to the user's device
- require's user's permission (with file-location pick)
- Chromium-only + Desktop only
- Async API
- Doesn't count for the Quota
- Origin Private FileSystem (Safari only)

## Best Practices
### DB & Performance
- Better to store small objects
- Remember to use Web Workers (increase UX)
- Create custom indexes for faster access to collection of objects

### Serverless Ideas
- Export data using FileSystem
- Export/Import data using QR codes
- Blockchain-based data storage

### Being a Good Citizen
- Don't store what you won't use
- Clear the storage when it is not needed
- Best-effort First (plan for the data not being available first)
- Capture quota errors and clear data
- Offer the user a way to get user-generated data out of the application

### Data Sync
- If you store data on server, many sync algorithms are available
- Master Service Workers and sync APIs
- Think about versions and data migration

### Security
- ALL BROWSER DATA STORAGE is PUBLIC
- Insecure by definition
- Don't store private or sensitive data
- If you store auth data, it should be a token that can  easily be revoked