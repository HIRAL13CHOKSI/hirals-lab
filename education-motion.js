import * as THREE from './vendor/three.module.min.js';

(() => {
  const panel = document.querySelector('.education-panel');
  if (!panel) return;

  const experience = panel.closest('#experience');
  const launch = panel.querySelector('.education-launch');
  const rocket = panel.querySelector('#education-rocket');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const flightDuration = 3450;
  let scene;
  let frame;
  let model;

  function createRocketModel() {
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
    } catch {
      return null;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(200, 360, false);
    renderer.domElement.className = 'rocket-model';
    const stage = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, 200/360, .1, 30);
    camera.position.set(2.1, 1.2, 8.8);
    camera.lookAt(0, 0, 0);
    stage.add(new THREE.HemisphereLight(0xf8eeff, 0x4d3a64, 2.1));
    const key = new THREE.DirectionalLight(0xfff2dc, 3);
    key.position.set(-3, 4, 5);
    stage.add(key);
    const rim = new THREE.DirectionalLight(0xb487ff, 2.4);
    rim.position.set(3, 1, -4);
    stage.add(rim);

    const body = new THREE.Group();
    stage.add(body);
    const enamel = new THREE.MeshStandardMaterial({color:0xe8e2f0, metalness:.25, roughness:.29});
    const violet = new THREE.MeshStandardMaterial({color:0x8050af, metalness:.38, roughness:.31});
    const metal = new THREE.MeshStandardMaterial({color:0x433a52, metalness:.72, roughness:.32});
    const glass = new THREE.MeshStandardMaterial({color:0x262040, metalness:.5, roughness:.15});
    const fire = new THREE.MeshBasicMaterial({color:0xffbe81, transparent:true, opacity:.85});

    function add(geometry, material, y) {
      const mesh = new THREE.Mesh(geometry,material);
      mesh.position.y = y;
      body.add(mesh);
      return mesh;
    }
    const profile = [[0,-1.22],[.31,-1.22],[.42,-1.06],[.45,-.75],[.45,.65],[.44,.85],[.39,1.08],[.31,1.31],[.20,1.52],[.09,1.68],[0,1.78]];
    add(new THREE.LatheGeometry(profile.map(([x,y])=>new THREE.Vector2(x,y)),48),enamel,0);
    add(new THREE.CylinderGeometry(.457,.457,.085,48),violet,-.66);
    add(new THREE.CylinderGeometry(.448,.453,.05,48),metal,.66);
    add(new THREE.CylinderGeometry(.25,.35,.26,40,1,true),metal,-1.28);
    const flame = add(new THREE.ConeGeometry(.21,.65,28),fire,-1.68);
    flame.rotation.z = Math.PI;
    const windowRim = add(new THREE.TorusGeometry(.139,.028,12,32),metal,.45);
    windowRim.position.z = .432;
    const windowGlass = add(new THREE.SphereGeometry(.133,24,16),glass,.45);
    windowGlass.position.z = .44;
    windowGlass.scale.z = .25;
    const finShape = new THREE.Shape();
    finShape.moveTo(.32,-.52);
    finShape.quadraticCurveTo(.57,-.78,.76,-1.25);
    finShape.lineTo(.4,-1.16);
    finShape.closePath();
    const fin = new THREE.ExtrudeGeometry(finShape,{depth:.045,bevelSize:.022,bevelThickness:.022,bevelSegments:2});
    for (let index=0; index<3; index++) {
      add(fin,violet,0).rotation.y = index*2*Math.PI/3;
    }

    return {
      element:renderer.domElement,
      draw(progress,elapsed) {
        body.rotation.y = -.25+progress*1.4;
        flame.scale.y = .85+Math.sin(elapsed*.035)*.15;
        renderer.render(stage,camera);
      },
      dispose() {
        const geometries = new Set();
        stage.traverse(object=>{ if (object.isMesh) geometries.add(object.geometry); });
        geometries.forEach(geometry=>geometry.dispose());
        [enamel,violet,metal,glass,fire].forEach(material=>material.dispose());
        renderer.dispose();
        renderer.forceContextLoss();
      }
    };
  }

  function clearLaunch() {
    cancelAnimationFrame(frame);
    scene?.remove();
    model?.dispose();
    model = undefined;
    scene = undefined;
    experience.classList.remove('education-launching');
  }

  function animate() {
    clearLaunch();
    if (reducedMotion.matches || document.body.classList.contains('paused')) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    const plume = document.createElement('canvas');
    plume.width = plume.height = 128;
    const paint = plume.getContext('2d');
    for (const [x,y,radius] of [[57,64,43],[78,66,39],[64,43,35],[43,77,27]]) {
      const cloud = paint.createRadialGradient(x,y,0,x,y,radius);
      cloud.addColorStop(0,'#e5d4f9ad');
      cloud.addColorStop(.45,'#b999d793');
      cloud.addColorStop(1,'#9b76c300');
      paint.fillStyle = cloud;
      paint.fillRect(x-radius,y-radius,radius*2,radius*2);
    }

    scene = document.createElement('div');
    scene.className = 'rocket-launch-scene';
    scene.setAttribute('aria-hidden','true');
    model = createRocketModel();
    canvas.className = 'rocket-smoke-canvas';
    scene.append(canvas,model ? model.element : rocket.content.cloneNode(true));
    const ship = scene.lastElementChild;
    document.body.append(scene);
    experience.classList.add('education-launching');

    const width = scene.clientWidth;
    const height = scene.clientHeight;
    const density = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * density;
    canvas.height = height * density;
    context.scale(density,density);
    const started = performance.now();
    const puffs = [];
    let lastEmission = -60;

    const centerX = width*.5;
    const flightHeight = height*.48-Math.min(width*.27,height*.23);

    function flightAt(elapsed) {
      if (elapsed < 1150) {
        const fraction = elapsed/1150;
        return {x:-140+(centerX+140)*fraction,y:flightHeight,heading:Math.PI/2};
      }
      const fraction = (elapsed-1150)/(flightDuration-1150);
      return {x:centerX+(width+180-centerX)*fraction,y:flightHeight,heading:Math.PI/2};
    }

    function draw(now) {
      const elapsed = now-started;
      if (elapsed >= flightDuration || document.body.classList.contains('paused')) {
        clearLaunch();
        return;
      }

      const progress = elapsed/flightDuration;
      const {x,y,heading} = flightAt(elapsed);
      const scale = 1-.24*progress;
      ship.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-74%) rotate(${heading}rad) scale(${scale})`;
      ship.style.opacity = String(Math.min(1,elapsed/550,(flightDuration-elapsed)/420));

      if (elapsed-lastEmission >= 50 && elapsed < 2480) {
        lastEmission = elapsed;
        puffs.push({
          born:elapsed, x:x-18*Math.sin(heading), y:y+18*Math.cos(heading), drift:18+Math.random()*32,
          size:54+Math.random()*34, sparkle:(Math.random()-.5)*70
        });
      }

      context.clearRect(0,0,width,height);
      for (const puff of puffs) {
        const age = (elapsed-puff.born)/1700;
        if (age >= 1) continue;
        const size = puff.size*(.45+age*2.8);
        context.globalAlpha = Math.min(1,age*8)*(1-age)**2*.72;
        context.drawImage(plume,puff.x-size/2-puff.drift*age,puff.y-size/2+70*age,size,size);
        const starX = puff.x - puff.drift*age*2;
        const starY = puff.y + puff.sparkle*(.25+age);
        const starSize = 1+Math.abs(puff.sparkle)*.045;
        context.globalAlpha = (1-age)*(.45+.35*Math.sin(elapsed*.018+puff.born));
        context.fillStyle = Math.abs(puff.sparkle)>20 ? '#d8f56a' : '#efddff';
        context.beginPath();
        context.moveTo(starX,starY-starSize*1.6);
        context.lineTo(starX+starSize*.44,starY);
        context.lineTo(starX,starY+starSize*1.6);
        context.lineTo(starX-starSize*.44,starY);
        context.closePath();
        context.fill();
      }
      model?.draw(progress,elapsed);
      frame = requestAnimationFrame(draw);
    }

    frame = requestAnimationFrame(draw);
  }

  launch.addEventListener('click', animate);
  reducedMotion.addEventListener('change', clearLaunch);
  window.addEventListener('resize', clearLaunch);
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    animate();
  }, { threshold:.35 });
  observer.observe(panel);
})();
