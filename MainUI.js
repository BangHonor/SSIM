const { app, BrowserWindow, ipcMain,dialog } = require("electron")
let win
let mainWindow
const exec = require('child_process').exec;
//菜单栏
const { Menu } = require('electron')
const path = require('path')
//监听变化
var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('watch:electron', function () {
	electron.start();
	gulp.watch(['..js'], electron.restart);
	gulp.watch(['..{html,js,css}'], electron.reload);
});

function createWindow() {
	// 创建浏览器窗口。

	mainWindow = new BrowserWindow({ x: 0, y: 0, width: 1440, height: 1200, webPreferences: { nodeIntegration: true, enableRemoteModule: true,}})
	mainWindow.loadFile("./GUI/main.html")
	// 打开开发者工具
	mainWindow.webContents.openDevTools()
	mainWindow.on('closed', () => {
		mainWindow = null
	})
	var template = [{//Fir
		label: 'File  ',
		submenu: [{
			label: 'Info',//试试主进程和渲染进程交互
			role: 'create',
			click: (menuItem,browserWindow,event) => {
				browserWindow.webContents.send('Info',)	
			}
			//菜单与html交互的正确方法！！！！！！！！！！！！！！！！！
		},
			{
				label: "separator",
				type:"separator"
			},
		{
			label: 'Open',
			role: 'open',
			click: (menuItem, browserWindow, event) => {
				browserWindow.webContents.send('openfile')

			}
		},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Save',
			role: 'save',
			click: (menuItem, browserWindow, event) => {
				browserWindow.webContents.send('save')
			}
		},
		{
			label: 'Save as',
			role: 'save as',
			click: (menuItem, browserWindow, event) => {
				browserWindow.webContents.send('saveas')
			}
		},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'New',
			role: 'New',
			click: (menuItem,browserWindow, event) => {
				browserWindow.webContents.send('New')
			}
		},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Define Title',
			role: 'Define title'

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Print Photo',
			submenu: [
				{
					label: 'To Printer',
					role: 'To Printer'
				},
				{
					label: 'To File(tiff)',
					role: 'To File(tiff)'
				},
				{
					label: 'To File(pdf)',
					role: 'To File(pdf)'
				}
			]

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Create Report',
			role: 'Create re'

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Quit',
			role: 'Quit'

		},
		]


	},

	{//Sec
		label: 'View  ',
		submenu: [{
			label: 'Dynamic Zoom',
			accelerator: 'CmdOrCtrl+Z',
			role: 'Dynamic zoom'
		},
		{
			label: 'Dynamic Rotate',
			accelerator: 'CmdOrCtrl+R',
			role: 'Dynamic rotate'
		},
		{
			label: 'Dynamic Pan',
			accelerator: 'CmdOrCtrl+P',
			role: 'Dynamic pan'
			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Zoom Box',
			//accelerator: 'Shift+CmdOrCtrl+O',
			role: "zoom box"
		},

		{
			label: 'Center',
			// accelerator: 'CmdOrCtrl+R',
			role: 'center'
		},
		{
			label: 'Fit',
			accelerator: 'CmdOrCtrl+F',
			role: 'Fit'
			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: "Pan/Zoom",
			//accelerator: 'CmdOrCtrl+Alt+S',
			role: 'Pan or zoom'
		},
		{
			label: 'Rotate',
			//accelerator: 'CmdOrCtrl+Alt+S',
			role: 'rotate',
			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: "Defined Views",
			submenu: [
				{
					label: 'Front View:x-y',
					role: 'Front View:x-y'
				},
				{
					label: 'Side View:y-z',
					role: 'Side View:y-z'
				},
				{
					label: 'Top View:x-z',
					role: 'Top View:x-z'
				},
				{
					label: 'Isometric View:x-y-z',
					role: 'Isometric View:x-y-z'
				}
			]
		},
		{
			label: 'Labels',
			submenu: [
				{
					label: 'Axis',
					role: 'Axis'
				},
				{
					label: "separator",
					type: "separator"
				},
				{
					label: 'Node #s',
					role: 'Node #s'
				},
				{
					label: 'Element #s',
					role: 'Element #s'
				},
				{
					label: "separator",
					type: "separator"
				},
				{
					label: 'Element local x"-y"-z" axes',
					role: 'Element local x"-y"-z" axes'
				},
				{
					label: "separator",
					type: "separator"
				},
				{
					label: 'Element Connections',
					role: 'Element Connections'
				},
				{
					label: "separator",
					type: "separator"
				},
				{
					label: 'Loads',
					role: 'Loads'
				},
				{
					label: 'Fixities',
					role: 'Fixities'
				},
				{
					label: 'Settlements',
					role: 'Settlements'
				},
				{
					label: "separator",
					type: "separator"
				},
				{
					label: 'Scale Actions(S,M,L,XL)',
					role: 'Scale Actions(S,M,L,XL)'
				},
				{
					label: "separator",
					type: "separator"
				},
				{
					label: 'Diagram Values',
					role: 'Diagram Values'
				},
				{
					label: 'Undeflected Geometry',
					role: 'Undeflected Geometry'
				},
			]
			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Restack Objects',
			role: 'Restack Objects',
		},
		{
			label: "Display Setting",
			role: "Display Setting",
		},
		]
	},

	{//Thr
		label: 'Geometry  ',
		submenu: [
			{
				label: 'Define Node(s)',
				role: 'define node',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('DefineNodes')
				}
			},
			{
				label: 'Move Node(s)',
				role: 'move node',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('MoveNodes')
				}
			},
			{
				label: 'Scale Node(s)',
				role: 'Scale node',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('ScaleNodes')
				}
			},
			{
				label: 'Duplicate Node(s)',
				role: 'Duplicate node',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('DuplicateNodes')
				}

			},
			{
				label: 'Remove Node(s)',
				role: 'Remove node',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('RemoveNodes')
				}

			},
			{
				label: 'Merge Node(s)',
				role: 'Merge node',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('MergeNodes')
				}

			},
			{
				label: 'Renumber Nodes',
				role: 'Renumber node',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('RenumberNodes')
				}

			},
			{
				label: "separator",
				type: "separator"
			},
			{
				label: 'Define Element',
				role: 'Define element',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('DefineElements')
				}

			},
			{
				label: 'Extrude Element(s)',
				role: 'Extrude element',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('ExtrudeElements')
				}

			},
			{
				label: 'Duplicate Element(s)',
				role: 'Duplicate element',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('DuplicateElements')
				}

			},
			{
				label: 'Remove Element(s)',
				role: 'Remove element',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('RemoveElements')
				}

			},
			{
				label: 'Subdivide Element(s)',
				role: 'Subdivide element',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('SubdivideElements')
				}

			},
			{
				label: 'Re-orient Element(s)',
				role: 'Re-orient element',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('Re-porientElements')
				}

			},
			{
				label: 'Renumber Element(s)',
				role: 'Renumber element',
				click: (menuItem, browserWindow, event) => {
					browserWindow.webContents.send('RenumberElements')
				}

			},
			{
				label: 'Define Connections',
				submenu: [
					{
						label: 'Flexure',
						role: 'Flexure'
					},
					{
						label: "separator",
						type: "separator"
					},
					{
						label: 'Torsion',
						role: 'Torsion'
					},
				]

			},
			{
				label: "separator",
				type: "separator"
			},
			{
				label: 'Define Frame',
				role: 'Define frame'

			},
			{
				label: 'Input Geometry',
				role: 'Input Geometry'

			},
			{
				label: "separator",
				type: "separator"
			},
			{
				label: 'Information',
				submenu: [
					{
						label: 'Node',
						role: 'Node'
					},
					{
						label: "separator",
						type: "separator"
					},
					{
						label: 'Element',
						role: 'Element'
					},
				]

			},
		]
	},

	{//thu
		label: 'Properties  ',
		submenu: [{
			label: 'Define Section',
			role: 'Define Section',
			click: (menuItem, browserWindow, event) => {
				browserWindow.webContents.send('DefineSection')
			}
		},
		{
			label: 'Modify Section',
			role: 'Modify Section',
			click: (menuItem, browserWindow, event) => {
				browserWindow.webContents.send('ModifySection')
			}
		},

		{
			label: 'Remove Section',
			role: 'Remove Section',
			click: (menuItem, browserWindow, event) => {
				browserWindow.webContents.send('RemoveSection')
			}
		},
		{
			label: 'Attach Section',
			role: 'Attach Section',
			click: (menuItem, browserWindow, event) => {
				browserWindow.webContents.send('AttachSection')
			}

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Yield Surface Control',
			role: 'Yield Surface Control'

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Define Material',
			role: 'Define Material',
			click: (menuItem, browserWindow, event) => {
				browserWindow.webContents.send('DefineMaterial')
			}

		},
		{
			label: 'Modify Material',
			role: 'Modify Material',
			click: (menuItem, browserWindow, event) => {
				browserWindow.webContents.send('ModifyMaterial')
			}

		},
		{
			label: 'Remove Material',
			role: 'Remove Material',
			click: (menuItem, browserWindow, event) => {
				browserWindow.webContents.send('RemoveMaterial')
			}

		},
		{
			label: 'Attach Material',
			role: 'Attach Material',
			click: (menuItem, browserWindow, event) => {
				browserWindow.webContents.send('AttachMaterial')
			}

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Input Properties',
			role: 'Input Properties',
			click: (menuItem, browserWindow, event) => {
				browserWindow.webContents.send('InputProperties')
			}

		},
		{
			label: 'Information',
			submenu: [
				{
					label: 'Section',
					role: 'Section'
				},
				{
					label: "separator",
					type: "separator"
				},
				{
					label: "Material",
					role: "Material"
				},
			]

		},
		]
	}/*,

	{//Fri
		label: 'Conditions  ',
		submenu: [{
			label: 'Define Fixities',
			role: 'Define Fixities'
		},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Define Forces',
			role: 'Define Forces'
		},

		{
			label: 'Define Moments',
			role: 'Define Moments'
			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Define Uniform Loads',
			role: 'Define Uniform Loads'

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Input Loads',
			role: 'Input Loads'

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Prescribe Displacements',
			role: 'Prescribe Displacements'

		},
		{
			label: 'Prescribe Rotations',
			role: 'Prescribe Rotations'

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Define Temperature Effects',
			role: 'Define Temperature Effects'

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Define Time-History Function',
			role: 'Define Time-History Function'
		},
	]
	},


	{//Six
		label: 'Analysis  ',
		submenu: [
			{
				label: "Static",
				submenu: [
					{
						label: '1st-Order Elastic',
						role: '1st-Order Elastic'
					},
					{
						label: '2nd-Order Elastic',
						role: '2nd-Order Elastic'
					},

					{
						label: '1st-Order lnelastic',
						role: '1st-Order lnelastic'
					},
					{
						label: '2st-Order lnelastic',
						role: '2st-Order lnelastic'
					}]
			},
			{
				label: "Eigen-Buckling",
				submenu: [
					{
						label: 'Elastic Critical Load',
						role: 'Elastic Critical Load'
					},
					{
						label: 'Inelastic Critical Load',
						role: 'Inelastic Critical Load'
					}]
			},
			{
				label: "Modal",
				submenu: [
					{
						label: 'Natural Period',
						role: 'Natural Period'
					}]
			},
			{
				label: "Time-History",
				submenu: [
					{
						label: '1st-Order Elastic',
						role: '1st-Order Elastic'
					},
					{
						label: '2nd-Order Elastic',
						role: '2nd-Order Elastic'
					}]
			},
			{
				label: "separator",
				type: "separator"
			},
			{
				label: "User Defined",
				submenu: [
					{
						label: '1st-Order Elastic',
						role: '1st-Order Elastic'
					},
					{
						label: '2nd-Order Elastic',
						role: '2nd-Order Elastic'
					},

					{
						label: '1st-Order lnelastic',
						role: '1st-Order lnelastic'
					},
					{
						label: '2st-Order lnelastic',
						role: '2st-Order lnelastic'
					},
					{
						label: "separator",
						type: "separator"
					},
					{
						label: 'Elastic Critical Load',
						role: 'Elastic Critical Load'
					},
					{
						label: 'Inelastic Critical Load',
						role: 'Inelastic Critical Load'
					},
					{
						label: "separator",
						type: "separator"
					},
					{
						label: 'Natural Period',
						role: 'Natural Period'
					}]
			},

		]
	},


	{//Seven
		label: 'Results  ',
		submenu: [{
			label: 'Diagrams',
			submenu: [
				{
					label: 'None',
					role: 'None'
				},
				{
					label: "separator",
					type: "separator"
				},
				{
					label: 'Deflected Shape',
					role: 'Deflected Shape'
				},
				{
					label: "separator",
					type: "separator"
				},
				{
					label: 'Axial Force P',
					role: 'Axial Force P'
				},
				{
					label: 'Shear Force Vy',
					role: 'Shear Force Vy'
				},
				{
					label: "Shear Force Vz",
					role: "Shear Force Vz"
				},
				{
					label: "separator",
					type: "separator"
				},
				{
					label: 'Torque T',
					role: 'Torque T'
				},
				{
					label: 'Moment My',
					role: 'Moment My'
				},
				{
					label: "Moment Mz",
					role: "Moment Mz"
				},
				{
					label: 'Bimoment B',
					role: 'Bimoment B'
				},
				{
					label: "separator",
					type: "separator"
				},
				{
					label: 'Norm Resp Incr',
					role: 'Norm Resp Incr'
				},
				{
					label: "separator",
					type: "separator"
				},
				{
					label: 'View [Kff]',
					role: 'View [Kff]'
				}
			]
		},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Node Displacements',
			role: 'Node Displacements'
		},

		{
			label: 'Node Reactions',
			role: 'Node Reactions'
			},
			{
				label: 'Node Velocity',
				role: 'Node Velocity'
			},

			{
				label: 'Node Acceleration',
				role: 'Node Acceleration'
			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Elements Forces',
			role: 'Elements Forces'

		},
		{
			label: 'Plastic Deformations',
			role: 'Plastic Deformations'

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Update Geometry',
			role: 'Update Geometry'

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'MSAPlot',
			role: 'MSAPlot'

			},
			{
				label: "separator",
				type: "separator"
			},
		{
			label: 'Erase Results',
			role: 'Erase Results'

		}
		]
	}*/
	];

	//调用创建菜单函数,Menu指代所有的窗口
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
}

app.commandLine.appendSwitch("--disable-http-cache")
let pyProc = null
let pyPort = null


const exitPyProc = () => {
	pyProc.kill()
	pyProc = null
	pyPort = null
}
app.on('ready', () => {
	createWindow()		
	/*exec('python ./Core/CalSection.py', function (error, stdout, stderr) {
		if (error) {
			console.info('stderr : ' + stderr);
		}
		console.log('exec: ' + stdout);
	})*/
	let script = path.join(__dirname, 'Core', 'CalSection.py')
	pyProc = require('child_process').spawn('python', [script])
	//注意：exec spawn无法在打包后被读取，所以打包后这里将会失效  也即不能调python

	/*let script = path.join(__dirname, 'py', 'dist', 'CalSection')
	pyProc = require('child_process').execFile(script)*/
})

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
		exitPyProc();
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

//接受MSASect显示弹窗
ipcMain.on("MSASect", () => {
	//MSASect弹窗

	//console.log("hello fron index!")
	win = new BrowserWindow({ width: 880, height: 580, webPreferences: { nodeIntegration: true, enableRemoteModule: true, }, parent: mainWindow })
	win.webContents.openDevTools()
	win.maximizable = false
	win.resizable = false
	win.fullscreenable = false
	win.setMenu(null)
	win.loadFile("./GUI/MSASect.html")
})



//openfile的中转站
ipcMain.on("filedata", (event, arg) => {
	mainWindow.webContents.send("OpenFileData", arg)
})

ipcMain.on("reload", (event) => {
	mainWindow.reload();
})

ipcMain.on("reload2", (event) => {
	win.reload();
})

ipcMain.on("Export", (event,arg) => {
	mainWindow.webContents.send("ExportAndShow", arg)
})

ipcMain.on("CancelMSASect", (event) => {
	win.close();
})