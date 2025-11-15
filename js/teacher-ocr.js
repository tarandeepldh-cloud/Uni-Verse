// js/teacher-ocr.js - save extracted marks to Supabase
// This script assumes existing OCR extraction code populates `extractedRecords` array
// Each record: { roll: '...', marks: 78, subject: '...' }
// We'll add a Save button handler to persist them.

(function(){
  async function saveExtractedToSupabase(records){
    if(!Array.isArray(records) || records.length === 0){ alert('No records to save'); return; }
    try {
      for(const r of records){
        // basic validation
        if(!r.roll) continue;
        await supabasePost('marks', { roll: String(r.roll), subject: r.subject || 'Unknown', marks: Number(r.marks || 0) });
      }
      alert('Saved ' + records.length + ' records to backend');
    } catch(e){
      console.error('saveExtractedToSupabase error', e);
      alert('Save failed: ' + e.message);
    }
  }

  // try to wire a button if present
  document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('saveExtractedBtn');
    if(saveBtn){
      saveBtn.addEventListener('click', async () => {
        // assume your OCR page sets window.extractedRecords
        const records = window.extractedRecords || [];
        await saveExtractedToSupabase(records);
      });
    }
  });
})();