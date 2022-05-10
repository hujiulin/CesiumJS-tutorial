//camera fly
var forward = 0;
var path_length = [620, 200, 200]
var path_angle = [0.39269908125, 0.78539816339744830961566084581988, 0.78539816339744830961566084581988]
var path_dir = ['u', 'r', 'r'];
var path_speed = [10, 5, 4];
var path_i = 0;
var fly_handler = null;
function freeFly() {
	viewer.camera.moveForward(path_speed[path_i]);
	forward += path_speed[path_i];
	if (forward >= path_length[path_i]) {
		if (path_i + 1 >= path_length.length) {
			path_i = 0;
			viewer.zoomTo(tileset, default_HeadingPitchRange);
			return;
		}
		forward = 0;
		if (path_dir[path_i] == 'u') {
			viewer.camera.lookUp(path_angle[path_i]);
		}
		if (path_dir[path_i] == 'r') {
			viewer.camera.lookRight(path_angle[path_i]);
		}
		path_i++;
	}
}
function startToFly() {
	fly_handler = setInterval(freeFly, 100);
}
function stopToFly() {
	if (null != fly_handler) {
		clearInterval(fly_handler);
		fly_handler = null;
		forward = 0;
		path_length = [1320, 200, 200, 200, 300]
		path_angle = [0.39269908125, 0.78539816339744830961566084581988, 0.78539816339744830961566084581988, 1.5707963267948966192313216916398]
		path_dir = ['u', 'r', 'r', 'r'];
		path_speed = [10, 5, 4, 2, 2];
		path_i = 0;
	}
}
function slideFly() {
	//viewer.camera.moveUp(10);
	// viewer.camera.moveRight(10);
	// viewer.camera.moveForward(10);
	// viewer.camera.zoomIn(1.1);
	// viewer.camera.lookUp(3.14 / 30);
	// viewer.camera.lookRight(3.14 / 30);
	// viewer.camera.twistLeft(3.14 / 30);
	// viewer.camera.rotateUp(3.14 / 30);
	// viewer.camera.rotateDown(3.14 / 30);
	// viewer.camera.rotateLeft(3.14 / 30);
	// viewer.camera.rotateRight(3.14 / 30);

	if (null == fly_handler) {
		startToFly();
	} else {
		stopToFly();
	}
}
