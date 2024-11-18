document.addEventListener('DOMContentLoaded', function() {
    const monthYears = document.getElementById('month');
    const dayContainer = document.getElementById('days');
    const boxButtons = document.querySelector('.box-button');
    const boxButtonYears = document.querySelector('.box-button-year')
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const nextButtonYear = document.getElementById('nextButtonYear');
    const prevButtonYear = document.getElementById('prevButtonYear');

    const boxButtonYear = document.querySelectorAll('.box-button-year')
    const prevButtonListYear = document.getElementById('prevButtonListYear');
    const nextButtonListYear = document.getElementById('nextButtonListYear')
    const yearList = document.getElementById('yearList');
    const monthGroup = document.getElementById('month-group');
    const weekdays = document.querySelector('.weekdays');
    const daysWrapper = document.querySelector('.days-wrapper');
    const monthList = document.getElementById('monthList');
    const currentYear = document.getElementById('year');
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    var checkYear = false;


    let currentDate = new Date();
    let today = new Date();
    let isYearMode = false;

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        

        if (!isYearMode) {
            const firstDay = new Date(year, month, 1).getDay();
            const lastDay = new Date(year, month + 1, 0).getDate();
            yearList.style.display = 'none'
            monthYears.textContent = `${months[month]} ${year}`;
            dayContainer.innerHTML = '';
            
            const prevMonthLastDay = new Date(year, month, 0).getDate();

            for (let i = firstDay; i > 0; i--) {
                const dayDiv = document.createElement('div');
                dayDiv.textContent = prevMonthLastDay - i + 1;
                dayDiv.classList.add('fade');
                dayContainer.appendChild(dayDiv);
            }

            for (let i = 1; i <= lastDay; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.textContent = i;

                if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dayDiv.classList.add('today');
                }


                dayContainer.appendChild(dayDiv);
            }

            const totalDaysDisplayed = firstDay + lastDay;
            const nextMonthStartDays = 42 - totalDaysDisplayed;

            for (let i = 1; i <= nextMonthStartDays; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.textContent = i;
                dayDiv.classList.add('fade');
                dayContainer.appendChild(dayDiv);
            }
        } else {
            monthYears.textContent = year;
            dayContainer.innerHTML = '';
        }
    }

    function addSlideAnimation(direction) {
        dayContainer.classList.add(direction === 'prev' ? 'slide-prev' : 'slide-next');

        dayContainer.addEventListener('animationend', function() {
            dayContainer.classList.remove('slide-prev', 'slide-next');
        }, { once: true });
    }

    prevButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        addSlideAnimation('prev');
        renderCalendar(currentDate);
    });

    nextButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        addSlideAnimation('next');
        renderCalendar(currentDate);
    });

    if(checkYear === false) {
        nextButtonYear.addEventListener('click', function() {
            currentDate.setFullYear(currentDate.getFullYear() + 1);
            currentYear.textContent = currentDate.getFullYear(); 
        });
    
        prevButtonYear.addEventListener('click', function() {
            currentDate.setFullYear(currentDate.getFullYear() - 1);
            currentYear.textContent = currentDate.getFullYear(); 
        });
    
    }
   
    function renderMonth() {
        yearList.style.display = 'none';
        boxButtonYears.style.display = 'flex';
        boxButtons.style.display = 'none';
        monthList.innerHTML = ''; 
        weekdays.style.display = 'none';
        dayContainer.style.visibility = 'hidden';
        monthList.style.display = 'grid';
        monthYears.style.display = 'none';
        currentYear.style.display = 'block';
        currentYear.textContent = currentDate.getFullYear();
     
        for (let i = 0; i < 16; i++) {
            const monthIndex = i % 12;  
            const monthDiv = document.createElement('div');
            monthDiv.textContent = months[monthIndex].slice(0,3);  
            monthDiv.style.cursor = 'pointer';
            monthDiv.addEventListener('click', function() {
                weekdays.style.display = 'grid';
                currentDate.setMonth(monthIndex);  
                monthYears.textContent = `${months[monthIndex]} ${currentDate.getFullYear()}`;
                monthList.style.display = 'none';
                dayContainer.style.visibility = 'visible';
                renderCalendar(currentDate);
                currentYear.style.display = 'none';
                monthYears.style.display = 'block';
                boxButtonYears.style.display = 'none';
                boxButtons.style.display = 'flex';
            });
            monthList.appendChild(monthDiv);
        }
        highlightCurrentMonth()
    }
    monthYears.addEventListener('click', function() {
        renderMonth()
    });

    monthList.addEventListener('wheel', function(e) {
        if (e.deltaY > 0) {
            currentDate.setFullYear(currentDate.getFullYear() + 1);
        } else {
            currentDate.setFullYear(currentDate.getFullYear() - 1);
        }
        currentYear.textContent = currentDate.getFullYear(); 
    });

    yearList.addEventListener('wheel', function(e) {
        if (e.deltaY > 0) {
            currentYearValue += 10; 
        } else {
            currentYearValue -= 10; 
        }
        renderListYear(currentYearValue); 
    });
    renderCalendar(currentDate);

    let currentYearValue = currentDate.getFullYear();

    function renderListYear(year) {
        boxButtonYear[1].style.display = 'flex';
        boxButtonYear[0].style.display = 'none';
        yearList.style.display = 'grid';
        currentYear.classList.add('locked');
        currentYear.textContent = '';
    
        const listYear = generateYear(year);
        const titleYear = `${listYear[0]} - ${listYear[listYear.length - 7]}`;
        currentYear.textContent = titleYear;
    
        monthList.innerHTML = ''; 
        monthList.style.display = 'none'; 
        yearList.innerHTML = '';
    
        listYear.forEach((e) => {
            const yearDiv = document.createElement('div');
            yearDiv.textContent = e;
            yearDiv.classList.add('year-item');
            yearList.appendChild(yearDiv);
    
            yearDiv.addEventListener('click', function () {
                currentDate.setFullYear(e);
                currentYearValue = e;
    
                currentYear.textContent = currentYearValue;
                currentYear.classList.remove('locked');
                boxButtonYear[1].style.display = 'none';
                boxButtonYear[0].style.display = 'flex';
                yearList.style.display = 'none';
                monthList.style.display = 'grid';
                renderMonth()
            });
        });
        highlightCurrentYear()
       
    }
    
    currentYear.addEventListener('click', function() {
        renderListYear(currentYearValue);
    });
    
    prevButtonListYear.addEventListener('click', function() {
        currentYearValue -= 10; 
        renderListYear(currentYearValue); 
    });
    
    nextButtonListYear.addEventListener('click', function() {
        currentYearValue += 10; 
        renderListYear(currentYearValue); 
    });
    
    function generateYear(year) {
        const startYear = Math.floor(year / 10) * 10;
        const listYear = [];
        for (let i = 0; i < 16; i++) {
            listYear.push(startYear + i);
        }
        return listYear;
    }
    function highlightCurrentMonth() {
        const monthsDiv = document.querySelectorAll('.monthList > div'); // Chọn tất cả phần tử tháng
        const currentDate = new Date(); // Ngày hiện tại
        const currentYear = currentDate.getFullYear(); // Năm hiện tại
        const displayedYear = parseInt(document.getElementById('year').textContent); // Năm được hiển thị
    
        if (displayedYear !== currentYear) {
            // Nếu không phải năm hiện tại, xóa mọi class current-month
            monthsDiv.forEach((monthDiv) => {
                monthDiv.classList.remove('current-month');
            });
            return;
        }
    
        const currentMonth = currentDate.getMonth(); // Lấy chỉ số tháng hiện tại (0-11)
        monthsDiv.forEach((monthDiv, index) => {
            if (index === currentMonth) {
                monthDiv.classList.add('current-month');
            } else {
                monthDiv.classList.remove('current-month');
            }
        });
    }
    function highlightCurrentYear() {
        const yearsDiv = document.querySelectorAll('.yearList > div'); // Lấy tất cả các phần tử năm
        const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
    
        yearsDiv.forEach((yearDiv) => {
            if (parseInt(yearDiv.textContent) === currentYear) {
                yearDiv.classList.add('current-year');
            } else {
                yearDiv.classList.remove('current-year');
            }
        });
    }
    function formatDate() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const today = new Date();
        const dayName = days[today.getDay()];
        const monthName = months[today.getMonth()];
        const date = today.getDate();
    
        return `${dayName}, ${monthName} ${date}`;
    }
    function updateHeader() {
        const headerDateElement = document.querySelector('#date');
        if (headerDateElement) {
            headerDateElement.textContent = formatDate();
        }
    }
    updateHeader();
    
    const toggleMenu = document.getElementById('toggle-menu')
    const calendar = document.querySelector('.calendar')
    toggleMenu.addEventListener('click', () => {
        calendar.classList.toggle('collapsed');

        calendar.classList.toggle('close');
        if (calendar.classList.contains('close')) {
            toggleMenu.classList.remove('bi-chevron-down');
            toggleMenu.classList.add('bi-chevron-up');
        } 
        else  {
            toggleMenu.classList.add('bi-chevron-down');
            toggleMenu.classList.remove('bi-chevron-up');
        } 
    })
    
});
