# JSON Serialization on Windows

CMD has a tendancy to remove quotes inside of command inputs, this happens with JSON objects as well. Therefore you should add escape characters to ensure your JSON is correctly parsed by your command line and the TUI. For example:

```
# This is normal JSON
{"start":"abc","end":"xyz"}

#This is JSON with escape characters to ensure consistency in CMD
"{\"start\":\"abc\",\"end\":\"xyz\"}"
```
