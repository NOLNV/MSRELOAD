#pragma strict

class DialogOption {
	var response : String;
	var timeout : String;
	var condition : String;
	var target : String;
	
	function DialogOption( a : String, b : String, c : String) {
		response = a;
		timeout = b; // condition
		target = c;
	}
}