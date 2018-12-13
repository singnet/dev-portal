# How to pass call parameters in snet-cli and parameters modifer.

Here we describe how to pass parameters to the service in snet-cli, and we demostrate how to pass binary paramaters via comandline interface.

## JSON parameters

Parameters for the service have to be passed to snet-cli in JSON format. There are three ways of passing this JSON:
* via cmdline parameter
* via JSON file
* via stdin

For example in front-to-back [example1](front-to-back-examples/example1.md#make-a-call-using-stateless-logic) we need to pass the following json as parameter for "add" method to our service:
{"a":10,"b":32}

we can use three ways
```bash
# via cmpline parameter
snet client call 0 0.1 localhost:8080 add '{"a":10,"b":32}'

# via json file
echo '{"a":10,"b":32}' > p.txt
snet client call 0 0.1 localhost:8080 add p.txt

# via stdin
echo '{"a":10,"b":32}' | snet client call 0 0.1 localhost:8080 add
```

## Modifiers

We've implemented several modifiers for this JSON parameter in order to simplify passing big files and and have possibility to actually pass binary data (and not only base64 encoded).

There are 3 possible modifiers: 
* file      - read from file
* b64encode - encode to base64
* b64decode - decode from base64

for example if you pass the following JSON as parameter then as "image" parameter we will use base64 encoded content of "1.jpeg"

```bash 
'{"image_type": "jpg", "file@b64enode@image": "1.jpeg"}'
```

If we remove b64encode modifier from the previous example then we will pass 1.jpeg image in binary format without base64 encoding.  


