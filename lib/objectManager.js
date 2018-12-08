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
module.exports = function (obj, data, parse, lvl, type, name, opt) {

    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }


    data.get.push("var data" + lvl + " = {};")
    if (opt.shuffleObjects) {
        var array = [];
        for (var name in obj) {

            if (obj.hasOwnProperty(name)) array.push({
                name: name,
                dt: obj[name]
            });
        }
        shuffle(array);
        var t = true;
        for (var i = 0; i < array.length; ++i) {
            var r = parse(array[i].dt, array[i].name, 1);
            if (!r) t = false;
        }
        return t;
    }
    var t = true;
    for (var name in obj) {

        if (obj.hasOwnProperty(name)) {

            var r = parse(obj[name], name, 1);
            if (!r) t = false;
        }
    }
    return t;

}