# Progress Bar

The Progress Bar library provides a way to generate unique URLs, update their progress, status, and messages, and send real-time updates to clients.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Example Usage](#example-usage)


# installation

## Mongo (Mac)
```
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

# run the server

```
node server.js
```

# States

1. PENDING: URL was created. However, no progress has bee received. 
2. IN_PROGRESS: Progress has been received. 
3. STALLED: The process is not making progress. Use for Throdling timers 
4. FAILED: An unhandled exception was captured. 
5. FINISHED: The process reached sucesful completion. It can be manually done, or when the process exits with no exception. 


# todo
## V 0.1
- [ ] Handle crashes
- [ ] Extract options to a config file.  In particular the BASE url.
- [X] Add the title parameter when creating the URL.
- [ ] Change colors when errors happen.
- [ ] Improve UI: make it dark themed. 
- [ ] Add better font


## Backlog
- [ ] Show a list of events. Log style
- [ ] Estimated time of completion
