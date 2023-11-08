import requests

class URLTrackerClient:
    def __init__(self, base_url):
        self.base_url = base_url

    def create_url(self):
        try:
            response = requests.post(f"{self.base_url}/api/create_url")
            if response.status_code == 200:
                return response.json()
            else:
                print("Failed to create a new URL")
                print(response)
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")

    def update_url(self, unique_url, progress=None, status=None, message=None):
        data = {}
        if progress is not None:
            data['progress'] = progress
        if status is not None:
            data['status'] = status
        if message is not None:
            data['message'] = message

        try:
            response = requests.patch(f"{self.base_url}/api/update/{unique_url}", json=data)
            if response.status_code == 200:
                return response.json()
            else:
                print("Failed to update URL")
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")

# Usage example:
if __name__ == "__main__":
    base_url = "http://localhost:3000"  # Replace with the actual URL of your Node.js backend API
    client = URLTrackerClient(base_url)

    # Create a new URL
    new_url = client.create_url()
    print("Created URL:", new_url)

    # Update the URL with progress, status, and message
    unique_url = new_url["uniqueUrl"]
    client.update_url(unique_url, progress=0.5, status="in progress", message="Processing data...")
