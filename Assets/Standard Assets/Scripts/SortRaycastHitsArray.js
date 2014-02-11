#pragma strict
//import System.Array;

static function SortByDistance(raycastHits : UnityEngine.RaycastHit[]) : Array {
	var raycastResults = new Array();
	for(var hit : RaycastHit in raycastHits) {
		var rayc : RaycastResult = new RaycastResult(hit);
		raycastResults.push(rayc);
	}
	return raycastResults.sort();//
}