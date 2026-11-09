// Scroll remains native. Sections share a short entrance motion and a next-chapter link.
const flowIds=['intro','about','experience','museum','skills','why','credentials','beyond','contact'];
const flowNames=['Welcome','About Hiral','Experience','My projects & gallery','Skills','Why work with me','Education & learning','Beyond code','Let’s connect'];
const flowSections=flowIds.map(id=>document.getElementById(id));
const chapterNext=document.getElementById('chapter-next');
if('IntersectionObserver' in window){
 const reveal=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('chapter-visible');reveal.unobserve(e.target)}},{threshold:.06});
 for(const section of flowSections){section.classList.add('flow-chapter');reveal.observe(section)}
}
let flowTick=false;
function updateChapter(){flowTick=false;document.documentElement.style.setProperty("--chapter-progress",String(Math.min(1,Math.max(0,scrollY/(document.documentElement.scrollHeight-innerHeight)))));let i=0;for(let n=0;n<flowSections.length;n++)if(flowSections[n].getBoundingClientRect().top<innerHeight*.5)i=n;const next=Math.min(i+1,flowIds.length-1);chapterNext.hidden=i===flowIds.length-1;chapterNext.href='#'+flowIds[next];chapterNext.querySelector('b').textContent=flowNames[next];document.body.classList.toggle('in-gallery-section',document.getElementById('lab-journey').getBoundingClientRect().top<innerHeight*.75&&document.getElementById('lab-journey').getBoundingClientRect().bottom>innerHeight*.25)}
addEventListener('scroll',()=>{if(!flowTick){flowTick=true;requestAnimationFrame(updateChapter)}},{passive:true});updateChapter();
