# 4321

4321 is a basic Google Chrome extension that acts as a to-do list.
You can enter 10 tasks, split into 4, 3, 2 and then 1.

The idea is to help focus on the more immediate things you have at hand, rather than being overwhelmed by an endless stream of things that need your attention.

## Using the extension

Once the extension is installed, accessing your 4321 list is as easy as opening a new tab in Chrome. The page will automatically show the first open set of tasks you have.

You can add or edit tasks simply by typing into the boxes. Click out of the box, or anywhere on the page to save the entry.

When you've completed a task, click the tick symbol and it will be greyed out. If you tick something by mistake, clicking the tick again will reinstate that task.

When you've completed your first four tasks, the page will automatically move onto the block of three. When you've completed those three, it will move onto the block of two - and so on. Once you've completed all 10 tasks, you'll be given a button to clear the task list and take you back to the first block of 4.

## The technical bits

This extension saves data by using the [chrome.storage](https://developer.chrome.com/docs/extensions/reference/storage/) function.

The background image uses the random image URL from [Unsplash](https://source.unsplash.com/). Other than this, there are no external libraries in use.

The code for this extension is available under an MIT License. It was written as a proof of concept for the 4321 style of to-do lists, and so the code itself will be revisited at a later date for some much-needed tidying.

# Changelog
## v1 - August 2021
The first commit of the 4321 extension. This has all the basic functionality in place.
### In the pipeline
Future versions will allow the user to change the background from either the random unSplash image (at present), or a colour of their own choosing. At the moment the colour choices are limited to preset options.

Additionally, the extension is designed as a proof of concept for the idea of 4321 todo lists, and so the code is not as elegant as I'd like. This will be rectified in future.