var type = document.getElementsByName("type");

type[0].onclick = function () {
    const app = new PIXI.Application({
        width: 320,
        height: 270,
        antialias: true,    // default: false
        transparent: false, // default: false
        resolution: 1       // default: 1
    })
    app.renderer.backgroundColor = 0xffffff;
    document.body.appendChild(app.renderer.view)

    //画坐标轴
    let lineZ = new PIXI.Graphics();
    lineZ.lineStyle(1, 0x000000, 1);
    lineZ.moveTo(80, 135);
    lineZ.lineTo(240, 135);

    let lineY = new PIXI.Graphics();
    lineY.lineStyle(1, 0x000000, 1);
    lineY.moveTo(160, 20);
    lineY.lineTo(160, 250);

    let line1 = new PIXI.Graphics();
    line1.lineStyle(1, 0x000000, 1);
    line1.moveTo(80, 135);
    line1.lineTo(90, 130);


    let line2 = new PIXI.Graphics();
    line2.lineStyle(1, 0x000000, 1);
    line2.moveTo(80, 135);
    line2.lineTo(90, 140);

    let line3 = new PIXI.Graphics();
    line2.lineStyle(1, 0x000000, 1);
    line2.moveTo(160, 20);
    line2.lineTo(155, 30);

    let line4 = new PIXI.Graphics();
    line2.lineStyle(1, 0x000000, 1);
    line2.moveTo(160, 20);
    line2.lineTo(165, 30);
    app.stage.addChild(lineZ, lineY, line1, line2);

    let style = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 16,
        fill: "black"
    });

    let messageY = new PIXI.Text("Y", style);
    messageY.position.set(170, 10)
    app.stage.addChild(messageY);

    let messageZ = new PIXI.Text("Z", style);
    messageZ.position.set(70, 145);
    app.stage.addChild(messageZ);
}

