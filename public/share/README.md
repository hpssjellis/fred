Assumes node and npm installed.



to install ws 

npm install ws

I had issues 


npm config set strict-ssl false

npm install ws

npm config set strict-ssl true

Which allowed the install, not sure if that is a good idea

run the code 

node server-chat02.js



Run npm via node directly (quick test)
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" -v


That should show your npm version, proving Node is fine.

2. Temporarily bypass script restrictions

In PowerShell, run:

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass


Now retry:

npm -v
