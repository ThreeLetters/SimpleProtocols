require("./base2/packer.js");

var packer = new Packer;
exports.pack = function() {
	return packer.pack.apply(packer, arguments);
};
