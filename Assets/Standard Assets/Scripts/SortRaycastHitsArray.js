#pragma strict
//import System.Array;

static function SortByDistance(raycastHits : UnityEngine.RaycastHit[]) {
	var raycastResults = new Array();
	for(var hit : RaycastHit in raycastHits) {
		raycastResults.push(new RaycastResult(hit));
	}
	return raycastResults.sort();//
}