const cards=[...document.querySelectorAll('.item-card')];const filters=[...document.querySelectorAll('.filter-chip')];const search=document.querySelector('.search-box input');const count=document.querySelector('.result-count');const empty=document.querySelector('.empty-state');const toast=document.querySelector('.toast');let activeFilter='All services';let toastTimer;function refresh(){const term=search.value.trim().toLowerCase();let visible=0;cards.forEach(card=>{const matchFilter=activeFilter==='All services'||card.dataset.category===activeFilter;const matchText=card.dataset.name.includes(term)||card.textContent.toLowerCase().includes(term);card.hidden=!(matchFilter&&matchText);if(!card.hidden)visible++});count.textContent=visible+' results';empty.hidden=visible>0}filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.classList.remove('is-active'));button.classList.add('is-active');activeFilter=button.dataset.filter;refresh()}));search.addEventListener('input',refresh);refresh();function notify(message){toast.textContent=message;toast.classList.add('is-visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),2300)}document.querySelectorAll('.save-button').forEach(button=>button.addEventListener('click',()=>{const saved=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(saved));button.textContent=saved?'♥':'♡';notify(saved?'Added to your saved list':'Removed from your saved list')}));document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>notify(button.dataset.action==='add'?'Added to your list':button.closest('.item-card').querySelector('h3').textContent)));document.querySelector('.contact-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;document.querySelector('.form-message').textContent='Thanks, '+form.elements.name.value+' — your message is ready. We’ll be in touch soon.';form.reset()});const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('.site-nav').classList.toggle('is-open',open)});document.querySelectorAll('.site-nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelector('.site-nav').classList.remove('is-open');menu.setAttribute('aria-expanded','false')}));document.querySelector('.theme-toggle').addEventListener('click',()=>document.body.classList.toggle('theme-light'));
const cart = [];
const checkoutSection = document.querySelector('.checkout-section');
const bagButton = document.querySelector('[data-open-checkout]');
if (bagButton) bagButton.addEventListener('click', () => {
  checkoutSection.hidden = false;
  checkoutSection.scrollIntoView({ behavior: 'smooth' });
});
document.querySelectorAll('[data-action="add"]').forEach(button => button.addEventListener('click', () => {
  if (!checkoutSection) return;
  const card = button.closest('.item-card');
  cart.push({ name: card.querySelector('h3').textContent, price: Number(card.dataset.price) });
  document.querySelector('#cart-count').textContent = cart.length;
  document.querySelector('.checkout-lines').innerHTML = cart.map(item => '<p>' + item.name + ' <span>$' + item.price + '</span></p>').join('');
  document.querySelector('.checkout-total').textContent = '$' + cart.reduce((sum, item) => sum + item.price, 0);
  checkoutSection.hidden = false;
  notify('Added to your shopping bag');
}));
const checkoutForm = document.querySelector('.checkout-form');
if (checkoutForm) checkoutForm.addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('.checkout-message').textContent = 'Demo order placed. No payment was collected.';
  cart.length = 0;
  document.querySelector('#cart-count').textContent = '0';
  document.querySelector('.checkout-lines').innerHTML = '<p>Your bag is empty.</p>';
  document.querySelector('.checkout-total').textContent = '$0';
  checkoutForm.reset();
});