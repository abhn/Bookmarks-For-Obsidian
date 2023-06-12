# Firefox Bookmarks to Obsidian
A Mozilla Firefox addon to add a page action (a button in your address bar's right corner) to directly save the current webpage's title and URL in markdown files.

NOTE that this addon is made very specifically for my usecase and most likely won't work for you out of the box.

### My setup
I have an iCloud folder that opens in Obsidian where I make notes. It is heavily inspired by [Nikita's Knowledge repository](https://github.com/nikitavoloboev/knowledge).

I found myself painstakingly copying links and page titles into my markdown files for long term bookmarking and wanted something quick.

I made this extension which has a popup that asks which file to add the link to and any tags to associate with the link.

![](https://i.imgur.com/iRO0l4Z.png)
![](https://i.imgur.com/NXpGnmv.png)
![](https://i.imgur.com/gmja6fB.png)

On adding the link, this is how it looks like in my markdown files

![](https://i.imgur.com/YkcSZyj.png)

### Installation
- Requires Python 3
- Install the add-on
- Clone this repository and `cd` into it
- Run `make`

