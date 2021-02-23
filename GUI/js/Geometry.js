//该文件用于菜单栏的作图

var scene = editor.scene
var camera = editor.camera
var renderer = editor.renderer

var Node=0;//记录是第几个节点
var Element = 0;
var Section = 0;

//用于存储已有图像的数组与Section Material
var Nodes = new Array();
var NodesNum = new Array();
var Elements = new Array();
var ElementsNum = new Array();


//Unattached
var UnattachedNodes = new Array();
var UnattachedNodesNum = new Array();

//全部初始化
function init() {
	Node = 0;//记录是第几个节点
	Element = 0;

	//用于存储已有图像的数组

	//Unattached
	UnattachedNodes = new Array();
	UnattachedNodesNum = new Array();

	dictNodes = new Dictionary()
	dictElements = new Dictionary1()

	//删除已有的图像，并且清楚数组
	clearScene(Nodes)
	clearScene(NodesNum)
	clearScene(Elements)
	clearScene(ElementsNum)
}

function clearScene( myObjects ) {
	// 从scene中删除模型并释放内存
	if (myObjects.length > 0) {
		for (var i = 0; i < myObjects.length; i++) {
			var currObj = myObjects[i];

			// 判断类型
			if (currObj instanceof THREE.Scene) {
				var children = currObj.children;
				for (var i = 0; i < children.length; i++) {
					deleteGroup(children[i]);
				}
			} else {
				deleteGroup(currObj);
			}
			scene.remove(currObj);
		}
	}
}

// 删除group，释放内存
function deleteGroup(group) {
	//console.log(group);
	if (!group) return;
	// 删除掉所有的模型组内的mesh
	group.traverse(function (item) {
		if (item instanceof THREE.Mesh) {
			item.geometry.dispose(); // 删除几何体
			item.material.dispose(); // 删除材质
		}
	});
}

init();













//字典存储节点数据
function Dictionary() {
	this.dataStoreX = [];
	this.dataStoreZ = [];
	this.dataStoreY = [];
	this.add = add;         // 添加元素
	this.find = find;       // 查找元素
	this.remove = remove;   // 删除元素
	//向字典添加元素

	function add(key, valueX, valueY, valueZ) {
		this.dataStoreZ[key] = valueZ;
		this.dataStoreY[key] = valueY;
		this.dataStoreX[key] = valueX;
	}
	//删除一个元素

	function remove(key) {
		if (this.dataStoreY[key]) {
			delete this.dataStoreZ[key];
			delete this.dataStoreY[key];
			delete this.dataStoreX[key];
		}
		else return 'Not Found';
	}
	//查找字典中的元素

	function find(key) {
		return this.dataStoreZ[key];
	}
}
var dictNodes = new Dictionary()

//字典存储杆件数据
function Dictionary1() {
	this.dataStorei = [];
	this.dataStorej = [];
	this.add = add;         // 添加元素
	this.find = find;       // 查找元素
	this.remove = remove;   // 删除元素
	//向字典添加元素

	function add(key,i,j) {
		this.dataStorei[key] = i;
		this.dataStorej[key] = j;
	}
	//删除一个元素

	function remove(key) {
		if (this.dataStorei[key]) {
			delete this.dataStorei[key];
			delete this.dataStorej[key];
		}
		else return 'Not Found';
	}
	//查找字典中的元素
	function find(key) {
		return this.dataStorei[key];
	}
}
var dictElements = new Dictionary1()

//储存Section
function SectionDictionary() {
	this.name = [];
	this.group = [];
	this.add = add;         // 添加元素
	this.find = find;       // 查找元素
	this.remove = remove;   // 删除元素
	//向字典添加元素
	function add(key, i, j) {
		this.name[key] = i;
		this.group[key] = j;
	}
	//删除一个元素

	function remove(key) {
		if (this.name) {
			delete this.name[key];
			delete this.group[key];
		}
		else return 'Not Found';
	}
	//查找字典中的元素
	function find(key) {
		return this.name[key];
	}
}
var dictSection = new SectionDictionary()



























//创建文字
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

	context.font = parameters.font ? parameters.font : '36px sans-serif';

	for (let i = 0, len = textArray.length; i < len; i++) {
		width = context.measureText(textArray[i]).width > width ? context.measureText(textArray[i]).width : width;
	}

	canvas.width = width + 20;
	canvas.height = textArray.length * 60;

	context.font = parameters.font ? parameters.font : '36px sans-serif';
	for (let i = 0, len = textArray.length; i < len; i++) {
		context.fillStyle = textColor;
		context.fillText(textArray[i], 10, 48 + i * 60);
	}
	var texture = new THREE.Texture(canvas);
	texture.minFilter = texture.magFilter = THREE.NearestFilter;
	texture.needsUpdate = true;

	return texture;
}

//点击效果
function Nodeonclick(sphere) {
	var selectedObject = null;
	function onDocumentMouseMove(event) {
		event.preventDefault();
		if (selectedObject) {
			selectedObject.material.color.set('#69f');
			selectedObject = null;
		}
		var intersects = getIntersects(event.layerX, event.layerY);
		if (intersects.length > 0 && selectedObject != intersects[0].object) {
			var res = intersects.filter(function (res) {
				return res && res.object;
			})[0];
			if (res && res.object) {
				selectedObject = res.object;
				selectedObject.material.color.set('#f00');
			}
		}
	}
	//添加点击效果
	var raycaster = new THREE.Raycaster();
	var mouseVector = new THREE.Vector3();
	function getIntersects(x, y) {
		x = (x / window.innerWidth) * 2 - 1;
		y = - (y / window.innerHeight) * 2 + 1;
		mouseVector.set(x, y, 0.5);
		raycaster.setFromCamera(mouseVector, camera);
		return raycaster.intersectObject(sphere, true);
	}

	//添加点击属性
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener("mousemove", onDocumentMouseMove, false);
}


function updateObj(mesh, coefficient) {
	//更新mesh对象及其子对象的全局变换
	//通过相机到远点的距离的scale变化可得知全局的scale变化，进而可以控制其他物体的大小
	mesh.updateMatrixWorld();
	worldPosition.setFromMatrixPosition(mesh.matrixWorld);
	camera.updateMatrixWorld();
	camPosition.setFromMatrixPosition(camera.matrixWorld);
	//根据距离，动态调整缩放比例
	scale = worldPosition.distanceTo(camPosition) / coefficient;
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
	mesh.rotateX(0)
	mesh.rotateY(0)
	mesh.rotateZ(0)
	return scale;
}

function render() {
	renderer.render(scene, camera);
}

//事先得记录边界条件，以便接下来的fit to screen
var boundx = 4, boundy = 4, boundz = 4, zoomx, zoomz, zoomy;

function zoomscale(x, y, z) {
	zoomx = 1, zoomz = 1, zoomy = 1;
	if (x > boundx) {
		zoomx=x/boundx

	}
	if (y > boundy) {
		zoomy = y / boundy

	}
	if (z > boundz) {
		zoomx =z / boundz

	}
	var max = Math.max(zoomx, zoomy, zoomz);
	console.log(max)
	return max;
}




























//上面的都是准备的函数，下面是具体的功能函数
//main.html调用的画点的函数
function DefineNodes(x, y, z) {
	//储存数据
	Node++
	dictNodes.add(Node, x, y, z)
	var geometry = new THREE.SphereGeometry(0.02, 32, 10);
	var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
	var sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);
	sphere.position.set(z, y, x)


	var planeText = PlaneText("N"+String(Node), "#fffffb");
	scene.add(planeText);
	planeText.position.set(sphere.position.x, sphere.position.y, sphere.position.z);

	Nodes[Node] = sphere;
	NodesNum[Node] = planeText;
	//刚创建的node都是unattached
	UnattachedNodes[Node] = 0;		//0为unattached，1为attached
	UnattachedNodesNum[Node] = 0;

	//设置点不随场景变化
	function animate() {		//动态过程，
		updateObj(sphere, 10);
		updateText(planeText, 10);
		requestAnimationFrame(animate);
		render()
	}
	render();
	animate();
}

//Move Nodes
function MoveNodes(node, deltax, deltay, deltaz) {
	//通过在这里引进点击功能函数实现点击即获取信息
	//如何获得node里面的数字成分 
	var nodes = node.split(" ")
	for (var i = 0; nodes[i]; i++) {
		var x = parseFloat(dictNodes.dataStoreX[nodes[i]]) + parseFloat(deltax);	//注意要化为数字，不然认为是字符串
		var y = parseFloat(dictNodes.dataStoreY[nodes[i]]) + parseFloat(deltay);
		var z = parseFloat(dictNodes.dataStoreZ[nodes[i]]) + parseFloat(deltaz);
		dictNodes.add(nodes[i], x, y, z);
		Nodes[nodes[i]].position.set(z, y, x);
		NodesNum[nodes[i]].position.set(z, y, x);
	}
}


//MoveAllNodes
function MoveAllNodes(deltax, deltay, deltaz) {
	var node = 1;
	for (; node < Node+1; node++) {
		var x = parseFloat(dictNodes.dataStoreX[node]) + parseFloat(deltax);	//注意要化为数字，不然认为是字符串
		var y = parseFloat(dictNodes.dataStoreY[node]) + parseFloat(deltay);
		var z = parseFloat(dictNodes.dataStoreZ[node]) + parseFloat(deltaz);
		dictNodes.add(node, x, y, z);
		Nodes[node].position.set(z, y, x);
		NodesNum[node].position.set(z, y, x);
	}
}


//DuplicateNodes
function DuplicateNodes(node,deltax, deltay, deltaz,time) {
	var nodes = node.split(" ")
	for (var j = 1; j <= time; j++) {
		for (var i = 0; nodes[i]; i++) {
			var x = parseFloat(dictNodes.dataStoreX[nodes[i]]) + parseFloat(deltax*j);	//注意要化为数字，不然认为是字符串
			var y = parseFloat(dictNodes.dataStoreY[nodes[i]]) + parseFloat(deltay*j);
			var z = parseFloat(dictNodes.dataStoreZ[nodes[i]]) + parseFloat(deltaz*j);
			DefineNodes(x, y, z);
		}
	}
}

function DuplicateAllNodes(deltax, deltay, deltaz,time) {
	var temp = Node;
	for (var j = 1; j <= time; j++) {
		var node = 1;
		for (; node < temp + 1; node++) {
			var x = parseFloat(dictNodes.dataStoreX[node]) + parseFloat(deltax*j);	//注意要化为数字，不然认为是字符串
			var y = parseFloat(dictNodes.dataStoreY[node]) + parseFloat(deltay*j);
			var z = parseFloat(dictNodes.dataStoreZ[node]) + parseFloat(deltaz*j);
			DefineNodes(x, y, z);
		}
	}
}


//RemoveNodes
function RemoveNodes(node) {		//重新渲染使得从1开始连续排序
	if (Array.isArray(node)) 
		var nodes = node
	else
		var nodes = node.split(" ");
	var j = 1;
	var move = 1;
	var length = nodes.length;
	for (var i in nodes) {
		if (UnattachedNodes[nodes[i]] == 1)
			length--;//console.log("--")
		//console.log(i)		i从零开始
	}
	console.log(nodes)
	console.log(length)
	if (length == 0)
		return;

	for (var i = parseInt(nodes[0]); i <= Node - length; i++) {
		while (i + move == nodes[j] && nodes[j] && UnattachedNodes[nodes[j]]==0) {	//不能删除attached点
			move = move + 1; j = j + 1; //console.log(Node)
		}
		var x = parseInt(dictNodes.dataStoreX[i + move]); 	//注意要化为数字，不然认为是字符串
		var y = parseInt(dictNodes.dataStoreY[i + move]); 
		var z = parseInt(dictNodes.dataStoreZ[i + move]);
		console.log(x,y,z);
		dictNodes.add(i, x, y, z);
		Nodes[i].position.set(z, y, x);
		NodesNum[i].position.set(z, y, x);		//该方法意思是从零开始，向后逐个换成下一个的坐标，处在最后边的点会被删掉
												//经过这个步骤后第一个删除的点后面的点位置已经全发生变化
	}
	for (var i = Node - length+1; i<=Node; i++) {
		dictNodes.remove(i);
		scene.remove(Nodes[i])
		scene.remove(NodesNum[i])
	}
	Node = Math.max(0, Node - length);		//现有的Node个数
	for (var k = 1; k <= Node; k++)		//重新渲染和改变Unattached情况,现有的点全部是attached的
		UnattachedNodes[k] = 1;
}

//AllUnattached
function AllUnattached() {
	var i,j=0; var temp = new Array();
	for (i in UnattachedNodes) {			//从零开始
		if (UnattachedNodes[i] != 1&&i!=0) {
			temp[j++] = i;
		}
	}
	RemoveNodes(temp);
}

//main.html调用的画线的函数

function drawElements(x0,y0,z0,x1,y1,z1,temp) {
	//画虚线
	var lineGeometry = new THREE.Geometry();//生成几何体
	lineGeometry.vertices.push(new THREE.Vector3(z0, y0, x0));//线段的两个顶点
	lineGeometry.vertices.push(new THREE.Vector3(z1, y1, x1));

	var line = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
		color: 0xffffff,//线段的颜色
		dashSize: 1,//短划线的大小
		gapSize: 1//短划线之间的距离
	}));
	line.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
	scene.add(line);
	Elements[temp] = line

	var planeText = PlaneText("E" + String(temp), "#fffffb");
	scene.add(planeText);
	planeText.position.set((z0 + z1) / 2-1, (y0 + y1) / 2-1, (x0 + x1) / 2-1);
	ElementsNum[temp] = planeText

	//设置点不随场景变化
	function animate() {
		updateText(planeText, 10);
		requestAnimationFrame(animate);
		render()
	}

	render();
	animate();
}

function DefineElements(i,j) {
	//储存数据
	Element++
	dictElements.add(Element, i, j);

	//删除unattached属性
	UnattachedNodes[i] = 1;
	UnattachedNodes[j] = 1;

	var x0 = parseFloat(dictNodes.dataStoreX[i])
	var y0 = parseFloat(dictNodes.dataStoreY[i])
	var z0 = parseFloat(dictNodes.dataStoreZ[i])
	var x1 = parseFloat(dictNodes.dataStoreX[j])
	var y1 = parseFloat(dictNodes.dataStoreY[j])
	var z1 = parseFloat(dictNodes.dataStoreZ[j])
	drawElements(x0, y0, z0, x1, y1, z1,Element)
}

//RemoveElements
function RemoveElements(element){
	var elements= element.split(" ");
	var j = 1;
	var move = 1;
	var length = elements.length;
	for (var i = parseInt(elements[0]); i <= Element - length; i++) {
		if (i + move == elements[j] && elements[j]) {
			move = move + 1; j = j + 1; //console.log(Node)
		}
		var i0 = parseInt(dictElements.dataStorei[i + move]); 	//注意要化为数字，不然认为是字符串
		var j0 = parseInt(dictElements.dataStorej[i + move]);
		var x0 = parseFloat(dictNodes.dataStoreX[i0])
		var y0 = parseFloat(dictNodes.dataStoreY[i0])
		var z0 = parseFloat(dictNodes.dataStoreZ[i0])
		var x1 = parseFloat(dictNodes.dataStoreX[j0])
		var y1 = parseFloat(dictNodes.dataStoreY[j0])
		var z1 = parseFloat(dictNodes.dataStoreZ[j0])
		dictElements.remove(1);		//删掉原来的
		scene.remove(Elements[1])
		scene.remove(ElementsNum[1])
		drawElements(x0, y0, z0, x1, y1, z1,i)		//现在的
		dictElements.add(i,i0,j0);
	}
	for (var i = Element - length + 1; i <= Element; i++) {
		dictElements.remove(i);
		scene.remove(Elements[i])
		scene.remove(ElementsNum[i])
	}
	Element = Math.max(0,Element - length);		//现有的Element数目
}

function DefineSection(name,group) {
	Section++;
	dictSection.add(Section, name, group);
	parent.document.getElementById("section").value = "Section " + (Section+1)
}
window.Section = Section

function ModifySection(id,name, group) {
	dictSection.remove(id)
	dictSection.add(id, name, group);
}
















//另存为
function GeometryData() {
	/*
	var Nodes = new Array();
	var NodesNum = new Array();
	var Elements = new Array();
	var ElementsNum = new Array();
	*/
	console.log(Node, dictNodes.dataStoreY[1])
	var data = { NODE: [], MEMBER: [] ,SECTION:[],MATERIAL:[]};
	for (var i = 1; i <= Node; i++) {
		data.NODE[i - 1] = [i, dictNodes.dataStoreX[i], dictNodes.dataStoreY[i], dictNodes.dataStoreZ[i]]
	}
	for (var i = 1; i <= Element; i++) {
		data.MEMBER[i - 1] = [i, i, dictElements.dataStorei[i], dictElements.dataStorej[i]]
	}
	for (var i = 1; i <= Section; i++) {
		data.SECTION[i - 1] = [i, dictSection.name[i], dictSection.group[i]]
	}
	return data;
}
