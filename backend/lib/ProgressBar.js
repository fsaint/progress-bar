class ProgressBar {
  constructor() {
    this.urls = {}; // Store URL data
  }

  generateUniqueURL() {
    // Implement your unique URL generation logic here
    // For simplicity, you can use a random string or a timestamp
    const uniqueUrl = Math.random().toString(36).substring(2, 10);
    this.urls[uniqueUrl] = {
      progress: null,
      status: null,
      message: null,
    };
    return uniqueUrl;
  }

  update(uniqueUrl, progress, status, message) {
    if (this.urls[uniqueUrl]) {
      if (typeof progress === 'number' && progress >= 0 && progress <= 1) {
        this.urls[uniqueUrl].progress = progress;
      }
      if (status) {
        this.urls[uniqueUrl].status = status;
      }
      if (message) {
        this.urls[uniqueUrl].message = message;
      }
      // Call a function to send updates via WebSocket
      this.sendWebSocketUpdate(uniqueUrl, this.urls[uniqueUrl]);
      return this.urls[uniqueUrl];
    } else {
      throw new Error('URL not found');
    }
  }

  sendWebSocketUpdate(uniqueUrl, data) {
    // You can implement WebSocket logic here to send updates to connected clients
    // For example, emit the 'update' event to a room associated with uniqueUrl
  }

  // Method to send a message before the process is terminated
  sendTerminationMessage(uniqueUrl, message) {
    if (this.urls[uniqueUrl]) {
      this.urls[uniqueUrl].message = message;
      // Call a function to send the termination message via WebSocket
      this.sendWebSocketUpdate(uniqueUrl, this.urls[uniqueUrl]);
      // Optionally, you can remove the URL data from the storage if needed
      delete this.urls[uniqueUrl];
    } else {
      throw new Error('URL not found');
    }
  }
}

// Example usage:
const urlTracker = new URLTracker();

const uniqueUrl = urlTracker.generateUniqueURL();

urlTracker.update(uniqueUrl, 0.5, 'in progress', 'Processing data...');

// Simulate process termination
urlTracker.sendTerminationMessage(uniqueUrl, 'Process terminated due to an error.');

// The URL data is now removed from the storage

// You can continue to use the URLTracker object for other URLs and updates.
