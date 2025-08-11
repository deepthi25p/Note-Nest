
function setUser(role) {
  localStorage.setItem('noteNestRole', role);
}

function getUserRole() {
  return localStorage.getItem('noteNestRole');
}

function clearUser() {
  localStorage.removeItem('noteNestRole');
}

const role = getUserRole();
const path = window.location.pathname;
const isStudentPage = path.endsWith('student.html');
const isTeacherPage = path.endsWith('teacher.html');

if (isStudentPage && role !== 'student') {
  window.location.href = 'error-display.html';
}

if (isTeacherPage && role !== 'teacher') {
  window.location.href = 'error-display.html';
}

const studentLoginBtn = document.getElementById('student-login-btn');
const teacherLoginBtn = document.getElementById('teacher-login-btn');
const studentLoginForm = document.getElementById('student-login-form');
const teacherLoginForm = document.getElementById('teacher-login-form');

if (studentLoginBtn && teacherLoginBtn) {
  studentLoginBtn.addEventListener('click', () => {
    studentLoginBtn.classList.add('bg-green-500', 'text-white');
    studentLoginBtn.classList.remove('bg-transparent', 'text-gray-700', 'hover:bg-gray-100');
    teacherLoginBtn.classList.remove('bg-green-500', 'text-white');
    teacherLoginBtn.classList.add('bg-transparent', 'text-gray-700', 'hover:bg-gray-100');
    studentLoginForm.classList.remove('hidden');
    teacherLoginForm.classList.add('hidden');
  });

  teacherLoginBtn.addEventListener('click', () => {
    teacherLoginBtn.classList.add('bg-green-500', 'text-white');
    teacherLoginBtn.classList.remove('bg-transparent', 'text-gray-700', 'hover:bg-gray-100');
    studentLoginBtn.classList.remove('bg-green-500', 'text-white');
    studentLoginBtn.classList.add('bg-transparent', 'text-gray-700', 'hover:bg-gray-100');
    teacherLoginForm.classList.remove('hidden');
    studentLoginForm.classList.add('hidden');
  });
}

const studentSignupBtn = document.getElementById('student-signup-btn');
const teacherSignupBtn = document.getElementById('teacher-signup-btn');
const studentSignupForm = document.getElementById('student-signup-form');
const teacherSignupForm = document.getElementById('teacher-signup-form');

if (studentSignupBtn && teacherSignupBtn) {
  studentSignupBtn.addEventListener('click', () => {
    studentSignupBtn.classList.add('bg-green-500', 'text-white');
    studentSignupBtn.classList.remove('bg-transparent', 'text-gray-700', 'hover:bg-gray-100');
    teacherSignupBtn.classList.remove('bg-green-500', 'text-white');
    teacherSignupBtn.classList.add('bg-transparent', 'text-gray-700', 'hover:bg-gray-100');
    studentSignupForm.classList.remove('hidden');
    teacherSignupForm.classList.add('hidden');
  });

  teacherSignupBtn.addEventListener('click', () => {
    teacherSignupBtn.classList.add('bg-green-500', 'text-white');
    teacherSignupBtn.classList.remove('bg-transparent', 'text-gray-700', 'hover:bg-gray-100');
    studentSignupBtn.classList.remove('bg-green-500', 'text-white');
    studentSignupBtn.classList.add('bg-transparent', 'text-gray-700', 'hover:bg-gray-100');
    teacherSignupForm.classList.remove('hidden');
    studentSignupForm.classList.add('hidden');
  });
}

if (path.endsWith('login.html')) {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = e.target.email.value.trim();
      const password = e.target.password.value.trim();
      if (!email || !password) {
        alert('Please fill in both fields.');
        return;
      }
      const isTeacher = email.includes('@school.edu');
      setUser(isTeacher ? 'teacher' : 'student');
      window.location.href = isTeacher ? 'teacher.html' : 'student.html';
    });
  });
}

if (path.endsWith('signup.html')) {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = e.target.name?.value.trim();
      const email = e.target.email.value.trim();
      const password = e.target.password.value.trim();
      const confirm = e.target['confirm-password'].value.trim();
      if (!name || !email || !password || password !== confirm) {
        alert('Please check your inputs and ensure passwords match.');
        return;
      }
      // Demo logic for user type based on button clicked
      const isTeacher = form.id === 'teacher-signup-form';
      setUser(isTeacher ? 'teacher' : 'student');
      window.location.href = isTeacher ? 'teacher.html' : 'student.html';
    });
  });
}

const logoutBtn = document.querySelector('button.bg-red-500');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    clearUser();
    window.location.href = 'index.html';
  });
}

if (isStudentPage) {
  const searchInput = document.getElementById('search-notes');
  const filter = document.getElementById('subject-filter');
  const cards = document.querySelectorAll('.note-card');

  function filterNotes() {
    const term = searchInput.value.toLowerCase();
    const subj = filter.value.toLowerCase();
    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const subject = card.querySelector('p.text-green-700').textContent.toLowerCase();
      const uploadedBy = card.querySelector('p.text-gray-600').textContent.toLowerCase();

      const matchesSearch = title.includes(term) || subject.includes(term) || uploadedBy.includes(term);
      const matchesFilter = subj === '' || subject.includes(subj);

      card.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
    });
  }

  [searchInput, filter].forEach(el => el.addEventListener('input', filterNotes));
}

if (path.endsWith('note-details.html')) {
  const backBtn = document.querySelector('.btn-secondary');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.history.back();
    });
  }
}


