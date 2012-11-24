connect = require('connect')

server = connect.createServer(
  connect.logger()
  , connect.static(__dirname)
).listen(8001)

