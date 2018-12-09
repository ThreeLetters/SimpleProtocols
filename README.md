# SimpleProtocols
Serialize your data in binary! Generates unique protocols resistant to decoding

## Purpose
Takes a data structure in JavaScript and generates unique code to serialize and unserialize it. Has high amounts of security to prevent anyone from decoding the protocol. Each generation is unique, so if someone cracked your protocol, you can generate again using this tool. Very useful for security in web applications and IO games.

## Usage
> node index.js

1. Edit the data.json file to specify data types. (You can also edit options.json)
2. Run `node cli.js`
3. Generated code located at /out/

> require("simpleprotocols")

1. Do `npm install simpleprotocols`.
2. Use it in your code!

```js
var SimpleProtocols = require("simpleprotocols");
var output = SimpleProtocols(dataStruct,options);
```

## Documentation

### Data types
1. `int [min] [max]` - Integer/number. Can be decimals. Greatest amount of decimals given is used.
2. `int [type]` - Integer/number. Can be: `dynamic`, `int8`, `uint8`, `int16`, `uint16`, `int32`, `uint32`, `uint24`, `float32`
3. `string [encoding]` - A string. Encodings include `8` (default), `16`, and `32`.

### Arrays
#### Fixed arrays
You can have a fixed array by doing:

```
[
"length [length]",
"your stuff"
]
```
#### Dynamic arrays
You can have dynamic arrays by doing
```
[
"Your stuff"
]
```

### Objects
You can have objects by doing
```
{
hello: "int 0 255",
this: "string",
is: "string 16",
aobject: "int 0 10000"
}
```

### Conditionals
You can also have conditional statements
```
{
if: "obj.type == 0",
then: "something",
else: "anotherthing" 
}
```

### Security Features
There are some security features to protect the protocols from being read.

1. shuffleObjects - Shuffle order in objects. Default: true
2. scrambleConditionals - Scramble conditional statements. Default: true
3. scrambleNumbers - Scramble numbers. Default: true
4. encodeStrings - Encode strings using rc4 encryption. Default: false
5. maskStrings - Masks strings so that they cannot be read easily. Default: true
6. maskLength - Sets a mask length. Default: [4,6]
7. pack - Pack output code using Dean Edward's packer (http://dean.edwards.name/packer/). Not a significant security feature. Default: false

## Note:
The json files in this project are not actually json. This is to simplify its syntax. `eval()` is used to evaluate the files.

