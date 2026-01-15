// =========================================
// 🎰 קזינו ההומור - JavaScript Logic 🎰
// =========================================

// ===== CONFIGURATION & DATA =====

// Claude API Configuration
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

// Exercise Types Configuration
const EXERCISE_TYPES = {
    hyperbole: {
        name: 'היפרבולה (הגזמה)',
        icon: '💥',
        description: 'קח דבר יומיומי והפוך אותו למוגזם לגמרי! ככל שיותר אבסורדי - יותר מצחיק!',
        hints: [
            '💡 תחשוב על דבר יומיומי שמעצבן אותך',
            '💡 הגזם אותו עד הסוף - ככל שיותר אבסורדי, יותר מצחיק!',
            '💡 הוסף פרטים ויזואליים שעוזרים לדמיין את המצב'
        ]
    },
    comparisons: {
        name: 'השוואות מוזרות',
        icon: '🔄',
        description: 'השווה דבר אחד לדבר אחר לגמרי לא קשור! מצא חיבור מפתיע בין שני דברים!',
        hints: [
            '💡 חפש דבר אחד שמעצבן או מסובך בחיים',
            '💡 חבר אותו למשהו לגמרי לא קשור אבל שיש לו הגיון מעוות',
            '💡 תסביר למה הם דומים בצורה מפתיעה'
        ]
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
    ]
};

// Excited GIFs for feedback (rotating)
const EXCITED_GIFS = [
    'https://media.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif', // YES celebration
    'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', // Dancing celebration
    'https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif', // Excited jump
    'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif', // Awesome
    'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif', // Epic celebration
    'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif', // Mind blown
    'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif', // Clapping excited
    'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif'  // Pumped up
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
    claudeApiKey: '', // User will set this in settings
    totalXP: 0,
    currentLevel: 1,
    streak: 0,
    bestStreak: 0,
    totalExercises: 0,
    lastCompletedDate: null,
    currentExercise: null,
    lastExerciseType: null, // Track last exercise type for sequential order
    history: [],
    earnedBadges: [],
    exerciseStats: {
        hyperbole: 0,
        comparisons: 0
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

// Generate a NEW exercise in sequential order (hyperbole ↔ comparisons)
function generateNewExercise() {
    const typesOrder = ['hyperbole', 'comparisons'];

    // Find next type in sequence
    let nextType;
    if (!appState.lastExerciseType) {
        nextType = typesOrder[0]; // Start with hyperbole
    } else {
        const currentIndex = typesOrder.indexOf(appState.lastExerciseType);
        const nextIndex = (currentIndex + 1) % typesOrder.length;
        nextType = typesOrder[nextIndex];
    }

    const randomPrompt = getRandomItem(PROMPTS[nextType]);

    const exercise = {
        type: nextType,
        prompt: randomPrompt
    };

    appState.currentExercise = exercise;
    appState.lastExerciseType = nextType;
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

// ===== CLAUDE API INTEGRATION =====

async function getClaudeFeedback(exerciseType, prompt, answer) {
    const exerciseTypeNames = {
        hyperbole: 'היפרבולה (הגזמה)',
        comparisons: 'השוואות מוזרות'
    };

    const systemPrompt = `אתה מאמן הומור אישי בעברית. התפקיד שלך לעזור למשתמש להשתפר בכתיבה הומוריסטית בצורה ידידותית וקלילה, כמו חבר טוב.

דבר בעברית קלילה וחברית - כאילו אתה מדבר עם חבר בקפה. השתמש ב"אתה" ולא "אתם". תהיה אנרגטי, מעודד, וכיפי!

חשוב: אל תהיה פורמלי! תדבר בשפה יומיומית, עם הומור, כמו שיחה טבעית בין חברים.

אתה מלמד לפי השיטה של קונן אובריין:
- Premise (הנחת יסוד) + Heightening (החרפה והגזמה)
- שימוש בפרטים ספציפיים ומפתיעים
- בניית שכבות של הומור אחת על השנייה
- חיבור לדברים שכולם מכירים אבל אף אחד לא אמר

זכור: ההומור הכי חזק בא מפרטים ספציפיים ומהחרפת המצב צעד אחר צעד.`;

    const userPrompt = `המשתמש עשה תרגיל ${exerciseTypeNames[exerciseType]}.

הפרומפט היה: "${prompt}"

התשובה שלו: "${answer}"

⚠️ קריטי - קרא את זה לפני שאתה עונה:
1. אסור לך להיות גנרי! כל פידבק חייב להיות מבוסס בדיוק על מה שהמשתמש כתב
2. הדוגמאות המשופרות חייבות לקחת את המשפט המדויק שהוא כתב ולשפר אותו
3. אל תכתוב "תוסיף פרטים" - תראה לו איזה פרטים! קח את המשפט שלו ותשכתב אותו עם הפרטים
4. כל דוגמה חייבת להתחיל מהרעיון שהוא כתב, לא רעיון חדש!

תן לו פידבק מפורט בפורמט הבא בדיוק (חשוב מאוד לשמור על הפורמט!):

[התחלה_חגיגית]
(כתוב כאן הודעת עידוד קצרה ואנרגטית - משפט אחד!)
[סוף_התחלה_חגיגית]

[מה_עבד_טוב]
1. (צטט משהו ספציפי מהתשובה שלו שעבד טוב - תסביר בדיוק למה זה עובד!)
2. (עוד משהו ספציפי מהתשובה שלו - הראה לו מה הוא עשה נכון!)
[סוף_מה_עבד_טוב]

[מה_לא_עבד]
1. (צטט משהו ספציפי מהתשובה שלו שאפשר לשפר - תסביר בדיוק מה חסר!)
2. (עוד נקודה ספציפית - הראה לו מה יכול להיות יותר חזק!)
[סוף_מה_לא_עבד]

[איך_לשפר]
דוגמה 1: "במקום שכתבת '${answer}', אפשר לכתוב: '[כאן תכתוב גרסה משופרת שמתחילה מהרעיון המדויק שלו אבל עם עוד פרטים ספציפיים/הגזמה/שכבות]' - ככה הוספתי [תסביר מה הוספת]"

דוגמה 2: "כיוון אחר: '[כאן תקח את אותו רעיון אבל תשפר אותו בכיוון שונה - אולי פרט אחר, זווית אחרת, הגזמה שונה]' - כאן [תסביר מה עשית אחרת]"
[סוף_איך_לשפר]

חשוב:
- דבר בשפה יומיומית וקלילה כמו שיחה עם חבר
- תהיה אנרגטי ומעודד אבל גם כן כנה
- תן ביקורת בונה בצורה נחמדה
- אסור לך להיות גנרי! כל משפט חייב להיות מחובר למה שהמשתמש כתב
- הדוגמאות המשופרות לוקחות את המשפט שלו ומשפרות אותו, לא כותבות משפט חדש!
- השתמש בהומור גם בפידבק!`;

    // Check if API key is set
    console.log('🔑 API Key check:', appState.claudeApiKey ? `Present (${appState.claudeApiKey.substring(0,10)}...)` : 'Missing');

    if (!appState.claudeApiKey) {
        // No API key - return fallback feedback
        console.log('⚠️ No API Key - returning fallback feedback');
        return {
            celebration: 'אחלה! בואו נראה מה היה כאן! 💪 (רוצה פידבק אישי מקלוד? הוסף API Key בהגדרות!)',
            whatWorked: [
                'יש כאן רעיון מעניין!',
                'אני רואה שהשקעת מחשבה בזה!'
            ],
            whatDidntWork: [
                'אפשר להוסיף עוד פרטים כדי לעשות את זה יותר חזק',
                'נסה להיות יותר ספציפי - זה יעזור להומור לבוא לידי ביטוי'
            ],
            examples: [
                'נסה להוסיף פרט מפתיע שיעשה את זה יותר מצחיק!',
                'חשוב על השלכה מוגזמת יותר של המצב!'
            ]
        };
    }

    console.log('✅ API Key found - calling Claude API...');

    try {
        const response = await fetch(CLAUDE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': appState.claudeApiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-haiku-20241022',
                max_tokens: 2000,
                messages: [{
                    role: 'user',
                    content: userPrompt
                }],
                system: systemPrompt
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const feedbackText = data.content[0].text;

        // Parse the feedback
        const parsedFeedback = parseFeedback(feedbackText);
        return parsedFeedback;

    } catch (error) {
        console.error('Error getting Claude feedback:', error);
        // Fallback to simple feedback
        return {
            celebration: 'אחלה! בואו נראה מה היה כאן! 💪',
            whatWorked: [
                'יש כאן רעיון מעניין!',
                'אני רואה שהשקעת מחשבה בזה!'
            ],
            whatDidntWork: [
                'אפשר להוסיף עוד פרטים כדי לעשות את זה יותר חזק',
                'נסה להיות יותר ספציפי - זה יעזור להומור לבוא לידי ביטוי'
            ],
            examples: [
                'נסה להוסיף פרט מפתיע שיעשה את זה יותר מצחיק!',
                'חשוב על השלכה מוגזמת יותר של המצב!'
            ]
        };
    }
}

function parseFeedback(text) {
    const celebration = extractBetween(text, '[התחלה_חגיגית]', '[סוף_התחלה_חגיגית]') || 'וואו! בוא נראה מה יש לנו כאן! 🔥';

    const whatWorkedText = extractBetween(text, '[מה_עבד_טוב]', '[סוף_מה_עבד_טוב]') || '1. יש כאן פוטנציאל!\n2. אני רואה שהשקעת!';
    const whatWorked = whatWorkedText.split('\n').filter(line => line.trim()).map(line => line.replace(/^\d+\.\s*/, '').trim());

    const whatDidntWorkText = extractBetween(text, '[מה_לא_עבד]', '[סוף_מה_לא_עבד]') || '1. בוא נשפר את זה ביחד!\n2. יש מקום לצמיחה!';
    const whatDidntWork = whatDidntWorkText.split('\n').filter(line => line.trim()).map(line => line.replace(/^\d+\.\s*/, '').trim());

    const examplesText = extractBetween(text, '[איך_לשפר]', '[סוף_איך_לשפר]') || 'דוגמה 1: נסה להוסיף יותר פרטים!\n\nדוגמה 2: תהיה יותר ספציפי!';
    const examples = examplesText.split(/דוגמה \d+:/).filter(ex => ex.trim()).map(ex => ex.trim());

    return {
        celebration,
        whatWorked: whatWorked.slice(0, 2),
        whatDidntWork: whatDidntWork.slice(0, 2),
        examples: examples.slice(0, 2)
    };
}

function extractBetween(text, start, end) {
    const startIndex = text.indexOf(start);
    const endIndex = text.indexOf(end);
    if (startIndex === -1 || endIndex === -1) return null;
    return text.substring(startIndex + start.length, endIndex).trim();
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
    const exercise = generateNewExercise(); // Always generate new exercise!
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

    // Always show the start button (unlimited exercises!)
    document.getElementById('start-exercise-btn').style.display = 'flex';
    document.getElementById('completion-message').style.display = 'none';

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
    const exercise = appState.currentExercise;
    const exerciseType = EXERCISE_TYPES[exercise.type];

    // Update exercise info
    document.querySelector('#exercise-type-display .type-icon-large').textContent = exerciseType.icon;
    document.getElementById('type-name-large').textContent = exerciseType.name;
    document.getElementById('type-description').textContent = exerciseType.description;
    document.getElementById('prompt-display').textContent = exercise.prompt;

    // Display hints
    const hintsList = document.getElementById('hints-list');
    hintsList.innerHTML = '';
    exerciseType.hints.forEach(hint => {
        const hintElement = document.createElement('div');
        hintElement.className = 'hint-item';
        hintElement.textContent = hint;
        hintsList.appendChild(hintElement);
    });

    // Clear textarea
    document.getElementById('answer-textarea').value = '';
    document.getElementById('char-count').textContent = '0';

    showScreen('exercise');
}

async function submitAnswer() {
    const answer = document.getElementById('answer-textarea').value.trim();

    if (!answer) {
        alert('בוא נכתוב משהו קודם! 😊');
        return;
    }

    // Show loading state
    const submitBtn = document.getElementById('submit-answer-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ קלוד חושב...';
    submitBtn.disabled = true;

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

    // Get feedback from Claude
    const feedback = await getClaudeFeedback(
        appState.currentExercise.type,
        appState.currentExercise.prompt,
        answer
    );

    // Update state
    const oldLevel = appState.currentLevel;
    appState.totalXP += points;
    appState.totalExercises++;
    appState.exerciseStats[appState.currentExercise.type]++;
    updateStreak();

    // Add to history
    appState.history.unshift({
        date: getTodayString(),
        type: appState.currentExercise.type,
        prompt: appState.currentExercise.prompt,
        answer: answer,
        points: points,
        feedback: feedback
    });

    // Check for new level
    const newLevel = calculateLevel(appState.totalXP);
    const leveledUp = newLevel > oldLevel;
    appState.currentLevel = newLevel;

    // Check for new badges
    const newBadges = checkBadges();

    saveState();

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Show feedback
    showFeedback(answer, points, leveledUp, newLevel, feedback);
}

function showFeedback(answer, points, leveledUp, newLevel, claudeFeedback) {
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

        // Show random excited GIF
        const randomGif = getRandomItem(EXCITED_GIFS);
        const gifElement = document.getElementById('excited-gif');
        gifElement.src = randomGif;
        gifElement.style.display = 'block';

        // Show Claude's celebration message
        document.getElementById('feedback-message').textContent = claudeFeedback.celebration;

        // Show points
        document.querySelector('.points-value').textContent = `+${points}`;

        // Show user's answer
        document.getElementById('answer-display').textContent = answer;

        // Auto-show detailed feedback (always visible now!)
        displayDetailedClaudeFeedback(claudeFeedback);
    }, 1500);

    // Show level up modal if leveled up
    if (leveledUp) {
        setTimeout(() => {
            showLevelUpModal(newLevel);
        }, 2500);
    }
}

function displayDetailedClaudeFeedback(feedback) {
    // Show the detailed feedback section
    document.getElementById('detailed-feedback').style.display = 'block';
    document.getElementById('more-feedback-btn').style.display = 'none';

    // Update what worked
    const whatWorkedHTML = feedback.whatWorked.map((item, i) => `${i + 1}. ${item}`).join('<br><br>');
    document.getElementById('what-worked').innerHTML = whatWorkedHTML;

    // Update what didn't work
    const whatDidntWorkHTML = feedback.whatDidntWork.map((item, i) => `${i + 1}. ${item}`).join('<br><br>');
    document.getElementById('improvement-tip').innerHTML = whatDidntWorkHTML;

    // Update examples
    const examplesHTML = feedback.examples.map((ex, i) => `
        <div style="margin-bottom: 15px; padding: 15px; background: rgba(255, 215, 0, 0.1); border: 2px solid var(--gold); border-radius: 10px;">
            <strong>דוגמה ${i + 1}:</strong><br>
            ${ex}
        </div>
    `).join('');
    document.getElementById('improved-example').innerHTML = examplesHTML;
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

    // Settings - Save API Key
    document.getElementById('save-api-key-btn').addEventListener('click', () => {
        const newApiKey = document.getElementById('api-key-input').value.trim();
        if (newApiKey) {
            appState.claudeApiKey = newApiKey;
            saveState();
            console.log('✅ API Key saved successfully! Length:', newApiKey.length);
            alert('ה-API Key נשמר בהצלחה! 🤖 עכשיו תקבל פידבק אישי מקלוד!');
        } else {
            appState.claudeApiKey = '';
            saveState();
            console.log('❌ API Key removed');
            alert('ה-API Key הוסר. תקבל פידבק גנרי.');
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

// ===== INITIALIZATION =====

function init() {
    loadState();
    initEventListeners();
    generateNewExercise();
    updateDashboard();

    // Set username input value
    document.getElementById('username-input').value = appState.userName;

    // Set API key input value (show masked if exists)
    if (appState.claudeApiKey) {
        document.getElementById('api-key-input').value = appState.claudeApiKey;
    }

    console.log('🎰 קזינו ההומור מוכן לפעולה עם Claude API! 🎰');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
