// Quran Data with Tafsir Ibn Kathir
// This is a comprehensive structure - you can expand by adding more surahs and verses

const QURAN_DATA = {
    surahs: [
        {
            number: 1,
            name: "Al-Fatihah",
            nameArabic: "الفاتحة",
            translation: "The Opening",
            revelationType: "Meccan",
            totalVerses: 7,
            verses: [
                {
                    number: 1,
                    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                    transliteration: "Bismillahi r-rahmani r-rahim",
                    translation: "In the name of Allah, the Most Gracious, the Most Merciful",
                    tafsir: "Ibn Kathir explains: The Basmalah is the opening of the Book of Allah. It is recommended to say it at the beginning of every action. The Name 'Allah' is the greatest Name that refers to the One and Only True God. Ar-Rahman (the Most Gracious) refers to His attribute of general mercy for all creation. Ar-Rahim (the Most Merciful) refers to His special mercy for the believers."
                },
                {
                    number: 2,
                    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
                    transliteration: "Alhamdu lillahi rabbi l-'alamin",
                    translation: "All praise is due to Allah, Lord of all the worlds",
                    tafsir: "Ibn Kathir states: Al-Hamd means praise and thanks. It is given to Allah alone, Who created everything and Who is the Lord of all creation. 'Rabb' (Lord) means the Creator, the Sustainer, the Master. 'Al-'Alamin' (the worlds) refers to everything in existence besides Allah - all of creation including mankind, jinn, angels, and all creatures."
                },
                {
                    number: 3,
                    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
                    transliteration: "Ar-rahmani r-rahim",
                    translation: "The Most Gracious, the Most Merciful",
                    tafsir: "These two Names are repeated after the Basmalah to emphasize Allah's mercy. Ibn Kathir explains that Allah's mercy encompasses all of His creation in this world, while in the Hereafter, His special mercy will be for the believers only."
                },
                {
                    number: 4,
                    arabic: "مَالِكِ يَوْمِ الدِّينِ",
                    transliteration: "Maliki yawmi d-din",
                    translation: "Master of the Day of Judgment",
                    tafsir: "Allah is the King and Master of the Day of Judgment, when all will be held accountable. Ibn Kathir notes: On that Day, no one will speak without His permission, and no deed will benefit anyone except what Allah accepts."
                },
                {
                    number: 5,
                    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
                    transliteration: "Iyyaka na'budu wa iyyaka nasta'in",
                    translation: "You alone we worship, and You alone we ask for help",
                    tafsir: "This verse combines worship and seeking help from Allah alone, which is the essence of Islam. Ibn Kathir explains: 'Iyyaka na'budu' means we worship You alone and none else, and 'iyyaka nasta'in' means we rely on You alone for all our affairs."
                },
                {
                    number: 6,
                    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
                    transliteration: "Ihdina s-sirata l-mustaqim",
                    translation: "Guide us to the straight path",
                    tafsir: "This is the most important supplication - asking Allah for guidance to the truth. Ibn Kathir explains: The straight path is Islam, which leads to Allah's pleasure and Paradise. It is the path of those who truly know Allah and worship Him correctly."
                },
                {
                    number: 7,
                    arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
                    transliteration: "Sirata l-ladhina an'amta 'alayhim ghayri l-maghdubi 'alayhim wa la d-dallin",
                    translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray",
                    tafsir: "Ibn Kathir explains: Those upon whom Allah has bestowed favor are the Prophets, the truthful, the martyrs and the righteous. Those who earned anger are those who knew the truth but rejected it (like some of the Jews). Those who went astray are those who were ignorant and did not follow the truth (like some of the Christians). We ask Allah to guide us to the path of the first group."
                }
            ]
        },
        {
            number: 2,
            name: "Al-Baqarah",
            nameArabic: "البقرة",
            translation: "The Cow",
            revelationType: "Medinan",
            totalVerses: 286,
            verses: [
                {
                    number: 1,
                    arabic: "الم",
                    transliteration: "Alif-Lam-Mim",
                    translation: "Alif, Lam, Meem",
                    tafsir: "These are disconnected letters that appear at the beginning of certain Surahs. Ibn Kathir mentions that their meaning is known only to Allah, though some scholars say they draw attention to the miraculous nature of the Quran."
                },
                {
                    number: 2,
                    arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِلْمُتَّقِينَ",
                    transliteration: "Dhalika l-kitabu la rayba fihi hudan li-l-muttaqin",
                    translation: "This is the Book about which there is no doubt, a guidance for those conscious of Allah",
                    tafsir: "Ibn Kathir explains: This Quran is the Book that has no doubt or uncertainty in it. It is perfect guidance for the Muttaqin (those who fear Allah and are conscious of Him). The Quran guides those who seek guidance and have pure hearts."
                },
                {
                    number: 3,
                    arabic: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ",
                    transliteration: "Alladhina yu'minuna bi-l-ghaybi wa yuqimuna s-salata wa mimma razaqnahum yunfiqun",
                    translation: "Who believe in the unseen, establish prayer, and spend out of what We have provided for them",
                    tafsir: "These are characteristics of the believers: belief in the unseen (Allah, angels, Day of Judgment, etc.), establishing prayer properly with all its conditions, and spending from what Allah has provided them in charity and good causes."
                },
                {
                    number: 255,
                    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
                    transliteration: "Allahu la ilaha illa huwa l-hayyu l-qayyum, la ta'khudhuhu sinatun wa la nawm, lahu ma fi s-samawati wa ma fi l-ard",
                    translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth",
                    tafsir: "This is Ayat al-Kursi, the greatest verse in the Quran. Ibn Kathir explains: It contains the greatest Names of Allah. Al-Hayy (the Ever-Living) means His life is perfect and eternal. Al-Qayyum (the Sustainer) means He sustains and maintains all creation. He never sleeps or slumbers - He is always watching over His creation."
                }
            ]
        },
        {
            number: 112,
            name: "Al-Ikhlas",
            nameArabic: "الإخلاص",
            translation: "The Sincerity",
            revelationType: "Meccan",
            totalVerses: 4,
            verses: [
                {
                    number: 1,
                    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
                    transliteration: "Qul huwa Allahu ahad",
                    translation: "Say, 'He is Allah, [who is] One'",
                    tafsir: "Ibn Kathir explains: This Surah was revealed to describe Allah. 'Ahad' means the One and Only, without partner or equal. The Prophet ﷺ said this Surah is equivalent to one-third of the Quran."
                },
                {
                    number: 2,
                    arabic: "اللَّهُ الصَّمَدُ",
                    transliteration: "Allahu s-samad",
                    translation: "Allah, the Eternal Refuge",
                    tafsir: "As-Samad means the One to Whom all creatures turn to for all their needs. He is self-sufficient and does not need anything, while all creation needs Him."
                },
                {
                    number: 3,
                    arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
                    transliteration: "Lam yalid wa lam yulad",
                    translation: "He neither begets nor is born",
                    tafsir: "Allah does not have a son, nor was He born or created. He is the Creator of all things, eternal and without beginning."
                },
                {
                    number: 4,
                    arabic: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
                    transliteration: "Wa lam yakun lahu kufuwan ahad",
                    translation: "Nor is there to Him any equivalent",
                    tafsir: "Nothing is equal to Allah or comparable to Him. He is unique in His essence, attributes, and actions. This verse negates any similarity between the Creator and the creation."
                }
            ]
        }
    ],

    // Helper function to get a Surah by number
    getSurah: function(surahNumber) {
        return this.surahs.find(s => s.number === surahNumber);
    },

    // Helper function to get a specific verse
    getVerse: function(surahNumber, verseNumber) {
        const surah = this.getSurah(surahNumber);
        if (surah) {
            return surah.verses.find(v => v.number === verseNumber);
        }
        return null;
    },

    // Get all Surahs list for navigation
    getAllSurahs: function() {
        return this.surahs.map(s => ({
            number: s.number,
            name: s.name,
            nameArabic: s.nameArabic,
            translation: s.translation,
            totalVerses: s.totalVerses,
            revelationType: s.revelationType
        }));
    }
};

// Make it available globally
window.QURAN_DATA = QURAN_DATA;
