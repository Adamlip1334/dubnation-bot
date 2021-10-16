# dubnation-bot
![](https://media4.giphy.com/media/1mGIKKtQbSwlvoRPtI/giphy.gif?cid=790b7611a41091a6e618a988b27f6578e548d03284a4faf5&rid=giphy.gif)
## Installation
```# Clone the repository
git clone https://github.com/Adamlip1334/dubnation-bot.git

# Enter into the directory
cd dubnation-bot/

# Install the dependencies
npm install

# Run index.js
node .
```

## Setup

.env should look like
SECRET =  `Discord Bot API Key`
YTAPI = ` Youtube API Key`

## Usage

Commands all start with `/` and will give you tips as you start typing in Discord.

Command | Description
--------|------------
`/kick [user] [reason]` | Kicks the user from the guild.
`/vckick [user]` | Kicks user from the voice channel they are in.
`/avatar (user)` | Displays avatar of user, provides links to the avatar.
`/say [message]` | Repeats message given by the user in an embed. 
`/help`          | Displays the help message for the bot.
`/ping`          | Displays the latency of the bot
`/play [youtube-url/search]`          | Plays a specified song.
`/clear`         | Clears the song queue.
`/leave`         | Stops playing songs and leaves.
`/loop`          | Loops the currently playing song.
`/loopqueue`     | Loops the queue.
`/nowplaying`    | Displays the current playing song.
`/pause`         | Pauses/unpauses the current song.
`/queue`         | Display the song queue.
`/skip`          | Skips the current song.
`/shuffle`       | Shuffles the songs in the queue.


