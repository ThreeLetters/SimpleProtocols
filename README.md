# SimpleProtocols
Serialize your data in binary!

## Purpose
Generates code for binary serialisation. Like google's protocol buffers, but simpler and easier.

## Usage
> node index.js

1. Edit the data.json file to specify data types
2. Run `node index.js`
3. Generated code located at /out/

## Documentation

### Data types
1. `int [min] [max]` - Integer
2. `string [encoding]` - A string. Encodings include `8` (default), `16`, and `32`.

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

#### Objects
You can have objects by doing
```
{
hello: "int 0 255",
this: "string",
is: "string 16",
aobject: "int 0 10000"
}
```

#### Conditionals
You can also have conditional statements
```
{
if: "obj.type == 0",
then: "something",
else: "anotherthing" 
}
```
