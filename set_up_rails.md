### Task #1: Install Rails

If you don't already have it: `gem install rails`.

### Task #2: Download Postgres

Download the [Postgres app](http://postgresapp.com/).

__OR: Use Homebrew to install Postgres:__

From your terminal, run:

```
brew update
brew install postgres
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```
[want to know a little more?](http://www.fyquah.me/setup-postgresql-on-os-x)

These last 2 lines will set up a special Daemon init file so that your operating
system will start postgres automatically whenever you log in.

------------------
All information taken from the [Turing School Module 2 Prep Work](https://github.com/turingschool/intermission-assignments/blob/master/prep-for-module-2-backend.markdown).
