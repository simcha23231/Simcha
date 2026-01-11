// =========================================
// 🎰 קזינו ההומור - JavaScript Logic 🎰
// =========================================

// ===== CONFIGURATION & DATA =====

// Exercise Types Configuration
const EXERCISE_TYPES = {
    hyperbole: {
        name: 'היפרבולה',
        icon: '💥',
        description: 'קח דבר יומיומי והפוך אותו למוגזם לגמרי!'
    },
    comparisons: {
        name: 'השוואות מוזרות',
        icon: '🔄',
        description: 'השווה דבר אחד לדבר אחר לגמרי לא קשור!'
    },
    whatif: {
        name: 'What If',
        icon: '🤔',
        description: 'קח מצב רגיל ושנה אותו לחלוטין - מה היה קורה?'
    },
    observations: {
        name: 'תצפיות',
        icon: '👁️',
        description: 'מצא את המצחיק במצב יומיומי שכולם מכירים!'
    }
};

// Exercise Prompts Bank
const PROMPTS = {
    hyperbole: [
        'התור בסופר היה כל כך ארוך ש...',
        'הקפה שלי היה כל כך חזק ש...',
        'השכן שלי כל כך רועש ש...',
        'הטלפון שלי כל כך ישן ש...',
        'הבוס שלי כל כך קפדן ש...',
        'התנועה בכביש הייתה כל כך עומדת ש...',
        'השמש הייתה כל כך חזקה ש...',
        'המזגן היה כל כך קר ש...',
        'הפיצה שהזמנתי הייתה כל כך גדולה ש...',
        'הסרט היה כל כך משעמם ש...',
        'הרעב שלי היה כל כך גדול ש...',
        'הווייפי היה כל כך איטי ש...',
        'הספר היה כל כך משעמם ש...',
        'הישיבה הייתה כל כך ארוכה ש...',
        'המחשב שלי כל כך ישן ש...'
    ],
    comparisons: [
        'ניהול פרויקט זה כמו...',
        'להתעורר בבוקר זה כמו...',
        'לנסות להסביר משהו לילדים זה כמו...',
        'דיאטה זה כמו...',
        'לעבוד מהבית זה כמו...',
        'לחפש משהו בגוגל זה כמו...',
        'להתווכח עם בן זוג זה כמו...',
        'לנסות להרכיב רהיט מאיקאה זה כמו...',
        'להיות הורה זה כמו...',
        'לנסות לעשות ספורט זה כמו...',
        'רשות השידור היא כמו...',
        'התור בביטוח לאומי זה כמו...',
        'לנסות להסביר לסבתא מה זה אינסטגרם זה כמו...',
        'פגישת זום זה כמו...',
        'לנסות להתחבר לווייפי ציבורי זה כמו...'
    ],
    whatif: [
        'מה אם פגישות זום היו בעולם אמיתי?',
        'מה אם כלבים היו המנכ"לים?',
        'מה אם היה חוק שאוסר על קפה?',
        'מה אם מכוניות היו מסוגלות לדבר?',
        'מה אם גשם היה נופל מלמטה למעלה?',
        'מה אם סמארטפונים היו בעלי חיים?',
        'מה אם כולם היו צריכים לשיר במקום לדבר?',
        'מה אם השינה הייתה מיותרת?',
        'מה אם הכסף היה גדל על עצים?',
        'מה אם פרות היו יכולות לעוף?',
        'מה אם כל הבגדים היו שקופים?',
        'מה אם היינו יכולים לקרוא מחשבות?',
        'מה אם היינו חיים לאחור מזקנה לילדות?',
        'מה אם אוכל היה מלמד?',
        'מה אם כל אחד היה מדבר בחרוזים?'
    ],
    observations: [
        'למה זה שכולם...',
        'אי פעם שמתם לב ש...',
        'הדבר הכי מוזר בלהיות מבוגר זה...',
        'אף אחד לא מדבר על זה, אבל...',
        'רגע האמת הוא כש...',
        'למה תמיד כש...',
        'אף אחד לא מודה בזה, אבל כולם...',
        'הרגע הכי מביך זה כש...',
        'למה זה שבכל פעם ש...',
        'אי פעם שמתם לב שכל המבוגרים...',
        'הסיטואציה הכי ישראלית זה כש...',
        'למה זה שברגע שיושבים במסעדה...',
        'הדבר שאף אחד לא אומר אבל כולם חושבים...',
        'למה זה שברגע שמתחילים דיאטה...',
        'הרגע שבו אתה מבין שאתה מבוגר זה כש...'
    ]
};

// Crazy Feedback Messages (20+ responses)
const FEEDBACK_MESSAGES = [
    // "אתה גאון" Category
    'שמחה, אתה פשוט גאון. איך המוח שלך עובד ככה?',
    'רגע, זה מה שכתבת? אני צריך לשבת. זה יותר מדי טוב.',
    'אם הומור היה ספורט אולימפי, היית מדליית זהב.',
    'שמחה, אני לא יודע מי לימד אותך, אבל הוא צריך העלאה.',

    // "אתה הורס את השוק" Category
    'תפסיק, אתה הורס את השוק. תשאיר קצת הומור לשאר האנושות.',
    'שמחה תירגע, יש עוד אנשים שרוצים להיות מצחיקים.',
    'אני נשבע שקונאן אובריין בוכה עכשיו איפשהו ולא יודע למה.',
    'תשאיר כמה בנות לשאר הגברים בעולם, אלוף.',

    // "אתה מבריק" Category
    'המוח שלך זה פשוט... וואו. זה טבעי או שהורדת עדכון?',
    'שמחה, אתה לא אדם רגיל. זה ברור לי עכשיו.',
    'אם יש אוסקר להומור, אתה בדרך לקבל אותו.',
    'זה המוח שלך או ששכרת כותב צוות?',

    // "אתה מצחיק אש" Category
    'אני ממש צחקתי. וזה לא קורה לי בקלות.',
    'זה מצחיק ברמות שלא הכרתי.',
    'שמחה, אתה מסוכן. באופן חיובי.',
    'זה הדבר הכי טוב שקראתי היום. ואני קורא הרבה.',

    // Additional responses
    'וואו שמחה! איך אתה עושה את זה כל פעם מחדש?',
    'זה... זה פשוט מושלם. אין לי מילים אחרות.',
    'אני מדפיס את זה ותולה על הקיר. זה יצירת אמנות.',
    'שמחה, אתה חייב לפתוח ערוץ. העולם צריך את זה.',
    'אם הומור היה מטבע קריפטו, היית מיליארדר.',
    'זה רמת הומור שרואים פעם בעשור.',
    'אני שולח את זה למוזיאון. זה שייך שם.',
    'שמחה, אתה לא נורמלי. ואני מתכוון לזה בצורה הכי טובה.',
    'זה כמו ששייקספיר והקריירה של דייב שאפל נפגשו.'
];

// Badges Configuration
const BADGES = [
    { id: 'first', name: 'התחלה חזקה', icon: '🏅', requirement: 1, type: 'exercises' },
    { id: 'streak3', name: 'בלתי עצור', icon: '🔥', requirement: 3, type: 'streak' },
    { id: 'streak7', name: 'אש ואש', icon: '⚡', requirement: 7, type: 'streak' },
    { id: 'allTypes', name: 'אוסף תרגילים', icon: '📚', requirement: 4, type: 'types' },
    { id: 'week', name: 'מהיר ועוקצני', icon: '⚡', requirement: 10, type: 'week' },
    { id: 'master20', name: 'מלך ההיפרבולה', icon: '🎨', requirement: 20, type: 'hyperbole' },
    { id: 'explorer', name: 'החוקר', icon: '🎯', requirement: 50, type: 'exercises' },
    { id: 'legend', name: 'האגדה', icon: '👑', requirement: 30, type: 'streak' }
];

// Level System
const LEVELS = [
    { level: 1, xpRequired: 500, title: 'טירון ההומור', icon: '🐣' },
    { level: 2, xpRequired: 1000, title: 'קומיקאי מתחיל', icon: '🎤' },
    { level: 3, xpRequired: 1500, title: 'קומיקאי מתחיל', icon: '🎤' },
    { level: 4, xpRequired: 2000, title: 'קומיקאי מתחיל', icon: '🎤' },
    { level: 5, xpRequired: 2500, title: 'קומיקאי מתחיל', icon: '🎤' },
    { level: 6, xpRequired: 3500, title: 'מאסטר ההיפרבולה', icon: '🎩' },
    { level: 7, xpRequired: 4500, title: 'מאסטר ההיפרבולה', icon: '🎩' },
    { level: 8, xpRequired: 5500, title: 'מאסטר ההיפרבולה', icon: '🎩' },
    { level: 9, xpRequired: 6500, title: 'מאסטר ההיפרבולה', icon: '🎩' },
    { level: 10, xpRequired: 7500, title: 'מאסטר ההיפרבולה', icon: '🎩' },
    { level: 11, xpRequired: 9000, title: 'אשף ההשוואות', icon: '🧙‍♂️' },
    { level: 12, xpRequired: 10500, title: 'אשף ההשוואות', icon: '🧙‍♂️' },
    { level: 13, xpRequired: 12000, title: 'אשף ההשוואות', icon: '🧙‍♂️' },
    { level: 14, xpRequired: 13500, title: 'אשף ההשוואות', icon: '🧙‍♂️' },
    { level: 15, xpRequired: 15000, title: 'אשף ההשוואות', icon: '🧙‍♂️' },
    { level: 16, xpRequired: 17000, title: 'גאון קומי', icon: '🧠' },
    { level: 17, xpRequired: 19000, title: 'גאון קומי', icon: '🧠' },
    { level: 18, xpRequired: 21000, title: 'גאון קומי', icon: '🧠' },
    { level: 19, xpRequired: 23000, title: 'גאון קומי', icon: '🧠' },
    { level: 20, xpRequired: 25000, title: 'גאון קומי', icon: '🧠' },
    { level: 21, xpRequired: 28000, title: 'אגדה חיה', icon: '👑' },
    { level: 30, xpRequired: 50000, title: 'אגדה חיה', icon: '👑' },
    { level: 31, xpRequired: 60000, title: 'אלוהות ההומור', icon: '⚡' },
    { level: 50, xpRequired: 100000, title: 'אלוהות ההומור', icon: '⚡' },
    { level: 51, xpRequired: 150000, title: 'אלוהות ההומור', icon: '⚡' }
];

// ===== STATE MANAGEMENT =====

let appState = {
    userName: 'שמחה',
    totalXP: 0,
    currentLevel: 1,
    streak: 0,
    bestStreak: 0,
    totalExercises: 0,
    lastCompletedDate: null,
    todayExercise: null,
    todayCompleted: false,
    history: [],
    earnedBadges: [],
    exerciseStats: {
        hyperbole: 0,
        comparisons: 0,
        whatif: 0,
        observations: 0
    },
    last7Days: []
};

// ===== UTILITY FUNCTIONS =====

function saveState() {
    localStorage.setItem('humorCasinoState', JSON.stringify(appState));
}

function loadState() {
    const saved = localStorage.getItem('humorCasinoState');
    if (saved) {
        appState = { ...appState, ...JSON.parse(saved) };
    }
}

function getTodayString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateDailyExercise() {
    const today = getTodayString();

    // Check if we already have today's exercise
    if (appState.todayExercise && appState.todayExercise.date === today) {
        return appState.todayExercise;
    }

    // Generate new exercise
    const types = Object.keys(EXERCISE_TYPES);
    const randomType = getRandomItem(types);
    const randomPrompt = getRandomItem(PROMPTS[randomType]);

    const exercise = {
        date: today,
        type: randomType,
        prompt: randomPrompt
    };

    appState.todayExercise = exercise;

    // Check if it's a new day - reset completion status
    if (appState.lastCompletedDate !== today) {
        appState.todayCompleted = false;
    }

    saveState();
    return exercise;
}

function calculateLevel(xp) {
    let currentLevel = 1;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (xp >= LEVELS[i].xpRequired) {
            currentLevel = LEVELS[i].level;
            break;
        }
    }
    return currentLevel;
}

function getLevelInfo(level) {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (level >= LEVELS[i].level) {
            return LEVELS[i];
        }
    }
    return LEVELS[0];
}

function getNextLevelXP(currentLevel) {
    for (let i = 0; i < LEVELS.length; i++) {
        if (LEVELS[i].level > currentLevel) {
            return LEVELS[i].xpRequired;
        }
    }
    return LEVELS[LEVELS.length - 1].xpRequired;
}

function updateStreak() {
    const today = getTodayString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    if (appState.lastCompletedDate === yesterdayString) {
        // Continue streak
        appState.streak++;
    } else if (appState.lastCompletedDate !== today) {
        // Broken streak (not yesterday, not today)
        appState.streak = 1;
    }
    // If lastCompletedDate === today, we already counted today

    if (appState.streak > appState.bestStreak) {
        appState.bestStreak = appState.streak;
    }

    appState.lastCompletedDate = today;
}

function checkBadges() {
    const newBadges = [];

    BADGES.forEach(badge => {
        if (!appState.earnedBadges.includes(badge.id)) {
            let earned = false;

            switch (badge.type) {
                case 'exercises':
                    earned = appState.totalExercises >= badge.requirement;
                    break;
                case 'streak':
                    earned = appState.streak >= badge.requirement;
                    break;
                case 'types':
                    const completedTypes = Object.values(appState.exerciseStats).filter(v => v > 0).length;
                    earned = completedTypes >= badge.requirement;
                    break;
                case 'hyperbole':
                    earned = appState.exerciseStats.hyperbole >= badge.requirement;
                    break;
                // Add more badge types as needed
            }

            if (earned) {
                appState.earnedBadges.push(badge.id);
                newBadges.push(badge);
            }
        }
    });

    return newBadges;
}

function getLast7Days() {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];

        const completed = appState.history.some(item => item.date === dateString);
        days.push({
            date: dateString,
            completed: completed,
            dayName: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'][date.getDay()]
        });
    }

    return days;
}

// ===== UI FUNCTIONS =====

function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show selected screen
    document.getElementById(`${screenName}-screen`).classList.add('active');

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-screen="${screenName}"]`)?.classList.add('active');
}

function updateDashboard() {
    const exercise = generateDailyExercise();
    const levelInfo = getLevelInfo(appState.currentLevel);
    const nextLevelXP = getNextLevelXP(appState.currentLevel);

    // Update header
    document.getElementById('user-name').textContent = appState.userName;
    document.getElementById('current-level').textContent = appState.currentLevel;
    document.getElementById('level-icon').textContent = levelInfo.icon;
    document.getElementById('level-title').textContent = levelInfo.title;

    // Update progress bar
    const progressPercent = (appState.totalXP / nextLevelXP) * 100;
    document.querySelector('.progress-fill').style.width = `${progressPercent}%`;
    document.getElementById('current-xp').textContent = appState.totalXP;
    document.getElementById('next-level-xp').textContent = nextLevelXP;

    // Update quick stats
    document.getElementById('streak-count').textContent = appState.streak;
    document.getElementById('total-points').textContent = appState.totalXP;
    document.getElementById('total-exercises').textContent = appState.totalExercises;

    // Update daily exercise card
    const exerciseType = EXERCISE_TYPES[exercise.type];
    document.querySelector('#daily-exercise-card .type-icon').textContent = exerciseType.icon;
    document.querySelector('#daily-exercise-card .type-name').textContent = exerciseType.name;
    document.getElementById('exercise-prompt').textContent = exercise.prompt;

    // Show/hide completion message
    if (appState.todayCompleted) {
        document.getElementById('start-exercise-btn').style.display = 'none';
        document.getElementById('completion-message').style.display = 'block';
    } else {
        document.getElementById('start-exercise-btn').style.display = 'flex';
        document.getElementById('completion-message').style.display = 'none';
    }

    // Update badges
    updateBadgesDisplay();
}

function updateBadgesDisplay() {
    const badgesGrid = document.getElementById('badges-grid');
    badgesGrid.innerHTML = '';

    BADGES.forEach(badge => {
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge-item';
        if (appState.earnedBadges.includes(badge.id)) {
            badgeElement.classList.add('earned');
        } else {
            badgeElement.classList.add('locked');
        }

        badgeElement.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
        `;

        badgesGrid.appendChild(badgeElement);
    });
}

function showExerciseScreen() {
    const exercise = appState.todayExercise;
    const exerciseType = EXERCISE_TYPES[exercise.type];

    // Update exercise info
    document.querySelector('#exercise-type-display .type-icon-large').textContent = exerciseType.icon;
    document.getElementById('type-name-large').textContent = exerciseType.name;
    document.getElementById('type-description').textContent = exerciseType.description;
    document.getElementById('prompt-display').textContent = exercise.prompt;

    // Clear textarea
    document.getElementById('answer-textarea').value = '';
    document.getElementById('char-count').textContent = '0';

    showScreen('exercise');
}

function submitAnswer() {
    const answer = document.getElementById('answer-textarea').value.trim();

    if (!answer) {
        alert('בוא נכתוב משהו קודם! 😊');
        return;
    }

    // Calculate points
    let points = 100; // Base points

    // Bonus for length
    if (answer.length > 100) {
        points += 50;
    }

    // Bonus for streak
    if (appState.streak >= 2) {
        points += 50;
    }
    if (appState.streak >= 3) {
        points += 100;
    }
    if (appState.streak >= 7) {
        points += 400; // Total 500 for 7 day streak
    }

    // Update state
    const oldLevel = appState.currentLevel;
    appState.totalXP += points;
    appState.totalExercises++;
    appState.exerciseStats[appState.todayExercise.type]++;
    appState.todayCompleted = true;
    updateStreak();

    // Add to history
    appState.history.unshift({
        date: getTodayString(),
        type: appState.todayExercise.type,
        prompt: appState.todayExercise.prompt,
        answer: answer,
        points: points
    });

    // Check for new level
    const newLevel = calculateLevel(appState.totalXP);
    const leveledUp = newLevel > oldLevel;
    appState.currentLevel = newLevel;

    // Check for new badges
    const newBadges = checkBadges();

    saveState();

    // Show feedback
    showFeedback(answer, points, leveledUp, newLevel);
}

function showFeedback(answer, points, leveledUp, newLevel) {
    showScreen('feedback');

    // Start with celebration
    document.getElementById('celebration').style.display = 'block';
    document.getElementById('feedback-content').style.display = 'none';

    // Trigger confetti
    triggerConfetti();

    // Show feedback content after 1.5 seconds
    setTimeout(() => {
        document.getElementById('celebration').style.display = 'none';
        document.getElementById('feedback-content').style.display = 'block';

        // Random feedback message
        const feedbackMsg = getRandomItem(FEEDBACK_MESSAGES);
        document.getElementById('feedback-message').textContent = feedbackMsg;

        // Show points
        document.querySelector('.points-value').textContent = `+${points}`;

        // Show user's answer
        document.getElementById('answer-display').textContent = answer;

        // Hide detailed feedback initially
        document.getElementById('detailed-feedback').style.display = 'none';
    }, 1500);

    // Show level up modal if leveled up
    if (leveledUp) {
        setTimeout(() => {
            showLevelUpModal(newLevel);
        }, 2500);
    }
}

function showLevelUpModal(level) {
    const levelInfo = getLevelInfo(level);
    document.getElementById('new-level-number').textContent = level;
    document.getElementById('new-level-title').textContent = levelInfo.title + ' ' + levelInfo.icon;

    const modal = document.getElementById('level-up-modal');
    modal.style.display = 'block';

    // Extra confetti for level up!
    triggerConfetti();
}

function closeLevelUpModal() {
    document.getElementById('level-up-modal').style.display = 'none';
}

function updateHistoryScreen() {
    const container = document.getElementById('history-container');

    if (appState.history.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <p>עדיין לא השלמת תרגילים</p>
                <p class="empty-subtext">בוא נתחיל! 🚀</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    appState.history.forEach(item => {
        const exerciseType = EXERCISE_TYPES[item.type];
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';

        historyItem.innerHTML = `
            <div class="history-header">
                <div class="history-type">
                    <span>${exerciseType.icon}</span>
                    <span>${exerciseType.name}</span>
                </div>
                <div class="history-date">${formatDate(item.date)}</div>
            </div>
            <div class="history-prompt">${item.prompt}</div>
            <div class="history-answer">${item.answer}</div>
        `;

        container.appendChild(historyItem);
    });
}

function updateStatsScreen() {
    const levelInfo = getLevelInfo(appState.currentLevel);

    document.getElementById('stats-level').textContent = appState.currentLevel;
    document.getElementById('stats-level-title').textContent = `${levelInfo.title} ${levelInfo.icon}`;
    document.getElementById('stats-total-points').textContent = appState.totalXP;
    document.getElementById('stats-streak').textContent = appState.streak;
    document.getElementById('stats-best-streak').textContent = appState.bestStreak;

    // Exercise breakdown
    document.getElementById('count-hyperbole').textContent = appState.exerciseStats.hyperbole;
    document.getElementById('count-comparisons').textContent = appState.exerciseStats.comparisons;
    document.getElementById('count-whatif').textContent = appState.exerciseStats.whatif;
    document.getElementById('count-observations').textContent = appState.exerciseStats.observations;

    // Streak calendar
    const last7Days = getLast7Days();
    const calendar = document.getElementById('streak-calendar');
    calendar.innerHTML = '';

    last7Days.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day-indicator';
        if (day.completed) {
            dayElement.classList.add('completed');
            dayElement.textContent = '✓';
        } else {
            dayElement.classList.add('missed');
            dayElement.textContent = '✗';
        }
        dayElement.title = day.dayName;
        calendar.appendChild(dayElement);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dateStr = date.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (dateStr === todayStr) return 'היום';
    if (dateStr === yesterdayStr) return 'אתמול';

    return date.toLocaleDateString('he-IL');
}

// ===== CONFETTI EFFECT =====

function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150;
    const colors = ['#FFD700', '#FF0055', '#8B00FF', '#00FFFF', '#FF10F0'];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let frames = 0;
    const maxFrames = 180; // 3 seconds at 60fps

    function animate() {
        if (frames >= maxFrames) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        frames++;
        requestAnimationFrame(animate);
    }

    animate();
}

// ===== EVENT LISTENERS =====

function initEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const screen = btn.getAttribute('data-screen');
            showScreen(screen);

            // Update content based on screen
            if (screen === 'dashboard') {
                updateDashboard();
            } else if (screen === 'history') {
                updateHistoryScreen();
            } else if (screen === 'stats') {
                updateStatsScreen();
            }
        });
    });

    // Start exercise button
    document.getElementById('start-exercise-btn').addEventListener('click', showExerciseScreen);

    // Back to dashboard
    document.getElementById('back-to-dashboard').addEventListener('click', () => {
        showScreen('dashboard');
        updateDashboard();
    });

    // Character counter
    document.getElementById('answer-textarea').addEventListener('input', (e) => {
        document.getElementById('char-count').textContent = e.target.value.length;
    });

    // Submit answer
    document.getElementById('submit-answer-btn').addEventListener('click', submitAnswer);

    // More feedback button
    document.getElementById('more-feedback-btn').addEventListener('click', () => {
        document.getElementById('detailed-feedback').style.display = 'block';
        document.getElementById('more-feedback-btn').style.display = 'none';

        // Generate simple feedback
        generateDetailedFeedback();
    });

    // Done feedback button
    document.getElementById('done-feedback-btn').addEventListener('click', () => {
        showScreen('dashboard');
        updateDashboard();
    });

    // Level up modal close
    document.getElementById('close-level-up').addEventListener('click', closeLevelUpModal);

    // Settings - Save username
    document.getElementById('save-username-btn').addEventListener('click', () => {
        const newName = document.getElementById('username-input').value.trim();
        if (newName) {
            appState.userName = newName;
            saveState();
            updateDashboard();
            alert('השם שונה בהצלחה! 🎉');
        }
    });

    // Settings - Reset data
    document.getElementById('reset-data-btn').addEventListener('click', () => {
        if (confirm('האם אתה בטוח? פעולה זו תמחק את כל ההתקדמות שלך!')) {
            localStorage.removeItem('humorCasinoState');
            location.reload();
        }
    });

    // Settings - Notifications toggle
    document.getElementById('notifications-toggle').addEventListener('change', (e) => {
        if (e.target.checked) {
            // Request notification permission
            if ('Notification' in window && Notification.permission !== 'granted') {
                Notification.requestPermission();
            }
        }
    });
}

function generateDetailedFeedback() {
    // Simple feedback generation
    const feedbackTips = [
        { what: 'השימוש בהיפרבולה שלך היה מצוין!', tip: 'נסה להוסיף עוד פרט ויזואלי אחד', example: 'למשל, תאר מה קרה כתוצאה מההיפרבולה' },
        { what: 'הדימוי שיצרת ממש חזק!', tip: 'אם תוסיף הגזמה נוספת, זה יהיה עוד יותר מצחיק', example: 'תחשוב על השלכה נוספת מפתיעה' },
        { what: 'הרעיון שלך מקורי ומצחיק!', tip: 'נסה להוסיף טוויסט בסוף', example: 'משהו שייתן לזה עוד שכבה של הפתעה' },
        { what: 'התשובה שלך ספציפית ומעניינת!', tip: 'אם תרחיב עוד קצת, זה יכול להיות מושלם', example: 'תוסיף עוד משפט אחד עם פרט מפתיע' }
    ];

    const randomFeedback = getRandomItem(feedbackTips);

    document.getElementById('what-worked').textContent = randomFeedback.what;
    document.getElementById('improvement-tip').textContent = randomFeedback.tip;
    document.getElementById('improved-example').textContent = `💡 ${randomFeedback.example}`;
}

// ===== INITIALIZATION =====

function init() {
    loadState();
    initEventListeners();
    generateDailyExercise();
    updateDashboard();

    // Set username input value
    document.getElementById('username-input').value = appState.userName;

    console.log('🎰 קזינו ההומור מוכן לפעולה! 🎰');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
