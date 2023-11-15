import requests
import time
import sys
import atexit
import os
import psutil
import traceback

exception = False
created_urls = []
# Register for exceptions

class Status:
    PENDING = 'PENDING'
    IN_PROGRESS = 'IN_PROGRESS'
    STALLED = 'STALLED'
    FAILED = 'FAILED'
    FINISHED = 'FINISHED'


def handle_unhandled_exception(exc_type, exc_value, exc_traceback):
    global exception;
    exception = True
    for url in created_urls:
        url.exception(exc_type, exc_value, exc_traceback)
    #if issubclass(exc_type, KeyboardInterrupt):
    sys.__excepthook__(exc_type, exc_value, exc_traceback)
    return

sys.excepthook = handle_unhandled_exception

# Register for process exit
def exit_handler():
    if not exception:
        for url in created_urls:
            url.terminate()


atexit.register(exit_handler)


def get_memory_usage():
    process = psutil.Process(os.getpid())
    return process.memory_info().rss


class URLTrackerClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.unique_id = None
        created_urls.append(self)

    def create_url(self, title = None):
        """
        Create a new URL with the given title.

        Parameters:
        title (str, optional): The title of the URL. Defaults to None.

        Returns:
        dict: The response from the server after creating the URL.
        """
        try:
            response = requests.post(f"{self.base_url}/api/create_url", data={"title": title})
            if response.status_code == 200:
                response_url_object = response.json()
                self.unique_id = response_url_object['unique_id']
                return response_url_object
            else:
                print("Failed to create a new URL")
                print(response)
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")

    def exception(self, exc_type, exc_value, exc_traceback):
        exception_details = "".join(traceback.format_exception(exc_type, exc_value, exc_traceback))
        self.update_url(status=Status.FAILED, message=exception_details)

    def update_url(self, progress=None, status=None, message=None):
        """
        Update the URL with the given unique_id, progress, status, and message.

        Parameters:
        progress (float, optional): The progress of the URL. Defaults to None.
        status (str, optional): The status of the URL. Defaults to None.
        message (str, optional): The message of the URL. Defaults to None.

        Returns:
        dict: The response from the server after updating the URL.
        """
        if self.unique_id is None:
            print("Warning: attempted to update a URL that has not been created. Call create_url first.")
            return None

        data = {}
        if progress is not None:
            data['progress'] = progress
        if status is not None:
            data['status'] = status
        if message is not None:
            data['message'] = message

        try:
            response = requests.patch(f"{self.base_url}/api/update/{self.unique_id}", json=data)
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Failed to update URL {response.status_code }")
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
    

    def terminate(self):
        self.update_url(status=Status.FINISHED, message="Process finished")
        created_urls.remove(self)

# Usage example:
if __name__ == "__main__":
    base_url = "http://localhost:3000"  # Replace with the actual URL of your Node.js backend API
    client = URLTrackerClient(base_url)

    # Create a new URL
    new_url = client.create_url()
    print("Created URL:", new_url)

    # Update the URL with progress, status, and message
    input()
    for i in range(100):
        client.update_url(progress=i / 100.0 , status="IN_PROGRESS", message=f"Processing data... {i}")
        time.sleep(1)
        