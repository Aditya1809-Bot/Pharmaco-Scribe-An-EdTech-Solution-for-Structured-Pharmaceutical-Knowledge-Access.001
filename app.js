// --- GLOBAL APP STATE & DOM ELEMENTS ---
let currentUser = null;
let allTopics = []; // This will hold all merged topic data

// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', login);
        document.getElementById('username-input').addEventListener('keyup', e => e.key === 'Enter' && login());
    }
});

// --- AUTHENTICATION & USER DATA ---
function checkLoginStatus() {
    const storedUser = localStorage.getItem('currentUser');
    const authContainer = document.getElementById('auth-container');
    const appWrapper = document.getElementById('app-wrapper');

    if (storedUser) {
        // User is logged in
        currentUser = JSON.parse(storedUser);
        initializeApp();
    } else {
        // User is NOT logged in
        if (authContainer) {
            // We are on the Login/Home page
            authContainer.style.display = 'flex'; 
            if(appWrapper) {
                appWrapper.classList.add('hidden');
                appWrapper.classList.remove('flex');
            }
        } else {
            // We are on an internal page (like pharmacology.html) and not logged in
            // Redirect to index.html to login
            window.location.href = 'index.html';
        }
    }
}

function login() {
    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value.trim();
    if (username === "") return alert("Please enter your name.");
    let users = JSON.parse(localStorage.getItem('pharmaUsers')) || {};
    if (!users[username]) {
        users[username] = { name: username, quizHistory: [] };
    }
    currentUser = users[username];
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('pharmaUsers', JSON.stringify(users));
    
    // Refresh page or initialize directly to update UI
    initializeApp();
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function saveUserData() {
    if (!currentUser) return;
    let users = JSON.parse(localStorage.getItem('pharmaUsers')) || {};
    users[currentUser.name] = currentUser;
    localStorage.setItem('pharmaUsers', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// --- DATA HANDLING ---
function loadAndMergeData() {
    // Ensure all data files exist before proceeding
    if (typeof pharmacologyData === 'undefined' || typeof section_1_data === 'undefined' || typeof section_2_data === 'undefined') {
        console.error("One or more data files are missing. Please check your script tags and file names. A common issue is a typo in a data file preventing it from loading.");
        return;
    }
    
    const allDetailedData = {
        ...section_1_data,
        ...section_2_data,
    };
    
    const bookName = "KD Tripathi, 7th Edition";
    const sections = pharmacologyData[bookName];

    allTopics = []; 
    if (sections && sections.length > 0) {
        sections.forEach(section => {
            const detailedTopics = allDetailedData[section.section] || [];
            section.topics.forEach(baseTopic => {
                const detailedTopic = detailedTopics.find(t => t.topic === baseTopic.topic);
                allTopics.push({
                    ...baseTopic,
                    section: section.section,
                    book: bookName,
                    content: detailedTopic ? detailedTopic.content : []
                });
            });
        });
    }
}


// --- CENTRAL APP INITIALIZER ---
function initializeApp() {
    const authContainer = document.getElementById('auth-container');
    if (authContainer) authContainer.style.display = 'none';

    const appWrapper = document.getElementById('app-wrapper');
    if (appWrapper) {
        appWrapper.classList.remove('hidden');
        appWrapper.classList.add('flex');
    }

    injectNavbarAndFooter();
    loadAndMergeData();

    const path = window.location.pathname;
    // Simple routing check
    if (path.endsWith('/') || path.endsWith('index.html')) {
        initIndexPage();
    } else if (path.endsWith('pharmacology.html')) {
        initPharmacologyPage();
    } else if (path.endsWith('search.html')) {
        initSearchPage();
    } else if (path.endsWith('learn.html')) {
        initLearnPage();
    } else if (path.endsWith('dashboard.html')) {
        initDashboardPage();
    }
}

// --- DYNAMIC CONTENT INJECTION (Navigation & Footer) ---
function injectNavbarAndFooter() {
    const navbarEl = document.querySelector('nav.navbar');
    const footerEl = document.querySelector('footer.footer');
    const currentPage = window.location.pathname;

    if (navbarEl) {
        // THEME UPDATE: Teal Background
        navbarEl.className = 'bg-[#F0FDFA]/80 backdrop-blur-sm shadow-md sticky top-0 z-40 border-b border-teal-100';
        navbarEl.innerHTML = `
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center py-4">
                    <a href="index.html" class="flex items-center text-xl sm:text-2xl font-extrabold text-[#0F766E]">
                        <!-- LOGO UPDATE: Animation Class Added -->
                        <img src="logo.jpg" alt="Pharmaco-Scribe Logo" class="h-8 w-8 mr-3 logo-video-effect">
                        <span>Pharmaco-Scribe</span>
                    </a>
                    
                    <!-- Desktop Menu (Teal Theme) -->
                    <div class="hidden md:flex items-center space-x-8">
                         <a href="index.html" class="nav-link relative font-medium ${currentPage.endsWith('/') || currentPage.endsWith('index.html') ? 'active' : ''}">Home</a>
                         <a href="curriculum.html" class="nav-link relative font-medium ${(currentPage.endsWith('curriculum.html') || currentPage.endsWith('pharmacology.html')) ? 'active' : ''}">Pharma Curriculum</a>
                         <a href="search.html" class="nav-link relative font-medium ${currentPage.endsWith('search.html') ? 'active' : ''}">Search</a>
                         <a href="learn.html" class="nav-link relative font-medium ${currentPage.endsWith('learn.html') ? 'active' : ''}">Learn</a>
                         <a href="dashboard.html" class="nav-link relative font-medium ${currentPage.endsWith('dashboard.html') ? 'active' : ''}">Dashboard</a>
                    </div>
                    <div class="hidden md:flex items-center">
                        <span class="text-[#0F766E] font-medium mr-4">Welcome, ${currentUser.name}!</span>
                        <button id="logout-btn-desktop" class="bg-[#0F766E] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#115E59] transition-colors">Logout</button>
                    </div>

                    <!-- Mobile Menu Button -->
                    <div class="md:hidden">
                        <button id="mobile-menu-button" class="text-[#0F766E] text-2xl">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </div>

                <!-- Mobile Menu -->
                <div id="mobile-menu" class="hidden md:hidden py-4 space-y-2 border-t border-teal-100">
                    <a href="index.html" class="block py-2 px-4 text-lg font-semibold text-[#0F766E] hover:bg-[#CCFBF1] rounded">Home</a>
                    <a href="curriculum.html" class="block py-2 px-4 text-lg font-semibold text-[#0F766E] hover:bg-[#CCFBF1] rounded">Pharma Curriculum</a>
                    <a href="search.html" class="block py-2 px-4 text-lg font-semibold text-[#0F766E] hover:bg-[#CCFBF1] rounded">Search</a>
                    <a href="learn.html" class="block py-2 px-4 text-lg font-semibold text-[#0F766E] hover:bg-[#CCFBF1] rounded">Learn</a>
                    <a href="dashboard.html" class="block py-2 px-4 text-lg font-semibold text-[#0F766E] hover:bg-[#CCFBF1] rounded">Dashboard</a>
                    <div class="border-t border-teal-100 my-4"></div>
                    <div class="px-4 py-2">
                        <p class="text-[#0F766E] font-medium mb-4">Welcome, ${currentUser.name}!</p>
                        <button id="logout-btn-mobile" class="w-full bg-[#0F766E] text-white px-4 py-2 rounded-full font-semibold">Logout</button>
                    </div>
                </div>
            </div>`;
    }

    if (footerEl) {
        footerEl.innerHTML = `
            <p>&copy; 2025 Pharmaco-Scribe. An Avishkar Project. | 
            <a href="#" id="about-us-link" class="hover:underline font-bold text-[#0F766E]">About Us</a>
            </p>`;
    }

    // Add event listeners for both desktop and mobile logout buttons
    const logoutBtnDesktop = document.getElementById('logout-btn-desktop');
    const logoutBtnMobile = document.getElementById('logout-btn-mobile');
    if (logoutBtnDesktop) logoutBtnDesktop.addEventListener('click', logout);
    if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', logout);

    // Mobile menu toggle logic
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Add modal functionality here since footer is on every page
    const aboutUsLink = document.getElementById('about-us-link');
    const aboutUsModal = document.getElementById('about-us-modal');
    const closeAboutModalBtn = document.getElementById('close-about-modal-btn');
    if (aboutUsLink && aboutUsModal && closeAboutModalBtn) {
        aboutUsLink.addEventListener('click', (e) => {
            e.preventDefault();
            aboutUsModal.classList.remove('hidden');
            aboutUsModal.classList.add('flex');
        });
        closeAboutModalBtn.addEventListener('click', () => {
            aboutUsModal.classList.add('hidden');
            aboutUsModal.classList.remove('flex');
        });
        aboutUsModal.addEventListener('click', (e) => {
            if (e.target.id === 'about-us-modal') {
                aboutUsModal.classList.add('hidden');
                aboutUsModal.classList.remove('flex');
            }
        });
    }
}

// --- REUSABLE MODAL & CONTENT RENDERER ---
function renderTopicContent(contentArray) {
    if (!contentArray || contentArray.length === 0) {
        return '<p class="text-gray-600">No detailed content available for this topic yet.</p>';
    }
    return contentArray.map(item => {
        switch (item.type) {
            case 'h3': return `<h3 class="text-2xl font-bold text-[#14B8A6] mt-6 mb-3 border-b border-teal-100 pb-2">${item.text}</h3>`;
            case 'h4': return `<h4 class="text-xl font-semibold text-[#0F766E] mt-4 mb-2">${item.text}</h4>`;
            case 'h5': return `<h5 class="text-lg font-semibold text-[#0F766E] mt-3 mb-1">${item.text}</h5>`;
            case 'p': return `<p class="text-slate-600 leading-relaxed mb-4">${item.text}</p>`;
            case 'list': return `<ul class="list-disc list-inside space-y-2 text-slate-600 pl-4 mb-4">${item.items.map(li => `<li>${li}</li>`).join('')}</ul>`;
            default: return '';
        }
    }).join('');
}

function showTopicContentModal(topicData) {
    const modal = document.getElementById('topic-modal');
    if (!modal) return;

    document.getElementById('modal-topic-title').textContent = topicData.topic;
    document.getElementById('modal-topic-book-page').textContent = `From: ${topicData.book}, Page ${topicData.page}`;
    
    const contentContainer = document.getElementById('modal-topic-content-container');
    if(contentContainer) {
        contentContainer.innerHTML = renderTopicContent(topicData.content);
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// --- INDEX/HOME PAGE LOGIC ---
function initIndexPage() {
    const titleEl = document.getElementById('animated-title');
    if (!titleEl) return;

    const text = "Master Pharmacy, Simplified.";
    titleEl.innerHTML = `<div class="animated-word-container">${text.split(' ').map(word => `<span class="animated-word">${word}</span>`).join(' ')}</div>`;

    const wordSpans = titleEl.querySelectorAll('.animated-word');
    
    wordSpans.forEach((span, index) => {
        span.style.transitionDelay = `${index * 0.15}s`;
    });

    setTimeout(() => {
        wordSpans.forEach(span => {
            span.classList.add('visible');
        });
    }, 100);
}

// --- PHARMACOLOGY PAGE LOGIC ---
function initPharmacologyPage() {
    const bookSelector = document.getElementById('book-selector');
    const modal = document.getElementById('topic-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const indexContainer = document.getElementById('index-container');

    if (typeof pharmacologyData === 'undefined') {
        if(indexContainer) indexContainer.innerHTML = '<p class="text-red-500 text-center">Error: pharmacology-data.js index file not found.</p>';
        return;
    }
    
    const books = Object.keys(pharmacologyData);
    
    if(bookSelector) {
        // DEFAULT OPTION FIX:
        bookSelector.innerHTML = `<option value="" disabled selected>Select a Reference Book</option>` + 
                                 books.map(book => `<option value="${book}">${book}</option>`).join('');
    }

    function renderIndex(bookName) {
        if (!indexContainer) return;
        const sections = pharmacologyData[bookName];

        if (!sections || sections.length === 0) {
            indexContainer.innerHTML = '<p class="text-center text-gray-500 mt-8 text-lg">Content for this reference book is coming soon.</p>';
            return;
        }

        // THEME UPDATE: Teal Classes
        indexContainer.innerHTML = sections.map(section => `
            <div class="bg-white p-6 rounded-2xl shadow-lg border border-teal-100 mb-6">
                <h2 class="text-2xl font-bold text-[#0F766E] mb-4">${section.section}</h2>
                <ul class="space-y-2">
                    ${section.topics.map(topic => `
                        <li><a href="#" class="topic-link text-lg hover:text-[#14B8A6] transition-colors" data-topic-name="${topic.topic}">- ${topic.topic}</a></li>
                    `).join('')}
                </ul>
            </div>`).join('');
        addTopicLinkListeners();
    }

    function addTopicLinkListeners() {
        document.querySelectorAll('.topic-link').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const topicName = e.currentTarget.dataset.topicName;
                const topicData = allTopics.find(t => t.topic === topicName);
                if (topicData) {
                    showTopicContentModal(topicData);
                } else {
                    alert('Detailed content for this topic is not available yet.');
                }
            });
        });
    }

    if(modal && closeModalBtn){
        closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
        modal.addEventListener('click', (e) => (e.target.id === 'topic-modal') && modal.classList.add('hidden'));
    }

    if(bookSelector) {
        if (bookSelector.value) {
            renderIndex(bookSelector.value);
        } else {
            if(indexContainer) indexContainer.innerHTML = '<p class="text-center text-gray-500 mt-8 text-lg">Please select a reference book from the dropdown above.</p>';
        }

        bookSelector.addEventListener('change', () => {
            if(bookSelector.value) renderIndex(bookSelector.value);
        });
    }
}

// --- SEARCH PAGE LOGIC ---
function initSearchPage() {
    const searchInput = document.getElementById('search-input');
    const resultsWrapper = document.getElementById('search-results-wrapper');
    const resultsContainer = document.getElementById('search-results');
    const placeholder = document.getElementById('search-placeholder'); 
    const modal = document.getElementById('topic-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // 1. SMART KEYWORD MAP: Connects user terms to actual pharmacology topics
    const keywordMap = {
        "diabetes": ["insulin", "hypoglycaemic", "glucagon"],
        "pain": ["analgesic", "nsaid", "opioid", "anesthetics"],
        "hypertension": ["antihypertensive", "diuretics", "beta-blocker", "calcium channel", "ace inhibitor", "renin"],
        "asthma": ["respiratory", "bronchial", "salbutamol", "corticosteroids"],
        "acidity": ["peptic ulcer", "gerd", "omeprazole", "antacid", "proton pump"],
        "infection": ["antimicrobial", "antibiotic", "antifungal", "antiviral", "penicillin"],
        "heart": ["cardiovascular", "cardiac", "angina", "arrhythmia", "heart failure"],
        "brain": ["cns", "central nervous system", "sedative", "antipsychotic", "antidepressant", "epilepsy"]
    };

    function performSearch(query) {
        if (!resultsWrapper) return;
        
        const cleanQuery = query.toLowerCase().trim();

        // Toggle visibility
        if (!cleanQuery) {
            resultsWrapper.classList.add('hidden');
            if(placeholder) placeholder.classList.remove('hidden');
            return;
        }
        
        if(placeholder) placeholder.classList.add('hidden');
        resultsWrapper.classList.remove('hidden');
        
        // 2. SEARCH LOGIC: Check Topic Name OR Section Name OR Keyword Map
        const filteredTopics = allTopics.filter(topic => {
            const topicText = topic.topic.toLowerCase();
            const sectionText = topic.section.toLowerCase();
            
            // Direct Match
            if (topicText.includes(cleanQuery) || sectionText.includes(cleanQuery)) {
                return true;
            }

            // Keyword Map Match
            if (keywordMap[cleanQuery]) {
                return keywordMap[cleanQuery].some(keyword => 
                    topicText.includes(keyword) || sectionText.includes(keyword)
                );
            }
            
            return false;
        });
        
        if (filteredTopics.length === 0) {
            if(resultsContainer) resultsContainer.innerHTML = `<p class="text-center text-gray-500 col-span-full">No topics found matching "${query}".</p>`;
        } else {
            if(resultsContainer) {
                resultsContainer.innerHTML = filteredTopics.map(topic => {
                    // Extract full System/Section name including number as requested
                    const sectionName = topic.section; 
                    
                    return `
                    <div class="bg-white p-5 rounded-xl shadow-lg border border-teal-100 hover:border-[#14B8A6] transition-colors group">
                        <div class="mb-3">
                            <span class="inline-block bg-[#F0FDFA] text-[#0F766E] text-xs font-bold px-2 py-1 rounded border border-teal-100">
                                ${sectionName}
                            </span>
                        </div>
                        <a href="#" class="search-result-link text-lg font-bold text-[#0F766E] group-hover:text-[#14B8A6] block" data-topic-name='${topic.topic}'>
                            ${topic.topic}
                        </a>
                    </div>
                `}).join('');
                addSearchResultListeners();
            }
        }
    }

    function addSearchResultListeners() {
        document.querySelectorAll('.search-result-link').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const topicName = e.currentTarget.dataset.topicName;
                const topicData = allTopics.find(t => t.topic === topicName);
                if(topicData) showTopicContentModal(topicData);
            });
        });
    }
    
    if(searchInput) searchInput.addEventListener('input', () => performSearch(searchInput.value));
    
    // Listeners for categories and tags
    document.querySelectorAll('.category-card, .trending-tag').forEach(el => {
        el.addEventListener('click', () => {
            const searchTerm = el.getAttribute('data-search');
            if (searchInput && searchTerm) {
                searchInput.value = searchTerm;
                performSearch(searchTerm);
            }
        });
    });
    
    if(modal && closeModalBtn){
        closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
        modal.addEventListener('click', (e) => (e.target.id === 'topic-modal') && modal.classList.add('hidden'));
    }
}


// --- LEARN PAGE LOGIC ---
function initLearnPage() {
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById(tab.dataset.tab);
            tabContents.forEach(content => content.classList.add('hidden'));
            if(target) {
                target.classList.remove('hidden');
                target.classList.add('flex');
            }
        });
    });

    const detailedTopics = allTopics.filter(t => t.content && t.content.length > 0);

    // --- Flashcard Logic ---
    const flashcardCard = document.getElementById('flashcard-card');
    const flipBtn = document.getElementById('flip-card-btn');
    const nextBtn = document.getElementById('next-card-btn');
    const questionEl = document.getElementById('flashcard-question');
    const answerEl = document.getElementById('flashcard-answer');
    const answerTopicEl = document.getElementById('flashcard-answer-topic');

    function summarizeContent(contentArray) {
        if (!contentArray || contentArray.length === 0) return "No summary available.";
        const firstParagraph = contentArray.find(item => item.type === 'p');
        if (firstParagraph && firstParagraph.text) {
            const cleanText = firstParagraph.text.replace(/<[^>]*>?/gm, '');
            const sentences = cleanText.split('. ');
            return sentences.length > 1 ? `${sentences[0]}. ${sentences[1]}.` : `${sentences[0]}.`;
        }
        const firstListItem = contentArray.find(item => item.type === 'list');
        if (firstListItem && firstListItem.items && firstListItem.items.length > 0) {
            return firstListItem.items[0].replace(/<[^>]*>?/gm, '').split('.')[0] + '.';
        }
        return "Key details are available in the main index.";
    }

    // FLASHCARD FIX: Truncated text renderer
    function renderFlashcardBack(contentArray) {
        if (!contentArray || contentArray.length === 0) return "<p class='text-gray-500'>No details available.</p>";
        
        // Priority 1: Find a paragraph
        const pItem = contentArray.find(i => i.type === 'p');
        if (pItem) {
            let text = pItem.text;
            // Limit to roughly 180 characters to ensure fit
            if (text.length > 180) {
                text = text.substring(0, 180) + "...";
            }
            return `<p class="text-center text-[#0F766E] leading-relaxed">${text}</p>`;
        }
        
        // Priority 2: List
        const listItem = contentArray.find(i => i.type === 'list');
        if (listItem && listItem.items.length > 0) {
             let text = listItem.items[0];
             // Strip HTML from list item if present (like <strong>)
             text = text.replace(/<[^>]*>?/gm, ''); 
             if (text.length > 180) text = text.substring(0, 180) + "...";
             return `<p class="text-center text-[#0F766E] leading-relaxed">${text}</p>`;
        }
        
        return "<p class='text-gray-500'>Check full topic for details.</p>";
    }
    
    function showNextFlashcard() {
        if (detailedTopics.length === 0) {
            if (questionEl) questionEl.textContent = "Error loading flashcard data.";
            if (answerEl) answerEl.innerHTML = "<p>Please check data files for typos/errors.</p>";
            return;
        }
        
        if(flashcardCard) flashcardCard.classList.remove('flashcard-flipped');
        const currentFlashcard = detailedTopics[Math.floor(Math.random() * detailedTopics.length)];
        const questionType = Math.random() < 0.5 ? 'definition' : 'identify';

        if (questionEl) {
            if (questionType === 'definition') {
                questionEl.textContent = `What is the key principle of "${currentFlashcard.topic}"?`;
            } else {
                const clue = summarizeContent(currentFlashcard.content);
                questionEl.textContent = `Which topic is described as: "${clue}"`;
            }
        }
        
        // Using fixed renderer
        if (answerEl) answerEl.innerHTML = renderFlashcardBack(currentFlashcard.content);
        if (answerTopicEl) answerTopicEl.textContent = `Topic: ${currentFlashcard.topic}`;
    }
    
    if (flipBtn) flipBtn.addEventListener('click', () => flashcardCard.classList.toggle('flashcard-flipped'));
    if (nextBtn) nextBtn.addEventListener('click', showNextFlashcard);

    // --- Quiz Logic ---
    const quizQuestionEl = document.getElementById('quiz-question');
    const quizOptionsContainer = document.getElementById('quiz-options');
    const quizResultContainer = document.getElementById('quiz-result');
    const quizMainArea = document.getElementById('quiz-main-area');
    const quizProgressContainer = document.getElementById('quiz-progress-container');
    const quizScoreEl = document.getElementById('quiz-score');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const quizCounter = document.getElementById('quiz-counter');
    const quizProgressBar = document.getElementById('quiz-progress-bar');

    let quizQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    const QUIZ_LENGTH = 10;

    function generateQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizQuestions = [];
        const usedTopics = new Set();
        
        while (quizQuestions.length < QUIZ_LENGTH && usedTopics.size < detailedTopics.length) {
            let questionTopic;
            do {
                questionTopic = detailedTopics[Math.floor(Math.random() * detailedTopics.length)];
            } while (usedTopics.has(questionTopic.topic));
            usedTopics.add(questionTopic.topic);

            const options = [questionTopic];
            while (options.length < 4) {
                const randomOption = detailedTopics[Math.floor(Math.random() * detailedTopics.length)];
                if (!options.some(opt => opt.topic === randomOption.topic)) {
                    options.push(randomOption);
                }
            }
            
            quizQuestions.push({
                question: `Which topic best matches the following description: "${summarizeContent(questionTopic.content)}"?`,
                options: options.sort(() => Math.random() - 0.5),
                answer: questionTopic.topic
            });
        }
    }

    function displayQuizQuestion() {
        if(quizCounter) quizCounter.textContent = `Question ${currentQuestionIndex + 1} / ${QUIZ_LENGTH}`;
        if(quizProgressBar) quizProgressBar.style.width = `${((currentQuestionIndex + 1) / QUIZ_LENGTH) * 100}%`;
        
        const q = quizQuestions[currentQuestionIndex];
        if(quizQuestionEl) quizQuestionEl.textContent = q.question;
        // THEME UPDATE: Teal Buttons
        if(quizOptionsContainer) {
            quizOptionsContainer.innerHTML = q.options.map(option =>
                `<button class="quiz-option w-full text-left p-4 border border-teal-100 bg-white rounded-lg transition-colors hover:bg-[#F0FDFA]">${option.topic}</button>`
            ).join('');
            
            document.querySelectorAll('.quiz-option').forEach(btn => {
                btn.addEventListener('click', handleAnswer);
            });
        }
    }

    function handleAnswer(e) {
        const selectedAnswer = e.target.textContent;
        const correctAnswer = quizQuestions[currentQuestionIndex].answer;
        const options = document.querySelectorAll('.quiz-option');

        options.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) btn.classList.add('correct');
            else if (btn.textContent === selectedAnswer) btn.classList.add('incorrect');
        });
        
        if (selectedAnswer === correctAnswer) score++;

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                displayQuizQuestion();
            } else {
                finishQuiz();
            }
        }, 1500);
    }

    function finishQuiz() {
        if(quizMainArea) quizMainArea.classList.add('hidden');
        if(quizProgressContainer) quizProgressContainer.classList.add('hidden');
        if(quizResultContainer) quizResultContainer.classList.remove('hidden');
        if(quizScoreEl) quizScoreEl.textContent = `Your Final Score: ${score} / ${QUIZ_LENGTH}`;

        const result = { score, total: QUIZ_LENGTH, date: new Date().toLocaleString() };
        currentUser.quizHistory.push(result);
        saveUserData();
    }
    
    function startQuiz() {
        if(quizResultContainer) quizResultContainer.classList.add('hidden');
        if(quizMainArea) quizMainArea.classList.remove('hidden');
        if(quizProgressContainer) quizProgressContainer.classList.remove('hidden');
        generateQuiz();
        if(quizQuestions.length > 0) {
            displayQuizQuestion();
        } else {
            if(quizMainArea) quizMainArea.innerHTML = '<p class="text-center text-gray-500">Not enough content to generate a new quiz.</p>';
        }
    }
    
    if (restartQuizBtn) restartQuizBtn.addEventListener('click', startQuiz);

    // --- Case Study Logic ---
    const caseStudyTitleEl = document.getElementById('case-study-title');
    const caseStudyScenarioEl = document.getElementById('case-study-scenario');
    const caseStudyQuestionEl = document.getElementById('case-study-question');
    const caseStudyOptionsContainer = document.getElementById('case-study-options');
    const caseStudyFeedbackEl = document.getElementById('case-study-feedback');
    const caseStudyExplanationEl = document.getElementById('case-study-explanation');
    const nextCaseBtn = document.getElementById('next-case-btn');
    const caseStudyMainEl = document.getElementById('case-study-main');

    let currentCaseStudy = {};

    function displayCaseStudy() {
        if (typeof caseStudies === 'undefined' || caseStudies.length === 0) {
            if(caseStudyMainEl) caseStudyMainEl.innerHTML = '<p class="text-center text-gray-500">No case studies available.</p>';
            return;
        }

        if(caseStudyFeedbackEl) caseStudyFeedbackEl.classList.add('hidden');
        if(caseStudyMainEl) caseStudyMainEl.classList.remove('hidden');

        currentCaseStudy = caseStudies[Math.floor(Math.random() * caseStudies.length)];
        
        if(caseStudyTitleEl) caseStudyTitleEl.textContent = currentCaseStudy.title;
        if(caseStudyScenarioEl) caseStudyScenarioEl.textContent = currentCaseStudy.scenario;
        if(caseStudyQuestionEl) caseStudyQuestionEl.textContent = currentCaseStudy.question;
        
        // THEME UPDATE: Teal Buttons
        if(caseStudyOptionsContainer) {
            caseStudyOptionsContainer.innerHTML = currentCaseStudy.options.map(option => 
                `<button class="case-study-option w-full text-left p-4 border border-teal-100 bg-white rounded-lg transition-colors hover:bg-[#F0FDFA]">${option}</button>`
            ).join('');

            document.querySelectorAll('.case-study-option').forEach(btn => {
                btn.addEventListener('click', handleCaseStudyAnswer);
            });
        }
    }

    function handleCaseStudyAnswer(e) {
        const selectedAnswer = e.target.textContent;
        const isCorrect = selectedAnswer === currentCaseStudy.correctAnswer;
        const options = document.querySelectorAll('.case-study-option');

        options.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === currentCaseStudy.correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.textContent === selectedAnswer) {
                btn.classList.add('incorrect');
            }
        });

        if (caseStudyExplanationEl) {
            caseStudyExplanationEl.innerHTML = `
                <p class="text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}">
                    ${isCorrect ? 'Correct!' : 'Not Quite.'}
                </p>
                <p class="text-gray-700">${currentCaseStudy.explanation}</p>
            `;
            caseStudyExplanationEl.className = `p-4 rounded-lg text-left ${isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`;
        }
        
        if (caseStudyFeedbackEl) caseStudyFeedbackEl.classList.remove('hidden');
    }

    if (nextCaseBtn) nextCaseBtn.addEventListener('click', displayCaseStudy);

    // Initial Load - Improved to prevent UI breakage
    if (detailedTopics.length > 0) {
        showNextFlashcard();
        startQuiz();
        displayCaseStudy();
    } else {
        const flashcardsContent = document.getElementById('flashcards-content');
        const quizContent = document.getElementById('quiz-content');
        const caseStudiesContent = document.getElementById('case-studies-content');

        if(flashcardsContent) flashcardsContent.innerHTML = '<p class="text-center text-gray-500">Error: Could not load data for flashcards. Please check data files.</p>';
        if(quizContent) quizContent.innerHTML = '<p class="text-center text-gray-500">Error: Could not load data for quiz.</p>';
        if(caseStudiesContent) caseStudiesContent.innerHTML = '<p class="text-center text-gray-500">Error: Could not load data for case studies.</p>';
    }
}


// --- DASHBOARD PAGE LOGIC ---
function initDashboardPage() {
    const historyContainer = document.getElementById('quiz-history-container');
    const totalQuizzesEl = document.getElementById('stat-total-quizzes');
    const avgScoreEl = document.getElementById('stat-avg-score');
    
    if (!currentUser || !currentUser.quizHistory || currentUser.quizHistory.length === 0) {
        if(historyContainer) historyContainer.innerHTML = '<p class="text-gray-500 text-center py-4">No quizzes taken yet. Visit the Learn page!</p>';
        if(totalQuizzesEl) totalQuizzesEl.textContent = '0';
        if(avgScoreEl) avgScoreEl.textContent = '0%';
    } else {
        const history = currentUser.quizHistory;
        const total = history.length;
        
        // Calculate Average
        let totalPercentage = 0;
        history.forEach(quiz => {
            totalPercentage += (quiz.score / quiz.total) * 100;
        });
        const avg = Math.round(totalPercentage / total);

        // Update Stats
        if(totalQuizzesEl) totalQuizzesEl.textContent = total;
        if(avgScoreEl) avgScoreEl.textContent = `${avg}%`;

        // Render History (Reverse order for recent first)
        const reversedHistory = [...history].reverse();
        if(historyContainer) {
            historyContainer.innerHTML = reversedHistory.map(result => {
                const percentage = Math.round((result.score / result.total) * 100);
                return `
                    <div class="flex justify-between items-center bg-[#F0FDFA] p-4 rounded-xl border border-teal-100">
                        <div>
                            <p class="font-bold text-[#0F766E] text-lg">Score: ${result.score}/${result.total}</p>
                            <p class="text-xs text-gray-500">${result.date}</p>
                        </div>
                        <div class="font-bold text-xl text-[#14B8A6]">${percentage}%</div>
                    </div>
                `;
            }).join('');
        }
    }
}