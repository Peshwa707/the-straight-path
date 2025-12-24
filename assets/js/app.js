// Main Application JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupNavigation();
    loadQuranContent();
    loadHadithContent();
    loadProphetLessons();
    loadDailyGuidance();
    setupSearchFunctionality();
}

// Navigation between sections
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');

            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
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

    if (quranSearch) {
        quranSearch.addEventListener('input', function(e) {
            filterContent('.verse-card', e.target.value);
        });
    }

    if (hadithSearch) {
        hadithSearch.addEventListener('input', function(e) {
            filterContent('.hadith-card', e.target.value);
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
