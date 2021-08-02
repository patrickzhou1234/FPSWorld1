const canvas = document.getElementById("babcanv"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true);
boxdest = 0;
barreldest = 0;
coordSystem=function(b){var g=b.normalize();b=0==Math.abs(b.x)&&0==Math.abs(b.y)?(new BABYLON.Vector3(b.z,0,0)).normalize():(new BABYLON.Vector3(b.y,-b.x,0)).normalize();var r=BABYLON.Vector3.Cross(b,g);return{x:b,y:g,z:r}},randPct=function(b,g){return 0==g?b:(1+(1-2*Math.random())*g)*b},createBranch=function(b,g,r,w,h,l,v,n,x){for(var t=[],d,c=[],f,q=[],a=0;12>a;a++)t[a]=[];for(var m=0;m<h;m++)for(a=m/h,d=g.y.scale(a*r),d.addInPlace(g.x.scale(v*Math.exp(-a)*Math.sin(l*a*Math.PI))),d.addInPlace(b),c[m]=d,d=n*(1+(.4*Math.random()-.2))*(1-(1-w)*a),q.push(d),a=0;12>a;a++)f=a*Math.PI/6,f=g.x.scale(d*Math.cos(f)).add(g.z.scale(d*Math.sin(f))),f.addInPlace(c[m]),t[a].push(f);for(a=0;12>a;a++)t[a].push(c[c.length-1]);return{branch:BABYLON.MeshBuilder.CreateRibbon("branch",{pathArray:t,closeArray:!0},x),core:c,_radii:q}},createTreeBase=function(b,g,r,w,h,l,v,n,x,t){var d=2/(1+Math.sqrt(5)),c=new BABYLON.Vector3(0,1,0),f,c=coordSystem(c),q=new BABYLON.Vector3(0,0,0),a=[],m=[],e=[],A=[],q=createBranch(q,c,b,g,r,1,x,1,t);a.push(q.branch);var y=q.core;m.push(y);e.push(q._radii);A.push(c);for(var q=y[y.length-1],y=2*Math.PI/h,z,u,p,C,B=0;B<h;B++)if(f=randPct(B*y,.25),f=c.y.scale(Math.cos(randPct(l,.15))).add(c.x.scale(Math.sin(randPct(l,.15))*Math.sin(f))).add(c.z.scale(Math.sin(randPct(l,.15))*Math.cos(f))),z=coordSystem(f),f=createBranch(q,z,b*v,g,r,n,x*d,g,t),p=f.core,p=p[p.length-1],a.push(f.branch),m.push(f.core),e.push(f._radii),A.push(z),1<w)for(var D=0;D<h;D++)u=randPct(D*y,.25),u=z.y.scale(Math.cos(randPct(l,.15))).add(z.x.scale(Math.sin(randPct(l,.15))*Math.sin(u))).add(z.z.scale(Math.sin(randPct(l,.15))*Math.cos(u))),u=coordSystem(u),C=createBranch(p,u,b*v*v,g,r,n,x*d*d,g*g,t),a.push(C.branch),m.push(C.core),e.push(f._radii),A.push(u);return{tree:BABYLON.Mesh.MergeMeshes(a),paths:m,radii:e,directions:A}},createTree=function(b,g,r,w,h,l,v,n,x,t,d,c,f,q,a,m){1!=h&&2!=h&&(h=1);var e=createTreeBase(b,g,r,h,l,v,n,d,c,m);e.tree.material=w;var A=b*Math.pow(n,h),y=A/(2*f),z=1.5*Math.pow(g,h-1);n=BABYLON.MeshBuilder.CreateDisc("leaf",{radius:z/2,tessellation:12,sideOrientation:BABYLON.Mesh.DOUBLESIDE},m);b=new BABYLON.SolidParticleSystem("leaveSPS",m,{updatable:!1});b.addShape(n,2*f*Math.pow(l,h),{positionFunction:function(b,a,g){a=Math.floor(g/(2*f));1==h?a++:a=2+a%l+Math.floor(a/l)*(l+1);var E=(g%(2*f)*y+3*y/2)/A,d=Math.ceil(r*E);d>e.paths[a].length-1&&(d=e.paths[a].length-1);var k=d-1,c=k/(r-1),m=d/(r-1);b.position=new BABYLON.Vector3(e.paths[a][k].x+(e.paths[a][d].x-e.paths[a][k].x)*(E-c)/(m-c),e.paths[a][k].y+(e.paths[a][d].y-e.paths[a][k].y)*(E-c)/(m-c)+(.6*z/q+e.radii[a][d])*(g%2*2-1),e.paths[a][k].z+(e.paths[a][d].z-e.paths[a][k].z)*(E-c)/(m-c));b.rotation.z=Math.random()*Math.PI/4;b.rotation.y=Math.random()*Math.PI/2;b.rotation.z=Math.random()*Math.PI/4;b.scale.y=1/q}});b=b.buildMesh();b.billboard=!0;n.dispose();d=new BABYLON.SolidParticleSystem("miniSPS",m,{updatable:!1});n=new BABYLON.SolidParticleSystem("minileavesSPS",m,{updatable:!1});var u=[];c=2*Math.PI/l;for(var p=0;p<Math.pow(l,h+1);p++)u.push(randPct(Math.floor(p/Math.pow(l,h))*c,.2));c=function(a,b,d){var c=d%Math.pow(l,h);1==h?c++:c=2+c%l+Math.floor(c/l)*(l+1);var f=e.directions[c],c=new BABYLON.Vector3(e.paths[c][e.paths[c].length-1].x,e.paths[c][e.paths[c].length-1].y,e.paths[c][e.paths[c].length-1].z),k=u[d],k=f.y.scale(Math.cos(randPct(v,0))).add(f.x.scale(Math.sin(randPct(v,0))*Math.sin(k))).add(f.z.scale(Math.sin(randPct(v,0))*Math.cos(k))),f=BABYLON.Vector3.Cross(BABYLON.Axis.Y,k),k=Math.acos(BABYLON.Vector3.Dot(k,BABYLON.Axis.Y)/k.length());a.scale=new BABYLON.Vector3(Math.pow(g,h+1),Math.pow(g,h+1),Math.pow(g,h+1));a.quaternion=BABYLON.Quaternion.RotationAxis(f,k);a.position=c;};for(var C=[],B=[],p=e.paths.length,D=e.paths[0].length,F=0;F<x;F++)C.push(2*Math.PI*Math.random()-Math.PI),B.push([Math.floor(Math.random()*p),Math.floor(Math.random()*(D-1)+1)]);p=function(a,c,b){var d=B[b][0],f=B[b][1],k=e.directions[d];c=new BABYLON.Vector3(e.paths[d][f].x,e.paths[d][f].y,e.paths[d][f].z);c.addInPlace(k.z.scale(e.radii[d][f]/2));b=C[b];k=k.y.scale(Math.cos(randPct(t,0))).add(k.x.scale(Math.sin(randPct(t,0))*Math.sin(b))).add(k.z.scale(Math.sin(randPct(t,0))*Math.cos(b)));b=BABYLON.Vector3.Cross(BABYLON.Axis.Y,k);k=Math.acos(BABYLON.Vector3.Dot(k,BABYLON.Axis.Y)/k.length());a.scale=new BABYLON.Vector3(Math.pow(g,h+1),Math.pow(g,h+1),Math.pow(g,h+1));a.quaternion=BABYLON.Quaternion.RotationAxis(b,k);a.position=c};d.addShape(e.tree,Math.pow(l,h+1),{positionFunction:c});d.addShape(e.tree,x,{positionFunction:p});d=d.buildMesh();d.material=w;n.addShape(b,Math.pow(l,h+1),{positionFunction:c});n.addShape(b,x,{positionFunction:p});w=n.buildMesh();b.dispose();w.material=a;a=BABYLON.MeshBuilder.CreateBox("",{},m);a.isVisible=!1;e.tree.parent=a;d.parent=a;return w.parent=a};
var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;
    
    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1, -10), scene);
    camera.checkCollisions = true;
    camera.applyGravity = true;
    
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.ellipsoid = new BABYLON.Vector3(1.5, 0.5, 1.5);
    
    camera.attachControl(canvas, true);
    camera.keysUp.pop(38);
    camera.keysDown.pop(40);
    camera.keysLeft.pop(37);
    camera.keysRight.pop(39);
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
    camera.speed = 0.1;
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    function makeTree(xpos) {
        var green = new BABYLON.StandardMaterial("green", scene);
        green.diffuseColor = new BABYLON.Color3(0,1,0);	
        
        var bark = new BABYLON.StandardMaterial("bark", scene);
        bark.emissiveTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Bark_texture_wood.jpg/800px-Bark_texture_wood.jpg", scene);
        bark.diffuseTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Bark_texture_wood.jpg/800px-Bark_texture_wood.jpg", scene);
        bark.diffuseTexture.uScale = 2.0;
        bark.diffuseTexture.vScale = 2.0;	
                    		
        var trunk_height = 20;
        var trunk_taper = 0.6;
        var trunk_slices = 5;
        var boughs = 1;
        var forks = 2;
        var fork_angle = Math.PI/4;
        var fork_ratio = 2/(1+Math.sqrt(5));
        var branch_angle = Math.PI/3;
        var bow_freq = 2;
        var bow_height = 3.5;
        var branches = 10;
        var leaves_on_branch = 5;
        var leaf_wh_ratio = 0.5;
                    
        var tree = createTree(trunk_height, trunk_taper, trunk_slices, bark, boughs, forks, fork_angle, fork_ratio, branches, branch_angle, bow_freq, bow_height, leaves_on_branch, leaf_wh_ratio, green, scene);
        tree.position.x = xpos;
        tree.position.z = 5;
        tree.checkCollisions = true;
    }

    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/country.dds", scene);
    var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

    boxmat = new BABYLON.StandardMaterial("boxmat", scene);

    box = BABYLON.MeshBuilder.CreateBox("box", {width: 2, height: 2, depth: 2}, scene);
    box.position.y = 1;
    box.material = boxmat;
    box.checkCollisions = true;
    box.material.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/pdSPWq5.png", scene);

    airdrop = BABYLON.MeshBuilder.CreateBox("box", {width: 2, height: 2, depth: 2}, scene);
    airdrop.position.y = 1;
    airdrop.position.x = 3;
    airmat = new BABYLON.StandardMaterial("airmat", scene);
    airdrop.material = airmat;
    airdrop.checkCollisions = true;
    airdrop.material.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/9ZJKGxb.png", scene);
  
    barrel = BABYLON.MeshBuilder.CreateCylinder("barrel", {diameter: 2, height: 2}, scene);
    barrel.position.y = 1;
    barrel.position.x = -3;
    barrel.checkCollisions = true;
    toExplodeArray = [];
    toExplodeArray.push(barrel);
    for (var alpha = 0; alpha < Math.PI*2; alpha+=Math.PI/10) {
        var sphere0 = BABYLON.MeshBuilder.CreateSphere('sphere0', { segments:8, diameter:.5 }, scene);
        sphere0.position.y = 1;
        sphere0.position.z = Math.cos(alpha)*0.25;
        sphere0.position.x = Math.sin(alpha)*0.25-3;
        sphere0.actionManager = new BABYLON.ActionManager(scene);
        sphere0.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
                {
                trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter:box
                }, 
                function(){
                    box.dispose();
                }
            )
        );
        toExplodeArray.push(sphere0);
    }

    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 100}, scene);
    ground.checkCollisions = true;
    var grasstexture = new BABYLON.StandardMaterial("grasstexture", scene);
    grasstexture.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/fr2946D.png", scene);
    ground.material = grasstexture;
    
    for (i=-25;i<50;i+=20) {
        makeTree(i);
    }
    return scene;
};

canvas.onclick = function(){
    canvas.requestPointerLock = 
    canvas.requestPointerLock ||
    canvas.mozRequestPointerLock ||
    canvas.webkitRequestPointerLock
    canvas.requestPointerLock();
    var bullet = BABYLON.MeshBuilder.CreateSphere("bullet", {diameter: 0.5, segments: 32}, scene);
    bullet.checkCollisions = true;
    var startPos = camera.position;
    bullet.position = new BABYLON.Vector3(startPos.x, startPos.y, startPos.z);
    var invView = new BABYLON.Matrix();
	camera.getViewMatrix().invertToRef(invView);
	var direction = BABYLON.Vector3.TransformNormal(new BABYLON.Vector3(0, 0, 1), invView);
	direction.normalize();
    bullet.actionManager = new BABYLON.ActionManager(scene);
    bullet.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
            trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter:box
            }, 
            function(){
                if (boxdest == 0) {
                    bullet.dispose();
                    boxdest = 1;
                }
                box.dispose();
            }
        )
    );
    bullet.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
            trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter:barrel
            }, 
            function(){
                if (barreldest == 0) {
                    bullet.dispose();
                    barreldest = 1;
                    var newExplosion = new BABYLON.MeshExploder(toExplodeArray);
                    var e = 0;
                    setInterval(function() {
                    e += 0.3;
                    newExplosion.explode(e);
                    }, 1);
                }
                barrel.dispose();
            }
        )
    );
    bullet.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
            trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter:airdrop
            }, 
            function(){
                var e = 0;
                var toExplodeArray = [];
                toExplodeArray.push(airdrop);
                toExplodeArray.push(bullet);
                var newExplosion = new BABYLON.MeshExploder(toExplodeArray);
                setInterval(function() {
                    e += 0.3;
                    newExplosion.explode(e);
                }, 1);
            }
        )
    );
    scene.registerBeforeRender(function () {
       	bullet.position.addInPlace(direction);
    });
}

const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
