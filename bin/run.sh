#!/bin/sh

#Move to the folder where echo-server is installed
cd `dirname $0`

#Was this script started in the bin folder? if yes move out
if [ -d "../bin" ]; then
  cd "../"
fi

#Stop the script if its started as root
if [ "$(id -u)" -eq 0 ]; then
   echo "You shouldn't start echo-server as root!"
   echo "Please type 'echo-server rocks my socks' if you still want to start it as root"
   read rocks
   if [ ! $rocks = "echo-server rocks my socks" ]
   then
     echo "Your input was incorrect"
     exit 1
   fi
fi

#prepare the enviroment
bin/installDeps.sh $* || exit 1

#Move to the node folder and start
echo "start..."
node echo-server.js
