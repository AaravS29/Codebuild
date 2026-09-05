const $ = (s) => document.querySelector(s);
const modal = $('#modalBackdrop');
const modalTitle = $('#modalTitle');
const modalText = $('#modalText');
const modalEyebrow = $('#modalEyebrow');
const modalAction = $('#modalAction');
const toast = $('#toast');
let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3000)}
function openModal(type){
  const content = type === 'report' ? {eyebrow:'PUBLIC REPORTING',title:'Report an accident',text:'Share a few details and your location. Our team will confirm the signal and route the right response.',action:'Start report'} : {eyebrow:'EMERGENCY RESPONSE',title:'Emergency SOS',text:'Your location will be shared with the nearest response team. Stay calm — help is being coordinated.',action:'Confirm and continue'};
  modalEyebrow.textContent=content.eyebrow;modalTitle.textContent=content.title;modalText.textContent=content.text;modalAction.textContent=content.action;modal.hidden=false;
  modalAction.onclick=()=>{modal.hidden=true;showToast(type==='report'?'Report started — stay on the line.':'SOS signal sent — response team notified.');};
}
document.querySelectorAll('[data-action="sos"]').forEach(btn=>btn.addEventListener('click',()=>openModal('sos')));
document.querySelectorAll('[data-action="report"]').forEach(btn=>btn.addEventListener('click',()=>openModal('report')));
$('#closeModal').addEventListener('click',()=>modal.hidden=true);
modal.addEventListener('click',(e)=>{if(e.target===modal) modal.hidden=true});
$('#helpBtn').addEventListener('click',()=>{modalEyebrow.textContent='HELP CENTRE';modalTitle.textContent='Need help?';modalText.textContent='For immediate danger, use Emergency SOS. For general assistance, a dispatcher is available to guide you.';modalAction.textContent='Connect to dispatcher';modal.hidden=false;modalAction.onclick=()=>{modal.hidden=true;showToast('A dispatcher is ready to help.')};});
$('#trackBtn').addEventListener('click',async()=>{const id=$('#caseId').value.trim();const result=$('#trackResult');if(!id){result.hidden=false;result.textContent='Enter a case ID to continue.';return}result.hidden=false;result.textContent='Checking live case status…';try{const response=await fetch(`/api/case?id=${encodeURIComponent(id)}`);const data=await response.json();if(!response.ok)throw new Error(data.error);result.textContent=`${data.caseId} · ${data.status} · ETA ${data.eta}`;showToast('Case details updated.')}catch(error){result.textContent='Unable to reach the dispatch service.';showToast('Please try again shortly.')}});
$('#hospitalBtn').addEventListener('click',async()=>{try{const response=await fetch('/api/hospitals');const data=await response.json();showToast(`${data.hospitalsReady} emergency-ready hospitals found near you.`)}catch(error){showToast('Hospital capacity is temporarily unavailable.')}});
document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.nav-item').forEach(item=>item.classList.remove('active'));btn.classList.add('active');if(btn.dataset.label!=='For people')showToast(`${btn.dataset.label} view selected.`)}));
$('#language').addEventListener('change',(e)=>showToast(`Language set to ${e.target.value}.`));
