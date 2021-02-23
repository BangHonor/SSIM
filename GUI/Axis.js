//画坐标轴
var scene = editor.scene
var camera = editor.camera
var renderer = editor.renderer
var Axis = new THREE.Group();

//箭头模块
//来自原点的方向。必须是单位向量
var dirX = new THREE.Vector3(1, 0, 0);
var dirY = new THREE.Vector3(0, 1, 0);
var dirZ = new THREE.Vector3(0, 0, 1);



// 规格化方向向量(转换为长度为1的向量)
dirX.normalize();
dirY.normalize();
dirZ.normalize();

// 箭头开始的点
var origin = new THREE.Vector3(0, 0, 0);

//箭头所在的位置
var length = 1;

// 用于定义颜色的十六进制值。默认值为0xffff00
var hexX = "#00DB00";
var hexY = "#0000E3";
var hexZ = "#EA0000";

// 箭头的长度。默认值为0.2 *length
var headLength = 0.3;

// 箭头宽度的长度。默认值为0.2 * headLength。
var headWidth = 0.2;

// 箭头显示助手
var arrowHelperX = new THREE.ArrowHelper(dirX, origin, length, hexX, headLength, headWidth);
var arrowHelperY = new THREE.ArrowHelper(dirY, origin, length, hexY, headLength, headWidth);
var arrowHelperZ = new THREE.ArrowHelper(dirZ, origin, length, hexZ, headLength, headWidth);
Axis.add(arrowHelperX, arrowHelperY, arrowHelperZ);


var geometryX = new THREE.LineGeometry();
var geometryY = new THREE.LineGeometry();
var geometryZ = new THREE.LineGeometry();

// 顶点坐标构成的数组pointArr,几何体传入顶点坐标
var pointArrX = [0.9, 0, 0, 0, 0, 0,]
var pointArrY = [0, 0.8, 0, 0, 0, 0,]
var pointArrZ = [0, 0, 0.9, 0, 0, 0,]
geometryX.setPositions(pointArrX);
geometryY.setPositions(pointArrY);
geometryZ.setPositions(pointArrZ);

// 自定义的材质
var materialX = new THREE.LineMaterial({
	color: "#00DB00",
	// 线宽度
	linewidth: 0.006,
});
var materialY = new THREE.LineMaterial({
	color: "#0000E3",
	// 线宽度
	linewidth: 0.006,
});
var materialZ = new THREE.LineMaterial({
	color: "#EA0000",
	// 线宽度
	linewidth: 0.006,
});

// 把渲染窗口尺寸分辨率传值给材质LineMaterial的resolution属性
// resolution属性值会在着色器代码中参与计算
var lineX = new THREE.Line2(geometryX, materialX);
var lineY = new THREE.Line2(geometryY, materialY);
var lineZ = new THREE.Line2(geometryZ, materialZ);
Axis.add(lineX, lineY, lineZ);//line没有宽度!改用mesh




var control, OrbitControls;
var scale = 1;

var worldPosition = new THREE.Vector3();
var camPosition = new THREE.Vector3();



init();

function init() {
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	planeTextX = PlaneText("X", "#EA0000");
	Axis.add(planeTextX);
	planeTextX.position.set(-0.2, 0, 1.1);

	planeTextY = PlaneText('Y', "#0000E3");
	Axis.add(planeTextY);
	planeTextY.position.set(-0.2,1,0);


	planeTextZ = PlaneText('Z', "#00DB00");
	Axis.add(planeTextZ);
	planeTextZ.position.set(1.1,0,-0.2);

	scene.add(Axis);

	function PlaneText(text, textColor) {
		var texture = canvasMultilineText(text, textColor);
		var planeGeometry = new THREE.PlaneBufferGeometry(0.2, 0.2);
		var planeMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, color: 0xffffff, side: THREE.DoubleSide, });
		return new THREE.Mesh(planeGeometry, planeMaterial);
	}

	function canvasMultilineText(textArray, textColor, parameters) {
		parameters = parameters || {};
		var width = 0;
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		//透明
		context.globalAlpha = 0;

		if (typeof textArray === 'string') textArray = [textArray];

		context.font = parameters.font ? parameters.font : '48px sans-serif';

		for (let i = 0, len = textArray.length; i < len; i++) {
			width = context.measureText(textArray[i]).width > width ? context.measureText(textArray[i]).width : width;
		}

		canvas.width = width + 20;
		canvas.height = textArray.length * 60;

		context.font = parameters.font ? parameters.font : '48px sans-serif';
		for (let i = 0, len = textArray.length; i < len; i++) {
			context.fillStyle = textColor;
			context.fillText(textArray[i], 10, 48 + i * 60);
		}
		var texture = new THREE.Texture(canvas);
		texture.minFilter = texture.magFilter = THREE.NearestFilter;
		texture.needsUpdate = true;

		return texture;
	}
	window.addEventListener('resize', onWindowResize, false);

}


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}


//设置坐标轴不随场景变化
function animate() {
	updateObj(lineX, 10);
	updateObj(lineY, 10);
	updateObj(lineZ, 10);
	updateObj(arrowHelperX, 10);
	updateObj(arrowHelperY, 10);
	updateObj(arrowHelperZ, 10);

	var scaleX = updateText(planeTextX, 10);
	var scaleY = updateText(planeTextY, 10);
	var scaleZ = updateText(planeTextZ, 10);

	//同时更新文字的距离
	planeTextX.position.set(-0.2 * scaleX, 0, 1.1 * scaleX);
	planeTextY.position.set(-0.2 * scaleY, 1.0 * scaleY, 0);
	planeTextZ.position.set(1.1 * scaleZ, 0, -0.2 * scaleZ);

	requestAnimationFrame(animate);
	render()
}

function updateObj(mesh, coefficient) {
	//更新mesh对象及其子对象的全局变换
	mesh.updateMatrixWorld();		//更新视角情况
	
	camera.updateMatrixWorld();
	camPosition.setFromMatrixPosition(camera.matrixWorld);
	//根据距离，动态调整缩放比例
	scale = worldPosition.distanceTo(camPosition) / coefficient;
	//根据对远点的距离变化，判断当前的scale
	mesh.scale.set(scale, scale, scale);

	return scale;
}

function updateText(mesh, coefficient) {
	//更新mesh对象及其子对象的全局变换
	mesh.updateMatrixWorld();		//更新视角情况

	camera.updateMatrixWorld();
	camPosition.setFromMatrixPosition(camera.matrixWorld);
	//根据距离，动态调整缩放比例
	scale = worldPosition.distanceTo(camPosition) / coefficient;
	//根据对远点的距离变化，判断当前的scale
	mesh.scale.set(scale, scale, scale);

	mesh.lookAt(camPosition)		//使得mesh的朝向始终对着camera
	return scale;
}



function render() {
	renderer.render(scene, camera);
}
render();
animate();