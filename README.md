# Progress Bar

I was tired of running long proceces and keeping up with the status using messy print statements. 
Progress Bar is a library to view realtime updates of a process on the Web.
Progress Bar will give you a URL to see the progress, status, and messages send by the process.
Besides showing progress, Progress Bar will also indicate if the process crashes.
The server is implemented in node with very few dependencies. We offer a python client, and a node client will follow soon. 
I'm running a free server is you want to try the library.

# installation
```
pip install https://raw.githubusercontent.com/fsaint/progress-bar/main/backend/lib/python/dist/ProgressBar_fsaint-1.0.tar.gz
```
# Getting Started
```


```


# Running the server

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
- [X] Handle crashes
- [X] show the running time.
- [X] Add the title parameter when creating the URL.
- [X] Change colors on status.
- [X] Improve UI: make it dark themed. 
- [ ] API Documentation


## Backlog
- [ ] Show a list of events. Log style
- [ ] Estimated time of completion
- [ ] Add better font


## Create the packgage
```
python setup.py sdist
```
