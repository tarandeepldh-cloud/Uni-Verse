// Show Student Login Form
function showStudentLoginForm() {
    const overlay = document.getElementById('loginOverlay');
    const studentForm = document.getElementById('studentLoginForm');
    const teacherForm = document.getElementById('teacherLoginForm');
    
    overlay.classList.remove('hidden');
    studentForm.classList.remove('hidden');
    teacherForm.classList.add('hidden');
    
    const input = studentForm.querySelector('input[type="text"]');
    if (input) setTimeout(() => input.focus(), 100);
}

// Show Teacher Login Form
function showTeacherLoginForm() {
    const overlay = document.getElementById('loginOverlay');
    const studentForm = document.getElementById('studentLoginForm');
    const teacherForm = document.getElementById('teacherLoginForm');
    
    overlay.classList.remove('hidden');
    studentForm.classList.add('hidden');
    teacherForm.classList.remove('hidden');
    
    const input = teacherForm.querySelector('input[type="text"]');
    if (input) setTimeout(() => input.focus(), 100);
}

// Close Login Form
function closeLoginForm() {
    const overlay = document.getElementById('loginOverlay');
    overlay.classList.add('hidden');
    
    document.getElementById('studentLoginForm').classList.add('hidden');
    document.getElementById('teacherLoginForm').classList.add('hidden');
}

// Handle Student Login
function handleStudentLogin() {
    const form = document.getElementById('studentForm');
    const inputs = form.querySelectorAll('input');
    const studentId = inputs[0].value.trim();
    const password = inputs[1].value.trim();
    
    if (!studentId || !password) {
        alert('Please enter both Student ID and Password');
        return;
    }
    
    localStorage.setItem('universe_user', studentId);
    localStorage.setItem('universe_role', 'student');
    window.location.href = 'dashboard.html';
}

// Handle Teacher Login
function handleTeacherLogin() {
    const form = document.getElementById('teacherForm');
    const inputs = form.querySelectorAll('input');
    const teacherId = inputs[0].value.trim();
    const password = inputs[1].value.trim();
    
    if (!teacherId || !password) {
        alert('Please enter both Teacher ID and Password');
        return;
    }
    
    localStorage.setItem('universe_teacher', teacherId);
    localStorage.setItem('universe_role', 'teacher');
    window.location.href = 'teacher.html';
}

// Demo Login for Students
function handleStudentDemo() {
    localStorage.setItem('universe_user', 'DEMO001');
    localStorage.setItem('universe_role', 'student');
    window.location.href = 'dashboard.html';
}

// Demo Login for Teachers
function handleTeacherDemo() {
    localStorage.setItem('universe_teacher', 'TEACHER001');
    localStorage.setItem('universe_role', 'teacher');
    window.location.href = 'teacher.html';
}

// Close overlay when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('loginOverlay');
    
    if (overlay) {
        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                closeLoginForm();
            }
        });
    }
    
    const formContainer = document.querySelector('.login-form-container');
    if (formContainer) {
        formContainer.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});
