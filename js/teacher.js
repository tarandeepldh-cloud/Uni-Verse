// Teacher.js - Handle teacher dashboard functionality

function checkTeacherAuth() {
    const teacher = localStorage.getItem('universe_teacher');
    const currentPage = window.location.pathname.split('/').pop() || '';

    if (currentPage === 'teacher.html' && !teacher) {
        window.location.href = 'index.html';
        return false;
    }

    if (teacher) {
        displayTeacherName();
    }

    return true;
}

function displayTeacherName() {
    const teacher = localStorage.getItem('universe_teacher');
    const teacherNameEl = document.getElementById('teacherName');
    const teacherIdEl = document.getElementById('teacherId');

    if (teacherNameEl && teacher) {
        // Map teacher IDs to names
        const teacherNames = {
            'T001': 'Ms. Kaur',
            'T002': 'Mr. Sharma',
            'T003': 'Dr. Patel'
        };
        teacherNameEl.textContent = teacherNames[teacher] || teacher;
        if (teacherIdEl) {
            teacherIdEl.textContent = teacher;
        }
    }
}

function showTeacherTab(tabId) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.t-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const navButtons = document.querySelectorAll('.t-nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked button
    event.target.classList.add('active');

    // Initialize chart if performance tab is shown
    if (tabId === 't_performance') {
        initializePerformanceChart();
    }
}

function toggleAttendance(button) {
    if (button.classList.contains('present')) {
        button.classList.remove('present');
        button.classList.add('absent');
        button.textContent = 'Absent';
    } else {
        button.classList.remove('absent');
        button.classList.add('present');
        button.textContent = 'Present';
    }
}

function saveAttendance() {
    alert('Attendance saved successfully!');
}

function verifyItem(button) {
    const item = button.parentElement;
    const itemText = item.querySelector('span').textContent;
    
    // Move item to verified section
    const lostFoundContainer = document.querySelector('.lf-container');
    const verifiedSection = lostFoundContainer.querySelector('.lf-section:last-child');
    
    const verifiedItem = document.createElement('div');
    verifiedItem.className = 'lf-item verified';
    verifiedItem.innerHTML = `<span>${itemText.replace(' – Pending', '')} – Verified ✔</span>`;
    
    verifiedSection.appendChild(verifiedItem);
    item.remove();
}

function returnHome() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('universe_teacher');
        localStorage.removeItem('universe_role');
        window.location.href = 'index.html';
    }
}

function initializePerformanceChart() {
    const canvas = document.getElementById('t_performanceGraph');
    
    // Check if chart already exists
    if (window.performanceChart instanceof Chart) {
        return;
    }

    const ctx = canvas.getContext('2d');
    window.performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Navneet', 'Rahul', 'Priya', 'Arjun', 'Sophia', 'Vikram', 'Anjali', 'Rohan'],
            datasets: [{
                label: 'Performance Score',
                data: [8.5, 7.2, 9.1, 8.3, 8.8, 7.5, 9.4, 8.1],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(102, 126, 234, 0.8)'
                ],
                borderColor: '#667eea',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        callback: function(value) {
                            return value + '/10';
                        }
                    }
                }
            }
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (checkTeacherAuth()) {
        // Set home tab as active by default
        const homeTab = document.getElementById('t_home');
        if (homeTab) {
            homeTab.classList.add('active');
        }
    }
});
