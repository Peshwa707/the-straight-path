// Main Application JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupNavigation();
    setupSidebarToggle();
    loadQuranContent();
    loadHadithContent();
    loadProphetLessons();
    loadJesusContent();
    loadSalahGuide();
    loadWuduGuide();
    loadDailyGuidance();
    setupSearchFunctionality();
}

// Navigation between sections
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.content-section');

    // Handle main navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            navigateToSection(targetSection);
        });
    });

    // Handle sidebar navigation links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            navigateToSection(targetSection);
            closeSidebar(); // Close sidebar after navigation
        });
    });

    // Helper function to navigate to a section
    function navigateToSection(targetSection) {
        // Remove active class from all buttons, links, and sections
        navButtons.forEach(btn => btn.classList.remove('active'));
        sidebarLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        // Add active class to elements with matching data-section
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-section') === targetSection) {
                btn.classList.add('active');
            }
        });
        sidebarLinks.forEach(link => {
            if (link.getAttribute('data-section') === targetSection) {
                link.classList.add('active');
            }
        });

        // Show the target section
        const section = document.getElementById(targetSection);
        if (section) {
            section.classList.add('active');
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Sidebar Toggle Functionality
function setupSidebarToggle() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('right-sidebar');
    const closeBtn = document.getElementById('sidebar-close');
    const overlay = document.getElementById('sidebar-overlay');

    // Open sidebar
    toggleBtn.addEventListener('click', openSidebar);

    // Close sidebar
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Close sidebar on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });
}

function openSidebar() {
    const sidebar = document.getElementById('right-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.add('open');
    overlay.classList.add('active');
}

function closeSidebar() {
    const sidebar = document.getElementById('right-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

// Quran verses with Tafseer Ibn Kathir
function loadQuranContent() {
    const quranContent = document.getElementById('quran-content');

    const verses = [
        {
            reference: "Surah Al-Fatiha (1:1-7)",
            arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ (١) الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ (٢) الرَّحْمَٰنِ الرَّحِيمِ (٣) مَالِكِ يَوْمِ الدِّينِ (٤) إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (٥) اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ (٦) صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ (٧)",
            translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is [due] to Allah, Lord of the worlds - The Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path - The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
            tafseer: "Ibn Kathir explains that Al-Fatiha is the greatest surah in the Quran and is recited in every unit of prayer. It contains praise of Allah, declaration of His sovereignty, acknowledgment of His mercy, and a supplication for guidance. The 'straight path' refers to Islam, the clear and true religion that leads to Paradise. Those who received Allah's favor are the prophets, truthful ones, martyrs, and righteous people. This surah is a conversation between the servant and Allah, where Allah responds to each statement."
        },
        {
            reference: "Surah Al-Baqarah (2:255) - Ayat al-Kursi",
            arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
            translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
            tafseer: "Ibn Kathir describes this as the greatest verse in the Quran. It affirms Allah's perfect attributes: His oneness, eternal life, self-sufficiency, perfect knowledge, sovereignty, and supreme greatness. The verse emphasizes that nothing happens except by Allah's will and knowledge. His Kursi (footstool) is so vast it encompasses the heavens and earth, yet maintaining them does not burden Him. This verse is highly recommended for protection and is often recited before sleep."
        },
        {
            reference: "Surah Al-Ikhlas (112:1-4)",
            arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ (١) اللَّهُ الصَّمَدُ (٢) لَمْ يَلِدْ وَلَمْ يُولَدْ (٣) وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ (٤)",
            translation: "Say, 'He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent.'",
            tafseer: "Ibn Kathir explains that this surah is equal to one-third of the Quran in meaning, as it completely describes Allah's essence. 'Al-Ahad' (One) means He is unique in His attributes and actions. 'As-Samad' (The Eternal Refuge) means He is the Master to whom all creation turns in their needs. He is free from all imperfections - He has no parents, no children, and nothing in creation resembles Him. This surah is a complete declaration of pure monotheism (Tawhid)."
        },
        {
            reference: "Surah Al-Baqarah (2:286)",
            arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
            translation: "Allah does not burden a soul beyond that it can bear. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned. 'Our Lord, do not impose blame upon us if we forget or make a mistake. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.'",
            tafseer: "Ibn Kathir explains this verse as Allah's mercy and justice. Allah only obligates His servants with what they can handle. Each person will be rewarded for their good deeds and held accountable for their sins. The supplications at the end were taught by Allah to His servants, showing us how to ask for His mercy. When recited sincerely, Allah responds: 'I have done so.' This verse brings comfort to believers, reminding them that Allah is merciful and never burdens them beyond their capacity."
        },
        {
            reference: "Surah Ar-Rahman (55:13)",
            arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
            translation: "So which of the favors of your Lord would you deny?",
            tafseer: "Ibn Kathir notes that this verse is repeated 31 times in Surah Ar-Rahman, addressing both humans and jinn. Each repetition follows mention of Allah's countless blessings - from creation to guidance, from this world to the Hereafter. Allah challenges His creation to deny any of His favors, as they are innumerable and evident. This rhetorical question calls for gratitude and acknowledgment of Allah's endless mercy and generosity. The repetition emphasizes the magnitude and variety of Allah's blessings."
        },
        {
            reference: "Surah Al-Asr (103:1-3)",
            arabic: "وَالْعَصْرِ (١) إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ (٢) إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ (٣)",
            translation: "By time, Indeed, mankind is in loss, Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
            tafseer: "Imam Ash-Shafi'i said that if people only reflected on this surah, it would be sufficient for them. Ibn Kathir explains that Allah swears by time to emphasize that all humans are in a state of loss and ruin - except those who combine four qualities: (1) True faith in Allah, (2) Righteous actions according to that faith, (3) Calling others to truth and righteousness, (4) Encouraging patience in facing hardships and staying away from sin. This surah summarizes the path to salvation in just three verses."
        }
    ];

    verses.forEach(verse => {
        const verseCard = createVerseCard(verse);
        quranContent.appendChild(verseCard);
    });
}

function createVerseCard(verse) {
    const card = document.createElement('div');
    card.className = 'verse-card';
    card.innerHTML = `
        <div class="verse-reference">${verse.reference}</div>
        <div class="verse-arabic">${verse.arabic}</div>
        <div class="verse-translation">${verse.translation}</div>
        <div class="tafseer">
            <h4>Tafseer Ibn Kathir:</h4>
            <p>${verse.tafseer}</p>
        </div>
    `;
    return card;
}

// Hadith Qudsi collection
function loadHadithContent() {
    const hadithContent = document.getElementById('hadith-content');

    const hadiths = [
        {
            number: "Hadith Qudsi 1",
            text: "Allah the Almighty said: 'I am as My servant thinks I am. I am with him when he makes mention of Me. If he makes mention of Me to himself, I make mention of him to Myself; and if he makes mention of Me in an assembly, I make mention of him in an assembly better than it. And if he draws near to Me a hand's span, I draw near to him an arm's length; and if he draws near to Me an arm's length, I draw near to him a fathom's length. And if he comes to Me walking, I go to him at speed.'",
            source: "Narrated by Al-Bukhari and Muslim",
            explanation: "This beautiful hadith teaches us about Allah's infinite mercy and His relationship with His servants. It shows that Allah's response to us is always greater than our efforts. When we think well of Allah, have good expectations of His mercy, and turn to Him in remembrance, He responds with even greater blessings. This encourages us to maintain good thoughts about Allah, remember Him often, and take steps towards righteousness, knowing that Allah will help us far beyond our efforts."
        },
        {
            number: "Hadith Qudsi 2",
            text: "Allah the Almighty said: 'O son of Adam, so long as you call upon Me and ask of Me, I shall forgive you for what you have done, and I shall not mind. O son of Adam, were your sins to reach the clouds of the sky and were you then to ask forgiveness of Me, I would forgive you. O son of Adam, were you to come to Me with sins nearly as great as the earth and were you then to face Me, ascribing no partner to Me, I would bring you forgiveness nearly as great as it.'",
            source: "Narrated by At-Tirmidhi",
            explanation: "This hadith demonstrates Allah's boundless mercy and forgiveness. No matter how many sins a person commits, as long as they turn to Allah in sincere repentance and maintain Tawhid (belief in His oneness), Allah's mercy encompasses all sins. This is an immense source of hope for believers who may feel burdened by their mistakes. It teaches us never to despair of Allah's mercy, to constantly seek His forgiveness, and to maintain our faith in His oneness."
        },
        {
            number: "Hadith Qudsi 3",
            text: "Allah the Almighty said: 'O My servants, I have forbidden oppression for Myself and have made it forbidden amongst you, so do not oppress one another. O My servants, all of you are astray except for those I have guided, so seek guidance of Me and I shall guide you. O My servants, all of you are hungry except for those I have fed, so seek food of Me and I shall feed you. O My servants, all of you are naked except for those I have clothed, so seek clothing of Me and I shall clothe you.'",
            source: "Narrated by Muslim",
            explanation: "This comprehensive hadith establishes several fundamental principles: Allah's prohibition of oppression, humanity's complete dependence on Allah for guidance and sustenance, and the importance of turning to Allah for all our needs. It reminds us that everything we have - guidance, provision, protection - comes from Allah alone. We should avoid oppressing others, seek Allah's guidance constantly, and be grateful for His provisions while helping those in need."
        },
        {
            number: "Hadith Qudsi 4",
            text: "The Prophet (peace be upon him) said that Allah said: 'I have prepared for My righteous servants what no eye has seen, no ear has heard, and no human heart has conceived.'",
            source: "Narrated by Al-Bukhari and Muslim",
            explanation: "This hadith speaks of the unimaginable rewards awaiting the believers in Paradise. The blessings of the Hereafter are beyond human comprehension and imagination. This serves as motivation for believers to strive for righteousness and remain patient through worldly difficulties, knowing that what awaits them is infinitely better than anything they can imagine. It encourages us to prioritize our eternal life over temporary worldly pleasures."
        },
        {
            number: "Hadith Qudsi 5",
            text: "Allah the Almighty said: 'Fasting is Mine and it is I who give reward for it. A man gives up his sexual passion, his food and his drink for My sake. Fasting is like a shield, and he who fasts has two joys: a joy when he breaks his fast and a joy when he meets his Lord. The smell from the mouth of him who fasts is better in Allah's sight than the smell of musk.'",
            source: "Narrated by Al-Bukhari",
            explanation: "This hadith reveals the special status of fasting in Allah's sight. Unlike other acts of worship that can be seen by others, fasting is a purely private act of worship between the servant and Allah. The reward for fasting is not specified because Allah Himself will reward it generously. Fasting brings joy in this life when breaking the fast and eternal joy when meeting Allah. Even the unpleasant breath from fasting is beloved to Allah, showing that what might be considered negative in worldly terms can be most beloved in Allah's sight when done for His sake."
        },
        {
            number: "Hadith Qudsi 6",
            text: "On the Day of Resurrection, Allah will say: 'O son of Adam, I was sick and you did not visit Me.' He will say: 'O Lord, how could I visit You when You are the Lord of the worlds?' He will say: 'Did you not know that My servant so-and-so was sick and you did not visit him? Did you not know that if you had visited him you would have found Me with him?'",
            source: "Narrated by Muslim",
            explanation: "This profound hadith teaches that serving others, especially visiting the sick, is so beloved to Allah that He attributes it to Himself. It shows the immense reward and spiritual proximity to Allah gained through acts of kindness and compassion toward fellow human beings. When we care for others in their time of need, we are essentially serving Allah. This hadith encourages social responsibility, compassion, and community care as forms of worship that bring us closer to Allah."
        },
        {
            number: "Hadith Qudsi 7",
            text: "Allah the Almighty said: 'Whosoever shows enmity to someone devoted to Me, I shall be at war with him. My servant draws not near to Me with anything more loved by Me than the religious duties I have enjoined upon him, and My servant continues to draw near to Me with supererogatory works so that I shall love him. When I love him I am his hearing with which he hears, his seeing with which he sees, his hand with which he strikes and his foot with which he walks. Were he to ask something of Me, I would surely give it to him, and were he to ask Me for refuge, I would surely grant him it.'",
            source: "Narrated by Al-Bukhari",
            explanation: "This extraordinary hadith reveals the path to achieving Allah's love and special closeness. It begins with fulfilling obligatory acts of worship, then progressing to voluntary acts. When a person reaches this level of devotion, Allah grants them special guidance and protection. Their actions become guided by divine wisdom, their perception becomes enlightened, and their supplications are answered. This hadith encourages consistent worship, both obligatory and voluntary, as the means to achieve the highest spiritual stations and Allah's special care."
        }
    ];

    hadiths.forEach(hadith => {
        const hadithCard = createHadithCard(hadith);
        hadithContent.appendChild(hadithCard);
    });
}

function createHadithCard(hadith) {
    const card = document.createElement('div');
    card.className = 'hadith-card';
    card.innerHTML = `
        <div class="hadith-number">${hadith.number}</div>
        <div class="hadith-text">"${hadith.text}"</div>
        <p><em>${hadith.source}</em></p>
        <div class="hadith-explanation">
            <strong>Explanation:</strong>
            <p>${hadith.explanation}</p>
        </div>
    `;
    return card;
}

// Prophet Muhammad's life lessons
function loadProphetLessons() {
    const prophetContent = document.getElementById('prophet-content');

    const lessons = [
        {
            title: "The Trustworthy - Al-Amin",
            story: "Even before prophethood, Muhammad (peace be upon him) was known throughout Makkah as 'Al-Amin' (The Trustworthy). People from all backgrounds would entrust their valuables to him, knowing he would never betray their trust. When he migrated to Madinah, despite facing persecution from the Quraysh, he left Ali ibn Abi Talib behind specifically to return all the items people had entrusted to him.",
            moral: "<strong>Lesson:</strong> Trustworthiness and honesty are fundamental to Islamic character. Even when others wrong us, we must maintain our integrity and fulfill our obligations. A Muslim's word and character should be impeccable, earning the trust of believers and non-believers alike."
        },
        {
            title: "Mercy to All Creation",
            story: "The Prophet (peace be upon him) was the embodiment of mercy. Once, while praying, his grandsons Hassan and Hussain climbed on his back during prostration. He extended his prostration to not disturb them. He showed kindness to animals - when he saw a cat sleeping on his cloak, he cut around it rather than wake it. He forbade cruelty to animals and taught that even showing mercy to a dog by giving it water can lead to Paradise.",
            moral: "<strong>Lesson:</strong> True faith manifests in showing mercy and compassion to all of Allah's creation - humans, animals, and even the environment. The Prophet taught us that mercy is not weakness but the highest form of strength and the quality most beloved to Allah."
        },
        {
            title: "Forgiveness of Enemies",
            story: "When the Prophet (peace be upon him) conquered Makkah after years of persecution, torture, and exile inflicted by the Quraysh, the people feared severe punishment. Instead, he stood before them and asked, 'What do you think I will do with you?' They replied, 'You are a noble brother, son of a noble brother.' He said, 'I say to you what Joseph said to his brothers: No blame upon you today. Go, for you are free.' He forgave them all, including those who had killed his beloved uncle Hamza.",
            moral: "<strong>Lesson:</strong> Forgiveness and mercy triumph over revenge. Even when we have the power to retaliate, choosing forgiveness is the way of the Prophet. This extraordinary act of clemency led many to embrace Islam, showing that hearts are won through mercy, not force."
        },
        {
            title: "Humility in Leadership",
            story: "Despite being the final messenger of Allah and the leader of the Muslim community, Prophet Muhammad (peace be upon him) lived with utmost humility. He mended his own clothes, helped with household chores, and milked his own goats. He sat on the ground with his companions, and visitors couldn't distinguish him from others by appearance alone. Once when his companions wanted to slaughter a sheep, each volunteered for a task, and he said, 'I will gather the firewood.' They said, 'O Messenger of Allah, we will do it.' He replied, 'I know you can do it, but I dislike being distinguished from you. Allah dislikes seeing His servant distinguished from his companions.'",
            moral: "<strong>Lesson:</strong> True leadership is marked by humility and service to others. No matter what position we hold, we should never consider ourselves superior. The greatest among us are those who serve others with humility and treat everyone with equal respect."
        },
        {
            title: "Patience in Adversity",
            story: "The Prophet (peace be upon him) faced immense trials throughout his life. He lost his beloved wife Khadijah and his uncle Abu Talib in the same year (the Year of Sorrow). His children died before him. He was boycotted, starved, and driven from his home. In Taif, he was stoned until his feet bled. When the angel Jibreel asked if he wanted the mountains to be closed on the people of Taif, he refused and instead prayed for their guidance, saying, 'I hope that Allah will bring forth from their descendants people who will worship Allah alone.'",
            moral: "<strong>Lesson:</strong> Patience (Sabr) in the face of hardship is a cornerstone of faith. The Prophet showed us how to remain steadfast, maintain good character, and never lose hope in Allah's mercy, even in the darkest times. Trials are temporary, but our response to them can have eternal rewards."
        },
        {
            title: "Justice for All",
            story: "A woman from a noble family (Bani Makhzum) committed theft, and some companions wanted to intercede to spare her from punishment. When Usama ibn Zayd tried to intercede, the Prophet's face changed color and he said, 'Do you intercede concerning one of the legal punishments of Allah?' He then addressed the people: 'O people! The nations before you went astray because when a rich person committed theft, they would let him go; but when a weak person committed theft, they would execute the legal punishment on him. By Allah, if Fatimah, the daughter of Muhammad, committed theft, Muhammad would cut off her hand!'",
            moral: "<strong>Lesson:</strong> Justice must be blind to status, wealth, and family connections. True justice means applying the same standards to everyone, regardless of their position. This equality before the law is essential for a just society and pleasing to Allah."
        },
        {
            title: "Love for Knowledge",
            story: "The very first revelation to the Prophet was 'Iqra' - Read/Recite. He emphasized seeking knowledge throughout his life, saying, 'Seeking knowledge is obligatory upon every Muslim.' After the Battle of Badr, he allowed prisoners of war to be freed if they taught ten Muslim children how to read and write. He would say, 'The superiority of the scholar over the worshipper is like the superiority of the moon over the stars.'",
            moral: "<strong>Lesson:</strong> Knowledge is the foundation of faith and civilization. Islam encourages continuous learning and values scholars highly. We should dedicate ourselves to learning our religion, beneficial worldly knowledge, and teaching others. Education is a form of worship and a means to better serve Allah and humanity."
        },
        {
            title: "Kindness to Family",
            story: "The Prophet (peace be upon him) was exceptionally kind and loving to his family. He would race with his wife Aisha, help with household chores, and play with his grandchildren. He said, 'The best of you are those who are best to their families, and I am the best among you to my family.' He would kiss his grandchildren publicly, and when someone objected, he said, 'What can I do if Allah has removed mercy from your heart?'",
            moral: "<strong>Lesson:</strong> Family is the first place where Islamic character should be displayed. Being kind, gentle, and loving with our families is not a sign of weakness but of true faith. The Prophet showed that being a strong leader and a gentle family member are not contradictory but complementary."
        }
    ];

    lessons.forEach(lesson => {
        const lessonCard = createLessonCard(lesson);
        prophetContent.appendChild(lessonCard);
    });
}

function createLessonCard(lesson) {
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.innerHTML = `
        <h3>${lesson.title}</h3>
        <div class="story">
            <strong>Story:</strong>
            <p>${lesson.story}</p>
        </div>
        <div class="moral">
            ${lesson.moral}
        </div>
    `;
    return card;
}

// Jesus (Isa) in the Quran - Complete narrative from origin to second coming
function loadJesusContent() {
    const jesusContent = document.getElementById('jesus-content');

    const verses = [
        {
            category: "Mary's Story - The Chosen Mother",
            reference: "Surah Al-Imran (3:42-43)",
            arabic: "وَإِذْ قَالَتِ الْمَلَائِكَةُ يَا مَرْيَمُ إِنَّ اللَّهَ اصْطَفَاكِ وَطَهَّرَكِ وَاصْطَفَاكِ عَلَىٰ نِسَاءِ الْعَالَمِينَ (٤٢) يَا مَرْيَمُ اقْنُتِي لِرَبِّكِ وَاسْجُدِي وَارْكَعِي مَعَ الرَّاكِعِينَ (٤٣)",
            translation: "And [mention] when the angels said, 'O Mary, indeed Allah has chosen you and purified you and chosen you above the women of the worlds. O Mary, be devoutly obedient to your Lord and prostrate and bow with those who bow [in prayer].'",
            tafseer: "Ibn Kathir explains that Mary (Maryam) was chosen by Allah and purified from all imperfections. She was selected above all women of her time for the honor of giving birth to Prophet Jesus without a father, as a sign of Allah's power. Allah commanded her to increase in worship and devotion, which prepared her for the great responsibility ahead."
        },
        {
            category: "The Annunciation - Angel's Glad Tidings",
            reference: "Surah Maryam (19:16-21)",
            arabic: "وَاذْكُرْ فِي الْكِتَابِ مَرْيَمَ إِذِ انتَبَذَتْ مِنْ أَهْلِهَا مَكَانًا شَرْقِيًّا (١٦) فَاتَّخَذَتْ مِن دُونِهِمْ حِجَابًا فَأَرْسَلْنَا إِلَيْهَا رُوحَنَا فَتَمَثَّلَ لَهَا بَشَرًا سَوِيًّا (١٧) قَالَتْ إِنِّي أَعُوذُ بِالرَّحْمَٰنِ مِنكَ إِن كُنتَ تَقِيًّا (١٨) قَالَ إِنَّمَا أَنَا رَسُولُ رَبِّكِ لِأَهَبَ لَكِ غُلَامًا زَكِيًّا (١٩) قَالَتْ أَنَّىٰ يَكُونُ لِي غُلَامٌ وَلَمْ يَمْسَسْنِي بَشَرٌ وَلَمْ أَكُ بَغِيًّا (٢٠) قَالَ كَذَٰلِكِ قَالَ رَبُّكِ هُوَ عَلَيَّ هَيِّنٌ وَلِنَجْعَلَهُ آيَةً لِّلنَّاسِ وَرَحْمَةً مِّنَّا وَكَانَ أَمْرًا مَّقْضِيًّا (٢١)",
            translation: "And mention in the Book [the story of] Mary, when she withdrew from her family to a place toward the east. And she took, in seclusion from them, a screen. Then We sent to her Our Angel [Gabriel], and he represented himself to her as a well-proportioned man. She said, 'Indeed, I seek refuge in the Most Merciful from you, [so leave me], if you should be fearing of Allah.' He said, 'I am only the messenger of your Lord to give you [news of] a pure boy.' She said, 'How can I have a boy while no man has touched me and I have not been unchaste?' He said, 'Thus [it will be]; your Lord says, It is easy for Me, and We will make him a sign to the people and a mercy from Us. And it is a matter [already] decreed.'",
            tafseer: "Ibn Kathir explains that when the angel Gabriel appeared to Mary in human form, she sought refuge in Allah, showing her piety and chastity. The angel informed her that Allah would grant her a son without a father, as a miraculous sign. Mary questioned how this could be, as she was unmarried and pure. The angel confirmed that nothing is difficult for Allah, and Jesus would be a sign for all people and a mercy from Allah."
        },
        {
            category: "The Miraculous Birth",
            reference: "Surah Maryam (19:22-26)",
            arabic: "فَحَمَلَتْهُ فَانتَبَذَتْ بِهِ مَكَانًا قَصِيًّا (٢٢) فَأَجَاءَهَا الْمَخَاضُ إِلَىٰ جِذْعِ النَّخْلَةِ قَالَتْ يَا لَيْتَنِي مِتُّ قَبْلَ هَٰذَا وَكُنتُ نَسْيًا مَّنسِيًّا (٢٣) فَنَادَاهَا مِن تَحْتِهَا أَلَّا تَحْزَنِي قَدْ جَعَلَ رَبُّكِ تَحْتَكِ سَرِيًّا (٢٤) وَهُزِّي إِلَيْكِ بِجِذْعِ النَّخْلَةِ تُسَاقِطْ عَلَيْكِ رُطَبًا جَنِيًّا (٢٥) فَكُلِي وَاشْرَبِي وَقَرِّي عَيْنًا فَإِمَّا تَرَيِنَّ مِنَ الْبَشَرِ أَحَدًا فَقُولِي إِنِّي نَذَرْتُ لِلرَّحْمَٰنِ صَوْمًا فَلَنْ أُكَلِّمَ الْيَوْمَ إِنسِيًّا (٢٦)",
            translation: "So she conceived him, and she withdrew with him to a remote place. And the pains of childbirth drove her to the trunk of a palm tree. She said, 'Oh, I wish I had died before this and was in oblivion, forgotten.' But he called her from below her, 'Do not grieve; your Lord has provided beneath you a stream. And shake toward you the trunk of the palm tree; it will drop upon you ripe, fresh dates. So eat and drink and be contented. And if you see from among humanity anyone, say, I have vowed to the Most Merciful abstention, so I will not speak today to [any] man.'",
            tafseer: "Ibn Kathir explains that Mary withdrew to a distant place when she was about to give birth, fearing people's accusations. In her distress, she wished for death rather than face slander. Allah comforted her through the infant Jesus or the angel, providing her with fresh water and dates. She was instructed to maintain a fast of silence if questioned, allowing Jesus himself to defend her honor."
        },
        {
            category: "The Infant Speaks - First Miracle",
            reference: "Surah Maryam (19:27-33)",
            arabic: "فَأَتَتْ بِهِ قَوْمَهَا تَحْمِلُهُ قَالُوا يَا مَرْيَمُ لَقَدْ جِئْتِ شَيْئًا فَرِيًّا (٢٧) يَا أُخْتَ هَارُونَ مَا كَانَ أَبُوكِ امْرَأَ سَوْءٍ وَمَا كَانَتْ أُمُّكِ بَغِيًّا (٢٨) فَأَشَارَتْ إِلَيْهِ قَالُوا كَيْفَ نُكَلِّمُ مَن كَانَ فِي الْمَهْدِ صَبِيًّا (٢٩) قَالَ إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا (٣٠) وَجَعَلَنِي مُبَارَكًا أَيْنَ مَا كُنتُ وَأَوْصَانِي بِالصَّلَاةِ وَالزَّكَاةِ مَا دُمْتُ حَيًّا (٣١) وَبَرًّا بِوَالِدَتِي وَلَمْ يَجْعَلْنِي جَبَّارًا شَقِيًّا (٣٢) وَالسَّلَامُ عَلَيَّ يَوْمَ وُلِدتُّ وَيَوْمَ أَمُوتُ وَيَوْمَ أُبْعَثُ حَيًّا (٣٣)",
            translation: "Then she brought him to her people, carrying him. They said, 'O Mary, you have certainly done a thing unprecedented. O sister of Aaron, your father was not a man of evil, nor was your mother unchaste.' So she pointed to him. They said, 'How can we speak to one who is in the cradle a child?' [Jesus] said, 'Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet. And He has made me blessed wherever I am and has enjoined upon me prayer and zakah as long as I remain alive. And [made me] dutiful to my mother, and He has not made me a wretched tyrant. And peace is on me the day I was born and the day I will die and the day I am raised alive.'",
            tafseer: "Ibn Kathir explains this as one of the greatest miracles - the infant Jesus speaking from the cradle. When Mary's people accused her of wrongdoing, she pointed to the baby, and miraculously, he spoke in her defense. Jesus's first words were a declaration of servitude to Allah, not divinity. He proclaimed his prophethood, his mission to establish prayer and charity, and prophesied his own death and resurrection. This speech cleared Mary's name and established Jesus's status as a prophet from birth."
        },
        {
            category: "Jesus's Divine Mission",
            reference: "Surah Al-Imran (3:45-51)",
            arabic: "إِذْ قَالَتِ الْمَلَائِكَةُ يَا مَرْيَمُ إِنَّ اللَّهَ يُبَشِّرُكِ بِكَلِمَةٍ مِّنْهُ اسْمُهُ الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ وَجِيهًا فِي الدُّنْيَا وَالْآخِرَةِ وَمِنَ الْمُقَرَّبِينَ (٤٥) وَيُكَلِّمُ النَّاسَ فِي الْمَهْدِ وَكَهْلًا وَمِنَ الصَّالِحِينَ (٤٦) قَالَتْ رَبِّ أَنَّىٰ يَكُونُ لِي وَلَدٌ وَلَمْ يَمْسَسْنِي بَشَرٌ قَالَ كَذَٰلِكِ اللَّهُ يَخْلُقُ مَا يَشَاءُ إِذَا قَضَىٰ أَمْرًا فَإِنَّمَا يَقُولُ لَهُ كُن فَيَكُونُ (٤٧) وَيُعَلِّمُهُ الْكِتَابَ وَالْحِكْمَةَ وَالتَّوْرَاةَ وَالْإِنجِيلَ (٤٨) وَرَسُولًا إِلَىٰ بَنِي إِسْرَائِيلَ",
            translation: "[And mention] when the angels said, 'O Mary, indeed Allah gives you good tidings of a word from Him, whose name will be the Messiah, Jesus, the son of Mary - distinguished in this world and the Hereafter and among those brought near [to Allah]. He will speak to the people in the cradle and in maturity and will be of the righteous.' She said, 'My Lord, how will I have a child when no man has touched me?' [The angel] said, 'Such is Allah; He creates what He wills. When He decrees a matter, He only says to it, Be, and it is.' And He will teach him writing and wisdom and the Torah and the Gospel. And [make him] a messenger to the Children of Israel...'",
            tafseer: "Ibn Kathir explains that Jesus is called 'a word from Allah' because he was created by Allah's command 'Be,' without a father. He is titled Al-Masih (the Messiah) and honored in both this world and the Hereafter. Allah taught him the previous scriptures (Torah) and revealed to him the Gospel (Injeel). He was sent specifically to the Children of Israel to call them back to monotheism."
        },
        {
            category: "The Miracles Given to Jesus",
            reference: "Surah Al-Imran (3:49)",
            arabic: "أَنِّي قَدْ جِئْتُكُم بِآيَةٍ مِّن رَّبِّكُمْ أَنِّي أَخْلُقُ لَكُم مِّنَ الطِّينِ كَهَيْئَةِ الطَّيْرِ فَأَنفُخُ فِيهِ فَيَكُونُ طَيْرًا بِإِذْنِ اللَّهِ وَأُبْرِئُ الْأَكْمَهَ وَالْأَبْرَصَ وَأُحْيِي الْمَوْتَىٰ بِإِذْنِ اللَّهِ وَأُنَبِّئُكُم بِمَا تَأْكُلُونَ وَمَا تَدَّخِرُونَ فِي بُيُوتِكُمْ إِنَّ فِي ذَٰلِكَ لَآيَةً لَّكُمْ إِن كُنتُم مُّؤْمِنِينَ",
            translation: "[Jesus said] 'Indeed I have come to you with a sign from your Lord in that I design for you from clay [that which is] like the form of a bird, then I breathe into it and it becomes a bird by permission of Allah. And I cure the blind and the leper, and I give life to the dead - by permission of Allah. And I inform you of what you eat and what you store in your houses. Indeed in that is a sign for you, if you are believers.'",
            tafseer: "Ibn Kathir emphasizes that all of Jesus's miracles were performed 'by permission of Allah' - not by his own power, but as signs from Allah. The miracle of creating a bird from clay parallels Adam's creation from clay, demonstrating Allah's power. Healing the blind and lepers, raising the dead, and knowing the unseen were extraordinary miracles given to Jesus to prove his prophethood. However, Jesus repeatedly attributed these powers to Allah, not to himself."
        },
        {
            category: "Jesus's Message - Confirming Previous Scripture",
            reference: "Surah Al-Imran (3:50)",
            arabic: "وَمُصَدِّقًا لِّمَا بَيْنَ يَدَيَّ مِنَ التَّوْرَاةِ وَلِأُحِلَّ لَكُم بَعْضَ الَّذِي حُرِّمَ عَلَيْكُمْ وَجِئْتُكُم بِآيَةٍ مِّن رَّبِّكُمْ فَاتَّقُوا اللَّهَ وَأَطِيعُونِ",
            translation: "And [I have come] confirming what was before me of the Torah and to make lawful for you some of what was forbidden to you. And I have come to you with a sign from your Lord, so fear Allah and obey me.",
            tafseer: "Ibn Kathir explains that Jesus came to confirm the Torah, not to abolish it, but to clarify its true teachings and remove some of the extra burdens that had been added. His mission was to call people back to pure monotheism and righteous living. He commanded them to fear Allah and obey him as Allah's messenger."
        },
        {
            category: "Worship Allah Alone",
            reference: "Surah Al-Imran (3:51)",
            arabic: "إِنَّ اللَّهَ رَبِّي وَرَبُّكُمْ فَاعْبُدُوهُ هَٰذَا صِرَاطٌ مُّسْتَقِيمٌ",
            translation: "Indeed, Allah is my Lord and your Lord, so worship Him. That is the straight path.",
            tafseer: "Ibn Kathir emphasizes this verse as the core of Jesus's message: pure monotheism. Jesus declared that Allah is his Lord just as He is everyone else's Lord, commanding worship of Allah alone. This directly refutes the later Christian doctrine of Jesus's divinity. The straight path that Jesus preached was the same path of all prophets - submission to the One God."
        },
        {
            category: "The Table from Heaven",
            reference: "Surah Al-Ma'idah (5:112-115)",
            arabic: "إِذْ قَالَ الْحَوَارِيُّونَ يَا عِيسَى ابْنَ مَرْيَمَ هَلْ يَسْتَطِيعُ رَبُّكَ أَن يُنَزِّلَ عَلَيْنَا مَائِدَةً مِّنَ السَّمَاءِ قَالَ اتَّقُوا اللَّهَ إِن كُنتُم مُّؤْمِنِينَ (١١٢) قَالُوا نُرِيدُ أَن نَّأْكُلَ مِنْهَا وَتَطْمَئِنَّ قُلُوبُنَا وَنَعْلَمَ أَن قَدْ صَدَقْتَنَا وَنَكُونَ عَلَيْهَا مِنَ الشَّاهِدِينَ (١١٣) قَالَ عِيسَى ابْنُ مَرْيَمَ اللَّهُمَّ رَبَّنَا أَنزِلْ عَلَيْنَا مَائِدَةً مِّنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِّأَوَّلِنَا وَآخِرِنَا وَآيَةً مِّنكَ وَارْزُقْنَا وَأَنتَ خَيْرُ الرَّازِقِينَ (١١٤) قَالَ اللَّهُ إِنِّي مُنَزِّلُهَا عَلَيْكُمْ فَمَن يَكْفُرْ بَعْدُ مِنكُمْ فَإِنِّي أُعَذِّبُهُ عَذَابًا لَّا أُعَذِّبُهُ أَحَدًا مِّنَ الْعَالَمِينَ (١١٥)",
            translation: "[And remember] when the disciples said, 'O Jesus, Son of Mary, can your Lord send down to us a table [spread with food] from the heaven?' [Jesus] said, 'Fear Allah, if you should be believers.' They said, 'We wish to eat from it and let our hearts be reassured and know that you have been truthful to us and be among its witnesses.' Said Jesus, the son of Mary, 'O Allah, our Lord, send down to us a table from the heaven to be for us a festival for the first of us and the last of us and a sign from You. And provide for us, and You are the best of providers.' Allah said, 'Indeed, I will send it down to you, but whoever disbelieves afterwards from among you - then indeed will I punish him with a punishment by which I have not punished anyone among the worlds.'",
            tafseer: "Ibn Kathir explains that the disciples asked Jesus to request a miraculous meal from heaven as a sign. Jesus first counseled them to have faith without demanding signs. When they persisted, he prayed to Allah, calling Him 'our Lord' and acknowledging Allah as the provider. Allah granted the request but warned of severe punishment for those who would disbelieve after witnessing such a clear miracle. This story demonstrates Jesus's role as an intermediary who prays to Allah, not as someone with independent divine power."
        },
        {
            category: "Refutation of False Beliefs - Jesus is Not Divine",
            reference: "Surah Al-Ma'idah (5:72-75)",
            arabic: "لَقَدْ كَفَرَ الَّذِينَ قَالُوا إِنَّ اللَّهَ هُوَ الْمَسِيحُ ابْنُ مَرْيَمَ وَقَالَ الْمَسِيحُ يَا بَنِي إِسْرَائِيلَ اعْبُدُوا اللَّهَ رَبِّي وَرَبَّكُمْ إِنَّهُ مَن يُشْرِكْ بِاللَّهِ فَقَدْ حَرَّمَ اللَّهُ عَلَيْهِ الْجَنَّةَ وَمَأْوَاهُ النَّارُ وَمَا لِلظَّالِمِينَ مِنْ أَنصَارٍ (٧٢) لَّقَدْ كَفَرَ الَّذِينَ قَالُوا إِنَّ اللَّهَ ثَالِثُ ثَلَاثَةٍ وَمَا مِنْ إِلَٰهٍ إِلَّا إِلَٰهٌ وَاحِدٌ (٧٣) مَّا الْمَسِيحُ ابْنُ مَرْيَمَ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ وَأُمُّهُ صِدِّيقَةٌ كَانَا يَأْكُلَانِ الطَّعَامَ (٧٥)",
            translation: "They have certainly disbelieved who say, 'Allah is the Messiah, the son of Mary' while the Messiah has said, 'O Children of Israel, worship Allah, my Lord and your Lord.' Indeed, he who associates others with Allah - Allah has forbidden him Paradise, and his refuge is the Fire. And there are not for the wrongdoers any helpers. They have certainly disbelieved who say, 'Allah is the third of three.' And there is no god except one God... The Messiah, son of Mary, was not but a messenger; [other] messengers have passed on before him. And his mother was a supporter of truth. They both used to eat food...",
            tafseer: "Ibn Kathir strongly refutes the Christian doctrines of Jesus's divinity and the Trinity. The Quran states that Jesus himself commanded worship of Allah alone. Those who claim Jesus is God or part of a Trinity have committed disbelief. The proof of Jesus's mortality is simple: he and his mother ate food, meaning they were dependent on sustenance like all created beings. Allah is beyond such needs. Jesus was a noble messenger, but still a human servant of Allah."
        },
        {
            category: "Jesus Did Not Die - He Was Raised to Allah",
            reference: "Surah An-Nisa (4:157-158)",
            arabic: "وَقَوْلِهِمْ إِنَّا قَتَلْنَا الْمَسِيحَ عِيسَى ابْنَ مَرْيَمَ رَسُولَ اللَّهِ وَمَا قَتَلُوهُ وَمَا صَلَبُوهُ وَلَٰكِن شُبِّهَ لَهُمْ وَإِنَّ الَّذِينَ اخْتَلَفُوا فِيهِ لَفِي شَكٍّ مِّنْهُ مَا لَهُم بِهِ مِنْ عِلْمٍ إِلَّا اتِّبَاعَ الظَّنِّ وَمَا قَتَلُوهُ يَقِينًا (١٥٧) بَل رَّفَعَهُ اللَّهُ إِلَيْهِ وَكَانَ اللَّهُ عَزِيزًا حَكِيمًا (١٥٨)",
            translation: "And [for] their saying, 'Indeed, we have killed the Messiah, Jesus, the son of Mary, the messenger of Allah.' And they did not kill him, nor did they crucify him; but [another] was made to resemble him to them. And indeed, those who differ over it are in doubt about it. They have no knowledge of it except the following of assumption. And they did not kill him, for certain. Rather, Allah raised him to Himself. And ever is Allah Exalted in Might and Wise.",
            tafseer: "Ibn Kathir explains this crucial verse: Jesus was not crucified or killed. Instead, Allah made someone else appear like Jesus, and that person was crucified while Jesus was raised to Allah. This is a matter of certain knowledge from the Quran. The disagreements among people about Jesus's fate only prove their uncertainty. Allah saved His prophet from the humiliation his enemies planned, raising him bodily and spiritually to the heavens. Jesus is alive with Allah and will return."
        },
        {
            category: "Jesus as a Sign of the Hour",
            reference: "Surah Az-Zukhruf (43:61)",
            arabic: "وَإِنَّهُ لَعِلْمٌ لِّلسَّاعَةِ فَلَا تَمْتَرُنَّ بِهَا وَاتَّبِعُونِ هَٰذَا صِرَاطٌ مُّسْتَقِيمٌ",
            translation: "And indeed, Jesus will be [a sign for] knowledge of the Hour, so be not in doubt of it, and follow Me. This is a straight path.",
            tafseer: "Ibn Kathir and other scholars explain this verse as referring to Jesus's second coming before the Day of Judgment. Jesus's return to earth is one of the major signs of the approaching Hour. When he returns, it will remove all doubt about the reality of the Day of Judgment. He will break the cross, kill the swine, abolish the jizyah, and rule with justice according to Islamic law. All People of the Book will believe in him before his death."
        },
        {
            category: "The Day of Judgment - Jesus Will Testify",
            reference: "Surah Al-Ma'idah (5:116-118)",
            arabic: "وَإِذْ قَالَ اللَّهُ يَا عِيسَى ابْنَ مَرْيَمَ أَأَنتَ قُلْتَ لِلنَّاسِ اتَّخِذُونِي وَأُمِّيَ إِلَٰهَيْنِ مِن دُونِ اللَّهِ قَالَ سُبْحَانَكَ مَا يَكُونُ لِي أَنْ أَقُولَ مَا لَيْسَ لِي بِحَقٍّ إِن كُنتُ قُلْتُهُ فَقَدْ عَلِمْتَهُ تَعْلَمُ مَا فِي نَفْسِي وَلَا أَعْلَمُ مَا فِي نَفْسِكَ إِنَّكَ أَنتَ عَلَّامُ الْغُيُوبِ (١١٦) مَا قُلْتُ لَهُمْ إِلَّا مَا أَمَرْتَنِي بِهِ أَنِ اعْبُدُوا اللَّهَ رَبِّي وَرَبَّكُمْ وَكُنتُ عَلَيْهِمْ شَهِيدًا مَّا دُمْتُ فِيهِمْ فَلَمَّا تَوَفَّيْتَنِي كُنتَ أَنتَ الرَّقِيبَ عَلَيْهِمْ وَأَنتَ عَلَىٰ كُلِّ شَيْءٍ شَهِيدٌ (١١٧) إِن تُعَذِّبْهُمْ فَإِنَّهُمْ عِبَادُكَ وَإِن تَغْفِرْ لَهُمْ فَإِنَّكَ أَنتَ الْعَزِيزُ الْحَكِيمُ (١١٨)",
            translation: "And [beware the Day] when Allah will say, 'O Jesus, Son of Mary, did you say to the people, Take me and my mother as deities besides Allah?' He will say, 'Exalted are You! It was not for me to say that to which I have no right. If I had said it, You would have known it. You know what is within myself, and I do not know what is within Yourself. Indeed, it is You who is Knower of the unseen. I said not to them except what You commanded me - to worship Allah, my Lord and your Lord. And I was a witness over them as long as I was among them; but when You took me up, You were the Observer over them, and You are, over all things, Witness. If You should punish them - indeed they are Your servants; but if You forgive them - indeed it is You who is the Exalted in Might, the Wise.'",
            tafseer: "Ibn Kathir explains this powerful scene on the Day of Judgment. Allah will question Jesus about whether he told people to worship him and his mother. Jesus will completely disavow this false doctrine, declaring Allah's perfection and stating that he only commanded what Allah ordered: worship of Allah alone. Jesus will testify that he preached pure monotheism while among his people, but after Allah raised him, he has no knowledge of what they innovated. This verse proves that Jesus never claimed divinity and will be the first to reject such claims on Judgment Day."
        },
        {
            category: "Comparison with Adam - Both Created by Allah's Command",
            reference: "Surah Al-Imran (3:59-60)",
            arabic: "إِنَّ مَثَلَ عِيسَىٰ عِندَ اللَّهِ كَمَثَلِ آدَمَ خَلَقَهُ مِن تُرَابٍ ثُمَّ قَالَ لَهُ كُن فَيَكُونُ (٥٩) الْحَقُّ مِن رَّبِّكَ فَلَا تَكُن مِّنَ الْمُمْتَرِينَ (٦٠)",
            translation: "Indeed, the example of Jesus to Allah is like that of Adam. He created Him from dust; then He said to him, 'Be,' and he was. The truth is from your Lord, so do not be among the doubters.",
            tafseer: "Ibn Kathir explains this profound comparison: if Jesus is considered divine because he was born without a father, then Adam has an even stronger claim, as he was created without either parent. Yet no one claims Adam is divine. This logical argument demolishes the reasoning behind Jesus's divination. Both Jesus and Adam were created by Allah's command 'Be,' demonstrating that miraculous creation does not imply divinity. This is the truth from Allah, and there should be no doubt about it."
        },
        {
            category: "Jesus's Nature - A Word and Spirit from Allah",
            reference: "Surah An-Nisa (4:171)",
            arabic: "يَا أَهْلَ الْكِتَابِ لَا تَغْلُوا فِي دِينِكُمْ وَلَا تَقُولُوا عَلَى اللَّهِ إِلَّا الْحَقَّ إِنَّمَا الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ رَسُولُ اللَّهِ وَكَلِمَتُهُ أَلْقَاهَا إِلَىٰ مَرْيَمَ وَرُوحٌ مِّنْهُ فَآمِنُوا بِاللَّهِ وَرُسُلِهِ وَلَا تَقُولُوا ثَلَاثَةٌ انتَهُوا خَيْرًا لَّكُمْ إِنَّمَا اللَّهُ إِلَٰهٌ وَاحِدٌ سُبْحَانَهُ أَن يَكُونَ لَهُ وَلَدٌ",
            translation: "O People of the Scripture, do not commit excess in your religion or say about Allah except the truth. The Messiah, Jesus, the son of Mary, was but a messenger of Allah and His word which He directed to Mary and a spirit from Him. So believe in Allah and His messengers. And do not say, 'Three'; desist - it is better for you. Indeed, Allah is but one God. Exalted is He above having a son.",
            tafseer: "Ibn Kathir explains that this verse directly addresses Christians, warning them not to exaggerate in their religion. Jesus is called 'a word' because he was created by Allah's word 'Be,' and 'a spirit from Him' meaning a soul created by Allah - not part of Allah's essence. The titles 'word' and 'spirit' are honors, not indicators of divinity. The verse firmly rejects the Trinity and the concept of Allah having a son, declaring that Allah is One, far above such human concepts. Believing in Jesus as a prophet and messenger is true faith; anything beyond that is excess and falsehood."
        }
    ];

    verses.forEach(verse => {
        const verseCard = createJesusVerseCard(verse);
        jesusContent.appendChild(verseCard);
    });
}

function createJesusVerseCard(verse) {
    const card = document.createElement('div');
    card.className = 'verse-card jesus-verse';
    card.innerHTML = `
        <div class="verse-category">${verse.category}</div>
        <div class="verse-reference">${verse.reference}</div>
        <div class="verse-arabic">${verse.arabic}</div>
        <div class="verse-translation">${verse.translation}</div>
        <div class="tafseer">
            <h4>Tafseer Ibn Kathir:</h4>
            <p>${verse.tafseer}</p>
        </div>
    `;
    return card;
}

// How to Pray Salah - Complete Prayer Guide
function loadSalahGuide() {
    const salahContent = document.getElementById('salah-content');

    const prayerIntro = `
        <div class="prayer-intro-card">
            <h3>The Five Daily Prayers</h3>
            <div class="prayer-times">
                <div class="prayer-time-item">
                    <strong>Fajr:</strong> Dawn prayer (2 rakats)
                </div>
                <div class="prayer-time-item">
                    <strong>Dhuhr:</strong> Midday prayer (4 rakats)
                </div>
                <div class="prayer-time-item">
                    <strong>Asr:</strong> Afternoon prayer (4 rakats)
                </div>
                <div class="prayer-time-item">
                    <strong>Maghrib:</strong> Sunset prayer (3 rakats)
                </div>
                <div class="prayer-time-item">
                    <strong>Isha:</strong> Night prayer (4 rakats)
                </div>
            </div>
            <p class="prayer-note"><strong>Note:</strong> This guide shows you how to pray 2 rakats. For prayers with more rakats, simply repeat the rakat sequence.</p>
        </div>
    `;

    const steps = [
        {
            number: 1,
            title: "Make Intention (Niyyah)",
            description: "Stand facing the Qiblah (direction of Kaaba in Makkah) and make the intention in your heart to pray the specific prayer (e.g., 'I intend to pray 2 rakats of Fajr for Allah').",
            note: "The intention is in the heart; you don't need to say it out loud.",
            arabic: "",
            transliteration: "",
            translation: ""
        },
        {
            number: 2,
            title: "Raise Hands and Say Takbir",
            description: "Raise both hands up to your shoulders or ears with palms facing the Qiblah and say the opening Takbir.",
            arabic: "اللَّهُ أَكْبَرُ",
            transliteration: "Allahu Akbar",
            translation: "Allah is the Greatest",
            note: "This marks the start of the prayer. After this, you cannot speak, eat, drink, or do anything except the acts of prayer."
        },
        {
            number: 3,
            title: "Place Hands on Chest",
            description: "Place your right hand over your left hand on your chest. Women may place hands at chest level as well.",
            note: "Keep your eyes focused on the place where you will prostrate."
        },
        {
            number: 4,
            title: "Opening Supplication (Optional)",
            description: "Recite the opening supplication (Dua Al-Istiftah):",
            arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ",
            transliteration: "Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruk",
            translation: "Glory is to You O Allah, and praise. Blessed is Your Name and Exalted is Your Majesty. There is none worthy of worship but You."
        },
        {
            number: 5,
            title: "Seek Refuge from Satan",
            description: "Silently seek refuge in Allah from Satan:",
            arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
            transliteration: "A'udhu billahi min ash-shaytan ir-rajeem",
            translation: "I seek refuge in Allah from Satan, the accursed."
        },
        {
            number: 6,
            title: "Recite Bismillah",
            description: "Recite Bismillah:",
            arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            transliteration: "Bismillah ir-Rahman ir-Raheem",
            translation: "In the name of Allah, the Most Gracious, the Most Merciful"
        },
        {
            number: 7,
            title: "Recite Surah Al-Fatiha",
            description: "Recite Surah Al-Fatiha (The Opening) - this is obligatory in every rakat:",
            arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ (١) الرَّحْمَٰنِ الرَّحِيمِ (٢) مَالِكِ يَوْمِ الدِّينِ (٣) إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (٤) اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ (٥) صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ (٦)",
            transliteration: "Alhamdu lillahi rabbil 'alameen. Ar-Rahman ir-Raheem. Maliki yawmid-deen. Iyyaka na'budu wa iyyaka nasta'een. Ihdinas-siratal mustaqeem. Siratal-ladhina an'amta 'alayhim ghayril-maghdubi 'alayhim walad-dalleen.",
            translation: "All praise is due to Allah, Lord of all the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray.",
            note: "Say 'Ameen' (Amen) softly after finishing Al-Fatiha."
        },
        {
            number: 8,
            title: "Recite Another Surah",
            description: "Recite any other Surah or verses from the Quran. Common choices for beginners:",
            arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ (١) اللَّهُ الصَّمَدُ (٢) لَمْ يَلِدْ وَلَمْ يُولَدْ (٣) وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ (٤)",
            transliteration: "Qul huwa Allahu ahad. Allahu samad. Lam yalid wa lam yoolad. Wa lam yakun lahu kufuwan ahad.",
            translation: "Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent. (Surah Al-Ikhlas 112:1-4)",
            note: "This step is only in the first two rakats of each prayer."
        },
        {
            number: 9,
            title: "Perform Ruku (Bowing)",
            description: "Say 'Allahu Akbar' and bow down, placing your hands on your knees. Keep your back straight and head in line with your back. In this position, say:",
            arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
            transliteration: "Subhana Rabbiyal Adheem",
            translation: "Glory is to my Lord, the Most Great",
            note: "Repeat this at least 3 times. You can say it more times."
        },
        {
            number: 10,
            title: "Rise from Ruku",
            description: "Stand up straight while saying:",
            arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
            transliteration: "Sami' Allahu liman hamidah",
            translation: "Allah hears those who praise Him",
            note: "Then say while standing:"
        },
        {
            number: 10.5,
            title: "Standing After Ruku",
            description: "While standing upright, say:",
            arabic: "رَبَّنَا وَلَكَ الْحَمْدُ",
            transliteration: "Rabbana wa lakal hamd",
            translation: "Our Lord, to You is all praise"
        },
        {
            number: 11,
            title: "First Prostration (Sujud)",
            description: "Say 'Allahu Akbar' and prostrate with your forehead, nose, both palms, both knees, and toes of both feet touching the ground. Your elbows should be raised off the ground. In this position, say:",
            arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
            transliteration: "Subhana Rabbiyal A'la",
            translation: "Glory is to my Lord, the Most High",
            note: "Repeat at least 3 times."
        },
        {
            number: 12,
            title: "Sitting Between Two Prostrations",
            description: "Say 'Allahu Akbar' and sit up from prostration. Sit on your left foot with your right foot upright. Place your hands on your thighs. In this position, say:",
            arabic: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي",
            transliteration: "Rabbighfir li, Rabbighfir li",
            translation: "My Lord, forgive me. My Lord, forgive me."
        },
        {
            number: 13,
            title: "Second Prostration",
            description: "Say 'Allahu Akbar' and prostrate again, repeating the same as the first prostration:",
            arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
            transliteration: "Subhana Rabbiyal A'la",
            translation: "Glory is to my Lord, the Most High",
            note: "Repeat at least 3 times. This completes one rakat."
        },
        {
            number: 14,
            title: "Standing for Second Rakat",
            description: "Say 'Allahu Akbar' and stand up for the second rakat. Repeat steps 6-13 (from Bismillah through the second prostration).",
            note: "For the second rakat, recite Al-Fatiha and another surah, then proceed with bowing and prostrations."
        },
        {
            number: 15,
            title: "Sitting for Tashahhud",
            description: "After the second prostration of the second rakat, sit and recite the Tashahhud:",
            arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
            transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuhu. As-salamu 'alayna wa 'ala 'ibadillahis-salihin. Ashhadu an la ilaha illallah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh.",
            translation: "All compliments, prayers and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity except Allah, and I bear witness that Muhammad is His servant and Messenger.",
            note: "Raise your index finger when saying 'Ashhadu an la ilaha illallah'."
        },
        {
            number: 16,
            title: "Durood (Blessings on the Prophet)",
            description: "Continue reciting the Durood Ibrahim:",
            arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
            transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad, kama sallayta 'ala Ibraheema wa 'ala ali Ibraheem, innaka hameedun majeed. Allahumma barik 'ala Muhammadin wa 'ala ali Muhammad, kama barakta 'ala Ibraheema wa 'ala ali Ibraheem, innaka hameedun majeed.",
            translation: "O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy and Glorious. O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You blessed Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy and Glorious."
        },
        {
            number: 17,
            title: "Final Supplication (Optional)",
            description: "You may make a brief supplication, such as:",
            arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
            transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
            translation: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire."
        },
        {
            number: 18,
            title: "Give Salam (Ending the Prayer)",
            description: "Turn your head to the right and say:",
            arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
            transliteration: "As-salamu 'alaykum wa rahmatullah",
            translation: "Peace and mercy of Allah be upon you",
            note: "Then turn your head to the left and repeat the same. This ends the prayer."
        }
    ];

    salahContent.innerHTML = prayerIntro;

    steps.forEach(step => {
        const stepCard = createPrayerStepCard(step);
        salahContent.appendChild(stepCard);
    });

    // Add closing note
    const closingNote = document.createElement('div');
    closingNote.className = 'prayer-closing-note';
    closingNote.innerHTML = `
        <h3>Important Notes:</h3>
        <ul>
            <li>For 3-rakat prayers (Maghrib), after the Tashahhud in the 2nd rakat, stand for the 3rd rakat without giving Salam.</li>
            <li>For 4-rakat prayers (Dhuhr, Asr, Isha), stand after the Tashahhud in the 2nd rakat for the 3rd and 4th rakats.</li>
            <li>In the 3rd and 4th rakats, only recite Al-Fatiha (not an additional surah).</li>
            <li>Women should pray with more modesty - keeping elbows close to the body during prostration.</li>
            <li>Learn pronunciation from a teacher or reliable source to ensure correct recitation.</li>
        </ul>
        <p class="encouragement"><strong>May Allah accept your prayers and make them a source of closeness to Him.</strong></p>
    `;
    salahContent.appendChild(closingNote);
}

function createPrayerStepCard(step) {
    const card = document.createElement('div');
    card.className = 'prayer-step-card';

    let content = `
        <div class="step-number">Step ${step.number}</div>
        <h3 class="step-title">${step.title}</h3>
        <p class="step-description">${step.description}</p>
    `;

    if (step.arabic) {
        content += `<div class="step-arabic">${step.arabic}</div>`;
    }

    if (step.transliteration) {
        content += `<div class="step-transliteration">${step.transliteration}</div>`;
    }

    if (step.translation) {
        content += `<div class="step-translation">${step.translation}</div>`;
    }

    if (step.note) {
        content += `<div class="step-note"><strong>Note:</strong> ${step.note}</div>`;
    }

    card.innerHTML = content;
    return card;
}

// How to Perform Wudu - Complete Ablution Guide
function loadWuduGuide() {
    const wuduContent = document.getElementById('wudu-content');

    const wuduIntro = `
        <div class="wudu-intro-card">
            <h3>What is Wudu?</h3>
            <p>Wudu (ablution) is the Islamic procedure for cleansing parts of the body using water. It is a prerequisite for performing Salah and other acts of worship. The Prophet Muhammad (peace be upon him) said: <em>"The key to Paradise is prayer, and the key to prayer is cleanliness."</em></p>

            <h4>Things That Break Wudu:</h4>
            <ul>
                <li>Natural discharge (urine, feces, gas)</li>
                <li>Deep sleep</li>
                <li>Loss of consciousness</li>
                <li>Bleeding from wounds</li>
                <li>Vomiting</li>
            </ul>
        </div>
    `;

    const wuduSteps = [
        {
            number: 1,
            title: "Make Intention (Niyyah)",
            description: "Make the intention in your heart to perform Wudu for the purpose of purification and prayer. You don't need to say it out loud.",
            note: "The intention is solely in the heart."
        },
        {
            number: 2,
            title: "Say Bismillah",
            description: "Begin by saying:",
            arabic: "بِسْمِ اللَّهِ",
            transliteration: "Bismillah",
            translation: "In the name of Allah"
        },
        {
            number: 3,
            title: "Wash Both Hands",
            description: "Wash both hands up to the wrists three times, making sure water reaches between the fingers.",
            note: "Start with the right hand, then the left."
        },
        {
            number: 4,
            title: "Rinse the Mouth (Madmadah)",
            description: "Take water in your right hand, put it in your mouth, swish it around, and spit it out. Repeat three times.",
            note: "Use the index finger to clean the teeth if possible."
        },
        {
            number: 5,
            title: "Rinse the Nose (Istinshaq)",
            description: "Take water in your right hand, sniff it into your nostrils, then blow it out using your left hand. Repeat three times.",
            note: "Sniff water gently unless you are not fasting."
        },
        {
            number: 6,
            title: "Wash the Face",
            description: "Wash your entire face three times from the hairline to the chin and from ear to ear. Make sure water reaches all parts including the beard.",
            note: "The face includes everything from the forehead to the bottom of the chin."
        },
        {
            number: 7,
            title: "Wash the Arms",
            description: "Wash your right arm from the fingertips up to and including the elbow three times. Then do the same with the left arm.",
            note: "Ensure water reaches the entire arm including the elbow."
        },
        {
            number: 8,
            title: "Wipe the Head (Masah)",
            description: "Wet your hands and wipe over your head once, from the front to the back and back to the front.",
            note: "You only need to wipe the head once, not three times."
        },
        {
            number: 9,
            title: "Wipe the Ears",
            description: "With the same water from wiping your head, use your index fingers to wipe the inside of your ears and your thumbs to wipe behind your ears.",
            note: "This is done once, as part of wiping the head."
        },
        {
            number: 10,
            title: "Wash the Feet",
            description: "Wash your right foot up to and including the ankle three times, ensuring water reaches between the toes. Then wash the left foot in the same manner.",
            note: "Use your little finger to clean between the toes."
        },
        {
            number: 11,
            title: "Recite the Dua After Wudu",
            description: "After completing wudu, it is recommended to recite:",
            arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
            transliteration: "Ashhadu an la ilaha illallahu wahdahu la shareeka lah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh. Allahumma-j'alni minat-tawwabina waj-'alni minal-mutatahhirin.",
            translation: "I bear witness that there is no deity except Allah, alone without partner, and I bear witness that Muhammad is His servant and Messenger. O Allah, make me among those who repent and make me among those who purify themselves.",
            hadith: "The Prophet (ﷺ) said: 'Whoever performs wudu and perfects it, then says this supplication, the eight gates of Paradise will be opened for him, and he may enter through whichever he wishes.' (Sahih Muslim)"
        }
    ];

    wuduContent.innerHTML = wuduIntro;

    wuduSteps.forEach(step => {
        const stepCard = createWuduStepCard(step);
        wuduContent.appendChild(stepCard);
    });

    // Add closing tips
    const closingTips = document.createElement('div');
    closingTips.className = 'wudu-closing-tips';
    closingTips.innerHTML = `
        <h3>Important Tips:</h3>
        <ul>
            <li><strong>Order Matters:</strong> Perform wudu in the correct sequence as taught by the Prophet (ﷺ).</li>
            <li><strong>Continuity:</strong> Complete wudu without long pauses between steps.</li>
            <li><strong>Thoroughness:</strong> Ensure water reaches every required part.</li>
            <li><strong>Conservation:</strong> Don't waste water. The Prophet (ﷺ) used very little water for wudu.</li>
            <li><strong>Remove Barriers:</strong> Remove nail polish, jewelry that prevents water, and anything that blocks water from reaching the skin.</li>
            <li><strong>Wiping Over Socks:</strong> If you've performed wudu with socks on, you may wipe over them for up to 24 hours (3 days while traveling) instead of washing the feet.</li>
        </ul>
        <p class="wudu-virtue"><strong>The Virtue of Wudu:</strong> The Prophet (ﷺ) said: "When a Muslim performs wudu and washes his face, every sin he committed with his eyes is washed away with the water. When he washes his hands, every sin committed by his hands is washed away with the water. When he washes his feet, every sin committed by his feet is washed away. He then emerges cleansed of sin." (Sahih Muslim)</p>
    `;
    wuduContent.appendChild(closingTips);
}

function createWuduStepCard(step) {
    const card = document.createElement('div');
    card.className = 'wudu-step-card';

    let content = `
        <div class="step-number">Step ${step.number}</div>
        <h3 class="step-title">${step.title}</h3>
        <p class="step-description">${step.description}</p>
    `;

    if (step.arabic) {
        content += `<div class="step-arabic">${step.arabic}</div>`;
    }

    if (step.transliteration) {
        content += `<div class="step-transliteration">${step.transliteration}</div>`;
    }

    if (step.translation) {
        content += `<div class="step-translation">${step.translation}</div>`;
    }

    if (step.hadith) {
        content += `<div class="step-hadith"><em>${step.hadith}</em></div>`;
    }

    if (step.note) {
        content += `<div class="step-note"><strong>Note:</strong> ${step.note}</div>`;
    }

    card.innerHTML = content;
    return card;
}

// Daily guidance - rotate content
function loadDailyGuidance() {
    const verseOfDay = document.getElementById('verse-of-day');
    const hadithOfDay = document.getElementById('hadith-of-day');
    const lessonOfDay = document.getElementById('lesson-of-day');

    // Simple rotation based on day of year
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

    const verses = [
        {
            arabic: "وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ",
            translation: "And say, 'Do [as you will], for Allah will see your deeds, and [so, will] His Messenger and the believers.' (Quran 9:105)",
            reflection: "This verse reminds us that all our actions are seen by Allah. Let this motivate us to do good and avoid evil, knowing that we are always accountable."
        },
        {
            arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
            translation: "For indeed, with hardship [will be] ease. (Quran 94:5-6)",
            reflection: "This verse is repeated twice in the Quran to emphasize that no matter how difficult things seem, relief and ease will come. Never lose hope in Allah's mercy."
        },
        {
            arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
            translation: "And whoever fears Allah - He will make for him a way out. (Quran 65:2)",
            reflection: "When we maintain consciousness of Allah (Taqwa) in all our affairs, He will provide solutions to our problems in ways we cannot imagine."
        }
    ];

    const hadiths = [
        "The Prophet (ﷺ) said: 'The strong person is not the one who can wrestle others, but the one who controls himself when angry.' - Sahih al-Bukhari",
        "The Prophet (ﷺ) said: 'None of you truly believes until he loves for his brother what he loves for himself.' - Sahih al-Bukhari",
        "The Prophet (ﷺ) said: 'Allah does not look at your appearance or wealth, but He looks at your hearts and actions.' - Sahih Muslim"
    ];

    const lessons = [
        "Start your day with gratitude. Thank Allah for your health, family, and the countless blessings He has given you.",
        "Remember that every hardship is temporary, but the reward for patience is eternal. Stay strong in your faith.",
        "Small acts of kindness matter. A smile, a kind word, or helping someone in need are all acts of charity that please Allah."
    ];

    verseOfDay.innerHTML = `
        <p class="arabic-text">${verses[dayOfYear % verses.length].arabic}</p>
        <p class="translation">${verses[dayOfYear % verses.length].translation}</p>
        <p>${verses[dayOfYear % verses.length].reflection}</p>
    `;

    hadithOfDay.innerHTML = `<p>${hadiths[dayOfYear % hadiths.length]}</p>`;
    lessonOfDay.innerHTML = `<p>${lessons[dayOfYear % lessons.length]}</p>`;
}

// Search functionality
function setupSearchFunctionality() {
    const quranSearch = document.getElementById('quran-search');
    const hadithSearch = document.getElementById('hadith-search');
    const jesusSearch = document.getElementById('jesus-search');

    if (quranSearch) {
        quranSearch.addEventListener('input', function(e) {
            filterContent('.verse-card:not(.jesus-verse)', e.target.value);
        });
    }

    if (hadithSearch) {
        hadithSearch.addEventListener('input', function(e) {
            filterContent('.hadith-card', e.target.value);
        });
    }

    if (jesusSearch) {
        jesusSearch.addEventListener('input', function(e) {
            filterContent('.jesus-verse', e.target.value);
        });
    }
}

function filterContent(selector, searchTerm) {
    const cards = document.querySelectorAll(selector);
    const term = searchTerm.toLowerCase();

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Utility function for smooth scrolling
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}
