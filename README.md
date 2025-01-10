# Firefox Addon for Muting Specific Users on zenn.dev

This is a Firefox addon that allows you to mute specific users on [zenn.dev](https://zenn.dev). By registering user IDs, posts from those users will no longer be displayed in your feed.

## Features

- Add user IDs to mute list
- Remove user IDs from mute list
- Backup and restore mute list
- Bulk import user IDs

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Open Firefox and go to `about:debugging`.
3. Click on "This Firefox" in the sidebar.
4. Click on "Load Temporary Add-on".
5. Select the `manifest.json` file from the cloned repository.


Alternatively, you can run the addon using `web-ext`:
```sh
web-ext run -u https://zenn.dev
```

## Usage

1. Click on the addon icon in the Firefox toolbar.
2. Use the input field to add user IDs to the mute list.
3. Use the "Backup" button to download the current mute list.
4. Use the "Bulk Import" button to import multiple user IDs at once.

## License

This project is licensed under the Apache License Version 2.0.
