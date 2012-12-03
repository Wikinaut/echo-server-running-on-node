echo-server-running-on-node
===========================

Simple test program for node.js, express and socket.io which echoes characters entered in the client (browser) via a server.

The client screen is split into a small section for messages from the server, and a larger part where you type characters. The characters are sent to the server which echoes them back to client. The client then handles and displays the characters.

The script handles currently these three control characters:
* carriage return (new line)
* backspace (back space)
* ESC (socket stops itself at server side when ESC is received from the client)

#### automatic start and installation of pre-requisites
Attribution: the installation code is shamelessy borrowed and modified from the nice https://github.com/ether/etherpad-lite project.

See package.json for requirements which will be installed automatically.

* git clone git://github.com/Wikinaut/echo-server-running-on-node.git echo-server
* add a user for node scripts, e.g. nodeuser
* su nodeuser bin/run.sh

#### manual start

Requirements (the hard and manual way to install, step-by-step)

* node ( wget node; ./configure; make; make install )
* git clone echo-server-running-on-node echo-server
* add a user for node scripts, e.g. nodeuser
* chown -R nodeuser echo-server
* socket.io ( npm install socket.io )
* express (npm install express )
* graceful-fs (npm install graceful-fs) - only needed if you enable SSL support

Start the server manually:
* su nodeuser -c "node echo-server.js"

Screenshot:
![Alt text](https://raw.github.com/Wikinaut/echo-server-running-on-node/master/20120822_echo-server-runninng-on-node_screenshot.png "Screenshot of echo-server-running-on-node")
