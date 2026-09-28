import { UILanguage } from "./types";

export interface Translations {
  appName: string;
  appSubtitle: string;
  nav: {
    train: string;
    exam: string;
    constructor: string;
    bank: string;
    stats: string;
  };
  languages: {
    uk: string;
    en: string;
    es: string;
    ru: string;
  };
  filters: {
    subject: string;
    allSubjects: string;
    topic: string;
    allTopics: string;
    scope: string;
    scopeAll: string;
    scopeMistakes: string;
    scopeBookmarked: string;
    scopeUnanswered: string;
    searchPlaceholder: string;
    questionLang: string;
    allLanguages: string;
  };
  timer: {
    label: string;
    noLimit: string;
    minutes: string;
    setTimer: string;
    customMinutes: string;
    startTimer: string;
    pauseTimer: string;
    resumeTimer: string;
    resetTimer: string;
    timeUpTitle: string;
    timeUpMessage: string;
    elapsed: string;
    remaining: string;
  };
  trainer: {
    questionOf: string;
    selectAnswerPrompt: string;
    correctBadge: string;
    incorrectBadge: string;
    explanationTitle: string;
    prevBtn: string;
    nextBtn: string;
    finishExamBtn: string;
    bookmarkBtn: string;
    bookmarkedBtn: string;
    shuffleBtn: string;
    resetProgressBtn: string;
    keyboardHint: string;
    navigatorTitle: string;
    answered: string;
    correct: string;
    mistakes: string;
    accuracy: string;
    noQuestionsMatch: string;
    clearFiltersBtn: string;
    editThisQuestion: string;
  };
  exam: {
    setupTitle: string;
    setupSubtitle: string;
    selectSubject: string;
    selectTopic: string;
    questionCount: string;
    timeLimit: string;
    shuffleQuestions: string;
    startExamBtn: string;
    activeExamBadge: string;
    submitExamBtn: string;
    abortExamBtn: string;
    resultsTitle: string;
    scoreLabel: string;
    passedBadge: string;
    needsWorkBadge: string;
    timeSpentLabel: string;
    correctAnswersLabel: string;
    incorrectAnswersLabel: string;
    unansweredLabel: string;
    reviewMistakesBtn: string;
    newExamBtn: string;
    topicBreakdownTitle: string;
  };
  constructor: {
    title: string;
    subtitle: string;
    singleTab: string;
    bulkTab: string;
    importExportTab: string;
    editModeTitle: string;
    createModeTitle: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    topicLabel: string;
    topicPlaceholder: string;
    questionLangLabel: string;
    questionTextLabel: string;
    questionTextPlaceholder: string;
    optionsLabel: string;
    optionPlaceholder: string;
    correctOptionLabel: string;
    explanationLabel: string;
    explanationPlaceholder: string;
    saveQuestionBtn: string;
    updateQuestionBtn: string;
    cancelEditBtn: string;
    savedToast: string;
    bulkInstructionsTitle: string;
    bulkInstructionsDesc: string;
    bulkDefaultSubject: string;
    bulkDefaultTopic: string;
    bulkDefaultLang: string;
    bulkTextareaPlaceholder: string;
    parsePreviewBtn: string;
    importParsedBtn: string;
    parsedCountLabel: string;
    loadSampleTemplateBtn: string;
    exportJsonTitle: string;
    exportJsonDesc: string;
    downloadJsonBtn: string;
    importJsonTitle: string;
    importJsonDesc: string;
    uploadJsonBtn: string;
    starterPacksTitle: string;
    starterPacksDesc: string;
    addStarterPackBtn: string;
    resetToInitialBtn: string;
    resetConfirmText: string;
  };
  bank: {
    title: string;
    subtitle: string;
    totalQuestions: string;
    addNewQuestionBtn: string;
    deleteSelectedBtn: string;
    editBtn: string;
    deleteBtn: string;
    duplicateBtn: string;
    correctAnswer: string;
  };
  stats: {
    title: string;
    subtitle: string;
    overallMastery: string;
    totalAnswered: string;
    accuracyRate: string;
    bookmarkedCount: string;
    mistakeCount: string;
    bySubjectTitle: string;
    byTopicTitle: string;
    recentExamsTitle: string;
    noExamsYet: string;
    trainMistakesCta: string;
  };
}

export const translations: Record<UILanguage, Translations> = {
  uk: {
    appName: "Advanced Trainer App",
    appSubtitle: "Універсальний конструктор тестів та екзаменаційний тренажер (ЄФВВ та будь-які предмети)",
    nav: {
      train: "Тренування",
      exam: "Іспит на час",
      constructor: "Конструктор",
      bank: "База питань",
      stats: "Аналітика",
    },
    languages: {
      uk: "Українська",
      en: "English",
      es: "Español",
      ru: "Русский",
    },
    filters: {
      subject: "Предмет",
      allSubjects: "Усі предмети",
      topic: "Тема",
      allTopics: "Усі теми",
      scope: "Режим вибірки",
      scopeAll: "Усі питання",
      scopeMistakes: "Лише помилки",
      scopeBookmarked: "Обрані (закладки)",
      scopeUnanswered: "Без відповіді",
      searchPlaceholder: "Пошук за текстом питання, темою або поясненням...",
      questionLang: "Мова питань",
      allLanguages: "Усі мови",
    },
    timer: {
      label: "Таймер",
      noLimit: "Без ліміту",
      minutes: "хв",
      setTimer: "Встановити час",
      customMinutes: "Власний час (хв)",
      startTimer: "Старт",
      pauseTimer: "Пауза",
      resumeTimer: "Продовжити",
      resetTimer: "Скинути",
      timeUpTitle: "Час вичерпано!",
      timeUpMessage: "Відведений час на виконання тесту завершився. Перегляньте ваші результати.",
      elapsed: "Минуло",
      remaining: "Залишилось",
    },
    trainer: {
      questionOf: "Питання",
      selectAnswerPrompt: "Оберіть варіант відповіді (або натисніть A, B, C, D / 1–4 на клавіатурі)",
      correctBadge: "Правильна відповідь",
      incorrectBadge: "Помилка — правильний варіант:",
      explanationTitle: "Науковий коментар та пояснення",
      prevBtn: "Попереднє",
      nextBtn: "Наступне",
      finishExamBtn: "Завершити тест",
      bookmarkBtn: "У закладки",
      bookmarkedBtn: "Збережено",
      shuffleBtn: "Перемішати",
      resetProgressBtn: "Очистити відповіді",
      keyboardHint: "Клавіші: [1-4] або [A-D] — вибір, [←/→] — навігація, [B] — закладка",
      navigatorTitle: "Карта питань",
      answered: "Відповіли",
      correct: "Правильно",
      mistakes: "Помилки",
      accuracy: "Точність",
      noQuestionsMatch: "За обраними фільтрами питань не знайдено.",
      clearFiltersBtn: "Скинути фільтри",
      editThisQuestion: "Редагувати питання",
    },
    exam: {
      setupTitle: "Налаштування симуляції іспиту",
      setupSubtitle: "Оберіть предмет, кількість питань та часовий ліміт для перевірки знань у реальних умовах.",
      selectSubject: "Оберіть предмет іспиту",
      selectTopic: "Оберіть тему або розділ",
      questionCount: "Кількість тестових питань",
      timeLimit: "Обмеження часу (хвилини)",
      shuffleQuestions: "Випадковий порядок питань",
      startExamBtn: "Розпочати іспит на час",
      activeExamBadge: "Режим іспиту (без підказок до завершення)",
      submitExamBtn: "Здати іспит і отримати результат",
      abortExamBtn: "Скасувати",
      resultsTitle: "Підсумки іспиту",
      scoreLabel: "Ваш результат",
      passedBadge: "Успішно складено",
      needsWorkBadge: "Потребує доопрацювання",
      timeSpentLabel: "Витрачено часу",
      correctAnswersLabel: "Правильних",
      incorrectAnswersLabel: "Помилкових",
      unansweredLabel: "Пропущених",
      reviewMistakesBtn: "Робота над помилками",
      newExamBtn: "Новий іспит",
      topicBreakdownTitle: "Результати за темами",
    },
    constructor: {
      title: "Конструктор тестів та предметів",
      subtitle: "Створюйте власні питання з будь-якого предмета українською, англійською, іспанською чи російською мовами.",
      singleTab: "Додати / Редагувати питання",
      bulkTab: "Швидкий імпорт тексту",
      importExportTab: "JSON & Готові набори",
      editModeTitle: "Редагування тестового питання",
      createModeTitle: "Нове тестове питання",
      subjectLabel: "Предмет / Дисципліна",
      subjectPlaceholder: "Напр.: Мовознавство (ЄФВВ), Історія, Біологія, Право...",
      topicLabel: "Тема / Розділ",
      topicPlaceholder: "Напр.: Синтаксис, Фонетика, Алгоритми...",
      questionLangLabel: "Мова питання",
      questionTextLabel: "Формулювання питання",
      questionTextPlaceholder: "Введіть текст тестового питання...",
      optionsLabel: "Варіанти відповідей (позначте правильний варіант)",
      optionPlaceholder: "Введіть текст варіанту",
      correctOptionLabel: "Правильна відповідь",
      explanationLabel: "Пояснення / Обґрунтування (необов'язково)",
      explanationPlaceholder: "Поясніть, чому ця відповідь є правильною...",
      saveQuestionBtn: "Додати питання до бази",
      updateQuestionBtn: "Зберегти зміни",
      cancelEditBtn: "Скасувати",
      savedToast: "Питання успішно збережено!",
      bulkInstructionsTitle: "Масовий парсер тестових питань",
      bulkInstructionsDesc: "Вставте список питань у текстовому форматі (підтримуються маркери A/B/C/D або А/Б/В/Г, рядки 'Відповідь:' / 'Answer:' / 'Ответ:' / 'Respuesta:' та 'Пояснення:' / 'Explanation:').",
      bulkDefaultSubject: "Предмет для імпортованих питань",
      bulkDefaultTopic: "Тема за замовчуванням",
      bulkDefaultLang: "Мова питань",
      bulkTextareaPlaceholder: "1. Що вивчає фонетика?\nA) Словниковий склад\nB) Звуковий лад мови\nC) Будову речень\nD) Правила пунктуації\nВідповідь: B\nПояснення: Фонетика досліджує звуки мовлення.",
      parsePreviewBtn: "Розпізнати питання",
      importParsedBtn: "Додати розпізнані питання",
      parsedCountLabel: "Розпізнано питань:",
      loadSampleTemplateBtn: "Вставити приклад формату",
      exportJsonTitle: "Експорт бази питань (JSON)",
      exportJsonDesc: "Завантажте всі ваші питання та предмети у файл для резервного копіювання або передачі.",
      downloadJsonBtn: "Завантажити JSON-файл",
      importJsonTitle: "Імпорт бази питань (JSON)",
      importJsonDesc: "Завантажте раніше збережений JSON-файл або масив питань.",
      uploadJsonBtn: "Обрати JSON-файл",
      starterPacksTitle: "Демо-набори з інших предметів та мов",
      starterPacksDesc: "Додайте приклади тестів англійською, іспанською чи російською мовами одним кліком.",
      addStarterPackBtn: "Додати набір",
      resetToInitialBtn: "Відновити початкові 140 питань ЄФВВ",
      resetConfirmText: "Базу відновлено до початкових 140 питань ЄФВВ з мовознавства!",
    },
    bank: {
      title: "Керування базою питань",
      subtitle: "Переглядайте, фільтруйте, редагуйте або видаляйте тестові питання з усіх предметів.",
      totalQuestions: "Усього в базі",
      addNewQuestionBtn: "Створити питання",
      deleteSelectedBtn: "Видалити відфільтровані",
      editBtn: "Редагувати",
      deleteBtn: "Видалити",
      duplicateBtn: "Дублювати",
      correctAnswer: "Правильна відповідь",
    },
    stats: {
      title: "Аналітика та статистика підготовки",
      subtitle: "Детальний огляд засвоєння предметів, тем та історії симуляцій іспиту.",
      overallMastery: "Загальний прогрес бази",
      totalAnswered: "Опрацьовано питань",
      accuracyRate: "Середня точність",
      bookmarkedCount: "У закладках",
      mistakeCount: "Потребують повторення",
      bySubjectTitle: "Успішність за предметами",
      byTopicTitle: "Успішність за темами",
      recentExamsTitle: "Історія складених іспитів",
      noExamsYet: "Ви ще не завершили жодного іспиту на час. Спробуйте режим «Іспит на час»!",
      trainMistakesCta: "Тренувати мої помилки",
    },
  },

  en: {
    appName: "Advanced Trainer App",
    appSubtitle: "Universal Multi-Subject Test Constructor & Timed Exam Simulator",
    nav: {
      train: "Practice",
      exam: "Timed Exam",
      constructor: "Constructor",
      bank: "Question Bank",
      stats: "Analytics",
    },
    languages: {
      uk: "Українська",
      en: "English",
      es: "Español",
      ru: "Русский",
    },
    filters: {
      subject: "Subject",
      allSubjects: "All Subjects",
      topic: "Topic",
      allTopics: "All Topics",
      scope: "Filter Mode",
      scopeAll: "All Questions",
      scopeMistakes: "Mistakes Only",
      scopeBookmarked: "Bookmarked",
      scopeUnanswered: "Unanswered",
      searchPlaceholder: "Search by question text, topic, or explanation...",
      questionLang: "Question Lang",
      allLanguages: "All Languages",
    },
    timer: {
      label: "Timer",
      noLimit: "No Limit",
      minutes: "min",
      setTimer: "Set Timer",
      customMinutes: "Custom (min)",
      startTimer: "Start",
      pauseTimer: "Pause",
      resumeTimer: "Resume",
      resetTimer: "Reset",
      timeUpTitle: "Time is Up!",
      timeUpMessage: "Your allocated training or exam time has expired. Review your performance below.",
      elapsed: "Elapsed",
      remaining: "Remaining",
    },
    trainer: {
      questionOf: "Question",
      selectAnswerPrompt: "Select an answer option (or press A, B, C, D / 1–4 on your keyboard)",
      correctBadge: "Correct Answer",
      incorrectBadge: "Incorrect — correct option:",
      explanationTitle: "Academic Explanation & Commentary",
      prevBtn: "Previous",
      nextBtn: "Next",
      finishExamBtn: "Finish Session",
      bookmarkBtn: "Bookmark",
      bookmarkedBtn: "Bookmarked",
      shuffleBtn: "Shuffle",
      resetProgressBtn: "Clear Answers",
      keyboardHint: "Shortcuts: [1-4] or [A-D] — select, [←/→] — navigate, [B] — bookmark",
      navigatorTitle: "Question Map",
      answered: "Answered",
      correct: "Correct",
      mistakes: "Mistakes",
      accuracy: "Accuracy",
      noQuestionsMatch: "No questions match your current filters.",
      clearFiltersBtn: "Reset Filters",
      editThisQuestion: "Edit Question",
    },
    exam: {
      setupTitle: "Timed Exam Simulation Setup",
      setupSubtitle: "Choose any subject, question count, and countdown duration to test yourself under exam conditions.",
      selectSubject: "Select Exam Subject",
      selectTopic: "Select Topic / Module",
      questionCount: "Number of Questions",
      timeLimit: "Time Limit (Minutes)",
      shuffleQuestions: "Randomize question order",
      startExamBtn: "Start Timed Exam",
      activeExamBadge: "Exam Simulation Mode (explanations hidden until submission)",
      submitExamBtn: "Submit Exam & View Score",
      abortExamBtn: "Abort Exam",
      resultsTitle: "Exam Simulation Results",
      scoreLabel: "Final Score",
      passedBadge: "Exam Passed",
      needsWorkBadge: "Needs Further Review",
      timeSpentLabel: "Time Spent",
      correctAnswersLabel: "Correct",
      incorrectAnswersLabel: "Incorrect",
      unansweredLabel: "Unanswered",
      reviewMistakesBtn: "Practice Mistakes Now",
      newExamBtn: "Configure New Exam",
      topicBreakdownTitle: "Accuracy by Topic",
    },
    constructor: {
      title: "Test & Subject Constructor",
      subtitle: "Build custom test questions for any subject in English, Ukrainian, Russian, or Spanish.",
      singleTab: "Add / Edit Question",
      bulkTab: "Smart Bulk Text Parser",
      importExportTab: "JSON & Starter Packs",
      editModeTitle: "Edit Test Question",
      createModeTitle: "Create New Test Question",
      subjectLabel: "Subject / Discipline",
      subjectPlaceholder: "e.g. Мовознавство (ЄФВВ), Computer Science, Medicine, Law...",
      topicLabel: "Topic / Category",
      topicPlaceholder: "e.g. Syntax, Phonetics, Data Structures...",
      questionLangLabel: "Question Language",
      questionTextLabel: "Question Prompt",
      questionTextPlaceholder: "Enter the full question text...",
      optionsLabel: "Answer Options (click radio button to mark correct answer)",
      optionPlaceholder: "Enter option text",
      correctOptionLabel: "Correct Option",
      explanationLabel: "Detailed Explanation / Rationale",
      explanationPlaceholder: "Explain why the correct answer is right and why others are distractors...",
      saveQuestionBtn: "Add Question to Bank",
      updateQuestionBtn: "Save Changes",
      cancelEditBtn: "Cancel",
      savedToast: "Question saved to bank!",
      bulkInstructionsTitle: "Bulk Text Question Importer",
      bulkInstructionsDesc: "Paste multiple questions in plain text. Supports A/B/C/D or А/Б/В/Г options, 'Answer:' / 'Відповідь:' / 'Ответ:' / 'Respuesta:', and 'Explanation:' / 'Пояснення:'.",
      bulkDefaultSubject: "Target Subject for Imported Questions",
      bulkDefaultTopic: "Default Topic",
      bulkDefaultLang: "Question Language",
      bulkTextareaPlaceholder: "1. What is the time complexity of binary search?\nA) O(n)\nB) O(log n)\nC) O(n^2)\nD) O(1)\nAnswer: B\nExplanation: Binary search halves the search space on each step.",
      parsePreviewBtn: "Parse & Preview",
      importParsedBtn: "Import Parsed Questions",
      parsedCountLabel: "Parsed questions:",
      loadSampleTemplateBtn: "Insert Sample Format",
      exportJsonTitle: "Export Question Bank (JSON)",
      exportJsonDesc: "Download your entire multi-subject question bank as a portable JSON file.",
      downloadJsonBtn: "Download JSON Backup",
      importJsonTitle: "Import Question Bank (JSON)",
      importJsonDesc: "Upload a JSON file containing questions to merge or replace your current bank.",
      uploadJsonBtn: "Select JSON File",
      starterPacksTitle: "Multilingual Subject Starter Packs",
      starterPacksDesc: "Add sample question sets in English, Spanish, or Russian with a single click.",
      addStarterPackBtn: "Add Pack",
      resetToInitialBtn: "Restore Default 140 EFVV Linguistics Questions",
      resetConfirmText: "Question bank restored to the initial 140 EFVV Linguistics questions!",
    },
    bank: {
      title: "Question Bank Manager",
      subtitle: "Browse, search, edit, duplicate, or delete questions across all subjects and languages.",
      totalQuestions: "Total in Bank",
      addNewQuestionBtn: "New Question",
      deleteSelectedBtn: "Delete Filtered",
      editBtn: "Edit",
      deleteBtn: "Delete",
      duplicateBtn: "Duplicate",
      correctAnswer: "Correct Answer",
    },
    stats: {
      title: "Training Analytics & Mastery",
      subtitle: "Track your accuracy across subjects, topics, and timed exam simulations.",
      overallMastery: "Bank Coverage",
      totalAnswered: "Questions Answered",
      accuracyRate: "Overall Accuracy",
      bookmarkedCount: "Bookmarked",
      mistakeCount: "Active Mistakes",
      bySubjectTitle: "Performance by Subject",
      byTopicTitle: "Performance by Topic",
      recentExamsTitle: "Timed Exam History",
      noExamsYet: "No timed exams completed yet. Start a simulation in the 'Timed Exam' tab!",
      trainMistakesCta: "Train My Mistakes",
    },
  },

  es: {
    appName: "Advanced Trainer App",
    appSubtitle: "Constructor Universal de Exámenes y Entrenador Multilingüe por Tiempo",
    nav: {
      train: "Entrenar",
      exam: "Examen Cronometrado",
      constructor: "Constructor",
      bank: "Banco de Preguntas",
      stats: "Analítica",
    },
    languages: {
      uk: "Українська",
      en: "English",
      es: "Español",
      ru: "Русский",
    },
    filters: {
      subject: "Asignatura",
      allSubjects: "Todas las asignaturas",
      topic: "Tema",
      allTopics: "Todos los temas",
      scope: "Filtro",
      scopeAll: "Todas las preguntas",
      scopeMistakes: "Solo errores",
      scopeBookmarked: "Marcadas",
      scopeUnanswered: "Sin responder",
      searchPlaceholder: "Buscar por texto de pregunta, tema o explicación...",
      questionLang: "Idioma",
      allLanguages: "Todos los idiomas",
    },
    timer: {
      label: "Temporizador",
      noLimit: "Sin límite",
      minutes: "min",
      setTimer: "Ajustar tiempo",
      customMinutes: "Personalizado (min)",
      startTimer: "Iniciar",
      pauseTimer: "Pausar",
      resumeTimer: "Reanudar",
      resetTimer: "Reiniciar",
      timeUpTitle: "¡Tiempo agotado!",
      timeUpMessage: "El tiempo asignado para la sesión ha terminado. Revisa tus resultados a continuación.",
      elapsed: "Transcurrido",
      remaining: "Restante",
    },
    trainer: {
      questionOf: "Pregunta",
      selectAnswerPrompt: "Selecciona una opción (o pulsa A, B, C, D / 1–4 en el teclado)",
      correctBadge: "Respuesta Correcta",
      incorrectBadge: "Incorrecto — opción correcta:",
      explanationTitle: "Explicación Académica",
      prevBtn: "Anterior",
      nextBtn: "Siguiente",
      finishExamBtn: "Finalizar sesión",
      bookmarkBtn: "Guardar",
      bookmarkedBtn: "Guardada",
      shuffleBtn: "Mezclar",
      resetProgressBtn: "Borrar respuestas",
      keyboardHint: "Atajos: [1-4] o [A-D] — elegir, [←/→] — navegar, [B] — marcador",
      navigatorTitle: "Mapa de Preguntas",
      answered: "Respondidas",
      correct: "Correctas",
      mistakes: "Errores",
      accuracy: "Precisión",
      noQuestionsMatch: "No hay preguntas que coincidan con los filtros seleccionados.",
      clearFiltersBtn: "Restablecer filtros",
      editThisQuestion: "Editar pregunta",
    },
    exam: {
      setupTitle: "Configuración de Examen Cronometrado",
      setupSubtitle: "Elige cualquier asignatura, número de preguntas y límite de tiempo para simular un examen real.",
      selectSubject: "Seleccionar Asignatura",
      selectTopic: "Seleccionar Tema / Módulo",
      questionCount: "Cantidad de Preguntas",
      timeLimit: "Límite de Tiempo (Minutos)",
      shuffleQuestions: "Orden aleatorio de preguntas",
      startExamBtn: "Comenzar Examen Cronometrado",
      activeExamBadge: "Modo Examen (sin explicaciones hasta entregar)",
      submitExamBtn: "Entregar Examen y Ver Nota",
      abortExamBtn: "Cancelar",
      resultsTitle: "Resultados del Examen",
      scoreLabel: "Puntuación Final",
      passedBadge: "Aprobado",
      needsWorkBadge: "Requiere Repaso",
      timeSpentLabel: "Tiempo Empleado",
      correctAnswersLabel: "Correctas",
      incorrectAnswersLabel: "Incorrectas",
      unansweredLabel: "En blanco",
      reviewMistakesBtn: "Practicar Errores",
      newExamBtn: "Nuevo Examen",
      topicBreakdownTitle: "Desglose por Temas",
    },
    constructor: {
      title: "Constructor de Exámenes y Asignaturas",
      subtitle: "Crea preguntas para cualquier asignatura en español, inglés, ucraniano o ruso.",
      singleTab: "Añadir / Editar Pregunta",
      bulkTab: "Importación Rápida de Texto",
      importExportTab: "JSON y Paquetes Demo",
      editModeTitle: "Editar Pregunta",
      createModeTitle: "Crear Nueva Pregunta",
      subjectLabel: "Asignatura / Materia",
      subjectPlaceholder: "Ej.: Lingüística, Historia, Informática, Derecho...",
      topicLabel: "Tema / Categoría",
      topicPlaceholder: "Ej.: Sintaxis, Fonética, Algoritmos...",
      questionLangLabel: "Idioma de la pregunta",
      questionTextLabel: "Enunciado de la pregunta",
      questionTextPlaceholder: "Escribe el texto completo de la pregunta...",
      optionsLabel: "Opciones de respuesta (marca la opción correcta)",
      optionPlaceholder: "Texto de la opción",
      correctOptionLabel: "Opción Correcta",
      explanationLabel: "Explicación detallada",
      explanationPlaceholder: "Explica por qué esta respuesta es la correcta...",
      saveQuestionBtn: "Guardar Pregunta en el Banco",
      updateQuestionBtn: "Guardar Cambios",
      cancelEditBtn: "Cancelar",
      savedToast: "¡Pregunta guardada correctamente!",
      bulkInstructionsTitle: "Importador Masivo de Texto",
      bulkInstructionsDesc: "Pega múltiples preguntas en texto plano con opciones A/B/C/D, 'Respuesta:' / 'Answer:' / 'Відповідь:' y 'Explicación:' / 'Explanation:'.",
      bulkDefaultSubject: "Asignatura para las preguntas importadas",
      bulkDefaultTopic: "Tema predeterminado",
      bulkDefaultLang: "Idioma de las preguntas",
      bulkTextareaPlaceholder: "1. ¿Cuál es la unidad mínima de la fonología?\nA) Alófono\nB) Fonema\nC) Morfema\nD) Sílaba\nRespuesta: B\nExplicación: El fonema es la unidad mínima distintiva.",
      parsePreviewBtn: "Analizar Texto",
      importParsedBtn: "Importar Preguntas",
      parsedCountLabel: "Preguntas detectadas:",
      loadSampleTemplateBtn: "Insertar Ejemplo",
      exportJsonTitle: "Exportar Banco de Preguntas (JSON)",
      exportJsonDesc: "Descarga todas tus preguntas y asignaturas en un archivo JSON.",
      downloadJsonBtn: "Descargar JSON",
      importJsonTitle: "Importar Banco de Preguntas (JSON)",
      importJsonDesc: "Carga un archivo JSON con preguntas para añadirlas a tu banco.",
      uploadJsonBtn: "Seleccionar archivo JSON",
      starterPacksTitle: "Paquetes de Ejemplo Multilingües",
      starterPacksDesc: "Añade colecciones de muestra en inglés, español o ruso con un clic.",
      addStarterPackBtn: "Añadir Paquete",
      resetToInitialBtn: "Restaurar las 140 preguntas iniciales de Lingüística EFVV",
      resetConfirmText: "¡Banco restaurado a las 140 preguntas iniciales!",
    },
    bank: {
      title: "Gestor del Banco de Preguntas",
      subtitle: "Explora, filtra, edita o elimina preguntas de todas las asignaturas.",
      totalQuestions: "Total en el banco",
      addNewQuestionBtn: "Nueva Pregunta",
      deleteSelectedBtn: "Eliminar filtradas",
      editBtn: "Editar",
      deleteBtn: "Eliminar",
      duplicateBtn: "Duplicar",
      correctAnswer: "Respuesta correcta",
    },
    stats: {
      title: "Analítica y Progreso de Estudio",
      subtitle: "Supervisa tu dominio por asignatura, tema e historial de exámenes cronometrados.",
      overallMastery: "Dominio del Banco",
      totalAnswered: "Preguntas Respondidas",
      accuracyRate: "Precisión Media",
      bookmarkedCount: "Marcadas",
      mistakeCount: "Errores Pendientes",
      bySubjectTitle: "Rendimiento por Asignatura",
      byTopicTitle: "Rendimiento por Tema",
      recentExamsTitle: "Historial de Exámenes",
      noExamsYet: "Aún no has completado exámenes cronometrados. ¡Prueba el modo Examen Cronometrado!",
      trainMistakesCta: "Entrenar mis Errores",
    },
  },

  ru: {
    appName: "Advanced Trainer App",
    appSubtitle: "Универсальный конструктор тестов и экзаменационный тренажёр по любым предметам",
    nav: {
      train: "Тренировка",
      exam: "Экзамен на время",
      constructor: "Конструктор",
      bank: "База вопросов",
      stats: "Аналитика",
    },
    languages: {
      uk: "Українська",
      en: "English",
      es: "Español",
      ru: "Русский",
    },
    filters: {
      subject: "Предмет",
      allSubjects: "Все предметы",
      topic: "Тема",
      allTopics: "Все темы",
      scope: "Выборка",
      scopeAll: "Все вопросы",
      scopeMistakes: "Только ошибки",
      scopeBookmarked: "Избранные (закладки)",
      scopeUnanswered: "Без ответа",
      searchPlaceholder: "Поиск по тексту вопроса, теме или пояснению...",
      questionLang: "Язык вопросов",
      allLanguages: "Все языки",
    },
    timer: {
      label: "Таймер",
      noLimit: "Без лимита",
      minutes: "мин",
      setTimer: "Задать время",
      customMinutes: "Своё время (мин)",
      startTimer: "Старт",
      pauseTimer: "Пауза",
      resumeTimer: "Продолжить",
      resetTimer: "Сброс",
      timeUpTitle: "Время вышло!",
      timeUpMessage: "Отведённое время на выполнение теста истекло. Ознакомьтесь с результатами.",
      elapsed: "Прошло",
      remaining: "Осталось",
    },
    trainer: {
      questionOf: "Вопрос",
      selectAnswerPrompt: "Выберите вариант ответа (или нажмите A, B, C, D / 1–4 на клавиатуре)",
      correctBadge: "Правильный ответ",
      incorrectBadge: "Ошибка — верный вариант:",
      explanationTitle: "Научный комментарий и объяснение",
      prevBtn: "Назад",
      nextBtn: "Далее",
      finishExamBtn: "Завершить тест",
      bookmarkBtn: "В закладки",
      bookmarkedBtn: "Сохранено",
      shuffleBtn: "Перемешать",
      resetProgressBtn: "Сбросить ответы",
      keyboardHint: "Клавиши: [1-4] или [A-D] — ответ, [←/→] — навигация, [B] — закладка",
      navigatorTitle: "Карта вопросов",
      answered: "Отвечено",
      correct: "Верно",
      mistakes: "Ошибки",
      accuracy: "Точность",
      noQuestionsMatch: "По выбранным фильтрам вопросов не найдено.",
      clearFiltersBtn: "Сбросить фильтры",
      editThisQuestion: "Редактировать вопрос",
    },
    exam: {
      setupTitle: "Настройка экзамена на время",
      setupSubtitle: "Выберите предмет, количество вопросов и лимит времени для проверки знаний в условиях реального теста.",
      selectSubject: "Выберите предмет экзамена",
      selectTopic: "Выберите тему или раздел",
      questionCount: "Количество вопросов",
      timeLimit: "Лимит времени (минуты)",
      shuffleQuestions: "Случайный порядок вопросов",
      startExamBtn: "Начать экзамен на время",
      activeExamBadge: "Режим экзамена (без подсказок до завершения)",
      submitExamBtn: "Сдать экзамен и узнать балл",
      abortExamBtn: "Отменить",
      resultsTitle: "Итоги экзамена",
      scoreLabel: "Ваш результат",
      passedBadge: "Экзамен сдан",
      needsWorkBadge: "Требуется повторение",
      timeSpentLabel: "Затрачено времени",
      correctAnswersLabel: "Правильных",
      incorrectAnswersLabel: "Ошибочных",
      unansweredLabel: "Пропущенных",
      reviewMistakesBtn: "Работа над ошибками",
      newExamBtn: "Новый экзамен",
      topicBreakdownTitle: "Результаты по темам",
    },
    constructor: {
      title: "Конструктор тестов и предметов",
      subtitle: "Создавайте собственные вопросы по любому предмету на английском, украинском, русском или испанском языках.",
      singleTab: "Добавить / Редактировать",
      bulkTab: "Быстрый импорт текста",
      importExportTab: "JSON и Готовые наборы",
      editModeTitle: "Редактирование вопроса",
      createModeTitle: "Новый тестовый вопрос",
      subjectLabel: "Предмет / Дисциплина",
      subjectPlaceholder: "Напр.: Мовознавство (ЄФВВ), История, Программирование, Право...",
      topicLabel: "Тема / Раздел",
      topicPlaceholder: "Напр.: Синтаксис, Фонетика, Алгоритмы...",
      questionLangLabel: "Язык вопроса",
      questionTextLabel: "Текст вопроса",
      questionTextPlaceholder: "Введите формулировку тестового вопроса...",
      optionsLabel: "Варианты ответов (отметьте правильный вариант)",
      optionPlaceholder: "Введите текст варианта",
      correctOptionLabel: "Правильный ответ",
      explanationLabel: "Объяснение / Комментарий",
      explanationPlaceholder: "Поясните, почему этот вариант является правильным...",
      saveQuestionBtn: "Добавить вопрос в базу",
      updateQuestionBtn: "Сохранить изменения",
      cancelEditBtn: "Отмена",
      savedToast: "Вопрос успешно сохранён!",
      bulkInstructionsTitle: "Массовый парсер текстовых вопросов",
      bulkInstructionsDesc: "Вставьте список вопросов текстом (поддерживаются варианты A/B/C/D или А/Б/В/Г, строки 'Ответ:' / 'Відповідь:' / 'Answer:' и 'Пояснение:' / 'Explanation:').",
      bulkDefaultSubject: "Предмет для импортируемых вопросов",
      bulkDefaultTopic: "Тема по умолчанию",
      bulkDefaultLang: "Язык вопросов",
      bulkTextareaPlaceholder: "1. Что изучает фонетика?\nA) Лексический состав\nB) Звуковой строй языка\nC) Строение предложений\nD) Пунктуацию\nОтвет: B\nПояснение: Фонетика изучает звуки речи.",
      parsePreviewBtn: "Распознать вопросы",
      importParsedBtn: "Импортировать вопросы",
      parsedCountLabel: "Распознано вопросов:",
      loadSampleTemplateBtn: "Вставить образец",
      exportJsonTitle: "Экспорт базы вопросов (JSON)",
      exportJsonDesc: "Скачайте все ваши вопросы и предметы в формате JSON для резервной копии.",
      downloadJsonBtn: "Скачать JSON-файл",
      importJsonTitle: "Импорт базы вопросов (JSON)",
      importJsonDesc: "Загрузите JSON-файл с тестовыми вопросами.",
      uploadJsonBtn: "Выбрать JSON-файл",
      starterPacksTitle: "Демо-наборы по разным предметам и языкам",
      starterPacksDesc: "Добавьте примеры тестов на английском, испанском или русском языках одним кликом.",
      addStarterPackBtn: "Добавить набор",
      resetToInitialBtn: "Восстановить исходные 140 вопросов ЄФВВ",
      resetConfirmText: "База восстановлена до исходных 140 вопросов ЄФВВ по языкознанию!",
    },
    bank: {
      title: "Управление базой вопросов",
      subtitle: "Просматривайте, фильтруйте, редактируйте или удаляйте вопросы по всем предметам.",
      totalQuestions: "Всего в базе",
      addNewQuestionBtn: "Создать вопрос",
      deleteSelectedBtn: "Удалить отфильтрованные",
      editBtn: "Изменить",
      deleteBtn: "Удалить",
      duplicateBtn: "Дублировать",
      correctAnswer: "Правильный ответ",
    },
    stats: {
      title: "Аналитика и статистика подготовки",
      subtitle: "Детальный обзор освоения предметов, тем и истории экзаменов на время.",
      overallMastery: "Освоение базы",
      totalAnswered: "Отвечено вопросов",
      accuracyRate: "Средняя точность",
      bookmarkedCount: "В закладках",
      mistakeCount: "Ошибки для повторения",
      bySubjectTitle: "Успеваемость по предметам",
      byTopicTitle: "Успеваемость по темам",
      recentExamsTitle: "История экзаменов на время",
      noExamsYet: "Вы ещё не завершили ни одного экзамена на время. Попробуйте вкладку «Экзамен на время»!",
      trainMistakesCta: "Тренировать мои ошибки",
    },
  },
};
