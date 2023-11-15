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

# todo
- [ ] Handle crashes
- [ ] Add the title parameter when creating the URL
- [ ] Change colors when errors happen
- [ ] Improve UI
- [ ] Implement modular loading when the progress is more than one
- [ ] Show a list of events. Log style
- [ ] Estimated time of completion
