-- Sample lesson data for TutaLearn

-- Mathematics lessons
INSERT INTO public.lessons (title, title_sw, description, description_sw, content, content_sw, subject_id, grade_level, difficulty, estimated_duration, language, cultural_adaptations) VALUES
(
    'Introduction to Fractions',
    'Utangulizi wa Sehemu',
    'Learn about fractions using everyday African examples like sharing ugali or mandazi',
    'Jifunze kuhusu sehemu kwa kutumia mifano ya kila siku kama kugawana ugali au mandazi',
    'A fraction represents a part of a whole. Imagine you have 4 pieces of ugali to share equally among your family of 4 people. Each person gets 1/4 (one-fourth) of the total ugali.

    Key concepts:
    1. Numerator (top number) - how many parts you have
    2. Denominator (bottom number) - total number of equal parts
    
    Examples from daily life:
    - If you eat 2 out of 8 mandazi, you ate 2/8 or 1/4 of them
    - If 3 out of 5 matatu seats are occupied, 3/5 of the matatu is full
    
    Practice: Draw circles representing chapati and shade different fractions.',
    'Sehemu inawakilisha sehemu ya jumla. Fikiria una vipande 4 vya ugali kugawana sawasawa kati ya familia yako ya watu 4. Kila mtu anapata 1/4 (robo moja) ya ugali wote.

    Dhana muhimu:
    1. Nambari ya juu - ni sehemu ngapi unazo
    2. Nambari ya chini - jumla ya sehemu sawa
    
    Mifano kutoka maisha ya kila siku:
    - Ukila mandazi 2 kati ya 8, umekula 2/8 au 1/4 yao
    - Ikiwa viti 3 kati ya 5 vya matatu vimeshughulikiwa, 3/5 ya matatu imejaa',
    (SELECT id FROM public.subjects WHERE name = 'Mathematics'),
    4,
    'beginner',
    30,
    'en',
    '["ugali_sharing", "mandazi_counting", "matatu_example", "chapati_visualization"]'::jsonb
),
(
    'Market Mathematics',
    'Hisabati za Soko',
    'Learn addition, subtraction and money calculations using market scenarios',
    'Jifunza kuongeza, kutoa na hesabu za pesa kwa kutumia mazingira ya soko',
    'Mathematics is everywhere in the market! Let''s learn how to calculate change, add prices, and solve real problems.

    Scenario: You go to Marikiti market with 1000 KSh
    - Tomatoes: 150 KSh
    - Onions: 80 KSh  
    - Rice: 200 KSh
    - Cooking oil: 300 KSh
    
    Total cost: 150 + 80 + 200 + 300 = 730 KSh
    Change: 1000 - 730 = 270 KSh
    
    Practice problems:
    1. If sukuma wiki costs 20 KSh per bunch and you buy 3 bunches, how much do you pay?
    2. You have 500 KSh and spend 320 KSh. How much change do you get?',
    'Hisabati iko kila mahali sokoni! Tujifunze jinsi ya kuhesabu chenji, kuongeza bei, na kutatua matatizo ya kweli.

    Mazingira: Unaenda soko la Marikiti na KSh 1000
    - Nyanya: KSh 150
    - Vitunguu: KSh 80
    - Mchele: KSh 200  
    - Mafuta ya kupika: KSh 300
    
    Jumla ya gharama: 150 + 80 + 200 + 300 = KSh 730
    Chenji: 1000 - 730 = KSh 270',
    (SELECT id FROM public.subjects WHERE name = 'Mathematics'),
    3,
    'beginner',
    25,
    'sw',
    '["kenyan_currency", "market_scenarios", "local_vegetables", "real_prices"]'::jsonb
);

-- Science lessons
INSERT INTO public.lessons (title, title_sw, description, description_sw, content, content_sw, subject_id, grade_level, difficulty, estimated_duration, language, cultural_adaptations) VALUES
(
    'Photosynthesis in African Trees',
    'Mchakato wa Kutoa Oksijeni katika Miti ya Afrika',
    'Discover how baobab trees, acacias, and other African plants make their own food',
    'Gundua jinsi mti wa mbuyu, miacacía na mimea mingine ya Afrika inavyotengeneza chakula chao',
    'Photosynthesis is how plants make their own food using sunlight, water, and carbon dioxide.

    African trees are masters of photosynthesis:
    
    **Baobab Tree (Mbuyu):**
    - Stores water in its massive trunk
    - Large leaves maximize sunlight capture
    - Can photosynthesize even in dry seasons
    
    **Acacia Tree:**
    - Small leaves reduce water loss
    - Efficient photosynthesis in savanna conditions
    - Provides shade for animals
    
    **The Process:**
    1. Leaves absorb sunlight
    2. Roots take in water from soil
    3. Leaves absorb CO2 from air
    4. Plant combines these to make glucose (food)
    5. Oxygen is released as a bonus!
    
    This is why forests are called "lungs of the Earth" - they give us oxygen!',
    'Mchakato wa kutoa oksijeni ni jinsi mimea inavyotengeneza chakula chao kwa kutumia mwanga wa jua, maji, na kaboni dioksidi.

    Miti ya Afrika ni ustadi wa mchakato huu:
    
    **Mti wa Mbuyu:**
    - Unahifadhi maji katika shina lake kubwa
    - Majani makubwa yanakusanya mwanga mwingi wa jua
    - Unaweza kutengeneza chakula hata wakati wa kiangazi
    
    **Mti wa Mikacía:**
    - Majani madogo yanapunguza kupoteza maji
    - Mchakato wa kutoa oksijeni ni mzuri katika mazingira ya savana',
    (SELECT id FROM public.subjects WHERE name = 'Science'),
    6,
    'intermediate',
    40,
    'en',
    '["baobab_tree", "acacia_tree", "savanna_ecosystem", "drought_adaptation"]'::jsonb
);

-- English lessons
INSERT INTO public.lessons (title, title_sw, description, description_sw, content, content_sw, subject_id, grade_level, difficulty, estimated_duration, language, cultural_adaptations) VALUES
(
    'Storytelling and Oral Traditions',
    'Uongezi wa Hadithi na Utamaduni wa Kimzomo',
    'Learn English through African folktales and storytelling techniques',
    'Jifunze Kiingereza kupitia hadithi za kimila za Afrika na mbinu za uongezi',
    'Stories are how we share wisdom, culture, and language. Let''s explore English through African stories!

    **Elements of a Good Story:**
    1. **Characters** - Who is in the story? (Animals, people, spirits)
    2. **Setting** - Where does it happen? (Village, forest, by the river)
    3. **Problem** - What challenge must be solved?
    4. **Solution** - How is the problem resolved?
    5. **Moral** - What lesson do we learn?

    **Example: The Clever Hare**
    Once upon a time, in a small village near Mount Kenya, there lived a clever hare. The animals were arguing about who was the smartest. The hare said, "I can prove I am the cleverest by tricking the lion!"

    **Vocabulary to Learn:**
    - Clever = smart, intelligent
    - Argue = to disagree, debate  
    - Prove = to show something is true
    - Trick = to fool someone

    **Your Turn:** Tell a story about an animal from your area. What makes them special?',
    'Hadithi ni jinsi tunavyoshiriki hekima, utamaduni, na lugha. Tuchunguze Kiingereza kupitia hadithi za Afrika!

    **Vipengele vya Hadithi Nzuri:**
    1. **Wahusika** - Ni nani katika hadithi? (Wanyamapori, watu, mizimuu)
    2. **Mazingira** - Inatokea wapi? (Kijijini, msituni, kando ya mto)
    3. **Tatizo** - Ni changamoto gani lazima itatuliwe?
    4. **Ufumbuzi** - Tatizo linavyotatuliwa vipi?
    5. **Mafunzo** - Tunajifunza nini?',
    (SELECT id FROM public.subjects WHERE name = 'English'),
    5,
    'intermediate',
    35,
    'en',
    '["african_folktales", "oral_tradition", "local_animals", "cultural_values"]'::jsonb
);

-- Kiswahili lessons  
INSERT INTO public.lessons (title, title_sw, description, description_sw, content, content_sw, subject_id, grade_level, difficulty, estimated_duration, language, cultural_adaptations) VALUES
(
    'Mazungumzo ya Kila Siku',
    'Daily Conversations in Kiswahili',
    'Jifunze mazungumzo ya kawaida katika mazingira mbalimbali',
    'Learn common conversations in different settings',
    'Kiswahili ni lugha yetu ya taifa! Tujifunze mazungumzo muhimu ya kila siku.

    **Sokoni (At the Market):**
    - Mzunguzi: "Hujambo mama, bei ya nyanya ni ngapi?"
    - Muuzaji: "Nyanya ni shilingi mia moja kwa kilo."
    - Mzunguzi: "Je, unaweza kupunguza kidogo?"
    - Muuzaji: "Sawa, shilingi themanini."

    **Shuleni (At School):**
    - Mwalimu: "Hamjambo watoto?"
    - Wanafunzi: "Hatujambo mwalimu!"
    - Mwalimu: "Leo tutajifunza kuhusu mazingira."

    **Nyumbani (At Home):**
    - Mama: "Umefanya kazi za nyumbani?"
    - Mtoto: "Ndiyo mama, nimesafisha chumba changu."
    - Mama: "Vizuri sana, sasa enda ukasoma."

    **Maneno Muhimu:**
    - Hujambo = How are you? (to one person)
    - Hamjambo = How are you? (to many people)  
    - Bei = price
    - Kupunguza = to reduce
    - Mazingira = environment',
    'Kiswahili is our national language! Let''s learn important daily conversations.

    **At the Market:**
    - Customer: "Hello mama, what''s the price of tomatoes?"
    - Seller: "Tomatoes are one hundred shillings per kilo."
    - Customer: "Can you reduce the price a little?"
    - Seller: "Okay, eighty shillings."

    **At School:**
    - Teacher: "How are you children?"
    - Students: "We are fine teacher!"
    - Teacher: "Today we will learn about the environment."',
    (SELECT id FROM public.subjects WHERE name = 'Kiswahili'),
    4,
    'beginner',
    30,
    'sw',
    '["market_language", "school_environment", "family_interactions", "respectful_greetings"]'::jsonb
);

-- Social Studies lessons
INSERT INTO public.lessons (title, title_sw, description, description_sw, content, content_sw, subject_id, grade_level, difficulty, estimated_duration, language, cultural_adaptations) VALUES
(
    'Communities and Cultural Diversity',
    'Jamii na Utofauti wa Kitamaduni',
    'Explore the rich cultural diversity of Kenya and East Africa',
    'Chunguza utajiri wa utofauti wa kitamaduni wa Kenya na Afrika Mashariki',
    'Kenya is home to over 40 different communities, each with unique traditions, languages, and customs.

    **Major Community Groups:**

    **Bantu Communities:**
    - Kikuyu, Luhya, Kamba, Meru, Kisii
    - Known for farming and trade
    - Traditional foods: ugali, sukuma wiki, githeri

    **Nilotic Communities:**  
    - Luo, Kalenjin, Maasai, Turkana
    - Many are pastoralists (keep cattle)
    - Traditional foods: fish, milk, meat

    **Cushitic Communities:**
    - Somali, Borana, Rendille
    - Often nomadic pastoralists
    - Traditional foods: camel milk, dates

    **What Makes Us Unique:**
    - Different languages and dialects
    - Various traditional dances and music
    - Unique clothing and jewelry
    - Different marriage customs
    - Various traditional foods

    **What Unites Us:**
    - We are all Kenyans
    - We share Kiswahili as our national language
    - We respect each other''s cultures
    - We work together for national development

    **Activity:** Interview an elder from your community about traditional practices.',
    'Kenya ni nyumbani kwa jamii zaidi ya 40 tofauti, kila moja na mapokeo, lugha, na dasturi za kipekee.

    **Makundi Makuu ya Jamii:**

    **Jamii za Kibantu:**
    - Kikuyu, Luhya, Kamba, Meru, Kisii
    - Wanajulikana kwa kilimo na biashara
    - Vyakula vya kimila: ugali, sukuma wiki, githeri

    **Jamii za Kiniloti:**
    - Luo, Kalenjin, Maasai, Turkana  
    - Wengi ni wafugaji (wanafuga ng''ombe)
    - Vyakula vya kimila: samaki, maziwa, nyama',
    (SELECT id FROM public.subjects WHERE name = 'Social Studies'),
    5,
    'intermediate',
    45,
    'en',
    '["kenyan_communities", "cultural_respect", "traditional_foods", "national_unity"]'::jsonb
);
