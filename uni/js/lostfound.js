// js/lostfound.js - Supabase enabled
(async function(){
  function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  async function loadItems(){
    try {
      const rows = await supabaseGet('lost_found', '?select=*&order=created_at.desc');
      return rows;
    } catch(e) {
      console.error('loadItems error', e);
      return [];
    }
  }

  function render(items){
    const list = document.getElementById('lfList');
    if(!list) return;
    list.innerHTML = '';
    items.forEach(it => {
      const li = document.createElement('li');
      const approvedLabel = it.approved ? '<em class="muted"> (approved)</em>' : '';
      li.innerHTML = `<strong>${escapeHtml(it.item)}</strong>
        <span class="muted"> found at ${escapeHtml(it.location)}</span>
        ${approvedLabel}
        <div class="lf-actions">
          ${it.approved ? '' : '<button class="lf-approve" data-id="'+it.id+'">Approve</button>'}
          <button class="lf-delete" data-id="${it.id}">Delete</button>
        </div>`;
      list.appendChild(li);
    });

    list.querySelectorAll('.lf-approve').forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          await supabasePatch('lost_found', btn.dataset.id, { approved: true });
          await loadAndRender();
        } catch(err){ alert('Approve failed: ' + err.message); console.error(err); }
      });
    });
    list.querySelectorAll('.lf-delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        if(!confirm('Delete this item?')) return;
        try {
          await supabaseDelete('lost_found', btn.dataset.id);
          await loadAndRender();
        } catch(err){ alert('Delete failed: ' + err.message); console.error(err); }
      });
    });
  }

  const addBtn = document.getElementById('addLfBtn');
  if(addBtn){
    addBtn.addEventListener('click', async () => {
      const it = document.getElementById('lfItem').value.trim();
      const where = document.getElementById('lfWhere').value.trim();
      if(!it || !where){ alert('Add item and location'); return; }
      try {
        await supabasePost('lost_found', { item: it, location: where, approved: false });
        document.getElementById('lfItem').value = '';
        document.getElementById('lfWhere').value = '';
        await loadAndRender();
        alert('Item saved to backend');
      } catch(err){ alert('Save failed: ' + err.message); console.error(err); }
    });
  }

  document.getElementById && document.getElementById('loadSampleLf')?.addEventListener('click', async () => {
    alert('Reload sample is disabled in backend mode.');
  });

  async function loadAndRender(){
    const items = await loadItems();
    render(items);
    window.dispatchEvent(new Event('data-updated'));
  }

  await loadAndRender();

})();