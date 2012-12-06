#!/bin/sh

echo "Ensure that all dependencies are up to date..."

#Move to the folder where echo-server is installed
cd `dirname $0`

#Was this script started in the bin folder? if yes move out
if [ -d "../bin" ]; then
  cd "../"
fi

#Is node installed?
hash node > /dev/null 2>&1 || { 
  echo "Please install node.js ( http://nodejs.org )" >&2
  exit 1 
}

#Is npm installed?
hash npm > /dev/null 2>&1 || { 
  echo "Please install npm ( http://npmjs.org )" >&2
  exit 1 
}

#check npm version
NPM_VERSION=$(npm --version)
if [ ! $(echo $NPM_VERSION | cut -d "." -f 1) = "1" ]; then
  echo "You're running a wrong version of npm, you're using $NPM_VERSION, we need 1.x" >&2
  exit 1 
fi

#check node version
NODE_VERSION=$(node --version)
NODE_V_MINOR=$(echo $NODE_VERSION | cut -d "." -f 1-2)
if [ ! $NODE_V_MINOR = "v0.8" ] && [ ! $NODE_V_MINOR = "v0.6" ]; then
  echo "You're running a wrong version of node, you're using $NODE_VERSION, we need v0.6.x or v0.8.x" >&2
  exit 1 
fi

echo "Installing node modules with npm install..."
(
  npm install --loglevel warn
) || { 
  rm -rf node_modules
  exit 1 
}

exit 0
