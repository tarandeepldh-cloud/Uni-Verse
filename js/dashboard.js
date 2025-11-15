// js/dashboard.js - Supabase enabled
(async function(){
  const attEl = document.getElementById('attendancePercent');
  const evCountEl = document.getElementById('eventsCount');
  const lostEl = document.getElementById('lostCount');

  async function updateCounts(){
    try {
      // count only approved events for students
      const events = await supabaseGet('events', '?select=id,approved');
      const eventsCount = Array.isArray(events) ? events.filter(e => e.approved).length : 0;
      if(evCountEl) evCountEl.innerText = eventsCount;

      const lost = await supabaseGet('lost_found', '?select=id,approved');
      const lostCount = Array.isArray(lost) ? lost.filter(l => l.approved).length : 0;
      if(lostEl) lostEl.innerText = lostCount;

      if(attEl){
        const a = localStorage.getItem('universe_attendance') || '86';
        attEl.innerText = a + ' percent';
      }
    } catch(err){
      console.error('updateCounts error', err);
    }
  }

  await updateCounts();
  setInterval(updateCounts, 8000);
  window.addEventListener('data-updated', updateCounts);
})();