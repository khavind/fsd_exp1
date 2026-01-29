// === Parallax Hero Effect ===
const layers = document.querySelectorAll('.parallax-layer');

window.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  layers.forEach((layer, i) => {
    const speed = (i + 1) * 10;
    layer.style.transform = `translate(${(x - 0.5) * speed}px, ${(y - 0.5) * speed}px)`;
  });
});

// === Particle Canvas ===
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = '#00fff7';
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// === Skill Progress Charts ===
const charts = document.querySelectorAll('.progress-card.chart');

charts.forEach(card => {
  const canvas = card.querySelector('.skill-chart');
  const ctx = canvas.getContext('2d');
  canvas.width = 150;
  canvas.height = 150;
  const progress = card.dataset.progress;
  let current = 0;

  function animateChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background circle
    ctx.beginPath();
    ctx.arc(75, 75, 60, 0, Math.PI * 2);
    ctx.strokeStyle = '#1a1f3a';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Progress arc
    ctx.beginPath();
    ctx.arc(75, 75, 60, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2) * (current / 100));
    const gradient = ctx.createLinearGradient(0, 0, 150, 0);
    gradient.addColorStop(0, '#00fff7');
    gradient.addColorStop(1, '#006eff');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 10;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00fff7';
    ctx.stroke();

    // Percentage text
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#00fff7';
    ctx.font = 'bold 18px Nunito';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(current + '%', 75, 75);

    current++;
    if (current <= progress) requestAnimationFrame(animateChart);
  }
  animateChart();
});

// === Career Progress Ring ===
const ring = document.querySelector('.progress-ring .fg');
const ringParent = document.querySelector('.progress-ring');
const levelText = ringParent.querySelector('.level-text');
const level = parseInt(ringParent.dataset.level);
const maxLevel = 5;
const radius = 54;
const circumference = 2 * Math.PI * radius;

ring.style.strokeDasharray = circumference;
let currentOffset = circumference;
const targetOffset = circumference - (level / maxLevel) * circumference;

function animateRing() {
  if (currentOffset > targetOffset) {
    currentOffset -= 3;
    if (currentOffset < targetOffset) currentOffset = targetOffset;
    ring.style.strokeDashoffset = currentOffset;

    let displayLevel = Math.ceil((1 - currentOffset / circumference) * maxLevel);
    levelText.textContent = 'Level ' + (displayLevel === 0 ? 1 : displayLevel);

    requestAnimationFrame(animateRing);
  }
}
animateRing();

// === Click Ripple Effect ===
document.addEventListener('click', (e) => {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 1000);
});

// === Scroll-triggered Fade-in Sections ===
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-section');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  observer.observe(section);
});

// === Window Resize Handling for Particle Canvas ===
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// === Career Comparison ===
const careerData = {
  "AI Engineer": {salary: 120000, growth: 9, skills: 8},
  "Frontend Developer": {salary: 90000, growth: 8, skills: 7},
  "Data Scientist": {salary: 110000, growth: 9, skills: 9}
};

document.getElementById('compare-btn').addEventListener('click', () => {
  const job1 = document.getElementById('job1').value;
  const job2 = document.getElementById('job2').value;
  const resultDiv = document.getElementById('comparison-result');

  if (!job1 || !job2 || job1 === job2) {
    resultDiv.innerHTML = `<p style="color:#ff5555;">Please select two different jobs to compare.</p>`;
    return;
  }

  const data1 = careerData[job1];
  const data2 = careerData[job2];
  const score1 = data1.salary/1000 + data1.growth*10 + data1.skills*10;
  const score2 = data2.salary/1000 + data2.growth*10 + data2.skills*10;
  const winner = score1 > score2 ? job1 : job2;

  resultDiv.innerHTML = `
    <div class="career-card ${winner===job1?'winner':''}">
      <h3>${job1}</h3>
      <div class="metric">Salary</div>
      <div class="bar"><div class="bar-fill" style="width:${(data1.salary/1500)}%"></div></div>
      <div class="metric">Growth</div>
      <div class="bar"><div class="bar-fill" style="width:${data1.growth*10}%"></div></div>
      <div class="metric">Skills</div>
      <div class="bar"><div class="bar-fill" style="width:${data1.skills*10}%"></div></div>
      ${winner===job1?'<div class="winner-badge">🏆</div>':''}
    </div>
    <div class="career-card ${winner===job2?'winner':''}">
      <h3>${job2}</h3>
      <div class="metric">Salary</div>
      <div class="bar"><div class="bar-fill" style="width:${(data2.salary/1500)}%"></div></div>
      <div class="metric">Growth</div>
      <div class="bar"><div class="bar-fill" style="width:${data2.growth*10}%"></div></div>
      <div class="metric">Skills</div>
      <div class="bar"><div class="bar-fill" style="width:${data2.skills*10}%"></div></div>
      ${winner===job2?'<div class="winner-badge">🏆</div>':''}
    </div>
  `;
});

// === Job Skills + Skill Gap + Celebration ===
const jobSkills = {
  "AI Engineer": ["Python","Machine Learning","Deep Learning","TensorFlow","Data Analysis","AI Ethics"],
  "Frontend Developer": ["HTML","CSS","JavaScript","React","UI/UX Design","Responsive Design"],
  "Data Scientist": ["Python","R","Statistics","Data Visualization","SQL","Machine Learning"]
};

const skillDuration = {
  "Python": 4, "Machine Learning": 8, "Deep Learning": 6, "TensorFlow": 5,
  "Data Analysis": 3, "AI Ethics": 2, "HTML": 1, "CSS": 1, "JavaScript": 2,
  "React": 3, "UI/UX Design": 4, "Responsive Design": 2, "R": 3, "Statistics": 4,
  "Data Visualization": 3, "SQL": 2
};

const jobCards = document.querySelectorAll('.job-card');
const skillsDisplay = document.getElementById('skills-display');

jobCards.forEach(card => {
  card.addEventListener('click', () => {
    jobCards.forEach(c=>c.classList.remove('active'));
    card.classList.add('active');
    const job = card.dataset.job;
    const skills = jobSkills[job];

    skillsDisplay.innerHTML = '';
    skills.forEach(skill=>{
      const tag = document.createElement('div');
      tag.className='skill-tag';
      tag.dataset.skill = skill;
      tag.innerHTML=`<input type="checkbox"> ${skill}`;
      skillsDisplay.appendChild(tag);
    });

    document.getElementById('skill-gap-result').innerHTML='';
    updateSkillChart(job);
    updateCareerLevel(job);
  });
});

// Skill Gap Analyzer
document.getElementById('check-gap-btn').addEventListener('click', () => {
  const skillTags = document.querySelectorAll('#skills-display .skill-tag');
  const skillGapDiv = document.getElementById('skill-gap-result');
  const job = document.querySelector('.job-card.active')?.dataset.job;

  if (!job || skillTags.length===0) {
    skillGapDiv.innerHTML="<p style='color:#ff5555;'>Select a job first!</p>";
    return;
  }

  let missingSkills=[];
  let totalWeeks=0;
  skillTags.forEach(tag=>{
    const skillName = tag.dataset.skill;
    const checkbox = tag.querySelector('input[type="checkbox"]');
    if(!checkbox.checked){
      missingSkills.push(skillName);
      totalWeeks += skillDuration[skillName]||2;
    }
  });

  if(missingSkills.length===0){
    skillGapDiv.innerHTML=`<p>✅ You already have all skills for this job!</p>`;
    triggerCelebration(); // Celebrate completion
  } else {
    skillGapDiv.innerHTML=`
      <p>Missing Skills: <strong>${missingSkills.join(', ')}</strong></p>
      <p>Estimated time to cover gap: <strong>${totalWeeks} weeks</strong></p>
    `;
  }

  updateSkillChart(job);
  updateCareerLevel(job);
});

// Update skill chart dynamically
function updateSkillChart(job){
  const chartCard = document.querySelector(`.progress-card[data-skill="${job}"]`);
  if(!chartCard) return;

  const canvas = chartCard.querySelector('.skill-chart');
  const ctx = canvas.getContext('2d');
  const totalSkills = jobSkills[job].length;
  const checkedSkills = Array.from(skillsDisplay.querySelectorAll('input[type="checkbox"]'))
                              .filter(cb=>cb.checked).length;
  const progress = Math.round((checkedSkills/totalSkills)*100);

  let current=0;
  function animateChart(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.arc(75,75,60,0,Math.PI*2);
    ctx.strokeStyle='#1a1f3a';
    ctx.lineWidth=10;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(75,75,60,-Math.PI/2,-Math.PI/2+(Math.PI*2)*(current/100));
    const gradient = ctx.createLinearGradient(0,0,150,0);
    gradient.addColorStop(0,'#00fff7');
    gradient.addColorStop(1,'#006eff');
    ctx.strokeStyle=gradient;
    ctx.lineWidth=10;
    ctx.shadowBlur=15;
    ctx.shadowColor='#00fff7';
    ctx.stroke();

    ctx.shadowBlur=0;
    ctx.fillStyle='#00fff7';
    ctx.font='bold 18px Nunito';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.fillText(current+'%',75,75);

    current++;
    if(current<=progress) requestAnimationFrame(animateChart);
  }
  animateChart();
}

// Update career ring dynamically
function updateCareerLevel(job){
  const ringParent = document.querySelector('.progress-ring');
  const ring = ringParent.querySelector('.fg');
  const levelText = ringParent.querySelector('.level-text');
  const totalSkills = jobSkills[job].length;
  const completedSkills = Array.from(skillsDisplay.querySelectorAll('input[type="checkbox"]')).filter(cb=>cb.checked).length;
  const level = Math.round((completedSkills/totalSkills)*5);
  const radius = 54, circumference = 2*Math.PI*radius;
  const targetOffset = circumference-(level/5)*circumference;
  let currentOffset = circumference;

  function animateRing(){
    if(currentOffset>targetOffset){
      currentOffset-=2;
      if(currentOffset<targetOffset) currentOffset=targetOffset;
      ring.style.strokeDashoffset=currentOffset;
      let displayLevel = Math.ceil((1-currentOffset/circumference)*5);
      levelText.textContent='Level '+(displayLevel===0?1:displayLevel);
      requestAnimationFrame(animateRing);
    }
  }
  animateRing();
}

// Celebration effect
// === Celebration Effect ===
function triggerCelebration(){
  const canvas = document.createElement('canvas');
  canvas.id='celebration-canvas';
  canvas.style.position='fixed'; canvas.style.top='0'; canvas.style.left='0';
  canvas.style.width='100%'; canvas.style.height='100%';
  canvas.style.pointerEvents='none'; canvas.style.zIndex='9999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d'); canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  const particles=[]; const colors=['#FFD700','#FF69B4','#00FFFF','#FF4500','#ADFF2F'];
  for(let i=0;i<200;i++){
    particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height-100,r:Math.random()*5+2,
      dx:(Math.random()-0.5)*2, dy:Math.random()*4+2, color:colors[Math.floor(Math.random()*colors.length)]});
  }
 function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=p.color; ctx.fill();
      p.x+=p.dx; p.y+=p.dy;
      if(p.y>canvas.height){ p.y=-10; p.x=Math.random()*canvas.width; }
    });
    requestAnimationFrame(animate);
  }
  animate();
  setTimeout(()=>canvas.remove(),6000);
}
const startBtn = document.querySelector('.cta-btn');

startBtn.addEventListener('click', () => {
    // Disable button to prevent multiple clicks
    startBtn.disabled = true;

    // 1. Create full-screen overlay
    const overlay = document.createElement('div');
    overlay.className = 'journey-overlay';
    document.body.appendChild(overlay);

    // 2. Create portal center burst
    const portal = document.createElement('div');
    portal.className = 'portal-center';
    overlay.appendChild(portal);

    // 3. Create swirling particles around portal
    const particles = [];
    for (let i = 0; i < 120; i++) {
        const p = document.createElement('span');
        p.className = 'portal-particle';
        overlay.appendChild(p);
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 200 + 50;
        p.style.setProperty('--x', Math.cos(angle) * radius + 'px');
        p.style.setProperty('--y', Math.sin(angle) * radius + 'px');
        particles.push(p);
    }

    // 4. Animate particles with CSS transform (handled by CSS animation)

    // 5. Floating glowing text
    const floatingText = document.createElement('div');
    floatingText.className = 'portal-text';
    floatingText.textContent = "🚀 Welcome to Your Career Journey!";
    overlay.appendChild(floatingText);

    // 6. End animation after 5s
    setTimeout(() => {
        overlay.remove();
        startBtn.disabled = false;

        // Optional: scroll to first section (Hero -> Career Paths)
        document.getElementById('paths').scrollIntoView({ behavior: 'smooth' });
    }, 5000);
});











// === Skill Quest System ===
const xpFill = document.querySelector('.xp-fill');
const xpText = document.querySelector('.xp-text');
const milestones = document.querySelectorAll('.milestones span');

function updateSkillQuest(job) {
  const totalSkills = jobSkills[job].length;
  const completedSkills = Array.from(
    skillsDisplay.querySelectorAll('input[type="checkbox"]')
  ).filter(cb => cb.checked).length;

  const totalXP = totalSkills * 100;
  const currentXP = completedSkills * 100;
  const percent = Math.round((currentXP / totalXP) * 100);

  // Animate XP bar
  xpFill.style.width = percent + '%';
  xpText.textContent = `${currentXP} / ${totalXP} XP`;

  // Milestones
  milestones.forEach((m, i) => m.classList.remove('active'));

  if (percent >= 25) milestones[0].classList.add('active');
  if (percent >= 50) milestones[1].classList.add('active');
  if (percent >= 75) milestones[2].classList.add('active');
  if (percent === 100) {
    milestones[3].classList.add('active');
    unlockAchievement(job);
  }
}

// Hook into checkbox changes
skillsDisplay.addEventListener('change', () => {
  const job = document.querySelector('.job-card.active')?.dataset.job;
  if (job) updateSkillQuest(job);
});

// === Achievement Unlock ===
function unlockAchievement(job) {
  triggerCelebration();

  const badge = document.createElement('div');
  badge.className = 'achievement-popup';
  badge.innerHTML = `
    🏆 ACHIEVEMENT UNLOCKED <br>
    <strong>${job} – Skill Master</strong>
  `;
  document.body.appendChild(badge);

  setTimeout(() => badge.remove(), 4000);
}
// === Quick Navigation Smooth Scroll ===
document.querySelectorAll('.quick-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// === Highlight Active Section ===
const navLinks = document.querySelectorAll('.quick-nav a');
const navSections = [...navLinks].map(link =>
  document.querySelector(link.getAttribute('href'))
);

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const activeLink = document.querySelector(
        `.quick-nav a[href="#${entry.target.id}"]`
      );
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.5 });

navSections.forEach(section => {
  if (section) navObserver.observe(section);
});
const heroTitle = document.getElementById("hero-title");
const heroSection = document.getElementById("hero");

// Hover background shift
heroTitle.addEventListener("mouseenter", () => {
  heroSection.classList.add("hovered");
});

heroTitle.addEventListener("mouseleave", () => {
  heroSection.classList.remove("hovered");
});

// Click WOW effect
heroTitle.addEventListener("click", () => {
  heroTitle.classList.add("active");

  // Screen glow flash
  const flash = document.createElement("div");
  flash.style.position = "fixed";
  flash.style.inset = "0";
  flash.style.background = "radial-gradient(circle, rgba(0,255,247,0.35), transparent)";
  flash.style.zIndex = "9999";
  flash.style.pointerEvents = "none";
  document.body.appendChild(flash);

  setTimeout(() => {
    flash.remove();
    heroTitle.classList.remove("active");
  }, 800);
});
