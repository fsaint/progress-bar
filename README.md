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
from progressbar import ProgressBar

progresbar = ProgressBar()
print(progresbar.url)

long_list = [...]

for i, element in enumerate(long_list):
    progresbar.progress(float(i + 1) / len(urls), message=f"Processing element {i}")
    process(element)

```


# Example
In this example we show a simple scraper that uses  beautiful soup to extract the title of the scrapped page.

```
import requests
from bs4 import BeautifulSoup
from progressbar import ProgressBar
import time

urls = [
   "https://www.example/1",
   "https://www.example/2",
   ...
]
progresbar = ProgressBar()
print(progresbar.url)
progresbar.progress(0, message="Ready ...")
for i, url in enumerate(urls):
    response = requests.get(url)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    progresbar.progress(float(i + 1) / len(urls), message=soup.title.text)
    # Rest of your code to parse the HTML with BeautifulSoup
    time.sleep(2)
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
