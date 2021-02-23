//作为一个菜单js文件接收onclick响应，然后main.js中的函数便可以有界面执行
const { ipcRenderer,remote } = require('electron')
const { dialog } = require('electron').remote
const path = require("path")
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
////////////////////////////////////////////////////////////////////////////////////////////
//openfile
var selectedFile;
ipcRenderer.on('openfile', (event) => {
		var input = document.createElement('input');	//生成一个对象并自动点击
		input.type = 'file';
		input.onchange = e;
		function e() {
			selectedFile = input.files[0];
			console.log(selectedFile)
			var reader = new FileReader();//这是核心！！读取操作都是由它完成的
			reader.readAsText(selectedFile, 'gb2312');
			reader.onload = function (oFREvent) {//读取完毕从中取值
				var data = oFREvent.target.result;
				ipcRenderer.send("filedata", data)
			}
		}
		input.click();
	})

//接受openfile数据，转化为图形进行显示
ipcRenderer.on("OpenFileData", (event, arg) => {
	//父页面获取子页面信息的方法
	var obj = JSON.parse(arg)	//将字符串转化为json
	for (var key in obj) {
		value = obj[key];
		//创建点
		if (key == "NODE") {		//每次只对一个key执行操作
			var i = 0;
			while (value[i]) {
				var node = value[i][0], x = value[i][1], y = value[i][2], z = value[i][3];
				document.getElementById("center").contentWindow.DefineNodes(x, y, z)
				i++
				console.log(i)
			}
		}
		//创建线段
		else if (key == "MEMBER") {		//每次只对一个key执行操作
			i = 0;
			while (value[i]) {
				var elementID = new Array(), sectID = value[i][1], matID = value[i][2], nodei = value[i][3], nodej = value[i][4];
				elementID[0] = i + 1;
				document.getElementById("center").contentWindow.DefineElements(nodei, nodej)
				document.getElementById("center").contentWindow.AttachSection(sectID, elementID)
				document.getElementById("center").contentWindow.AttachSection(matID, elementID)
				i++
			}
		}
		else if (key == "SECTION") {
			var i = 0;
			while (value[i]) {
				var name = value[i][1], group = value[i][2];
				document.getElementById("center").contentWindow.DefineSection(name,group)
				i++
			}
		}
		else if (key == "MATERIAL") {
			var i = 0;
			while (value[i]) {
				var name = value[i][1], group = value[i][2];
				document.getElementById("center").contentWindow.DefineMaterial(name, group)
				i++
			}
		}
	}
})

//save
ipcRenderer.on('save', (event) => {
	if (selectedFile == undefined) {
		dialog.showSaveDialog(remote.getCurrentWindow(), {
			filters: [{ name: 'msf', extensions: ['msf'] }]
		}).then(result => {
			console.log(result.filePath)
			//document.getElementById("center").contentWindow.readyToRead();
			var data = document.getElementById("center").contentWindow.GeometryData()

			var string = JSON.stringify(data)
			fs.writeFileSync(result.filePath, string)
			//console.log(data)
		})
	}
	else {
		var data = document.getElementById("center").contentWindow.GeometryData()
		var string = JSON.stringify(data)
		fs.writeFileSync(selectedFile ["path"], string)
		console.log(selectedFile)
		console.log(data)
	}
})

//saveas
ipcRenderer.on('saveas', (event) => {
	dialog.showSaveDialog(remote.getCurrentWindow(), {
		filters: [{ name: 'msf', extensions: ['msf'] }]
	}).then(result => {
		console.log(result.filePath)
		var data = document.getElementById("center").contentWindow.GeometryData()	
		var string=JSON.stringify(data) 
		fs.writeFileSync(result.filePath,string)
		console.log(data)
	})
})

//New
ipcRenderer.on('New', (event) => {
	dialog.showMessageBox({
		"title": "New",
		"message": "Are you sure you want to start over?" +
			"(Unsaved data will be lost)",
		buttons: ["Yes", "No"],
		type: "warning",
	}).then((index) => {
		if (index.response === 0) {		//yes 1，no 0  
			ipcRenderer.send("reload")
		} 
	});
})
////////////////////////////////////////////////////////////////////////////////////////////
// DefineNodes
ipcRenderer.on('DefineNodes', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
	<div>
	<div style="width:100%;line-height:250%;font-size:12px;display: grid;grid-template-rows:100%;grid-template-columns: 60% 40%;background-color:grey">
		<div><input class="disabled" style="width:80%"  type="text" readonly disabled="disabled" value="Please enter coordinates of node"></div>
		<div  style="display:inline"><input class="disabled" style="width:20%;" type="text" readonly disabled="disabled" value="Status:">&nbsp;<input class="disabled" style="width:70%;" type="text" readonly disabled="disabled" id="status" value="Blanks NOT Acceptable!" ></div>
	</div>
	<div style="width:100%;font-size:12px;display: grid;grid-template-columns: 75% 25%">
		<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:33% 33% 33%;background-color:grey;margin-top:1px;margin-bottom:1px;">
			<div  style="display:inline"><input class="disabled" style="width:30%;" type="text" readonly disabled="disabled" value="x=">&nbsp;<input class="able" type="text" id="x" style="width:50%;"></div>
			<div  style="display:inline"><input class="disabled" style="width:30%;" type="text" readonly disabled="disabled" value="y=">&nbsp;<input type="text" id="y" class="able" style="width:50%;"></div>
			<div  style="display:inline"><input class="disabled" style="width:30%;" type="text" readonly disabled="disabled" value="z=">&nbsp;<input type="text" id="z" class="able" style="width:50%;"></div>
		</div>
		<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
			<div></div>
			<div><button class="button" onclick="DefineNodes()" >Apply</button>&emsp;<button class="button" onclick="Cancel()">Cancel</button></div>
		</div>
	</div>
	</div>
`
})

//MoveNodes
ipcRenderer.on('MoveNodes', (event, ) => {
	var div =document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 20% 30%;background-color:grey">
				<div><input class="disabled" style="width:80%" type="text" readonly disabled="disabled" value="Define node(s) and movement"></div>
				<div id="All"><input class="disabled" style="width:20%" type="text" readonly disabled="disabled" value="Node(s)">&nbsp;<input type="text" id="node" style="width:60%" class="able"></div>
				<div><button class="button" onclick="MoveAll()" style="width:30%">All</button><button class="button" onclick="MoveClr()"style="width:30%" >Clr</button><button class="button" onclick="Adv()" style="width:30%">Adv</button></div>
				<div class="cal" style="display:inline"><input class="disabled" style="width:30%" type="text" readonly disabled="disabled" value="Status">&nbsp;<input class="disabled" type="text" readonly disabled="disabled" id="status" value="Blanks NOT Acceptable!" style="width:60%"></div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 75% 25%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:33% 33% 33%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" style="width:30%" type="text" readonly disabled="disabled" value="Delta x=">&nbsp;<input type="text" id="x" class="able" style="width:50%"></div>
					<div class="cal" style="display:inline"><input class="disabled" style="width:30%" type="text" readonly disabled="disabled" value="Delta y=">&nbsp;<input type="text" id="y" class="able" style="width:50%"></div>
					<div class="cal" style="display:inline"><input class="disabled" style="width:30%" type="text" readonly disabled="disabled" value="Delta z=">&nbsp;<input type="text" id="z" class="able" style="width:50%"></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="MoveNodes()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
})

//ScaleNodes			未完成
ipcRenderer.on('ScaleNodes', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
`
})


//DuplicateNodes
ipcRenderer.on('DuplicateNodes', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 20% 30%;background-color:grey">
				<div><input class="disabled" style="width:80%"  type="text" readonly disabled="disabled" value="Define node(s) and duplication"></div>
				<div id="All"><input class="disabled" style="width:20%"  type="text" readonly disabled="disabled" value="Node(s)">&nbsp;<input type="text" id="node" class="able" style="width:60%;"></div>
				<div><button class="button" onclick="DuplicateAll()" style="width:30%">All</button><button class="button" onclick="DuplicateClr()"style="width:30%" >Clr</button><button class="button" onclick="Adv()" style="width:30%">Adv</button></div>
				<div class="cal" style="display:inline"><input class="disabled" style="width:30%"  type="text" readonly disabled="disabled" value="Status">&nbsp;<input class="disabled" style="width:60%"  type="text" readonly disabled="disabled" id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 75% 25%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:20%  20% 20% 18% 22%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" style="width:30%"  type="text" readonly disabled="disabled"value="Delta x=">&nbsp;<input type="text" id="x" class="able" style="width:50%;"></div>
					<div class="cal" style="display:inline"><input class="disabled" style="width:30%"  type="text" readonly disabled="disabled"value="Delta y=">&nbsp;<input type="text" id="y" class="able" style="width:50%;"></div>
					<div class="cal" style="display:inline"><input class="disabled" style="width:30%"  type="text" readonly disabled="disabled"value="Delta z=">&nbsp;<input type="text" id="z" class="able" style="width:50%;"></div>
					<div style="background-color:white;height:25px;margin-top:5px;text-align:center;width:90%;font-size:13px;"><input type="checkbox" value="Include Attributes" style="text-align:center">Include Attributes</div>
					<div><input class="disabled" style="width:30%"  type="text" readonly disabled="disabled" value="Times=">&nbsp;<button  class="button" style="width:10%" onclick="TimeDecrease()"><</button>&nbsp;<input class="disabled" style="width:30%"  type="text" readonly disabled="disabled" id="time" value="1">&nbsp;<button  class="button" style="width:10%" onclick="TimeIncrease()">></button></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="DuplicateNodes()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
})


//RemoveNodes
ipcRenderer.on('RemoveNodes', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 65% 35%;background-color:grey">
			<div><input class="disabled" disabled="disabled"  style="width:80%" readonly value="Please enter coordinates of node"></div>
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 75% 25%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:65% 30%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Node(s)">&nbsp;<input  class="able" style="width:70%;"type="text" id="node" ></div>
					<div><button class="button" onclick="AllUnattached()" style="width:50%">AllUnattached</button><button class="button" onclick="AllUnattachedClr()"style="width:20%" >Clr</button><button class="button" onclick="Adv()" style="width:20%">Adv</button></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="RemoveNodes()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
})
////////////////////////////////////////////////////////////////////////////////////////////

//Elements
//DefineElements
ipcRenderer.on('DefineElements', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 65% 35%;background-color:grey">
			<div><input class="disabled" disabled="disabled"  style="width:80%" readonly value="Please enter coordinates of node"></div>
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled"  style="width:70%" type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 75% 25%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:33% 33% 33%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled"  style="width:30%" type="text" readonly value="Node i=">&nbsp;<input  class="able"  type="text" id="Nodei" style="width:50%"></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled"  style="width:30%" type="text" readonly value="Node j=">&nbsp;<input  class="able"  type="text" id="Nodej" style="width:50%"></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled"  style="width:30%" type="text" readonly value="Beta(Deg)=">&nbsp;<input  class="able"  type="text" id="z" style="width:50%"></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="DefineElements()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>	
			</div>
		</div>
`
})


//Duplicate Elements
ipcRenderer.on('DuplicateElements', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 20% 30%;background-color:grey">
				<div><input class="disabled" style="width:80%"  type="text" readonly disabled="disabled" value="Define element(s) and duplication"></div>
				<div id="All"><input class="disabled" style="width:20%"  type="text" readonly disabled="disabled" value="Element(s)">&nbsp;<input type="text" id="element" class="able" style="width:60%;"></div>
				<div><button class="button" onclick="DuplicateAllE()" style="width:30%">All</button><button class="button" onclick="DuplicateClrElements()"style="width:30%" >Clr</button><button class="button" onclick="Adv()" style="width:30%">Adv</button></div>
				<div class="cal" style="display:inline"><input class="disabled" style="width:30%"  type="text" readonly disabled="disabled" value="Status">&nbsp;<input class="disabled" style="width:60%"  type="text" readonly disabled="disabled" id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 75% 25%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:20%  20% 20% 18% 22%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" style="width:30%"  type="text" readonly disabled="disabled"value="Delta x=">&nbsp;<input type="text" id="x" class="able" style="width:50%;"></div>
					<div class="cal" style="display:inline"><input class="disabled" style="width:30%"  type="text" readonly disabled="disabled"value="Delta y=">&nbsp;<input type="text" id="y" class="able" style="width:50%;"></div>
					<div class="cal" style="display:inline"><input class="disabled" style="width:30%"  type="text" readonly disabled="disabled"value="Delta z=">&nbsp;<input type="text" id="z" class="able" style="width:50%;"></div>
					<div style="background-color:white;height:25px;margin-top:5px;text-align:center;width:90%;font-size:13px;"><input type="checkbox" value="Include Attributes" style="text-align:center">Include Attributes</div>
					<div><input class="disabled" style="width:30%"  type="text" readonly disabled="disabled" value="Times=">&nbsp;<button  class="button" style="width:10%" onclick="TimeDecrease()"><</button>&nbsp;<input class="disabled" style="width:30%"  type="text" readonly disabled="disabled" id="time" value="1">&nbsp;<button  class="button" style="width:10%" onclick="TimeIncrease()">></button></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="DuplicateElements()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
})

//RemoveElements
ipcRenderer.on('RemoveElements', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 35% 30% 35%;background-color:grey">
			<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Please select element(s) to remove"></div>
			<div>
				<select style="outline:none;width:90%" onchange="RemoveSelect(this.value)">
					<option value="1">Remove selected elements</option>
					<option value="2">Remove all zero length elements</option>
					<option value="3">Merge all coincident elements</option>
				</select>
			</div>
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 75% 25%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:65% 30%;background-color:grey;margin-top:1px;margin-bottom:1px;" id="select">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Elements(s)">&nbsp;<input  class="able" style="width:70%;"type="text" id="element" ></div>
					<div><button class="button" onclick="RemoveAll()" style="width:30%">All</button><button class="button" onclick="RemoveAllClr()"style="width:30%" >Clr</button><button class="button" onclick="Adv()" style="width:30%">Adv</button></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="RemoveElements()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
})
////////////////////////////////////////////////////////////////////////////////////////////

//DefineSection
ipcRenderer.on('DefineSection', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 25% 10% 25% 10% 30%;background-color:grey">
				<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Please enter coordinates of node"></div>
				<div><input class="disabled" disabled="disabled"  style="width:80%" readonly value="Section" id="section"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Name">&nbsp;<input  class="able" style="width:70%;"type="text" id="name" ></div>
				<div><span style="margin-left:2%;background-color:lightgrey"><input type="radio" style="font-size:15px">Database&emsp;&emsp;&emsp;</span></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 18% 18% 18% 18% 18% 10%;background-color:grey;margin-top:1px;margin-bottom:1px;">
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Area">&nbsp;<input  id="Area"  class="able" style="width:50%;"type="text"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I z-z">&nbsp;<input id="I z-z"  class="able" style="width:50%;"type="text"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I y-y">&nbsp;<input id="I y-y"  class="able" style="width:50%;"type="text"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="J">&nbsp;<input  id="J" class="able" style="width:50%;"type="text"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Cw">&nbsp;<input id="Cw"  class="able" style="width:50%;"type="text"></div>
				<div>
					<select style="outline:none;width:90%" onchange="BorA(this.value)">
						<option>Select</option>
						<option value="1">Basic</option>
						<option value="2">Advanced</option>
					</select>
				</div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 25% 25%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z z-z">&nbsp;<input id="Z z-z" class="able" style="width:50%;"type="text" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z y-y">&nbsp;<input id="Z y-y"  class="able" style="width:50%;"type="text" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A y-y">&nbsp;<input id="A y-y"  class="able" style="width:50%;"type="text" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A z-z">&nbsp;<input id="A z-z"  class="able" style="width:50%;"type="text" ></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div><button class="button" onclick="DefineSection()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
	document.getElementById("section").value = "Section " + document.getElementById("center").contentWindow.SectionNum
})

//ModifySection
ipcRenderer.on('ModifySection', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 25% 10% 25% 10% 30%;background-color:grey">
				<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Select Section # and modify properties"></div>
				<div>
					<select id="select" onchange="SelectSection(this.value)" class="button" style="width:80%">
						<option>Select</option>				
					</select>
				</div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Name">&nbsp;<input  class="able" style="width:70%;"type="text" id="name" ></div>
				<div><span style="margin-left:2%;background-color:lightgrey"><input type="radio" style="font-size:15px">Database&emsp;&emsp;&emsp;</span></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div id="change">
				<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 18% 18% 18% 18% 18% 10%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Area">&nbsp;<input  id="Area"  class="able" style="width:50%;"type="text"></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I z-z">&nbsp;<input id="I z-z"  class="able" style="width:50%;"type="text"></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I y-y">&nbsp;<input id="I y-y"  class="able" style="width:50%;"type="text"></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="J">&nbsp;<input  id="J" class="able" style="width:50%;"type="text"></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Cw">&nbsp;<input id="Cw"  class="able" style="width:50%;"type="text"></div>
					<div>
						<select style="outline:none;width:90%" onchange="BorA2(this.value)">
							<option>Select</option>
							<option value="1">Basic</option>
							<option value="2">Advanced</option>
						</select>
					</div>
				</div>
				<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
					<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 25% 25%;background-color:grey;margin-top:1px;margin-bottom:1px;">
						<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z z-z">&nbsp;<input id="Z z-z" class="able" style="width:50%;"type="text" ></div>
						<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z y-y">&nbsp;<input id="Z y-y"  class="able" style="width:50%;"type="text" ></div>
						<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A y-y">&nbsp;<input id="A y-y"  class="able" style="width:50%;"type="text" ></div>
						<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A z-z">&nbsp;<input id="A z-z"  class="able" style="width:50%;"type="text" ></div>
					</div>
					<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
						<div></div>
						<div><button class="button" onclick="ModifySection()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
					</div>
				</div>
			</div>
		</div>
`
	var SectionNum = document.getElementById("center").contentWindow.SectionNum;
	for (var i = 1; i < SectionNum; i++)
		$("#select").append("<option value='" + i + "'>" + i + "</option>");
})

//RemoveSection
ipcRenderer.on('RemoveSection', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 30% 40% 30%;background-color:grey">
				<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Please select Section # to remove"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Section #">&nbsp;
					<select id="select"  onchange="showInfo(this.value)" class="button" style="width:80%">
						<option>Select</option>
					</select>
				</div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:15% 85%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div></div>					
					<div class="cal" style="display:inline">
						<select id="info" class="button" style="width:80%"></select>
					</div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="RemoveSection()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
	var SectionNum = document.getElementById("center").contentWindow.SectionNum;
	for (var i = 1; i < SectionNum; i++)
		$("#select").append("<option value='" + i + "'>" + i + "</option>");
})

//AttachSection
ipcRenderer.on('AttachSection', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 25% 25%;background-color:grey">
				<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Please select Section # and elements"></div>
				<div class="cal" style="display:inline"><input  class="able" style="width:70%;"type="text" id="element" ></div>
				<div><button class="button" onclick="AllAttach()" style="width:30%">All</button><button class="button" onclick="AllAttachClr()"style="width:30%" >Clr</button><button class="button" onclick="Adv()" style="width:30%">Adv</button></div>	
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:30% 70%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:30%" type="text" readonly value="Section #">&nbsp;
						<select id="select"  onchange="showInfo(this.value)" class="button" style="width:80%">
							<option>Select</option>
						</select>
					</div>
					<div class="cal" style="display:inline">
						<select id="info" class="button" style="width:80%"></select>
					</div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="AttachSection()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
	var SectionNum = document.getElementById("center").contentWindow.SectionNum;
	for (var i = 1; i < SectionNum; i++)
		$("#select").append("<option value='" + i + "'>" + i + "</option>");
})
////////////////////////////////////////////////////////////////////////////////////////////
//DefineMaterial
ipcRenderer.on('DefineMaterial', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 25% 10% 35% 30%;background-color:grey">
				<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Please enter material properties"></div>
				<div><input class="disabled" disabled="disabled"  style="width:80%" readonly value="" id="material"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Name">&nbsp;<input  class="able" style="width:70%;"type="text" id="name" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 25% 25%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="E">&nbsp;<input  class="able" style="width:50%;"type="text" id="E" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="v">&nbsp;<input  class="able" style="width:50%;"type="text" id="v" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Fy">&nbsp;<input  class="able" style="width:50%;"type="text" id="Fy" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:30%" type="text" readonly value="Wt.Dens">&nbsp;<input  class="able" style="width:50%;"type="text" id="Wt" ></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="DefineMaterial()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
	document.getElementById("material").value = "Material " + document.getElementById("center").contentWindow.MaterialNum
})

//ModifySection
ipcRenderer.on('ModifyMaterial', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 25% 10% 10% 25% 30%;background-color:grey">
				<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Please enter material properties"></div>
				<div><input class="disabled" disabled="disabled"  style="width:80%" readonly value="Material"></div>
				<div>
					<select id="select" onchange="SelectMaterial(this.value)" class="button" style="width:80%">
						<option>Select</option>
					</select>
				</div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Name">&nbsp;<input  class="able" style="width:70%;"type="text" id="name" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 25% 25%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="E">&nbsp;<input  class="able" style="width:50%;"type="text" id="E" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="v">&nbsp;<input  class="able" style="width:50%;"type="text" id="v" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Fy">&nbsp;<input  class="able" style="width:50%;"type="text" id="Fy" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:30%" type="text" readonly value="Wt.Dens">&nbsp;<input  class="able" style="width:50%;"type="text" id="Wt" ></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="ModifyMaterial()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
	var MaterialNum = document.getElementById("center").contentWindow.MaterialNum;
	for (var i = 1; i < MaterialNum; i++)
		$("#select").append("<option value='" + i + "'>" + i + "</option>");
})

//RemoveMaterial
ipcRenderer.on('RemoveMaterial', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 30% 40% 30%;background-color:grey">
				<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Please select Material # to remove"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Material #">&nbsp;
					<select id="select"  onchange="showInfo2(this.value)" class="button" style="width:80%">
						<option>Select</option>
					</select>
				</div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:15% 85%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div></div>					
					<div class="cal" style="display:inline">
						<select id="info" class="button" style="width:80%"></select>
					</div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="RemoveMaterial()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
	var MaterialNum = document.getElementById("center").contentWindow.MaterialNum;
	for (var i = 1; i < MaterialNum; i++)
		$("#select").append("<option value='" + i + "'>" + i + "</option>");
})

//AttachSection
ipcRenderer.on('AttachMaterial', (event, ) => {
	var div = document.getElementById("bottom")
	div.innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 25% 25%;background-color:grey">
				<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Please select Material # and elements"></div>
				<div class="cal" style="display:inline"><input  class="able" style="width:70%;"type="text" id="element" ></div>
				<div><button class="button" onclick="AllAttach2()" style="width:30%">All</button><button class="button" onclick="AllAttachClr2()"style="width:30%" >Clr</button><button class="button" onclick="Adv()" style="width:30%">Adv</button></div>	
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:30% 70%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:30%" type="text" readonly value="Material #">&nbsp;
						<select id="select"  onchange="showInfo2(this.value)" class="button" style="width:80%">
							<option>Select</option>
						</select>
					</div>
					<div class="cal" style="display:inline"><select id="info" class="button" style="width:90%"></select></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="AttachMaterial()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
	var MaterialNum = document.getElementById("center").contentWindow.MaterialNum;
	for (var i = 1; i < MaterialNum; i++)
		$("#select").append("<option value='" + i + "'>" + i + "</option>");
})
////////////////////////////////////////////////////////////////////////////////////////////
ipcRenderer.on("RunPython", (event) => {
	console.log("RunPython!")
})

////////////////////////////////////////////////////////////////////////////////////////////
//MSASect
ipcRenderer.on("ExportAndShow", (event,arg) => {
	console.log("ExportAndShow!")
	var jsonRes=arg
	document.getElementById("Area").value = parseFloat(jsonRes.A).toExponential(3)
	document.getElementById("I z-z").value = parseFloat(jsonRes.Iz).toExponential(3)
	document.getElementById("I y-y").value = parseFloat(jsonRes.Iy).toExponential(3)
	document.getElementById("J").value = parseFloat(jsonRes.J).toExponential(3)
	document.getElementById("Cw").value = parseFloat(jsonRes.Iw).toExponential(3)
	document.getElementById("Ysc").value = parseFloat(jsonRes.yc).toExponential(3)
	document.getElementById("Zsc").value = parseFloat(jsonRes.zc).toExponential(3)
	document.getElementById("BetaV").value = parseFloat(jsonRes.betay).toExponential(3)
	document.getElementById("BetaW").value = parseFloat(jsonRes.betaz).toExponential(3)
	document.getElementById("Betaw").value = parseFloat(jsonRes.betaw).toExponential(3)
	document.getElementById("Iyz").value = parseFloat(jsonRes.Iyz).toExponential(3)
})