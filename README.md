echo-server-running-on-node
===========================

Simple test program for node.js, express and socket.io which echoes characters entered in the client (browser) via a server.

The client screen is split into a small section for messages from the server, and a larger part where you type characters. The characters are sent to the server which echoes them back to client. The client then handles and displays the characters.

The script handles currently these three control characters:
* carriage return (new line)
* backspace (back space)
* ESC (socket stops itself at server side when ESC is received from the client)

Requirements:

* node ( wget node; ./configure; make; make install )
* git clone echo-server-running-on-node echo-server
* add a user for node scripts, e.g. nodeuser
* chown -R nodeuser echo-server
* socket.io ( npm install socket.io )
* express (npm install express )

Start the server:
* su nodeuser -c "node echo-server.js"

Screenshot:
![Alt text](/echo-server-running-on-node/blob/master/20120822_echo-server-runninng-on-node_screenshot.png "Screenshot of echo-server-running-on-node")
