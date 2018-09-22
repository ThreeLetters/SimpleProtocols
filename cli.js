/*
    SimpleProtocols - A protocol generator
    Copyright (C) 2017 Andrew S

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var parser = require('./lib/parser.js')
var fs = require('fs');
console.log("Reading data.json...")
eval("var object = " +
    fs.readFileSync("data.json", "utf8"))
eval("var options = " +
    fs.readFileSync("options.json", "utf8"))
console.log("Generating code...")




var results = parser(object, options);
console.log("Writing files...")
fs.writeFileSync(__dirname + "/out/setNodeJS.js", results.set);
fs.writeFileSync(__dirname + "/out/getNodeJS.js", results.get);
fs.writeFileSync(__dirname + "/out/setBrowser.js", results.setb);
fs.writeFileSync(__dirname + "/out/getBrowser.js", results.getb);

console.log("Get/Set code generated! Files located in ./out/")
