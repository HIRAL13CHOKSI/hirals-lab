// Refreshed from public READMEs and selected implementation/evaluation files, October 29, 2026.
// No remote HTML is executed, and no unavailable live demos are advertised.
const catalog=[
{id:'flood',name:'MyCoast flood-photo analysis',domain:'vision',kind:'CIRCA · RESEARCH PROTOTYPE',repo:'mycoast-flood-photo-analysis',question:'Can a photograph tell us how deep floodwater is?',summary:'Computer vision, physical references, environmental context, and uncertainty in a Python/Gradio research interface.',tech:'Python · Computer vision · NOAA context · Gradio',scope:'Independently developed within collaborative CIRCA research. The public repository is a showcase; research code and private data are not included.'},
{id:'health',name:'ClariHealth AI',domain:'ai',kind:'UCONN · CAPSTONE PROTOTYPE',repo:'adaptive-healthcare-chatbot',question:'What if patient portals understood how people ask for help?',summary:'Conversational navigation and explicit accessibility preferences, informed by small-sample user research.',tech:'Human-centered AI · Accessibility · Proposed RAG/FHIR architecture',scope:'Limited-scope MVP and proposed architecture. Live Epic integration, clinical deployment, and independently verified compliance are not established.'},
{id:'lumera',name:'Lumera AI',domain:'ai',kind:'HACKRARE 2026 · COLLABORATIVE DEMO',repo:'lumera-rare-disease-ai',question:'Could rare-disease evidence be easier to explore?',summary:'An educational app bringing clinical trials, drug-repurposing information, and research evidence together.',tech:'Next.js · React · Node.js · Express · AI APIs',scope:'A collaborative hackathon prototype, not a medical device or validated clinical decision system. The scRNA-seq augmentation research page is conceptual.',detail:[['The question','Rare-disease information is scattered across trial registries, drug labels, and publications. Lumera explores bringing that evidence into one interface.'],['Documented design','The README describes a Next.js/React frontend and Node.js/Express backend connecting ClinicalTrials.gov, OpenFDA, PubMed, and AI services. Trial, drug, and research views organize the results.'],['Contribution and limits','Hiral collaborated on this hackathon demo. The repository documents curated evidence services and demonstration data. Its single-cell augmentation interface is conceptual; it is not evidence of biological findings, clinical validation, or proven trial eligibility.'],['What comes next','Separate curated demonstration content from retrieved evidence, verify source provenance, and evaluate retrieval and explanations before expanding the scope.']]},
{id:'readme',name:'Fact-grounded README generation',domain:'ai',kind:'CSE 5095 · INDEPENDENT PROJECT',repo:'-readme-gen-ai',question:'Can documentation stay grounded in the code?',summary:'Python AST facts guide LLM-generated documentation, with recorded evaluations and an LLM-only baseline.',tech:'Python · AST · LLM APIs · CLI · Evaluation',scope:'Script-level documentation generation. Recorded evaluation results have a limited sample and generated documentation still requires human review.',detail:[['What Hiral built','An independently designed academic project extracting imports, docstrings, definitions, argparse options, environment-variable references, and nearby metadata from Python scripts.'],['Architecture','Python script → AST analysis and metadata → structured facts → prompt builder → provider adapter → generated Markdown. Separate runners compare grounded generation with an LLM-only baseline.'],['Engineering decisions','Analyze rather than execute input scripts by default, keep provider calls behind a shared interface, and preserve evaluation outputs and error records. Help probing is optional and only suitable for trusted inputs.'],['Evaluation and limits','The repository includes recorded experiment summaries and a final report. Historical metrics do not establish universal accuracy. The current replacement LLM-only baseline is distinguished from historical artifacts and still needs fresh live benchmarking.']]},
{id:'geofence',name:'Geofencing AI',domain:'vision',kind:'AI CLUB & VOXEL51 · HACKATHON PROTOTYPE',repo:'Geofencing-AI',question:'When does a crossing become a signal?',summary:'A classroom-safety prototype that uses YOLOv8 to detect people and flag exits from a virtual boundary.',tech:'Python · YOLOv8 · OpenCV · NumPy',scope:'Hiral independently developed the prototype code; teammates contributed presentation and other hackathon work. No measured accuracy, alert-rate, or real-time benchmark is established.',detail:[['What Hiral personally built','The person-detection, boundary-checking, and visual-alert workflow for a video-monitoring prototype. Other team members contributed to the presentation and other hackathon work.'],['Architecture','Video frame → YOLOv8 person detection → boundary check → annotated frame and alert, using Python, OpenCV, and NumPy.'],['Evidence and limits','The repository includes a notebook, presentation, and sample annotated output. It does not establish a measured accuracy, false-alert rate, or real-time performance benchmark. It is not a standalone safety system.'],['Try the idea','The portfolio boundary experiment is a deterministic geometry simulation. It isolates point-in-polygon logic without claiming to run the original detector.']]},
{id:'tobacco',name:'Tobacco tax & consumption analytics',domain:'data',kind:'CSE 5520 · INDEPENDENT PROJECT',repo:'tobacco-tax-consumption-analysis',question:'How do policy and consumption patterns vary across places and time?',summary:'A Dash dashboard exploring tax and consumption patterns across 50 states and DC, 1990–2019.',tech:'Python · pandas · Plotly · Dash · scikit-learn',scope:'Descriptive associations and geographic comparisons, not proof of causal policy effects. The original source spans 1970–2019; the dashboard selects 1990–2019.',detail:[['What Hiral built','An independently completed visual analytics project connecting longitudinal tobacco-tax data to an interactive research dashboard and course report.'],['Methods','Data reshaping, geographic and time-series visualizations, comparisons across jurisdictions, and K-means clustering. The repository documents the dashboard implementation and its source-data requirements.'],['Limits','Pack sales per capita are a consumption proxy. Unweighted jurisdiction means are not population-weighted national estimates. Descriptive trends are not causal effects; original clustering inputs are unscaled.']]},
{id:'tides',name:'Coastal high-tide prediction & validation',domain:'data',kind:'CIRCA · TIME-SERIES & GEOSPATIAL RESEARCH',repo:'connecticut-high-tide-detection',question:'Which high-water events should a field team investigate?',summary:'A zone-aware event-selection and mapping workflow linking 16 monitoring sites to four tidal zones.',tech:'Python · Time series · Statistical validation · Geospatial mapping',scope:'Independent analysis within CIRCA. Comparison is against NOAA predictions, not observed street flooding. The analysis used 2015–2025 data at 10-minute intervals and generated predictions for 2025–2028. Across two evaluated zones, mean absolute timing differences against NOAA predictions were approximately 4–7 minutes.'},
{id:'airbnb',name:'NYC Airbnb price prediction',domain:'data',kind:'UCONN · COURSE ASSIGNMENT',repo:'nyc-airbnb-price-prediction',question:'What can listing features tell us about price?',summary:'Preprocessing, regression comparisons, cross-validation, and held-out error analysis on 2019 listing data.',tech:'Python · pandas · scikit-learn · Random forest',scope:'Saved results have not been independently reproduced. The notebook fits preprocessing before cross-validation, so CV results may be optimistic.'},
{id:'caption',name:'Automated image description',domain:'vision',kind:'COLLABORATIVE PROJECT',repo:'AUTOMATED-IMAGE-DESCRYPTION',question:'Can an image be translated into a useful description?',summary:'A team image-captioning application with repository examples, model architecture, and local application instructions.',tech:'Python · Image captioning · Flask · TensorFlow Lite',scope:'Hiral contributed as part of the credited team. An old live-demo URL is not presented as a verified working service.'},
{id:'music',name:'Mood-aware music recommendation',domain:'ai',kind:'MICROSOFT HACK NIGHT · TEAM PROTOTYPE',repo:'MICROSOFT-HACKATHON-',question:'What does “sad, but something uplifting” sound like?',summary:'A collaborative prototype connecting mood prompts, semantic retrieval, LLM inference, and Spotify tracks.',tech:'Weaviate · FriendliAI · Opik · FastAPI · Streamlit',scope:'A team hackathon prototype described in its README. No recommendation-quality or production-performance benchmark is claimed.'},
{id:'plant',name:'Plant AI',domain:'vision',kind:'INDUS UNIVERSITY · TEAM PROJECT',repo:'plant-ai-disease-detection',question:'Can a leaf image help screen for disease?',summary:'A MobileNet transfer-learning workflow and web interface for healthy and diseased leaf images.',tech:'Python · TensorFlow · MobileNet · React',scope:'Repository documents the poster and project overview. Dataset, split, and evaluation procedure are not specified; no reported accuracy is treated as a reproduced benchmark.'},
{id:'ocular',name:'Early ocular disease detection',domain:'vision',kind:'INDUS UNIVERSITY · RESEARCH PROJECT',repo:'ocular-disease-detection',question:'Can medical-image features support early disease research?',summary:'A VGG-16 classification project involving dataset curation and model iteration.',tech:'Python · VGG-16 · Deep learning · Medical imaging',scope:'Source code and evaluation artifacts are not included in the public overview. No clinical diagnostic capability is established.'}
];
catalog.push(...projectUpdates.additions);for(const p of catalog)Object.assign(p,projectUpdates.updates[p.id]||{});
const editorial = {"lumera": {"name": "Lumera · Rare disease evidence explorer", "question": "How can researchers find relevant trials, drugs, and literature in one place?"}, "readme": {"name": "README from Code · Grounded documentation", "question": "Can a README stay accurate when the model has to cite the code?"}, "geofence": {"name": "Boundary Watch · Video geofencing", "question": "Can a camera flag when someone crosses a defined boundary?"}, "tobacco": {"name": "Tobacco Trends · Policy analytics", "question": "How do tobacco taxes and consumption patterns differ across states and years?"}, "flood": {"name": "MyCoast · Flood depth from photos", "question": "Can one street photo estimate flood depth against field measurements?"}, "health": {"name": "ClariHealth AI · Patient portal assistant", "question": "Can conversational navigation make routine patient portal tasks easier?"}};
for (const project of catalog) Object.assign(project, editorial[project.id]);
const safe=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const p of catalog){const base=`https://github.com/HIRAL13CHOKSI/${p.repo}`,evidence=base+'/blob/main/README.md';projects[p.id]=`<p class="eyebrow">${safe(p.kind)}</p><h2>${safe(p.name)}</h2><h3 class="project-question">${safe(p.question)}</h3><p class="project-lede">${safe(p.summary)}</p><p class="project-tech">${safe(p.tech)}</p>`;
if(p.workflow)projects[p.id]+=`<ol class="project-workflow" aria-label="Technical workflow">${p.workflow.map(step=>`<li>${safe(step)}</li>`).join('')}</ol>`;
if(p.images?.length){const [image,caption]=p.images[0];projects[p.id]+=`<figure class="project-evidence"><img src="assets/projects/${safe(image)}.webp" alt="${safe(caption)}"><figcaption>${safe(caption)}</figcaption></figure>`;}
projects[p.id]+=(p.detail||[['Approach and tools',p.tech],['Scope and evidence',p.scope]]).map(([title,body])=>`<h3>${safe(title)}</h3><p>${safe(body)}</p>`).join('');
if(p.images?.length>1)for(const [image,caption] of p.images.slice(1))projects[p.id]+=`<figure class="project-evidence"><img loading="lazy" src="assets/projects/${safe(image)}.webp" alt="${safe(caption)}"><figcaption>${safe(caption)}</figcaption></figure>`;
projects[p.id]+=`<aside class="project-limit"><b>Scope & limitations</b><p>${safe(p.scope)}</p></aside><h3>Explore the evidence</h3><div class="project-source-links"><a href="${evidence}" target="_blank" rel="noreferrer">Project README ↗</a>`;
for(const [title,path] of p.links||[])projects[p.id]+=`<a href="${base}/blob/main/${path.split('/').map(encodeURIComponent).join('/')}" target="_blank" rel="noreferrer">${safe(title)} ↗</a>`;
projects[p.id]+=`</div><p class="evidence-review">Source review: October 29, 2026 · Repository materials and selected files; models were not rerun.</p>`;}
window.showPortfolioProject=(id,origin=document.activeElement)=>{if(!projects[id] || !origin?.closest('#room-frame'))return;lastProject=origin;const detail=document.querySelector('#project-detail');detail.innerHTML=projects[id];const heading=detail.querySelector('h2');document.querySelector('#project-panel-title').textContent=catalog.find(project=>project.id===id)?.name||heading.textContent;heading.remove();if(id==='geofence'){detail.insertAdjacentHTML('afterbegin','<figure class="geofence-evidence"><img src="assets/geofence-readme.jpg" alt="Sample video output with a blue geofence, a detected person, and an outside-boundary alert"><figcaption>Sample prototype output from the GitHub README</figcaption></figure><figure class="geofence-evidence"><img src="assets/geofence-classroom.png" alt="Classroom camera frame with a blue rectangular geofence and an exit alert"><figcaption>Classroom camera view with the geofence drawn over the video</figcaption></figure>');}detail.scrollTop=0;document.querySelector('#project-dialog').showModal();};
const collection=document.querySelector('#project-collection');for(const p of catalog){const button=document.createElement('article');button.className='collection-card';button.dataset.project=p.id;button.dataset.collectionDomain=p.domain;button.innerHTML=`<small>${safe(p.kind)}</small><h3>${safe(p.name)}</h3><p>${safe(p.summary)}</p>`;collection.append(button);}
document.querySelectorAll('[data-collection]').forEach(button=>button.onclick=()=>{document.querySelectorAll('[data-collection]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-collection-domain]').forEach(card=>card.hidden=button.dataset.collection!=='all'&&card.dataset.collectionDomain!==button.dataset.collection);});
const bio=document.querySelector('.exhibit.bio');bio.querySelector('h3').textContent='Could rare-disease evidence be easier to explore?';bio.querySelector('.eyebrow').textContent='APPLIED AI · COLLABORATIVE HACKATHON DEMO';bio.querySelector('.card-content>p:not(.eyebrow)').textContent='Clinical trials, drug-repurposing information, and research context.';
// Existing room event resolves to original or collection buttons; ensure every main exhibit has one.
for(const [id,index,domain,glyph] of [['readme','004','ai','{ }'],['geofence','005','vision','⌘'],['tobacco','006','research','↗']]){const p=catalog.find(p=>p.id===id),button=document.createElement('article');button.className='exhibit supplemental';button.dataset.domain=domain;button.dataset.project=id;button.innerHTML=`<div class="art supplemental-art ${id}-art"><span class="index">EXHIBIT ${index}</span><span class="exhibit-glyph">${glyph}</span><span class="art-note">ILLUSTRATIVE PROJECT MOTIF</span></div><div class="card-content"><p class="eyebrow">${safe(p.kind)}</p><h3>${safe(p.question)}</h3><p>${safe(p.summary)}</p><footer><span>${safe(p.name)}</span><span>↗</span></footer></div>`;document.querySelector('.exhibits').append(button);}
document.querySelector('.filters [data-filter="all"] small').textContent='06';

// Genuine project artifacts replace the first two illustrative card visuals.
for(const [id,image,caption] of [['flood','flood-output','RESEARCH REPORT · ACTUAL IMAGE-PROCESSING OUTPUT'],['health','health-dashboard','CAPSTONE PROTOTYPE · FICTIONAL DEMO PATIENT DATA']]){const card=document.querySelector(`.exhibit[data-project="${id}"]`),art=card?.querySelector('.art');if(art){art.classList.add('has-evidence');art.innerHTML=`<img loading="lazy" src="assets/projects/${image}.webp" alt="${caption}"><span class="artifact-label">${caption}</span>`;}}
const collectionHeading=document.querySelector('#project-archive .archive-count');if(collectionHeading)collectionHeading.textContent=`THE COLLECTION / ${catalog.length} DOCUMENTED PROJECTS`;

for (const card of document.querySelectorAll('.exhibit[data-project]')) {
  const project = catalog.find(item => item.id === card.dataset.project);
  if (!project) continue;
  card.querySelector('h3').textContent = project.name;
  card.querySelector('.card-content > p:not(.eyebrow)').textContent = project.question;
  const art = card.querySelector('.art');
  if (['lumera', 'readme', 'geofence', 'tobacco'].includes(project.id)) {
    art.classList.add('has-evidence');
    art.innerHTML = `<img loading="lazy" src="assets/projects/${project.id}-workflow.svg" alt="Illustrated workflow for ${safe(project.name)}">`;
  }
}
for (const card of document.querySelectorAll('.collection-card')) {
  const project = catalog.find(item => item.id === card.dataset.project);
  const preview = project.images?.[0];
  const workflow = ['lumera', 'readme', 'geofence', 'tobacco'].includes(project.id);
  if (!preview && !workflow) continue;
  const image = document.createElement('img');
  image.className = 'collection-preview';
  image.loading = 'lazy';
  image.src = workflow ? `assets/projects/${project.id}-workflow.svg` : `assets/projects/${preview[0]}.webp`;
  image.alt = workflow ? `Illustrated workflow for ${project.name}` : preview[1];
  card.prepend(image);
}

const featuredIds = new Set([...document.querySelectorAll('.exhibits [data-project]')].map(card => card.dataset.project));
for (const card of collection.querySelectorAll('[data-project]')) {
  if (featuredIds.has(card.dataset.project)) card.remove();
}
for (const card of document.querySelectorAll('.exhibits [data-project="flood"]')) {
  const content = card.querySelector('.card-content');
  content.querySelector('p:not(.eyebrow)').innerHTML = 'Built a <strong>computer vision pipeline</strong> to estimate flood depth from street photos using reference objects and waterlines. Field verification included <strong>21 RTK survey measurements across 19 locations</strong>.';
  content.querySelector('footer').outerHTML = '<ul class="project-chips" aria-label="Technologies"><li>YOLOv8</li><li>GroundingDINO</li><li>SAM</li><li>NOAA data</li></ul><footer><span>View project details</span><span>↗</span></footer>';
}

const highTideCard = collection.querySelector('[data-project="tides"]');
if (highTideCard) highTideCard.id = 'high-tide-project';

if (document.body.classList.contains('lab-home')) {
  const featured = {
    flood: {
      category:'Computer vision', context:'UConn CIRCA', title:'MyCoast',
      subtitle:'Flood depth from street photos',
      summary:'Built a <strong>computer vision pipeline</strong> using reference objects and waterline analysis.',
      evidence:'Field verification · <strong>21 RTK measurements across 19 locations</strong>',
      tools:['Python','YOLOv8','GroundingDINO','SAM']
    },
    health: {
      category:'Conversational AI', context:'UConn Capstone', title:'ClariHealth AI',
      subtitle:'A conversational patient portal',
      summary:'Built a <strong>SMART on FHIR prototype</strong> for appointments, refills, and past visits.',
      evidence:'User research · <strong>81% preferred chat in a 16-person survey</strong>',
      tools:['SMART on FHIR','Conversational AI']
    },
    lumera: {
      category:'Applied AI', context:'HackRare 2026', title:'Lumera',
      subtitle:'Rare-disease evidence in one place',
      summary:'Collaborated on a prototype connecting <strong>clinical trials, drug-repurposing information, and research literature</strong>.',
      evidence:'Collaborative hackathon prototype',
      tools:['Next.js','React','Node.js','Express']
    },
    readme: {
      category:'Generative AI', context:'CSE 5095', title:'README from Code',
      subtitle:'Documentation grounded in source code',
      summary:'Used <strong>Python AST analysis</strong> to extract facts before generating a README.',
      evidence:'Output · <strong>Documentation with source references</strong>',
      tools:['Python','AST','LLM APIs']
    },
    geofence: {
      category:'Computer vision', context:'AI Club × Voxel51', title:'Boundary Watch',
      subtitle:'Camera-based classroom exit alerts',
      summary:'Built a <strong>person-detection and geofencing pipeline</strong> that flags crossings in video.',
      evidence:'Output · <strong>Annotated detections and boundary alerts</strong>',
      tools:['Python','YOLOv8','OpenCV','NumPy']
    },
    tobacco: {
      category:'Data analytics', context:'CSE 5520', title:'Tobacco Trends',
      subtitle:'Exploring tobacco policy and consumption',
      summary:'Built an <strong>interactive dashboard</strong> to compare taxes and consumption across places and time.',
      evidence:'Coverage · <strong>50 states and DC, 1990–2019</strong>',
      tools:['Python','pandas','Plotly','Dash']
    }
  };
  for (const card of document.querySelectorAll('#museum .exhibit')) {
    const project = featured[card.dataset.project];
    if (!project) continue;
    const chips = project.tools.map(tool=>`<li>${safe(tool)}</li>`).join('');
    card.innerHTML = `<div class="project-meta"><span>${safe(project.category)}</span><span>${safe(project.context)}</span></div><div class="card-content"><h3>${safe(project.title)}</h3><p class="project-purpose">${safe(project.subtitle)}</p><p class="project-contribution">${project.summary}</p><p class="project-evidence">${project.evidence}</p><ul class="project-chips" aria-label="Technologies">${chips}</ul><footer><span>View project details</span><span aria-hidden="true">↗</span></footer></div>`;
  }
}

if (document.body.classList.contains('lab-home')) {
  const section = document.querySelector('#museum');
  const track = section.querySelector('.exhibits');
  const selected = ['flood','health','lumera'];
  section.classList.add('featured-carousel');
  section.querySelector('.filters')?.remove();
  section.querySelector('.museum-note')?.remove();
  section.querySelector('.section-heading > p').textContent = 'Three projects in computer vision, conversational AI, and research tools.';
  track.setAttribute('aria-label','Featured projects');
  track.setAttribute('tabindex','0');
  track.setAttribute('role','region');
  const slides = [];
  for (const card of [...track.children]) {
    const id = card.dataset.project;
    if (!selected.includes(id)) {
      card.classList.remove('exhibit');
      card.classList.add('collection-card');
      card.dataset.collectionDomain = catalog.find(project=>project.id===id)?.domain || 'all';
      collection.append(card);
      continue;
    }
    slides.push(card);
    card.dataset.featureNumber = String(slides.length).padStart(2,'0');
    card.classList.add('carousel-slide');
    const name = card.querySelector('h3').textContent;
    card.insertAdjacentHTML('beforeend',`<div class="carousel-visual" aria-hidden="true"></div><div class="carousel-preview" aria-hidden="true"><span>${safe(name)}</span><div class="carousel-preview-art"></div></div>`);
    const meta = card.querySelector('.project-meta');
    card.querySelector('.card-content').prepend(meta);
  }
  track.insertAdjacentHTML('afterend','<div class="carousel-controls"><button type="button" data-slide-prev aria-label="Previous featured project">←</button><div class="carousel-dots" aria-label="Choose featured project"></div><button type="button" data-slide-next aria-label="Next featured project">→</button><span class="carousel-count" aria-live="polite"></span></div>');
  const dots = section.querySelector('.carousel-dots');
  const previous = section.querySelector('[data-slide-prev]');
  const next = section.querySelector('[data-slide-next]');
  const count = section.querySelector('.carousel-count');
  const positionNames = ['center', 'right', 'left'];
  let activeSlide = 0;
  slides.forEach((slide,index)=>{
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label',`Show ${slide.querySelector('h3').textContent}`);
    dot.textContent = String(index+1).padStart(2,'0');
    dot.onclick = ()=>goTo(index);
    dots.append(dot);
  });

  function update(index) {
    activeSlide = index;
    slides.forEach((slide,i)=>{
      const position = positionNames[(i-index+slides.length)%slides.length];
      const prior = slide.dataset.position;
      slide.classList.toggle('is-wrapping', Boolean(prior && prior !== 'center' && position !== 'center' && prior !== position));
      slide.dataset.position = position;
      slide.classList.toggle('is-current',i===index);
      slide.inert = i!==index;
      slide.setAttribute('aria-hidden',String(i!==index));
    });
    const title = slides[index].querySelector('h3').textContent;
    count.textContent = `${title} · ${index+1} of ${slides.length}`;
    [...dots.children].forEach((dot,i)=>dot.setAttribute('aria-current',String(i===index)));
  }
  function goTo(index) {
    if (index !== activeSlide) update((index+slides.length)%slides.length);
  }
  previous.onclick = ()=>goTo(activeSlide-1);
  next.onclick = ()=>goTo(activeSlide+1);
  track.addEventListener('keydown',event=>{
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeSlide+(event.key==='ArrowRight'?1:-1));
    }
  });
  let touchStart;
  track.addEventListener('touchstart',event=>{
    touchStart = event.touches.length===1 ? event.touches[0] : null;
  },{passive:true});
  track.addEventListener('touchcancel',()=>{ touchStart = null; });
  track.addEventListener('touchend',event=>{
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX-touchStart.clientX;
    const dy = touch.clientY-touchStart.clientY;
    touchStart = null;
    if (Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)*1.35) goTo(activeSlide+(dx<0?1:-1));
  },{passive:true});
  update(0);
  const supportingIds = ['tides', 'amazon', 'tobacco'];
  const supportingCards = supportingIds.map(id => collection.querySelector(`[data-project="${id}"]`));
  collection.replaceChildren(...supportingCards);
}

if (document.body.classList.contains('lab-home')) {
  for (const card of document.querySelectorAll('#project-collection .collection-card')) {
    const project = catalog.find(item=>item.id===card.dataset.project);
    if (!project) continue;
    const [context,...kind] = project.kind.split(' · ');
    const tools = project.tech.split(' · ');
    card.innerHTML = `<div class="project-meta"><span>${safe(kind.join(' · ') || project.domain)}</span><span>${safe(context)}</span></div><div class="card-content"><h3>${safe(project.name)}</h3><p class="project-purpose">${safe(project.question)}</p><p class="project-contribution">${safe(project.summary)}</p><p class="project-evidence">Focus · <strong>${safe(tools.slice(0,2).join(' + '))}</strong></p><ul class="project-chips" aria-label="Technologies">${tools.map(tool=>`<li>${safe(tool)}</li>`).join('')}</ul><footer><span>View project details</span><span aria-hidden="true">↗</span></footer></div>`;
  }
}

if (document.body.classList.contains('lab-home')) {
  const concise = {
    flood:'Built a <strong>computer vision pipeline</strong> using object detection and waterline analysis to estimate flood depth from street photos. Verified against <strong>21 RTK measurements across 19 locations</strong>.',
    health:'Built a <strong>SMART on FHIR prototype</strong> for appointments, refills, and past visits through chat. In a <strong>16-person survey, 81% preferred a conversational interface</strong>.',
    lumera:'Collaborated on a rare-disease research prototype combining <strong>clinical trials, drug-repurposing information, and literature</strong> in one interface, using <strong>Next.js, React, Node.js, and Express</strong>.',
    readme:'Used <strong>Python AST analysis</strong> to extract definitions and CLI options before LLM generation. Produced <strong>README documentation with source references</strong> and compared against an LLM-only baseline.',
    geofence:'Built a <strong>YOLOv8 and OpenCV</strong> pipeline to detect people, check a virtual classroom boundary, and display <strong>annotated exit alerts</strong> in video.',
    tobacco:'Built an interactive <strong>Plotly Dash dashboard</strong> to explore tobacco taxes and consumption across <strong>50 states and DC, 1990–2019</strong>, using Python and pandas.'
  };
  for (const card of document.querySelectorAll('#museum .exhibit,#project-collection .collection-card')) {
    if (!card.classList.contains('carousel-slide')) card.querySelector('.project-purpose')?.remove();
    card.querySelector('.project-evidence')?.remove();
    const description = card.querySelector('.project-contribution');
    if (description && concise[card.dataset.project]) description.innerHTML = concise[card.dataset.project];
  }
}

if (document.body.classList.contains('lab-home')) {
  const keyPhrases = [
    'Python AST analysis','computer vision pipeline','object detection','waterline analysis',
    'SMART on FHIR','conversational interface','clinical trials','drug-repurposing information',
    'source references','LLM-only baseline','YOLOv8','OpenCV','annotated exit alerts',
    'Plotly Dash','cross-validation','held-out error analysis','semantic retrieval',
    'LLM inference','MobileNet','transfer-learning','VGG-16','dataset curation',
    'model iteration','image-captioning','person-detection','boundary-checking',
    'time-series','predictive modeling','feature engineering','Random Forest',
    'XGBoost','SQL','Python','PyTorch','TensorFlow','Flask','FastAPI',
    'Streamlit','Weaviate','FriendliAI','Next.js','React','Node.js','Express'
  ].sort((a,b)=>b.length-a.length);
  const escaped = keyPhrases.map(phrase=>phrase.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
  const keywordPattern = new RegExp('\\b(' + escaped.join('|') + ')\\b','gi');
  for (const paragraph of document.querySelectorAll('#museum .project-contribution,#project-collection .project-contribution')) {
    const walker = document.createTreeWalker(paragraph,NodeFilter.SHOW_TEXT);
    const nodes = [];
    while(walker.nextNode()) {
      if(!walker.currentNode.parentElement.closest('strong')) nodes.push(walker.currentNode);
    }
    for (const node of nodes) {
      const matches = [...node.textContent.matchAll(keywordPattern)];
      if(!matches.length) continue;
      const content = document.createDocumentFragment();
      let cursor = 0;
      for (const match of matches) {
        content.append(document.createTextNode(node.textContent.slice(cursor,match.index)));
        const highlight = document.createElement('strong');
        highlight.textContent = match[0];
        content.append(highlight);
        cursor = match.index + match[0].length;
      }
      content.append(document.createTextNode(node.textContent.slice(cursor)));
      node.replaceWith(content);
    }
  }
}

if (document.body.classList.contains('lab-home')) {
  const shortDescriptions = {
    flood:'Built a <strong>computer vision pipeline</strong> to estimate flood depth from street photos using objects and waterlines. Field checks included <strong>21 RTK measurements across 19 locations</strong>.',
    health:'Built a <strong>conversational patient-portal prototype</strong> for appointments, refills, and past visits using <strong>SMART on FHIR</strong>.',
    lumera:'Collaborated on an <strong>AI research tool</strong> that brings together clinical trials, drug-repurposing information, and literature to help explore <strong>rare diseases</strong>.',
    readme:'Built an <strong>AI documentation generator</strong> that reads Python code, extracts facts with <strong>AST analysis</strong>, and writes explanations linked to their source.',
    geofence:'Built a <strong>computer vision system</strong> that detects people with <strong>YOLOv8 and OpenCV</strong> and flags when someone leaves a defined classroom area.',
    tobacco:'<strong>Plotly Dash dashboard</strong> for tobacco taxes and consumption.<br><strong>50 states + DC</strong> · 1990–2019',
    tides:'<strong>Time-series forecasting</strong> for alerts in 3 Connecticut towns.<br><strong>3.75–7.00 min timing MAE</strong> vs. NOAA predictions across 2 zones.',
    airbnb:'Compared <strong>regression models</strong> to predict Airbnb listing prices, using data preprocessing, <strong>cross-validation</strong>, and error analysis.',
    caption:'Contributed to an <strong>image-captioning application</strong> that turns pictures into text descriptions using <strong>Python and TensorFlow Lite</strong>.',
    music:'Collaborated on an <strong>AI music recommender</strong> that interprets mood prompts and retrieves matching Spotify tracks using <strong>semantic search and LLMs</strong>.',
    plant:'Built a team prototype that screens leaf images for plant disease using <strong>MobileNet transfer learning</strong> and a web interface.',
    ocular:'Worked on an eye-disease research project using <strong>VGG-16 image classification</strong>, dataset preparation, and model iteration.',
    fashion:'Trained <strong>clothing-image classifiers</strong> on Fashion-MNIST and examined their errors using <strong>ROC curves and confusion matrices</strong>.',
    letters:'Compared <strong>random forests, neural networks, and ensemble methods</strong> to recognize letters from input features.',
    cards:'Built a <strong>52-class convolutional model</strong> to recognize playing-card images and reviewed how incomplete batches affect evaluation.',
    amazon:'<strong>XGBoost + Random Forest</strong> for product-length prediction.<br><strong>33rd globally</strong> · 2023 team finish'
  };
  for (const card of document.querySelectorAll('#museum .exhibit,#project-collection .collection-card')) {
    const paragraph = card.querySelector('.project-contribution');
    if (paragraph && shortDescriptions[card.dataset.project]) paragraph.innerHTML = shortDescriptions[card.dataset.project];
    if (paragraph && card.matches('.carousel-slide[data-project="flood"]')) {
      paragraph.innerHTML = 'Built a <strong>computer vision pipeline</strong> that estimates flood depth using reference objects and waterlines.';
      paragraph.insertAdjacentHTML('afterend','<dl class="carousel-proof"><div><dt>Mean absolute error · preliminary evaluation across 16 locations</dt><dd>3.84 cm</dd></div><div><dt>RTK measurements across 19 field locations</dt><dd>21</dd></div></dl>');
    }
    if (card.dataset.project === 'readme') card.querySelector('h3').textContent = 'Code to Documentation';
  }
  // Point visitors to the project repository, without README-specific link labels.
  for (const project of catalog) {
    projects[project.id] = projects[project.id].replace(/href="([^"]+)\/blob\/main\/README.md"/g,'href="$1"').replace(/Project README ↗/g,'View project on GitHub ↗');
  }
}

document.querySelectorAll('#museum .exhibit footer,#project-collection .collection-card footer').forEach(footer=>footer.remove());

if (document.body.classList.contains('lab-home')) {
  for (const card of collection.children) {
    const project = catalog.find(item => item.id === card.dataset.project);
    const link = document.createElement('a');
    link.className = 'project-repo-link';
    link.href = `https://github.com/HIRAL13CHOKSI/${project.repo}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'View on GitHub ↗';
    link.setAttribute('aria-label', `View ${project.name} on GitHub`);
    card.querySelector('.card-content').append(link);
  }
}
