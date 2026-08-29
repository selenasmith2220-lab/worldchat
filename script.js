let currentUser = null;
let adTimer = null;

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active-page');

  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === id);
  });

  window.scrollTo({top: 0, behavior: 'smooth'});

  if (id === 'ad') startAd();
}

function loginDemo(provider) {
  showToast(`${provider} sign-in is a demo in this GitHub-only version.`);
  setTimeout(openProfileSetup, 500);
}

function openProfileSetup() {
  showPage('profile-setup');
}

function continueGuest() {
  currentUser = {username: 'Guest', country: '🌍 Worldwide', guest: true};
  showPage('ad');
}

function finishProfile() {
  const username = document.getElementById('username').value.trim();
  const country = document.getElementById('country').value;
  if (!username || !country) {
    showToast('Please enter a username and choose your country.');
    return;
  }
  currentUser = {username, country, guest: false};
  showPage('ad');
}

function startAd() {
  clearInterval(adTimer);
  let seconds = 15;
  const timer = document.getElementById('timer');
  timer.textContent = seconds;

  adTimer = setInterval(() => {
    seconds--;
    timer.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(adTimer);
      showToast('Welcome to WorldChat!');
      showPage('chat');
    }
  }, 1000);
}

function sendMessage(event) {
  event.preventDefault();
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  if (!text) return;

  const messages = document.getElementById('messages');
  const row = document.createElement('div');
  row.className = 'message mine';
  row.innerHTML = `<div><div class="msg-meta"><b>${escapeHtml(currentUser?.username || 'You')}</b><small>now</small></div><p>${escapeHtml(text)}</p></div><span class="avatar me">${escapeHtml((currentUser?.username || 'Y')[0].toUpperCase())}</span>`;
  messages.appendChild(row);
  input.value = '';
  messages.scrollTop = messages.scrollHeight;
}

function startMatch() {
  const card = document.getElementById('matchCard');
  const btn = document.getElementById('matchBtn');
  btn.disabled = true;
  btn.textContent = '🔎 Finding someone...';
  card.innerHTML = `<div class="match-orb">…</div><div class="match-status">SEARCHING WORLDWIDE</div><h3>Finding your match</h3><p>Looking for someone who's online right now.</p>`;

  setTimeout(() => {
    const matches = [
      {name:'Alex', country:'🇺🇸 United States', letter:'A'},
      {name:'Mina', country:'🇰🇷 South Korea', letter:'M'},
      {name:'Sofia', country:'🇪🇸 Spain', letter:'S'},
      {name:'Daniel', country:'🇨🇦 Canada', letter:'D'}
    ];
    const m = matches[Math.floor(Math.random() * matches.length)];
    card.innerHTML = `<div class="match-orb">${m.letter}</div><div class="match-status">✨ MATCH FOUND</div><h3>${m.name} is ready to chat</h3><p>${m.country} · Start with a friendly hello. You can choose what to reveal.</p><div class="match-tags"><span>🔒 Private</span><span>💬 1-to-1</span></div><button class="primary-btn" style="margin-top:22px" onclick="showToast('Private Blind Date chat opened in demo mode.')">Start conversation →</button>`;
    btn.disabled = false;
    btn.textContent = '🎲 Find another match';
  }, 1800);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'
  }[char]));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});
