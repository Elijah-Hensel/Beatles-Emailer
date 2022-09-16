# Random Email Generator

## Overview
This is a small email generation application. There is a front end that accepts user input for sign up and a node script, that when run, will send emails with a random message from a list of predetermined message objects.

## Software Versions Used
| Tech          |  Version   | Notes                                   |
| :------------ | ---------: | :-------------------------------------- |
| Node.js       |   18.7.17  |
| React         |   18.2.0   |
| Prisma        |   ^4.3.1   |
| Express       |   ^4.18.1  |
| Next          |   12.3.0   |
| MySQL         |   ^2.18.1  |


## Local Environment Setup
Before running the application locally, we'll need to ensure that we have all the necessary software installed on our machine.  On macOS, [homebrew](https://brew.sh/) can facilitate installing and managing the software that we need.

_Note:_ Installing software through homebrew may require updating your `PATH` environment variable.  Often homebrew will notify you of this when installing new software. If you encounter a "command not found" error, you might need to update your `PATH`.  If you're using Z Shell (Zsh, the default for recent macOS versions), this can be done by modifying your .zshrc file.

- #### Ruby
  Install [Ruby](https://www.ruby-lang.org/en/) 3.0.1.  There are different ways to [install Ruby](https://www.ruby-lang.org/en/documentation/installation/).  One option is to use a version manager like [rbenv](https://github.com/rbenv/rbenv#readme) or [rvm](http://rvm.io/).

- #### Node.js
  Install [Node.js](https://nodejs.org/en/) 14.15.4.  As with ruby, there are different ways to [install Node.js](https://nodejs.dev/learn/how-to-install-nodejs), and there are version managers like [nvm](https://github.com/nvm-sh/nvm).

- #### PostgreSQL
  Install [PostgreSQL](https://www.postgresql.org/) 13.5.  Again, there are different ways to [install PostgreSQL](https://www.postgresql.org/download/); on macOS, [installing PostgreSQL via homebrew](https://formulae.brew.sh/formula/postgresql) and [downloading Postgres.app](https://postgresapp.com/downloads.html) are options.

  _Note:_ If downloading Postgres.app, download a release that runs the correct PostgreSQL version—at least the correct major version.

- #### Elasticsearch
  Install [Elasticsearch](https://www.elastic.co/elasticsearch/) 7.14.x.  There are different ways to [install Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html); on macOS, [installing Elasticsearch via homebrew](https://www.elastic.co/guide/en/elasticsearch/reference/7.14/brew.html) is an option.

  _Note:_  If you install Elasticsearch through homebrew, it might be necessary to set an `ES_JAVA_HOME` environment variable whose value is the path to your installed version of Java. For example, if you installed OpenJDK through homebrew, then you might need to set the environment variable's value to `"/opt/homebrew/opt/openjdk/bin/java"`.

- #### Redis
  Install [Redis](https://redis.io/).  There are different ways to [install Redis](https://redis.io/download); on macOS, [installing Redis via homebrew](https://formulae.brew.sh/formula/redis) is an option.

- #### ImageMagick
  Install [ImageMagick](https://imagemagick.org/script/index.php).  There are different ways to [install ImageMagick](https://imagemagick.org/script/download.php); on macOS, [installing ImageMagick via homebrew](https://formulae.brew.sh/formula/imagemagick) is an option.

- #### Mailcatcher
  Install [Mailcatcher](https://mailcatcher.me).  After Ruby has been installed and the current Ruby version is set to 3.0.1, then from the command line, run `gem install mailcatcher`.

  _Note:_  If you run into a [failed to build gem native extension error](https://stackoverflow.com/questions/64662290/gem-install-mailcatcher-fails-with-error-error-installing-mailcatcher-error), try `gem install mailcatcher -- --with-cflags="-Wno-error=implicit-function-declaration"`.

*Note:* Java is required to run Metabase locally. On macOS, [openjdk](https://formulae.brew.sh/formula/openjdk) is an option.

## Application Setup for Local Development
### Set the Rails Master Key
In order to encrypt and decrypt credentials (e.g., an AWS access key id), we need to setup the application with the Master Key.  Create a file `config/master.key`, and enter the value of the key into the file.  The only content in the file should be the value of the key.

*Note:* Another developer can provide the value of the key.