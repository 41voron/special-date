// Знаходимо елементи
const mainTitle = document.getElementById('main-title');
const container = document.getElementById('card-container');

const step1 = document.getElementById('step1');
const step2_3 = document.getElementById('step2-3');
const step4 = document.getElementById('step4');
const step5 = document.getElementById('step5');

const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const btnSubmitTime = document.getElementById('btn-submit-time');
const btnConfirmFood = document.getElementById('btn-confirm-food');

const datePicker = document.getElementById('date-picker');
const timePicker = document.getElementById('time-picker');
const foodItems = document.querySelectorAll('.food-item');
const finalSummary = document.getElementById('final-summary');
const sparkles = document.getElementById('sparkles-container');

// Дані
let date = '';
let time = '';
let food = '';

// Перехід: Запрошення -> Вибір часу
btnYes.addEventListener('click', () => {
    mainTitle.style.opacity = '0';
    setTimeout(() => mainTitle.classList.add('hidden'), 500);

    step1.classList.add('hidden');
    step2_3.classList.remove('hidden');
    sparkles.classList.add('show-sparkles');
});

// Функція для втечі кнопки "НІ"
function moveNoButton() {
    const rect = container.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    
    const maxX = rect.width - btnRect.width - 20;
    const maxY = rect.height - btnRect.height - 20;
    
    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));
    
    btnNo.style.position = 'absolute';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
}

// Запускаємо втечу при наведенні миші або дотику (на телефоні)
btnNo.addEventListener('mouseover', moveNoButton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Запобігає випадковому натисканню
    moveNoButton();
});

// Перехід: Вибір часу -> Меню
btnSubmitTime.addEventListener('click', () => {
    if (!datePicker.value || !timePicker.value) {
        alert('Квіточка, вибери дату і час, будь ласка! 🥰');
        return;
    }
    date = datePicker.value;
    time = timePicker.value;
    
    step2_3.classList.add('hidden');
    step4.classList.remove('hidden');
});

// Вибір їжі
foodItems.forEach(item => {
    item.addEventListener('click', () => {
        foodItems.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        food = item.getAttribute('data-food');
        btnConfirmFood.classList.remove('disabled');
    });
});

// Перехід: Меню -> Фінал та відправка результатів
btnConfirmFood.addEventListener('click', () => {
    if (!food) return; 
    
    step4.classList.add('hidden');
    step5.classList.remove('hidden');

    // Форматування дати у звичний вигляд
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('uk-UA');

    finalSummary.innerHTML = `Чекаю тебе <strong>${formattedDate}</strong> о <strong>${time}</strong>.<br>В меню у нас: <strong>${food}</strong>!`;

    // --- БЛОК ВІДПРАВКИ ДАНИХ У TELEGRAM ---
    const botToken = '8644490831:AAGhtravUj0Z5fiEJuum4w8UC7Ez3wqcZsE'; // Встав сюди токен
    const chatId = '8010863398';             // Встав сюди свій ID

    // Текст повідомлення, яке прийде тобі
    const message = `🚨 Квіточка сказала ТАК!\n\n📅 Дата: ${formattedDate}\n⏰ Час: ${time}\n🍱 Меню: ${food}`;

    // Формуємо запит до Telegram API
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => console.log('Дані успішно відправлено'))
    .catch(error => console.error('Помилка відправки:', error));
});

// --- ГЕНЕРАТОР ПАДАЮЧИХ СЕРДЕЧОК ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    
    const heartSymbols = ['❤️', '💖', '💕', '💗'];
    heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 15 + 10 + 'px';
    heart.style.animationDuration = Math.random() * 4 + 5 + 's'; // Від 5 до 9 секунд
    heart.style.opacity = Math.random() * 0.4 + 0.1; // Напівпрозорі

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9000); 
}

setInterval(createHeart, 500); // Нове сердечко кожні пів секунди