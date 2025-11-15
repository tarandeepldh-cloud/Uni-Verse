// js/events.js - Supabase enabled
(async function(){
  function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  async function loadEvents() {
    // fetch all events ordered latest first
    try {
      const rows = await supabaseGet('events', '?select=*&order=created_at.desc');
      return rows;
    } catch(e) {
      console.error('loadEvents error', e);
      return [];
    }
  }

  function renderList(events) {
    const list = document.getElementById('eventsList');
    if(!list) return;
    list.innerHTML = '';
    events.forEach(it => {
      const li = document.createElement('li');
      const approvedLabel = it.approved ? '<em class="muted"> (approved)</em>' : '';
      li.innerHTML = `<strong>${escapeHtml(it.title)}</strong>
        <span class="muted"> on ${escapeHtml(it.date)}${it.club ? ', ' + escapeHtml(it.club) : ''}</span>
        ${approvedLabel}
        <div class="event-actions">
          ${it.approved ? '' : '<button class="small-approve" data-id="'+it.id+'">Approve</button>'}
          <button class="small-delete" data-id="${it.id}">Delete</button>
        </div>`;
      list.appendChild(li);
    });

    list.querySelectorAll('.small-approve').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        try {
          await supabasePatch('events', id, { approved: true });
          await loadAndRender();
        } catch(err){ alert('Approve failed: ' + err.message); console.error(err); }
      });
    });
    list.querySelectorAll('.small-delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        if(!confirm('Delete this event?')) return;
        try {
          await supabaseDelete('events', id);
          await loadAndRender();
        } catch(err){ alert('Delete failed: ' + err.message); console.error(err); }
      });
    });
  }

  async function addEvent(title, date, club) {
    try {
      await supabasePost('events', { title, date, club, approved: false });
    } catch(e) { throw e; }
  }

  const addBtn = document.getElementById('addEventBtn');
  if(addBtn){
    addBtn.addEventListener('click', async () => {
      const t = document.getElementById('eventTitle').value.trim();
      const d = document.getElementById('eventDate').value;
      const c = document.getElementById('eventClub').value.trim();
      if(!t || !d){ alert('Add title and date'); return; }
      try{
        await addEvent(t,d,c);
        document.getElementById('eventTitle').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventClub').value = '';
        await loadAndRender();
        alert('Event saved to backend');
      }catch(err){ alert('Save failed: '+err.message); console.error(err); }
    });
  }

  document.getElementById && document.getElementById('loadSampleEvents')?.addEventListener('click', async () => {
    alert('Reload sample is disabled in backend mode.');
  });

  async function loadAndRender(){
    const events = await loadEvents();
    renderList(events);
    window.dispatchEvent(new Event('data-updated'));
  }

  await loadAndRender();
})();