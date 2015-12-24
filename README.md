# Sentry Zendesk app

The Sentry Zendesk app pulls in some data about the Sentry users in the Zendesk interface.

## Project view

    /app.js 				- Main logic for sidebar app
    /app.css 				- CSS that Zendesk will load for app
    /manifest.json			- Configuration file for app, also used by Zendesk
    /assets			       	- empty, required by Zendesk
    /templates				- where Zendesk loads handlebar templates from
    /templates/layout.hdbs 	- Default Zendesk template, which all others are inserted into
    /templates/results.hdbs	- Template for displaying search results
    /templates/error.hdbs 	- Template to display when an error is received from API
    /translations/en.json 	- mostly empty, required by Zendesk

## Testing the app locally

The app is deployed by the admin but can be tested locally before it's deployed.

### 1. Setting up the Zendesk tools

We're going to use Zendesk tools to serve the local app in a way that the Zendesk interface can access. There's detailed instructions [here](https://support.zendesk.com/hc/en-us/articles/203691256) on what you can do with their tools if you're curious.

First, install the tools:

    $ sudo gem install zendesk_apps_tools

If you get compilation errors on OS X, you may need to run this first (Choose install, you only need the command line tools, not all of Xcode):

    $ xcode-select --install

Once installed, run the local development environment using

    $ zat server

### 2. Telling Zendesk to use local apps

It's straightforward, you'll need to add ```?zat=true``` to any Zendesk URL. For example:

    https://sentry.zendesk.com/agent/tickets/701?zat=true

When the page loads, the right corner of the URL bar will have a little shield telling you it prevented unsafe scripts from loading. Press the ```Load Unsafe Scripts``` button and the page will reload again with your app.

### 3. Packaging and deploying

Covered more [here](https://support.zendesk.com/hc/en-us/articles/203691296-Building-your-first-Zendesk-app-Part-5-Installing-the-app-in-your-Zendesk)

Run

    $ zat package

This will spit out a zip file. You'll upload the app as an admin: Admin -> Apps -> Manage -> Upload App.
