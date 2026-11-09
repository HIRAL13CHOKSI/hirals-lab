import * as THREE from './vendor/three.module.min.js';
import { SoftwareRenderer } from './software-renderer.js';

// Click-led gallery: buttons control the tour independently of page scroll.
const $=s=>document.querySelector(s),canvas=$('#lab-canvas'),journey=$('#lab-journey'),frame=$('#room-frame');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const mobile=()=>innerWidth<651;
let renderer;
try { renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'low-power'}); }
catch { try { renderer=new SoftwareRenderer(canvas); } catch { $('#room-fallback').hidden=false;$('#render-status').textContent='PORTFOLIO MODE'; } }
if(renderer) buildRoom();
else { $('#door-enter').onclick=()=>$('#museum').scrollIntoView();$('#story-next').onclick=()=>$('#museum').scrollIntoView();$('#next-room').onclick=()=>$('#museum').scrollIntoView();$('#enter-lab').onclick=()=>$('#museum').scrollIntoView();document.querySelectorAll('[data-room-stop]').forEach(b=>b.onclick=()=>$('#museum').scrollIntoView()); }
function buildRoom(){
renderer.shadowMap.enabled=!renderer.isSoftware;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
const scene=new THREE.Scene();scene.background=new THREE.Color('#0b1423');scene.fog=new THREE.FogExp2('#0b1423',.014);
const camera=new THREE.PerspectiveCamera(mobile()?84:64,1,.15,70);
scene.add(new THREE.HemisphereLight('#c6d9f3','#1d1936',2.0));
const key=new THREE.DirectionalLight('#ffe1b0',2.2);key.position.set(2,8,10);scene.add(key);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-11,right:11,top:11,bottom:-11,near:1,far:35});key.shadow.bias=-.0007;
const rim=new THREE.DirectionalLight('#a391ff',1.2);rim.position.set(-8,5,-10);scene.add(rim);
for(const [color,x,z] of [['#8dd9e9',-5,1],['#edb8d4',6,-4],['#9be1b6',0,-9]]){const light=new THREE.PointLight(color,12,11,2);light.position.set(x,4,z);scene.add(light);}
const room=new THREE.Group();scene.add(room);
const material=(color,metalness=.15,roughness=.6)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
const m={floor:material('#152334',.65,.27),floorAlt:material('#18283b',.6,.32),wall:material('#26374b',.35,.58),wallAlt:material('#213044',.3,.7),trim:material('#52617c',.65,.38),black:material('#0a1324',.4,.32),white:material('#d9dfeb',.2,.3),lavender:material('#b4a7cc',.4,.37),blue:material('#3e7e8e',.3,.4),green:material('#73a992',.18,.6),warm:material('#987b6e',.15,.6)};
const glow=(color,power=1)=>new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:power,roughness:.4});
const cyan=glow('#8edce5',1.2),violet=glow('#b4a0ed',1.1),rose=glow('#efb5d1',1),mint=glow('#b0e4bd',1),amber=glow('#edcb9b',.8);
function mesh(g,mat,parent=room,x=0,y=0,z=0){const o=new THREE.Mesh(g,mat);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
function box(w,h,d,mat,parent=room,x=0,y=0,z=0){return mesh(new THREE.BoxGeometry(w,h,d),mat,parent,x,y,z);}
function cylinder(r,h,mat,parent=room,x=0,y=0,z=0,r2=r){return mesh(new THREE.CylinderGeometry(r,r2,h,24),mat,parent,x,y,z);}
function sphere(r,mat,parent,x,y,z){return mesh(new THREE.SphereGeometry(r,12,8),mat,parent,x,y,z);}
function ring(r,t,mat,parent=room,x=0,y=0,z=0){const o=mesh(new THREE.TorusGeometry(r,t,6,48),mat,parent,x,y,z);o.rotation.x=-Math.PI/2;return o;}
function rounded(w,h,d,r,mat,parent=room,x=0,y=0,z=0){const s=new THREE.Shape(),l=-w/2,b=-h/2;s.moveTo(l+r,b);s.lineTo(l+w-r,b);s.quadraticCurveTo(l+w,b,l+w,b+r);s.lineTo(l+w,b+h-r);s.quadraticCurveTo(l+w,b+h,l+w-r,b+h);s.lineTo(l+r,b+h);s.quadraticCurveTo(l,b+h,l,b+h-r);s.lineTo(l,b+r);s.quadraticCurveTo(l,b,l+r,b);const g=new THREE.ExtrudeGeometry(s,{depth:d,steps:1,bevelEnabled:true,bevelSegments:2,bevelSize:Math.min(.05,d/3),bevelThickness:Math.min(.05,d/3),curveSegments:5});g.translate(0,0,-d/2);return mesh(g,mat,parent,x,y,z);}
function bond(a,b,r,mat,parent){const delta=new THREE.Vector3().subVectors(b,a),mid=new THREE.Vector3().addVectors(a,b).multiplyScalar(.5);const o=mesh(new THREE.CylinderGeometry(r,r,delta.length(),6),mat,parent,mid.x,mid.y,mid.z);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return o;}
function label(text,width=4,color='#ced8ee',size=42,font='monospace'){if(text==='HC'){const c=document.createElement('canvas');c.width=256;c.height=256;const ctx=c.getContext('2d');ctx.font='500 112px monospace';ctx.textAlign='center';ctx.fillStyle=color;ctx.fillText(text,128,169);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthWrite:false}));sprite.scale.set(1.15,1.15,1);return sprite;}const c=document.createElement('canvas');c.width=1024;c.height=160;const ctx=c.getContext('2d');ctx.font=`500 ${size}px ${font}`;ctx.textAlign='center';ctx.fillStyle=color;ctx.fillText(text,512,95);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthWrite:false}));sprite.scale.set(width,width*160/1024,1);return sprite;}
function sign(text,x,y,z,width=4,color){const t=label(text,width,color);t.position.set(x,y,z);room.add(t);return t;}
// Soft pools of colored light sit below the welcome panel and across the threshold.
const entranceLights = [
  { x: -3.4, z: 17, color: '#d9a2b6', intensity: 78, angle: .62 },
  { x: -3.7, z: 17.2, color: '#dac4ec', intensity: 42, angle: .36 },
  { x: 0, z: 11.3, color: '#d9a2b6', intensity: 0, angle: .55 },
].map(({x, z, color, intensity, angle}) => {
  const light = new THREE.SpotLight(color, intensity, 8, angle, .94, 2);
  light.position.set(x, 3.7, z);
  light.target.position.set(x, -.05, z);
  scene.add(light, light.target);
  return light;
});

// Floor and ceiling are tiled geometry so the room remains well-behaved in the CPU renderer.
for(let z=-12;z<=26;z+=2)for(let x=-8;x<=8;x+=2){box(1.97,.12,1.97,((x+z)/2)%2?m.floor:m.floorAlt,room,x,-.11,z);if(z<12)box(1.96,.1,1.96,m.wallAlt,room,x,6.4,z);}
for(let z=-11;z<=11;z+=2){for(const side of [-1,1]){if(side===1)continue;box(.26,3.05,1.96,(z%4)?m.wall:m.wallAlt,room,side*9,1.5,z);box(.26,3.05,1.96,m.wallAlt,room,side*9,4.6,z);box(.07,.045,1.9,amber,room,side*8.82,.22,z);}}
for(let x=-8;x<=8;x+=2){box(1.97,3.1,.25,m.wallAlt,room,x,1.5,-12.2);box(1.97,3.1,.25,m.wall,room,x,4.6,-12.2);}
for(let z=-10;z<=10;z+=5){box(17.6,.24,.28,m.trim,room,0,6.05,z);box(5.2,.035,.36,amber,room,0,5.9,z);for(const side of [-1,1])box(.18,6,.24,m.trim,room,side*8.7,3,z);}
for(let z=-10;z<12;z+=2){box(.025,.014,.5,amber,room,-2.7,-.035,z);box(.025,.014,.5,amber,room,2.7,-.035,z);}
// A full-size doorway with opening sliding doors, framing a real interior.
for(const side of [-1,1]){box(5.4,.28,.6,m.black,room,side*6.6,.1,12);box(5.4,.28,.6,m.black,room,side*6.6,6.1,12);box(.28,6,.85,m.trim,room,side*3.7,3,12);box(.065,5.8,.09,amber,room,side*3.5,2.9,12.48);}
box(7.5,.65,.8,m.black,room,0,6,12);box(7,.045,.11,amber,room,0,5.66,12.48);
const lintel=sign('HIRAL’S LAB',0,6.1,12.48,6.1,'#ffd58c',74);
const welcome=sign('THE MUSEUM OF UNFINISHED QUESTIONS',0,5.4,12.46,5.4,'#a7bfd7',33);
lintel.visible=false;welcome.visible=false;
const doors=[];for(const side of [-1,1]){const door=new THREE.Group();room.add(door);door.position.set(side*1.72,2.7,12.05);rounded(3.4,5.35,.18,.07,m.wall,door);box(.045,3.3,.03,amber,door,side*1.4,0,.16);for(let y=-1.8;y<=1.8;y+=.6)box(2.6,.012,.01,m.trim,door,0,y,.16);doors.push(door);}
// Threshold markings, entrance sconces, and warm personal touches.
for(let i=0;i<5;i++){const arrow=mesh(new THREE.ConeGeometry(.11,.26,3),amber,room,0,.015,14+i*.7);arrow.rotation.x=-Math.PI/2;}
for(const side of [-1,1]){cylinder(.36,.8,m.warm,room,side*4.8,.3,13.4);for(let i=0;i<6;i++){const leaf=sphere(.26,m.green,room,side*4.8+Math.sin(i*2)*.32,1.05+i*.13,13.4+Math.cos(i*2)*.3);leaf.scale.set(.5,2.2,.6);leaf.rotation.z=Math.sin(i)*.4;}}
// Main island and original robot, at human eye level.
const bot=new THREE.Group();bot.position.set(1.7,1.35,4.3);room.add(bot);
cylinder(1.25,.55,m.black,room,1.7,.2,4.3);ring(1.22,.035,violet,room,1.7,.49,4.3);ring(.98,.012,cyan,room,1.7,.5,4.3);
const botHead=new THREE.Group();botHead.position.y=1.05;bot.add(botHead);rounded(1.65,1.14,.7,.27,m.white,botHead);const face=rounded(1.39,.88,.08,.22,m.black,botHead,0,0,.49);face.renderOrder=2;
const eyes=[];for(const x of [-.3,.3]){const e=rounded(.14,.29,.035,.065,cyan,botHead,x,.025,.59);e.renderOrder=3;eyes.push(e);}
const smile=new THREE.CatmullRomCurve3([new THREE.Vector3(-.13,-.22,.6),new THREE.Vector3(0,-.265,.61),new THREE.Vector3(.13,-.22,.6)]);mesh(new THREE.TubeGeometry(smile,12,.015,6,false),cyan,botHead).renderOrder=3;
for(const x of [-.92,.92])rounded(.17,.35,.34,.065,m.lavender,botHead,x,0,0);
cylinder(.023,.27,m.trim,botHead,0,.73,0);sphere(.07,violet,botHead,0,.92,0);
rounded(.91,.73,.65,.18,m.white,bot,0,-.03,0);sphere(.11,violet,bot,0,.01,.38);const arms=[];for(const side of [-1,1]){const arm=new THREE.Group();arm.position.set(side*.62,.16,0);bot.add(arm);rounded(.22,.57,.24,.095,m.white,arm,0,-.25,0);arms.push(arm);}cylinder(.2,.1,m.black,bot,0,-.49,0);cylinder(.12,.04,violet,bot,0,-.56,0);
// Clickable exhibit objects. Their metaphors are explicitly labeled illustrative in HTML.
const pickables=[];function hitbox(group,id,w,h,d,x=0,y=1,z=0){const o=box(w,h,d,new THREE.MeshBasicMaterial({visible:false}),group,x,y,z);o.userData.exhibit=id;pickables.push(o);}
hitbox(bot,'guide',2.3,3,1.5,0,.4,0);
function displayBase(x,z,color){const g=new THREE.Group();g.position.set(x,0,z);room.add(g);cylinder(1.55,.75,m.black,g,0,.3,0);cylinder(1.6,.08,m.trim,g,0,.02,0);ring(1.51,.035,color,g,0,.7,0);return g;}
// Left alcove: a city block in water, with a moving scanner.
const flood=displayBase(-6.2,1.1,cyan);flood.rotation.y=.55;
box(2.3,.13,1.9,m.blue,flood,0,.8,0);
// An illustrative car, tires, reference ruler and water scene explain the pipeline.
const car=new THREE.Group();flood.add(car);car.rotation.y=-.25;
rounded(1.85,.4,.88,.13,material('#bfcedb',.6,.28),car,0,1.19,0);rounded(1.02,.43,.76,.1,m.blue,car,-.1,1.55,-.06);
rounded(.83,.28,.025,.05,m.black,car,-.1,1.59,.34);rounded(.83,.28,.025,.05,m.black,car,-.1,1.59,-.45);
for(const x of [-.61,.61])for(const z of [-.43,.43]){const tire=cylinder(.23,.15,m.black,car,x,1.01,z);tire.rotation.x=Math.PI/2;const hub=cylinder(.11,.16,m.trim,car,x,1.01,z);hub.rotation.x=Math.PI/2;}
for(const x of [-.68,.68])rounded(.25,.09,.03,.02,amber,car,x,1.23,.46);
const rulerAssembly = new THREE.Group();
flood.add(rulerAssembly);
const ruler = box(.11,1.15,.12,m.white,rulerAssembly,1.1,1.4,0);
ruler.material = m.white.clone();for(let i=0;i<8;i++)box(.2,.015,.02,m.black,rulerAssembly,1.1,1.02+i*.12,.08);
const streetReference = new THREE.Group();
flood.add(streetReference);
box(.07,1.55,.07,m.trim,streetReference,0,1.65,-.055);
const stopBoard = mesh(new THREE.CylinderGeometry(.39,.39,.065,8),material('#b72e4b',.1,.55),streetReference,0,2.4,0);
stopBoard.rotation.x = Math.PI / 2;
stopBoard.rotation.y = Math.PI / 8;
function signLettering(text,width,height,parent,y,z) {
  const art = document.createElement('canvas');
  art.width = 512;
  art.height = 128;
  const ctx = art.getContext('2d');
  ctx.font = 'bold 76px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText(text,256,68,490);
  const map = new THREE.CanvasTexture(art);
  map.colorSpace = THREE.SRGBColorSpace;
  mesh(new THREE.PlaneGeometry(width,height),
    new THREE.MeshBasicMaterial({map,transparent:true,depthWrite:false}),parent,0,y,z);
}
signLettering('STOP',.57,.23,streetReference,2.4,.038);
box(1.8,.13,.24,m.trim,streetReference,0,.93,-.52);
// Road markings sit under the water; the barricade is part of the illustrative scene.
box(2.19,.025,1.7,material('#263345',.1,.8),streetReference,0,.88,0);
const lanePaint = new THREE.MeshBasicMaterial({color:'#b9c3dc',transparent:true,opacity:.43});
for (const z of [-.61,-.23,.15,.53]) box(.036,.008,.19,lanePaint,streetReference,-.43,.9,z);
const barrier = new THREE.Group();
barrier.position.set(.54,0,.56);
streetReference.add(barrier);
for (const x of [-.34,.34]) box(.045,.55,.055,m.trim,barrier,x,1.17,0);
box(.88,.25,.07,new THREE.MeshBasicMaterial({color:'#211a36'}),barrier,0,1.45,0);
box(.88,.022,.074,new THREE.MeshBasicMaterial({color:'#b775ef'}),barrier,0,1.57,0);
signLettering('ROAD CLOSED',.80,.16,barrier,1.45,.042);
const showcaseRipples = [0,.5].map(offset => {
  const ripple = ring(.44,.012,new THREE.MeshBasicMaterial({
    color:'#b1f0ff',transparent:true,opacity:.6,depthWrite:false
  }),streetReference,0,1.12,0);
  return {ripple,offset};
});
car.visible = false;
rulerAssembly.visible = false;
const water=mesh(new THREE.PlaneGeometry(2.6,2.3,6,6),new THREE.MeshPhysicalMaterial({color:'#75cbdf',transparent:true,opacity:.4,metalness:.45,roughness:.15,side:THREE.DoubleSide,depthWrite:false}),flood,0,1.12,0);water.rotation.x=-Math.PI/2;
const scanner=box(2.65,.018,2.35,cyan,flood,0,1.16,0);scanner.material=new THREE.MeshBasicMaterial({color:'#8ff7ec',transparent:true,opacity:.13,depthWrite:false});
const detection=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(2,1.02,1.1)),new THREE.LineBasicMaterial({color:'#a6ffef'}));detection.position.set(0,1.35,0);flood.add(detection);
const waterline = box(2.6,.018,.025,new THREE.MeshBasicMaterial({color:'#d8f56a'}),flood,0,.9,1.15);
const depthReadout = label('42 CM · SIMULATED ESTIMATE',2.6,'#d8f56a');
depthReadout.position.set(.5,2.16,.65);
flood.add(depthReadout);
for (const object of [detection, scanner, water, waterline, depthReadout]) object.visible = false;
const floodWall=new THREE.Group();floodWall.position.set(-8.75,2.6,1.1);floodWall.rotation.y=Math.PI/2;room.add(floodWall);rounded(4.6,2.5,.14,.1,m.black,floodWall);for(let i=0;i<6;i++){box(3.4,.025,.03,m.blue,floodWall,0,-.7+i*.27,.12);const level=box(.12,.15+Math.sin(i)*.4+.7,.03,cyan,floodWall,-1.6+i*.65,-.2,.14);}
const floodLabel=sign('FLOOD DEPTH ESTIMATION',-6.2,3.9,1,4.4,'#b5e5ee');const floodSub=sign('ILLUSTRATIVE SCAN · NOT LIVE INFERENCE',-6.2,3.55,1,4.2,'#88b5c6',32);
hitbox(flood,'flood',3.2,3,3,0,1.5,0);
// Right alcove: human-centered interaction, not a clinical deployment.
const health=displayBase(6,-4,rose);health.rotation.y=-.8;
const terminal=new THREE.Group();terminal.position.y=1.9;health.add(terminal);rounded(2.2,1.65,.2,.15,m.white,terminal);rounded(1.94,1.4,.06,.11,m.black,terminal,0,0,.19).renderOrder=2;
const portalCanvas = document.createElement('canvas');
portalCanvas.width = 768;
portalCanvas.height = 520;
const portalContext = portalCanvas.getContext('2d');
const portalTexture = new THREE.CanvasTexture(portalCanvas);
portalTexture.colorSpace = THREE.SRGBColorSpace;
const portalScreen = mesh(new THREE.PlaneGeometry(1.81,1.23),new THREE.MeshBasicMaterial({map:portalTexture}),terminal,0,0,.25);
portalScreen.renderOrder = 3;
const portalMessages = [
  ['PATIENT', 'Can I book a checkup?', '#d8c5ff'],
  ['INTENT', 'Schedule appointment', '#b9d9ff'],
  ['PORTAL ACTION', 'Open appointment scheduler ↗', '#d8f56a'],
];
function drawPortal(age) {
  const ctx = portalContext;
  ctx.fillStyle = '#101527';
  ctx.fillRect(0,0,768,520);
  ctx.fillStyle = '#c6b7db';
  ctx.font = '600 28px sans-serif';
  ctx.fillText('CLARIHEALTH  /  FICTIONAL DEMO',36,54);
  portalMessages.forEach(([caption,message,color],index)=>{
    const progress = THREE.MathUtils.smoothstep(age,index * .7,index * .7 + .38);
    ctx.save();
    ctx.globalAlpha = progress;
    ctx.translate(index === 1 ? 70 : 36,85 + index * 136 + (1-progress) * 18);
    ctx.fillStyle = index === 2 ? '#263523' : '#242a43';
    ctx.beginPath();
    ctx.roundRect(0,0,650,112,18);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.font = '600 23px sans-serif';
    ctx.fillText(caption,22,34);
    ctx.font = '600 37px sans-serif';
    ctx.fillText(message,22,82);
    ctx.restore();
  });
  portalTexture.needsUpdate = true;
}
drawPortal(3);
let portalStarted = 0;
let lastPortalAge = 3;
box(.17,.6,.17,m.trim,health,0,.98,0);rounded(.95,.09,.65,.06,m.trim,health,0,.77,0);
const cross=new THREE.Group();cross.position.set(.95,3.1,.05);health.add(cross);box(.4,.12,.12,rose,cross);box(.12,.4,.12,rose,cross);
const healthLabel=sign('CLARIHEALTH AI',6,4.1,-4,4.3,'#f0c9e2');const healthSub=sign('TECHNOLOGY THAT MEETS PEOPLE WHERE THEY ARE',6,3.72,-4,4.6,'#c6a8c4',29);
hitbox(health,'health',3.2,3.5,3,0,1.6,0);
// Back alcove: a data sculpture, with a rotating helix and a window into the next question.
const bio=displayBase(0,-9.5,mint);const helix=new THREE.Group();helix.position.y=.9;bio.add(helix);let prev;
for(let i=0;i<19;i++){const t=i*.43,y=i*.12,a=new THREE.Vector3(Math.sin(t)*.56,y,Math.cos(t)*.56),b=new THREE.Vector3(-a.x,y,-a.z);sphere(.075,m.green,helix,a.x,a.y,a.z);sphere(.075,mint,helix,b.x,b.y,b.z);bond(a,b,.018,m.lavender,helix);if(prev){bond(prev[0],a,.026,m.green,helix);bond(prev[1],b,.026,mint,helix);}prev=[a,b];}
const bioHalo=ring(1.05,.018,mint,bio,0,1.9,0);bioHalo.rotation.z=.25;
const bioLabel=sign('LUMERA AI',0,4.3,-9.5,4.4,'#c4efd1');const bioSub=sign('WHAT POSSIBILITIES HIDE INSIDE BIOLOGICAL DATA?',0,3.94,-9.5,5,'#a7c9b4',29);hitbox(bio,'lumera',3,3.6,3,0,1.6,0);
// A rear observation window, star field, and the invitation beyond the exhibits.
const windowFrame=mesh(new THREE.TorusGeometry(2.65,.12,8,64),m.trim,room,0,3.1,-12);windowFrame.rotation.x=0;
const windowLight=mesh(new THREE.TorusGeometry(2.5,.025,6,64),violet,room,0,3.1,-11.96);windowLight.rotation.x=0;
const glass=mesh(new THREE.CircleGeometry(2.5,48),m.black,room,0,3.1,-11.99);
const starDots=[];for(let i=0;i<48;i++){const a=i*2.4,r=Math.sqrt((i+.5)/48)*2.28;const star=sphere(.012+(i%3)*.008,i%4===0?amber:cyan,room,Math.cos(a)*r,3.1+Math.sin(a)*r,-11.91);starDots.push(star);}
const moon=sphere(.55,m.lavender,room,.65,3.8,-11.82);moon.scale.z=.1;
// Real room details above, below, and at the edges, rather than a single floating object.
const mobileHanger=new THREE.Group();mobileHanger.position.set(0,5.6,-1.7);room.add(mobileHanger);for(let i=0;i<3;i++){const o=ring(.6+i*.32,.016,i===1?amber:violet,mobileHanger);o.rotation.set(i*.6,.3,i*.4);}bond(new THREE.Vector3(0,0,0),new THREE.Vector3(0,.8,0),.01,m.trim,mobileHanger);
for(const [x,z] of [[-6,8]]){box(2.1,.14,.85,m.warm,room,x,.86,z);for(const dx of [-.8,.8])box(.11,.8,.6,m.trim,room,x+dx,.4,z);}
const desk=new THREE.Group();desk.position.set(6,0,7);desk.rotation.y=-.45;room.add(desk);rounded(2.5,.12,1.1,.08,m.warm,desk,0,.96,0);for(const x of [-1,1])box(.1,.9,.9,m.trim,desk,x,.45,0);rounded(.9,.6,.05,.06,m.black,desk,-.35,1.35,-.2);for(let i=0;i<3;i++)box(.48,.025,.02,cyan,desk,-.4,1.5-i*.13,-.16);cylinder(.12,.28,m.white,desk,.68,1.16,.1);mesh(new THREE.TorusGeometry(.09,.02,6,12),m.white,desk,.82,1.16,.1);
for(let i=0;i<3;i++){const book=box(.45,.07,.6,i%2?m.lavender:m.blue,room,-6.5,.98+i*.075,8);book.rotation.y=.15*i;}
// A glass-fronted architectural gallery, with a softly lit city skyline beyond.
const glassMat=new THREE.MeshStandardMaterial({color:'#aecbdd',metalness:.25,roughness:.12,transparent:true,opacity:.075,depthWrite:false,side:THREE.DoubleSide});
const skylineTexture=new THREE.TextureLoader().load('./assets/skyline.webp');skylineTexture.colorSpace=THREE.SRGBColorSpace;skylineTexture.anisotropy=renderer.capabilities?.getMaxAnisotropy?.()||1;skylineTexture.minFilter=THREE.LinearFilter;skylineTexture.generateMipmaps=false;
const skylineMat=new THREE.MeshBasicMaterial({map:skylineTexture,color:'#ffffff',side:THREE.DoubleSide,fog:false});
const riverfrontBrightness=.48;
const riverfrontMat=skylineMat.clone();
riverfrontMat.color.setScalar(riverfrontBrightness);
function skylinePanel(w,h,x,y,z,rotation=0){const panel=mesh(new THREE.PlaneGeometry(w,h,18,8),skylineMat,room,x,y,z);panel.rotation.y=rotation;panel.castShadow=false;return panel;}
// Front windows sit beside the door, not in a different part of the room.
// Reference entrance: glass windows flank the centered original door.
const frontGlazing=new THREE.Group();room.add(frontGlazing);
// Both right-hand surfaces share a skyline image and meet at x=13, z=10.
const riverfrontCornerU=.73;
function cropRiverfront(panel,startU,endU){
  panel.material=riverfrontMat;
  const uv=panel.geometry.attributes.uv;
  for(let i=0;i<uv.count;i++){
    uv.setX(i,THREE.MathUtils.lerp(startU,endU,uv.getX(i)));
  }
}
for(const side of [-1,1]){
  const panel=side<0
    ? skylinePanel(5.4,6,-6.6,3.1,10.9)
    : skylinePanel(Math.hypot(9.1,.9),10,8.45,4,10.45,Math.atan2(.9,9.1));
  if(side>0)cropRiverfront(panel,.45,riverfrontCornerU);
  frontGlazing.add(panel);box(5.1,5.65,.035,glassMat,frontGlazing,side*6.6,3.1,12.35);for(const dx of [-2.55,0,2.55])box(.065,5.9,.10,m.trim,frontGlazing,side*6.6+dx,3.1,12.4);box(5.1,.055,.10,m.trim,frontGlazing,side*6.6,1.05,12.4);box(5.1,.025,.03,amber,frontGlazing,side*6.6,.3,12.48);}
// Keep the entrance skyline separate from the wide My Goals composition.
const terraceSkyline=[];
for(const side of [-1,1]){
  const panel=skylinePanel(18,10,side*13,4,19,side<0?Math.PI/2:-Math.PI/2);
  if(side>0)cropRiverfront(panel,riverfrontCornerU,1);
  terraceSkyline.push(panel);
  box(.035,5.5,12,glassMat,room,side*9.3,2.8,18);for(let z=13;z<=23;z+=3)box(.07,5.6,.07,m.trim,room,side*9.3,2.8,z);box(.055,.04,12,amber,room,side*9.25,.2,18);}
terraceSkyline.push(skylinePanel(28,10,0,4,29,Math.PI));
const goalsSkyline=skylinePanel(42,15,0,4,29,Math.PI);
goalsSkyline.visible=false;
box(18,5.5,.035,glassMat,room,0,2.8,25);for(let x=-9;x<=9;x+=3)box(.07,5.6,.07,m.trim,room,x,2.8,25);box(18,.04,.07,amber,room,0,.2,25);
// Full right-hand glazing gives visitors an actual city view inside the lab.
skylinePanel(30,10,14,4,-.5,-Math.PI/2);
for(let z=-10;z<=10;z+=2){box(.035,5.7,1.85,glassMat,room,8.77,3,z);box(.12,5.9,.07,m.trim,room,8.65,3,z-1);box(.04,.025,1.85,amber,room,8.6,5.82,z);box(.04,.025,1.85,amber,room,8.6,.25,z);box(.08,.08,1.9,m.trim,room,8.65,1.15,z);}
// Controlled warm architectural accents replace scattered decorative neon.
for(let z=-10;z<=10;z+=4){box(.12,2.4,.09,amber,room,-8.7,3.2,z);box(.28,2.6,.16,m.black,room,-8.8,3.2,z);const lamp=new THREE.PointLight('#ffd399',6,6,2);lamp.position.set(-7.8,3,z);scene.add(lamp);}
for(const x of [-3.52,3.52]){box(.07,5.9,.15,amber,room,x,2.95,12.55);}
const brass=material('#ad8b5a',.8,.28);
for(const side of [-1,1]){box(.12,5.85,.24,brass,room,side*3.74,2.95,12.4);box(.62,.95,.2,m.black,room,side*4.15,2.8,12.5);box(.16,.3,.03,amber,room,side*4.15,2.8,12.62);}
// Additional main exhibits selected from Hiral's actual GitHub repositories.
const codeLab=displayBase(-5.7,-7.8,violet);codeLab.rotation.y=.65;
rounded(2.45,1.65,.16,.12,m.black,codeLab,0,1.95,0);
const readmeCanvas = document.createElement('canvas');
readmeCanvas.width = 900;
readmeCanvas.height = 600;
const readmeContext = readmeCanvas.getContext('2d');
const readmeTexture = new THREE.CanvasTexture(readmeCanvas);
readmeTexture.colorSpace = THREE.SRGBColorSpace;
mesh(new THREE.PlaneGeometry(2.26,1.49),
  new THREE.MeshBasicMaterial({map:readmeTexture}),codeLab,0,1.95,.13);
const readmeSteps = [
  ['01 / SCAN PYTHON', 'parser.add_argument("--output")', '#cbb6ff'],
  ['02 / EXTRACT CLI OPTION', '--output  ·  cli.py:12', '#9ee8fa'],
  ['03 / WRITE README', '--output sets the output path.', '#d8f56a'],
];
function drawReadme(age) {
  const ctx = readmeContext;
  ctx.fillStyle = '#101527';
  ctx.fillRect(0,0,900,600);
  ctx.fillStyle = '#e8dfff';
  ctx.font = '600 33px sans-serif';
  ctx.fillText('README GENERATOR  /  ILLUSTRATIVE EXAMPLE',32,57);
  readmeSteps.forEach(([heading,line,color],index)=>{
    const progress = index === 0 ? 1 : THREE.MathUtils.smoothstep(age,index * .92,index * .92 + .42);
    const y = 85 + index * 158 + (1 - progress) * 16;
    ctx.save();
    ctx.globalAlpha = progress;
    ctx.fillStyle = '#22263e';
    ctx.fillRect(32,y,836,135);
    ctx.fillStyle = color;
    ctx.fillRect(32,y,6,135);
    ctx.font = '600 28px sans-serif';
    ctx.fillText(heading,58,y+40);
    ctx.font = '600 42px monospace';
    ctx.fillText(line,58,y+94,780);
    if (index === 2) {
      ctx.font = '24px monospace';
      ctx.fillText('SOURCE: cli.py:12',58,y+123);
    }
    ctx.restore();
  });
  if (age < 2.8) {
    const y = 84 + age / 2.8 * 475;
    const beam = ctx.createLinearGradient(0,y-34,0,y+3);
    beam.addColorStop(0,'#9ee8fa00');
    beam.addColorStop(1,'#9ee8fa55');
    ctx.fillStyle = beam;
    ctx.fillRect(32,y-34,836,37);
    ctx.fillStyle = '#b3f0ff';
    ctx.fillRect(32,y,836,2);
  }
  readmeTexture.needsUpdate = true;
}
drawReadme(3);
let readmeStarted = 0;
let lastReadmeAge = 3;
const codeTitle=label('CODE → FACTS → README',3.1,'#c7b0f4',36);codeTitle.position.set(0,3,.15);codeLab.add(codeTitle);hitbox(codeLab,'readme',3.1,3.5,2.6,0,1.5,0);
const boundaryLab=displayBase(5.7,-7.8,mint);boundaryLab.rotation.y=-.7;
box(2.65,.12,1.85,m.floor,boundaryLab,0,.85,0);
const fenceInk = new THREE.MeshBasicMaterial({color:'#78aaff'});
for (const x of [-.8,.52]) box(.022,.02,1.3,fenceInk,boundaryLab,x,.924,0);
for (const z of [-.65,.65]) box(1.32,.02,.022,fenceInk,boundaryLab,-.14,.924,z);
for (const x of [-.56,-.12]) {
  box(.32,.065,.22,m.warm,boundaryLab,x,1.13,-.45);
  for (const dx of [-.12,.12]) box(.035,.21,.035,m.trim,boundaryLab,x+dx,1.01,-.45);
}
const cameraHousing = new THREE.Group();
cameraHousing.position.set(-1.56,1.72,.12);
boundaryLab.add(cameraHousing);
box(.055,.76,.055,m.trim,boundaryLab,-1.56,1.27,.12);
cameraHousing.rotation.y = Math.PI/2;
rounded(.38,.20,.19,.04,m.trim,cameraHousing);
const lens = cylinder(.071,.07,m.blue,cameraHousing,0,0,.12);
lens.rotation.x = Math.PI/2;
sphere(.028,new THREE.MeshBasicMaterial({color:'#d8f56a'}),cameraHousing,.13,.04,.11);
const scanOrigin = new THREE.Vector3(-1.43,1.72,.12);
const scanTarget = new THREE.Vector3();
const scanAxis = new THREE.Vector3(0,1,0);
const scanBeam = mesh(new THREE.CylinderGeometry(.015,.29,1,18,1,true),
  new THREE.MeshBasicMaterial({color:'#8fc8ff',transparent:true,opacity:.17,depthWrite:false,side:THREE.DoubleSide}),
  boundaryLab);
scanBeam.castShadow = scanBeam.receiveShadow = false;
const boundaryMarker = new THREE.Group();
boundaryLab.add(boundaryMarker);
sphere(.095,m.white,boundaryMarker,0,.49,0);
rounded(.18,.24,.14,.04,m.lavender,boundaryMarker,0,.31,0);
const legs = [-.058,.058].map(x=>box(.055,.23,.06,m.white,boundaryMarker,x,.12,0));
const trackingFrame = new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxGeometry(.31,.64,.27)),
  new THREE.LineBasicMaterial({color:'#a9efd2'})
);
trackingFrame.position.y = .31;
boundaryMarker.add(trackingFrame);
const boundarySign=label('CLASSROOM CAMERA',3.6,'#b8e9d0',56);
boundarySign.position.set(0,2.83,0);
boundaryLab.add(boundarySign);
const boundaryAlert = label('EXIT DETECTED',3.7,'#ff515f',74);
boundaryAlert.position.set(0,2.65,.15);
boundaryAlert.visible = false;
boundaryLab.add(boundaryAlert);
hitbox(boundaryLab,'geofence',3.1,3,2.7,0,1.5,0);
function trackBoundary(x,z,inside,stride=0) {
  boundaryMarker.position.set(x,.92,z);
  legs[0].rotation.x = stride;
  legs[1].rotation.x = -stride;
  trackingFrame.material.color.set(inside ? '#a9efd2' : '#ff515f');
  boundaryAlert.visible = !inside;
}
const boundaryExperiment = $('#experiment-dialog');
window.addEventListener('boundary-position',e=>{
  trackBoundary((e.detail.x/480-.5)*2.3,(e.detail.y/280-.5)*1.8,e.detail.inside);
});
let boundaryStarted = 0;
// Gallery spotlights activate the destination. A separate overhead light follows the visitor.
const glowArt = document.createElement('canvas');
glowArt.width = glowArt.height = 128;
const glowContext = glowArt.getContext('2d');
const falloff = glowContext.createRadialGradient(64,64,3,64,64,64);
falloff.addColorStop(0,'#ffffff');
falloff.addColorStop(.45,'#ffffffb8');
falloff.addColorStop(1,'#ffffff00');
glowContext.fillStyle = falloff;
glowContext.fillRect(0,0,128,128);
const floorGlow = new THREE.CanvasTexture(glowArt);
const litExhibits=[flood,health,bio,codeLab,boundaryLab],galleryLights=[];
// Lumera keeps its original window. The other exhibits share a quieter circular stage.
const backdropThemes = [
  {rim:'#83dedf', outer:'#8e9cff', glow:'#24566b', pattern:'tide'},
  {rim:'#e8a8df', outer:'#a28bff', glow:'#502e60', pattern:'pulse'},
  null,
  {rim:'#ad9cff', outer:'#80cfff', glow:'#32346c', pattern:'matrix'},
  {rim:'#a9efd2', outer:'#9f8efa', glow:'#255348', pattern:'radar'},
];
const exhibitBackdrops = backdropThemes.map(theme => {
  if (!theme) return null;
  const backdrop = new THREE.Group();
  room.add(backdrop);
  backdrop.visible = false;

  const art = document.createElement('canvas');
  art.width = art.height = 512;
  const ctx = art.getContext('2d');
  const glow = ctx.createRadialGradient(256,248,12,256,256,256);
  glow.addColorStop(0,theme.glow);
  glow.addColorStop(1,'#14101e');
  ctx.fillStyle = glow;
  ctx.fillRect(0,0,512,512);
  for (let row = -8; row <= 8; row++) {
    for (let col = -8; col <= 8; col++) {
      const radius = Math.hypot(col,row);
      if (radius > 8.3) continue;
      const pulse = Math.abs(row - Math.round(2.6*Math.sin(col*1.1)));
      const highlighted = {
        tide: Math.abs(row - 2*Math.sin(col*.55)) < 1 || Math.abs(row+4) < .5,
        pulse: pulse === 0,
        matrix: (col + 8) % 3 === 0 && (row + col + 16) % 5 < 3,
        radar: Math.abs(radius - 4) < .45 || Math.abs(radius - 7) < .45,
      }[theme.pattern];
      ctx.globalAlpha = highlighted ? .85 : .23;
      ctx.fillStyle = highlighted ? theme.rim : theme.outer;
      ctx.beginPath();
      ctx.arc(256 + col*28,256 + row*28,highlighted ? 3.1 : 1.55,0,Math.PI*2);
      ctx.fill();
    }
  }
  const texture = new THREE.CanvasTexture(art);
  texture.colorSpace = THREE.SRGBColorSpace;
  mesh(new THREE.CircleGeometry(1.75,64),
    new THREE.MeshBasicMaterial({map:texture}),backdrop,0,0,-.035);
  mesh(new THREE.TorusGeometry(1.78,.022,8,64),
    new THREE.MeshBasicMaterial({color:theme.rim}),backdrop);
  mesh(new THREE.TorusGeometry(1.86,.009,6,64),
    new THREE.MeshBasicMaterial({color:theme.outer,transparent:true,opacity:.65}),backdrop);
  return backdrop;
});
for(let i=0;i<litExhibits.length;i++){const group=litExhibits[i],color=new THREE.Color('#d8c4ff');const spot=new THREE.SpotLight(color,0,12,.42,.7,1.4);spot.position.set(group.position.x,5.8,group.position.z+.2);const target=new THREE.Object3D();target.position.copy(group.position).add(new THREE.Vector3(0,1,0));scene.add(target);spot.target=target;scene.add(spot);const beam=mesh(new THREE.CylinderGeometry(.035,1.5,4.9,24,1,true),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.015,depthWrite:false,side:THREE.DoubleSide}),room,group.position.x,3.25,group.position.z);const pool = mesh(new THREE.PlaneGeometry(6.5,6.5),new THREE.MeshBasicMaterial({
  map:floorGlow,color:i===0?'#bfabff':'#c3a5ff',transparent:true,opacity:0,
  depthWrite:false,blending:THREE.AdditiveBlending
}),room,group.position.x,-.046,group.position.z);
pool.rotation.x = -Math.PI / 2;
galleryLights.push({spot,beam,pool});}
const visitorLight=new THREE.SpotLight('#e4d5ff',24,18,.7,.85,1.6);const visitorTarget=new THREE.Object3D();scene.add(visitorTarget);visitorLight.target=visitorTarget;scene.add(visitorLight);
// Move the complete original doorway, rather than offsetting only its camera.
const entranceDoorway=new THREE.Group();room.add(entranceDoorway);
for(const part of [...room.children]){if(part!==entranceDoorway&&part.position.z>=12&&part.position.z<=12.7&&Math.abs(part.position.x)<=4.5)entranceDoorway.add(part);}
entranceDoorway.scale.x=1;entranceDoorway.position.x=0;
const stops=[0,.12,.26,.40,.54,.68,.82,1];
const positions=[new THREE.Vector3(0,2.8,21),new THREE.Vector3(-1.2,2.4,8),new THREE.Vector3(-2.2,2.35,3.25),new THREE.Vector3(1.5,2.4,-.7),new THREE.Vector3(.15,2.7,-5.3),new THREE.Vector3(-1.8,2.4,-5),new THREE.Vector3(1.8,2.4,-4.8),new THREE.Vector3(0,3.15,-7.6)];
const targets=[new THREE.Vector3(0,2.8,12),new THREE.Vector3(3,2.4,2.5),new THREE.Vector3(-6.2,1.9,1),new THREE.Vector3(6,2.1,-4),new THREE.Vector3(0,2.5,-9.5),new THREE.Vector3(-5.7,2.05,-7.8),new THREE.Vector3(5.7,1.65,-7.8),new THREE.Vector3(.45,3.65,-12)];
const chapters=[
{eyebrow:'THE MUSEUM OF UNFINISHED QUESTIONS',title:'Hi, I’m Hiral Choksi.',description:'At UConn CIRCA, I built a computer vision pipeline to estimate flood depth from street photos and validated it in the field.',location:'00 / HELLO, I’M HIRAL',next:'Let’s go inside →'},
{eyebrow:'01 / YOUR LAB GUIDE',title:'Hi, I’m her robot.<br><em>Let me show you around.</em>',description:'Hiral built me to answer questions. She keeps finding new ones. Come explore what she’s been building—choose Next or a project from the menu.',location:'01 / MEET YOUR GUIDE',next:'Follow my robot →'},
{eyebrow:'02 / CIRCA · COMPUTER VISION',title:'Flood Depth<br><em>Estimation</em>',description:'See how a reference object and the waterline in a street photo can help estimate flood depth.',location:'02 / RISING WATERS',project:'flood',next:'Next: ClariHealth →'},
{eyebrow:'03 / CLARIHEALTH · ACCESSIBILITY',title:'ClariHealth<br><em>AI</em>',description:'A patient-portal prototype exploring conversational guidance and explicit accessibility preferences, with a proposed RAG/FHIR architecture.',location:'03 / CLARIHEALTH',project:'health',next:'Next: Lumera →'},
{eyebrow:'04 / LUMERA · HACKRARE DEMO',title:'Lumera<br><em>AI</em>',description:'A collaborative educational app bringing clinical-trial, drug-repurposing, and research information together. Its single-cell augmentation research page is conceptual.',location:'04 / LUMERA',project:'lumera',next:'Next: Grounded code →'},
{eyebrow:'05 / LLMS · PYTHON AST ANALYSIS',title:'Fact-Grounded<br><em>README Generator</em>',description:'Extract imports, definitions, and CLI options before asking an LLM to write a README. Includes recorded experiments and an LLM-only baseline.',location:'05 / GROUNDED CODE',project:'readme',next:'Next: Boundary lab →'},
{eyebrow:'06 / GEOFENCING · COMPUTER VISION',title:'Geofencing<br><em>AI</em>',description:'A school-safety prototype that uses YOLOv8 and OpenCV to flag when someone leaves a virtual classroom boundary. The exhibit illustrates an exit alert.',location:'06 / THE BOUNDARY LAB',project:'geofence',next:'The next question →'},
{eyebrow:'07 / THE NEXT QUESTION',title:'The next question<br>could be <em>yours.</em>',description:'Get to know me and the work behind the lab.',location:'07 / YOUR NEXT QUESTION',next:'About me ↓'}
];
let targetStation=0,progress=0,smoothed=0,current=-1,floodStarted=null,time=0,last=0,paused=reduced.matches,active=true,recruiter=false,drag=false,dragMoved=false,lastX=0,lastY=0,pointerStartY=0,pointerStartX=0,yaw=0,pitch=0,desiredYaw=0,desiredPitch=0,hover=-1;
const cameraTarget=new THREE.Vector3(),basePos=new THREE.Vector3(),baseTarget=new THREE.Vector3(),direction=new THREE.Vector3(),pointer=new THREE.Vector2(),raycaster=new THREE.Raycaster();
const floodStatus=$('#flood-controls');
const detailsButton=$('#room-exhibit');
const pedestalPoint=new THREE.Vector3();
const pedestalFront=new THREE.Vector3();
function readProgress(){const r=journey.getBoundingClientRect();active=r.bottom>0&&r.top<innerHeight;document.body.classList.toggle('room-journey-active',active&&!recruiter);}
window.addEventListener('scroll',readProgress,{passive:true});
function jump(index){targetStation=index;progress=stops[index];desiredYaw=0;desiredPitch=0;setChapter(index);journey.scrollIntoView({behavior:'instant',block:'start'});}
function setChapter(index){if(current===index)return;current=index;boundaryStarted=time;portalStarted=time;readmeStarted=paused ? time - 3 : time;floodStarted=null;floodStatus.textContent='';$('#flood-demo-trigger').hidden=index!==2;const c=chapters[index];$('#chapter-eyebrow').textContent=c.eyebrow;$('#chapter-title').innerHTML=c.title;$('#chapter-description').textContent=c.description;$('#room-location').textContent=c.location;$('#enter-lab').hidden=true;$('#room-exhibit').hidden=!c.project;$('#room-experiment').hidden=index!==6;$('#room-scroll-hint').hidden=index===7;$('#flood-controls').hidden=index!==2;$('#previous-room').disabled=index===0;frame.classList.toggle('room-chapter-project',index>1);frame.classList.toggle('welcome-active',index===0);document.querySelectorAll('[data-room-stop]').forEach((b,i)=>{b.classList.toggle('current',i===index);b.setAttribute('aria-pressed',String(i===index));});$('#next-room').textContent=c.next;$('#next-room').setAttribute('aria-label',c.next);$('#story-next').textContent=c.next;$('#story-next').hidden=true;$('#welcome-specialties').hidden=index!==0;$('.welcome-actions').hidden=index!==0;$('#room-caption').scrollTop=0;$('#open-goals').hidden=index!==0;if(index===0)$('#open-goals').textContent='My goals ↗';$('#door-enter').hidden=index!==0;$('.story-author b').textContent=index===1?'Your lab guide':'Hiral Choksi';$('.story-author small').textContent=index===1?'BUILT BY HIRAL · YOUR MUSEUM GUIDE':'DATA SCIENCE · MACHINE LEARNING · AI';$('.creator-mark').textContent=index===1?'✳':'HC';window.dispatchEvent(new CustomEvent('lab-chapter',{detail:index}));}
document.querySelectorAll('#room-frame button').forEach(button=>button.addEventListener('pointerdown',event=>{event.preventDefault();button.focus({preventScroll:true});}));
window.addEventListener('lab-goals-toggle',()=>{if(current!==0)jump(0);desiredYaw=Math.abs(desiredYaw)>Math.PI/2?0:Math.PI;desiredPitch=0;journey.scrollIntoView({behavior:'instant',block:'start'});});$('#enter-lab').onclick=()=>jump(1);$('#door-enter').onclick=()=>jump(1);let swipeOrigin=null;frame.addEventListener('pointerdown',e=>{if(current===0&&!e.target.closest('.room-caption,.room-controls,.room-map'))swipeOrigin={x:e.clientX,y:e.clientY};});frame.addEventListener('pointerup',e=>{if(current===0&&swipeOrigin&&Math.abs(e.clientX-swipeOrigin.x)>55&&Math.abs(e.clientX-swipeOrigin.x)>Math.abs(e.clientY-swipeOrigin.y)*1.3){drag=false;dragMoved=true;jump(1);}swipeOrigin=null;});frame.addEventListener('pointercancel',()=>swipeOrigin=null);let horizontalGesture=0;frame.addEventListener('wheel',e=>{if(current!==0||Math.abs(e.deltaX)<=Math.abs(e.deltaY)||Math.abs(e.deltaX)<2)return;e.preventDefault();horizontalGesture+=Math.abs(e.deltaX);if(horizontalGesture>65){horizontalGesture=0;jump(1);}},{passive:false});const advance=()=>current===7?$('#about').scrollIntoView({behavior:paused?'instant':'smooth'}):jump(Math.min(current+1,7));$('#next-room').onclick=advance;$('#story-next').onclick=advance;$('#previous-room').onclick=()=>jump(Math.max(0,current-1));$('#room-experiment').onclick=()=>window.dispatchEvent(new Event('open-boundary-experiment'));
const runFloodDemo = $('#flood-demo-trigger');
runFloodDemo.onclick = () => { floodStarted = paused || reduced.matches ? time - 3 : time; };
$('#room-exhibit').onclick=()=>{const id=chapters[current].project;if(id)window.showPortfolioProject(id,$('#room-exhibit'));};
document.querySelectorAll('[data-room-stop]').forEach(b=>b.onclick=()=>jump(Number(b.dataset.roomStop)));
document.querySelectorAll('[data-look]').forEach(b=>b.onclick=()=>{const d=b.dataset.look;if(current===0&&(d==='left'||d==='right')){journey.scrollIntoView({behavior:'instant',block:'start'});if(d==='right'){jump(1);}else{desiredYaw=Math.abs(desiredYaw)>Math.PI/2?0:Math.PI;desiredPitch=0;}return;}if(current>0&&(d==='left'||d==='right')){if(d==='right'){advance();}else{jump(Math.max(0,current-1));}return;}if(d==='reset'){desiredYaw=0;desiredPitch=0;}else if(d==='left')desiredYaw=desiredYaw+.45;else if(d==='right')desiredYaw=desiredYaw-.45;else if(d==='up')desiredPitch=THREE.MathUtils.clamp(desiredPitch+.3,-.8,.8);else desiredPitch=THREE.MathUtils.clamp(desiredPitch-.3,-.8,.8);});
window.addEventListener('keydown',e=>{if(!active||e.target===canvas||e.target.closest('input,select,textarea,dialog'))return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();document.querySelector('[data-look="'+(e.key==='ArrowLeft'?'left':'right')+'"]').click();}});function pointerCoords(e){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);}
canvas.addEventListener('pointerdown',e=>{drag=true;dragMoved=false;lastX=e.clientX;lastY=e.clientY;pointerStartY=e.clientY;pointerStartX=e.clientX;});
canvas.addEventListener('pointermove',e=>{pointerCoords(e);if(drag){if(current===0)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;if(Math.abs(dx)+Math.abs(dy)>3)dragMoved=true;desiredYaw=desiredYaw-dx*.004;if(e.pointerType==='mouse')desiredPitch=THREE.MathUtils.clamp(desiredPitch+dy*.003,-.8,.8);lastX=e.clientX;lastY=e.clientY;}else{raycaster.setFromCamera(pointer,camera);const h=raycaster.intersectObjects(pickables)[0];hover=h?h.object.userData.exhibit:-1;canvas.style.cursor=h?'pointer':'grab';}});
canvas.addEventListener('pointerup',e=>{if(current===0&&Math.abs(e.clientX-pointerStartX)>55&&Math.abs(e.clientX-pointerStartX)>Math.abs(e.clientY-pointerStartY)*1.3){drag=false;dragMoved=true;jump(1);return;}if(!dragMoved&&Math.abs(e.clientY-pointerStartY)<8){pointerCoords(e);raycaster.setFromCamera(pointer,camera);const h=raycaster.intersectObjects(pickables)[0];if(h){const id=h.object.userData.exhibit;if(id==='guide')$('#guide-toggle').click();else window.showPortfolioProject(id,canvas);}}drag=false;});canvas.addEventListener('pointerleave',()=>{drag=false;hover=-1;});canvas.addEventListener('pointercancel',()=>drag=false);
canvas.addEventListener('keydown',e=>{const map={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};if(map[e.key]){e.preventDefault();document.querySelector(`[data-look="${map[e.key]}"]`).click();}if(e.key==='Home'){e.preventDefault();document.querySelector('[data-look="reset"]').click();}if(e.key==='PageDown'){e.preventDefault();jump(Math.min(7,current+1));}if(e.key==='PageUp'){e.preventDefault();jump(Math.max(0,current-1));}});
window.addEventListener('lab-motion',e=>{paused=e.detail;});reduced.addEventListener('change',()=>{paused=reduced.matches;document.body.classList.toggle('paused',paused);$('#motion').textContent=paused?'Resume motion':'Pause motion';});
window.addEventListener('lab-recruiter',e=>{recruiter=e.detail;if(recruiter){document.body.classList.remove('room-journey-active');$('#museum').scrollIntoView({behavior:'instant'});}else{window.scrollTo({top:0,behavior:'instant'});resize();readProgress();}});
function interpolate(p,points,out){let i=0;while(i<stops.length-2&&p>stops[i+1])i++;let u=THREE.MathUtils.clamp((p-stops[i])/(stops[i+1]-stops[i]),0,1);u=u*u*(3-2*u);out.lerpVectors(points[i],points[i+1],u);}
function nearest(p){let best=0;for(let i=1;i<stops.length;i++)if(Math.abs(p-stops[i])<Math.abs(p-stops[best]))best=i;return best;}
function resize(){const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;const pixelRatio=Math.min(devicePixelRatio,mobile()?1.3:1.6,Math.sqrt(2500000/(r.width*r.height)));if(renderer.getPixelRatio?.()!==pixelRatio)renderer.setPixelRatio(pixelRatio);renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.fov=mobile()?84:64;camera.updateProjectionMatrix();readProgress();}
new ResizeObserver(resize).observe(frame);window.addEventListener('resize',resize);
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();$('#render-status').textContent='ROOM PAUSED · PORTFOLIO BELOW';$('#room-fallback').hidden=false;});canvas.addEventListener('webglcontextrestored',()=>{$('#room-fallback').hidden=true;resize();});
let counter=0,goalsView=false;
function animate(now){requestAnimationFrame(animate);const delta=Math.min((now-last)/1000,.08);last=now;if(!active||recruiter||document.hidden)return;counter++;if(mobile()&&counter%2)return;
const rate=1-Math.exp(-delta*(mobile()?2:1)*7);smoothed=paused?stops[nearest(progress)]:THREE.MathUtils.lerp(smoothed,progress,rate);yaw=THREE.MathUtils.lerp(yaw,desiredYaw,paused?1:rate);pitch=THREE.MathUtils.lerp(pitch,desiredPitch,paused?1:rate);
interpolate(smoothed,positions,basePos);interpolate(smoothed,targets,baseTarget);if(mobile())baseTarget.y-=.7;const orbitWeight=1-THREE.MathUtils.smoothstep(smoothed,.015,.08);if(orbitWeight>0){const frontWeight=1-THREE.MathUtils.smoothstep(Math.abs(Math.atan2(Math.sin(yaw),Math.cos(yaw))),0,.9);const orbitPosition=new THREE.Vector3(1.6-Math.sin(yaw)*4.3,2.2,17.2+Math.cos(yaw)*4.3).lerp(new THREE.Vector3(0,2.8,21),frontWeight);const orbitTarget=new THREE.Vector3(1.6,1.7,17.2).lerp(new THREE.Vector3(0,2.8,12),frontWeight);basePos.lerp(orbitPosition,orbitWeight);baseTarget.lerp(orbitTarget,orbitWeight);}if(targetStation!==0&&smoothed>0&&smoothed<.12){const u=smoothed/.12;const route=[new THREE.Vector3(0,2.8,21),new THREE.Vector3(0,2.8,15.5),new THREE.Vector3(0,2.4,10),positions[1]];const segment=Math.min(2,Math.floor(u*3));let t=u*3-segment;t=t*t*(3-2*t);basePos.lerpVectors(route[segment],route[segment+1],t);baseTarget.lerpVectors(targets[0],new THREE.Vector3(0,2.7,8),THREE.MathUtils.smoothstep(u,0,.4));if(u>.75)baseTarget.lerp(targets[1],(u-.75)/.25);}camera.position.copy(basePos);direction.subVectors(baseTarget,basePos);const distance=direction.length();direction.normalize().applyAxisAngle(new THREE.Vector3(0,1,0),yaw*(1-orbitWeight));direction.y=THREE.MathUtils.clamp(direction.y+pitch,-.85,.85);direction.normalize();cameraTarget.copy(basePos).addScaledVector(direction,distance);camera.lookAt(cameraTarget);
const chapter=targetStation;setChapter(chapter);const horizontal=new THREE.Vector3().subVectors(baseTarget,basePos);horizontal.y=0;horizontal.normalize();const guideRight=new THREE.Vector3(-horizontal.z,0,horizontal.x);const guideDestination=chapter<2?new THREE.Vector3(1.7,1.35,chapter===1?5.25:4.3):basePos.clone().addScaledVector(horizontal,4).addScaledVector(guideRight,1.7);bot.position.x=THREE.MathUtils.lerp(bot.position.x,guideDestination.x,paused?1:rate*.6);bot.position.z=THREE.MathUtils.lerp(bot.position.z,guideDestination.z,paused?1:rate*.6);bot.scale.setScalar(THREE.MathUtils.lerp(bot.scale.x,chapter<2?.65:.44,paused?1:rate));bot.rotation.y=Math.atan2(camera.position.x-bot.position.x,camera.position.z-bot.position.z);const doorOpen=THREE.MathUtils.smoothstep(smoothed,0,.09);doors[0].position.x=-1.72-doorOpen*3.35;doors[1].position.x=1.72+doorOpen*3.35;
if(!paused){time+=delta*(mobile()?2:1);bot.position.y=1.35+Math.sin(time*1.7)*.09;botHead.rotation.z=Math.sin(time*.8)*.025;botHead.rotation.y=THREE.MathUtils.clamp((camera.position.x-bot.position.x)*.06,-.35,.35);const blink=Math.pow(Math.max(0,Math.cos(time*1.2)),60);eyes.forEach(e=>e.scale.y=1-blink*.87);arms[0].rotation.z=.17+Math.sin(time*1.2)*.06;arms[1].rotation.z=chapter===1?-1.7+Math.sin(time*9)*.2:-.17;helix.rotation.y=time*.22;bioHalo.rotation.z=.25+Math.sin(time*.4)*.15;mobileHanger.rotation.y=time*.08;cross.rotation.z=Math.sin(time*.7)*.08;}
if (chapter === 3) {
  const age = paused || reduced.matches ? 3 : Math.min(3,time - portalStarted);
  if (age !== lastPortalAge) {
    drawPortal(age);
    lastPortalAge = age;
  }
}
if (chapter === 5) {
  const age = paused || reduced.matches ? 3 : (time - readmeStarted) % 7;
  if (age !== lastReadmeAge) {
    drawReadme(age);
    lastReadmeAge = age;
  }
}
if (chapter === 6 && !boundaryExperiment?.open) {
  const phase = paused || reduced.matches ? 4 : (time - boundaryStarted) % 7;
  const travel = THREE.MathUtils.smoothstep(phase,.55,3.5) - THREE.MathUtils.smoothstep(phase,5.1,6.8);
  const x = -.48 + travel*1.53;
  const walking = !paused && !reduced.matches && ((phase > .55 && phase < 3.5) || phase > 5.1);
  trackBoundary(x,.1,x <= .52,walking ? Math.sin(phase*13)*.5 : 0);
}
scanBeam.visible = chapter === 6;
if (scanBeam.visible) {
  const sweep = paused || reduced.matches ? 0 : Math.sin(time*1.9);
  scanTarget.set(.52,.94,sweep*.58);
  scanBeam.position.copy(scanOrigin).lerp(scanTarget,.5);
  scanTarget.copy(scanOrigin).sub(scanBeam.position);
  scanBeam.scale.y = scanTarget.length()*2;
  scanBeam.quaternion.setFromUnitVectors(scanAxis,scanTarget.normalize());
}
boundaryAlert.visible = chapter === 6 && boundaryAlert.visible;
const scanAge = floodStarted === null ? -1 : reduced.matches ? 3 : time - floodStarted;
const showingCar = floodStarted !== null;
car.visible = showingCar;
rulerAssembly.visible = showingCar;
streetReference.visible = !showingCar;
for (const {ripple,offset} of showcaseRipples) {
  const phase = paused || reduced.matches ? offset : (time*.36 + offset) % 1;
  ripple.scale.setScalar(.55 + phase*1.45);
  ripple.material.opacity = .65*(1-phase);
}
const scanning = scanAge >= 0 && scanAge < .9;
const measuring = scanAge >= .9;
const complete = scanAge >= 2.3;
const rise = THREE.MathUtils.smoothstep(scanAge, .9, 2.3);
detection.visible = scanning;
ruler.material.emissive.set(scanning ? '#d8f56a' : '#000000');
ruler.material.emissiveIntensity = .75;
scanner.visible = scanning;
scanner.position.y = THREE.MathUtils.lerp(.9, 1.87, THREE.MathUtils.clamp(scanAge / .9, 0, 1));
water.visible = !showingCar || measuring;
water.position.y = showingCar ? .89 + .42 * rise : 1.10;
water.material.opacity = showingCar ? .46 * rise : .33;
waterline.visible = measuring;
waterline.position.y = water.position.y + .014;
depthReadout.visible = chapter === 2 && complete;
const status = complete ? '42 cm · Simulated estimate' : measuring ? '02 / Trace the waterline' : scanning ? '01 / Locate the reference' : '';
if (floodStatus.textContent !== status) floodStatus.textContent = status;
// Nearby exhibits brighten as visitors approach; the room is never dependent on these effects.
entranceLights[2].intensity = 52 * THREE.MathUtils.smoothstep(smoothed, .02, .13);
const skylineLevel=1-THREE.MathUtils.smoothstep(smoothed,.08,.24)*.72;skylineMat.color.setScalar(skylineLevel);riverfrontMat.color.setScalar(riverfrontBrightness*skylineLevel);const artFade=1-THREE.MathUtils.smoothstep(smoothed,.005,.065);$('#welcome-art').style.opacity=String(artFade);const hostAngle=Math.abs(Math.atan2(Math.sin(yaw),Math.cos(yaw))),hostTurn=THREE.MathUtils.smoothstep(hostAngle,1.15,1.95),hostZ=THREE.MathUtils.lerp(15,17.2,hostTurn),hostSize=THREE.MathUtils.lerp(4.35,2.9,hostTurn);const hostBottom=new THREE.Vector3(1.6,0,hostZ).project(camera),hostTop=new THREE.Vector3(1.6,hostSize,hostZ).project(camera),rect=canvas.getBoundingClientRect(),hostHeight=Math.abs(hostBottom.y-hostTop.y)*rect.height/2,hostWidth=hostHeight*.7;const hostElement=$('#welcome-art');hostElement.style.left=`${(hostBottom.x+1)*rect.width/2-hostWidth/2}px`;hostElement.style.top=`${(1-hostTop.y)*rect.height/2}px`;hostElement.style.width=`${hostWidth}px`;hostElement.style.height=`${hostHeight}px`;hostElement.style.right='auto';hostElement.style.bottom='auto';hostElement.style.visibility=artFade===0||hostBottom.z>1||hostBottom.z< -1?'hidden':'visible';const orbitAngle=Math.atan2(Math.sin(yaw),Math.cos(yaw)),rearBlend=THREE.MathUtils.smoothstep(Math.abs(orbitAngle),1.15,1.95);$('#welcome-art img:first-child').style.opacity=String(1-rearBlend);$('#welcome-art .host-back').style.opacity=String(rearBlend);$('.lab-neon').style.opacity=String(1-rearBlend);const showGoals=chapter===0&&rearBlend>.7;$('#door-enter').hidden=chapter!==0||showGoals;if(chapter===0&&!showGoals){const center=new THREE.Vector3(1.72,3.1,12.35).project(camera),edgeA=new THREE.Vector3(.28,3.1,12.35).project(camera),edgeB=new THREE.Vector3(3.12,3.1,12.35).project(camera),doorButton=$('#door-enter'),buttonWidth=Math.max(135,Math.min(250,Math.abs(edgeB.x-edgeA.x)*rect.width/2*.83));doorButton.style.left=((center.x+1)*rect.width/2-buttonWidth/2)+'px';doorButton.style.top=((1-center.y)*rect.height/2-58)+'px';doorButton.style.width=buttonWidth+'px';doorButton.style.setProperty('--door-label-size',Math.max(16,Math.min(27,(buttonWidth-45)/6.6))+'px');}goalsSkyline.visible=showGoals;for(const panel of terraceSkyline)panel.visible=!showGoals;if(showGoals!==goalsView){window.dispatchEvent(new Event('lab-goals'));goalsView=showGoals;frame.classList.toggle('goals-view',showGoals);if(chapter===0){$('#chapter-eyebrow').textContent=showGoals?'LOOKING TOWARD THE NEXT QUESTION':chapters[0].eyebrow;$('#chapter-title').innerHTML=showGoals?'My goals.<br><em>Build what matters.</em>':chapters[0].title;$('#chapter-description').textContent=showGoals?'I’m working toward reliable AI and machine-learning systems for meaningful real-world problems. Computer vision, applied AI, and research-driven engineering are where I want to keep growing.':chapters[0].description;$('#open-goals').textContent=showGoals?'Read more about my goals ↗':'My goals ↗';}}for(const label of [floodLabel,floodSub,healthLabel,healthSub,bioLabel,bioSub])label.visible=false;if(chapter===2){floodLabel.visible=true;floodSub.visible=false;}if(chapter===3){healthLabel.visible=true;healthSub.visible=false;}if(chapter===4){bioLabel.visible=true;bioSub.visible=false;}codeTitle.visible=chapter===5;boundarySign.visible=chapter===6;for(let i=0;i<galleryLights.length;i++){const enabled=chapter===i+2;const arrived = enabled && Math.abs(smoothed - stops[chapter]) < .018 && bot.position.distanceTo(guideDestination) < .45;
const light = galleryLights[i];
const backdrop = exhibitBackdrops[i];
if (backdrop) {
  backdrop.visible = enabled;
  if (enabled) {
    const center = litExhibits[i].position;
    const heading = Math.atan2(basePos.x - center.x,basePos.z - center.z);
    backdrop.position.set(center.x - Math.sin(heading)*1.4,2.42,center.z - Math.cos(heading)*1.4);
    backdrop.rotation.y = heading;
  }
}
if (chapter === 4) {
  light.spot.color.set('#ffd28b');
  light.beam.material.color.set('#ffd28b');
  light.spot.intensity = enabled ? 38 : 2;
  light.beam.material.opacity = enabled ? .055 : .008;
  light.pool.material.opacity = 0;
  continue;
}
light.spot.color.set(backdropThemes[i]?.rim || '#d8c4ff');
light.beam.material.color.set('#d8c4ff');
const blend = paused || reduced.matches ? 1 : 1 - Math.exp(-delta * 7);
light.spot.intensity = THREE.MathUtils.lerp(light.spot.intensity, arrived ? 105 : enabled ? 30 : 2, blend);
light.pool.material.opacity = THREE.MathUtils.lerp(light.pool.material.opacity, arrived ? .34 : enabled ? .12 : 0, blend);
light.beam.material.opacity = THREE.MathUtils.lerp(light.beam.material.opacity, arrived ? .064 : enabled ? .032 : .008, blend);}visitorLight.color.set(chapter === 4 ? '#ffd28b' : '#e4d5ff');visitorLight.position.copy(bot.position).add(new THREE.Vector3(0,3.8,1));visitorTarget.position.copy(bot.position);visitorTarget.position.y=.4;
for(const [group,mat] of [[flood,cyan],[health,rose],[bio,mint]]){const d=camera.position.distanceTo(group.position);mat.emissiveIntensity=.7+THREE.MathUtils.clamp(1-d/9,0,1)*1.2;}
const pedestal = litExhibits[chapter - 2];
if (pedestal) {
  pedestal.getWorldPosition(pedestalPoint);
  pedestalFront.subVectors(camera.position, pedestalPoint);
  pedestalFront.y = 0;
  pedestalPoint.addScaledVector(pedestalFront.normalize(), 1.48);
  pedestalPoint.y += .39;
  pedestalPoint.project(camera);
  const visible = pedestalPoint.z >= -1 && pedestalPoint.z <= 1 && Math.abs(pedestalPoint.x) < 1;
  detailsButton.style.setProperty('--pedestal-x', visible ? `${(1 + pedestalPoint.x) * 50}%` : '50%');
  detailsButton.style.setProperty('--pedestal-y', visible ? `${(1 - pedestalPoint.y) * 50}%` : '76%');
}
$('#room-progress-fill').style.width=`${progress*100}%`;$('.room-progress').setAttribute('aria-valuenow',String(Math.round(progress*100)));
renderer.render(scene,camera);
frame.classList.replace('room-opening','room-ready');
}
resize();readProgress();setChapter(0);camera.position.copy(positions[0]);camera.lookAt(targets[0]);renderer.render(scene,camera);requestAnimationFrame(animate);
$('#render-status').textContent='EXHIBITION OPEN · TAKE YOUR TIME';document.body.classList.toggle('paused',paused);$('#motion').textContent=paused?'Resume motion':'Pause motion';
}
