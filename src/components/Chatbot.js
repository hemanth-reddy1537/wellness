import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import "./Chatbot.css";

// Full flowData and intents are mapped as per blueprint
const flowData = {
  start: {
    text: "Hi — I'm Diya. What would you like help with today?",
    options: [
      { id: "academic_challenges", label: "Academic challenges" },
      { id: "mental_health", label: "Mental health / Emotional issues" },
      { id: "financial_issues", label: "Financial issues" },
      { id: "social_env", label: "Social / Environmental" },
      { id: "distractions", label: "Distractions" },
      { id: "other", label: "Other" },
    ],
  },
  academic_challenges: {
    text: "I'm here to help with your academic concerns. What specific challenge are you facing?",
    options: [
      { id: "complex_topics", label: "Complex topics / New subjects" },
      { id: "high_pressure", label: "High pressure / Family expectations" },
      { id: "time_management", label: "Time management" },
      { id: "exam_anxiety", label: "Exam anxiety" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  complex_topics: {
    text: "Breaking down new subjects is key. What is your main challenge?",
    options: [
      { id: "new_subject_difficult", label: "New subject is difficult" },
      { id: "faculty_not_good", label: "The faculty is not good" },
      { id: "go_back_academic", label: "Back" },
    ],
  },
  new_subject_difficult: {
    text: "It can be difficult to grasp a new subject. We can use the Feynman Technique or Active Recall to help you.",
    options: [
      { id: "feynman_technique", label: "Feynman Technique" },
      { id: "active_recall", label: "Active Recall" },
      { id: "go_back_complex_topics", label: "Back" },
    ],
  },
  feynman_technique: {
    text:
      "The Feynman Technique is a learning method where you break down a complex topic and explain it in simple terms, as if you were teaching a child. This helps you identify gaps in your own understanding.",
    options: [
      { id: "feynman_example", label: "Give me an example" },
      { id: "go_back_start", label: "I understand, thanks!" },
    ],
  },
  feynman_example: {
    text:
      "For example, if you're learning about gravity, you could explain: 'Gravity is what pulls things towards the Earth. If I drop a ball, gravity makes it fall.' Try explaining a topic in your own words, then review what you missed.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  active_recall: {
    text:
      "Active Recall is a learning method where you deliberately retrieve information from your memory. Instead of rereading, ask yourself questions and try to answer without looking. This engages your brain more effectively.",
    options: [
      { id: "active_recall_use", label: "How do I use it?" },
      { id: "go_back_start", label: "I understand, thanks!" },
    ],
  },
  active_recall_use: {
    text:
      "Review your notes, then try to recall the main points without looking. Write or say what you remember, then check if you missed anything. Repeat this process regularly.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  faculty_not_good: {
    text:
      "Sometimes the faculty is good but you can't understand them. We can go through online resources or ask your friends.",
    options: [
      { id: "online_resources", label: "Go through online resources" },
      { id: "friend_help", label: "Ask a friend for help" },
      { id: "go_back_complex_topics", label: "Back" },
    ],
  },
  online_resources: {
    text:
      "There are many online platforms such as YouTube, Coursera, and Khan Academy that can help you learn topics in a different way. Try searching for your subject there.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  friend_help: {
    text: "Try reaching out to classmates or study groups for help.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  high_pressure: {
    text:
      "Dealing with pressure is tough. It's important to know your limits. What is the main cause of the pressure?",
    options: [
      { id: "pressure_parents", label: "Pressure from parents" },
      { id: "pressure_faculty", label: "Pressure from the faculty" },
      { id: "pressure_self", label: "Pressure from myself" },
      { id: "high_pressure_other", label: "Other" },
      { id: "go_back_academic", label: "Back" },
    ],
  },
  pressure_parents: {
    text:
      "It can be hard to have expectations from your parents. We can work on ways to communicate with them to help them understand your feelings.",
    options: [
      { id: "convince_parents", label: "How to convince parents to understand?" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  convince_parents: {
    text:
      "Start by explaining your feelings and goals calmly. Use examples and listen to their perspective. Find common ground to reach an understanding.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  pressure_faculty: {
    text:
      "Dealing with expectations from faculty can be tough. It is important to focus on your own personal growth instead of outside expectations.",
    options: [
      { id: "faculty_tips", label: "Tips for talking to faculty" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  faculty_tips: {
    text:
      "Prepare your thoughts before meeting faculty. Share your challenges honestly and ask for feedback or guidance. This can help improve your relationship.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  pressure_self: {
    text:
      "It's a good thing to work hard and want to be successful, but it's important not to take on too much pressure. We can work on ways to manage this feeling.",
    options: [
      { id: "manage_self_pressure", label: "How to manage self-pressure?" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  manage_self_pressure: {
    text:
      "Self-pressure lessens when you break goals into small steps. Practice self-compassion and celebrate progress, not just perfection.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  high_pressure_other: {
    text:
      "If your pressure comes from another source, try to clarify what's causing it. Identify steps to manage stress and seek support from friends or counselors.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  time_management: {
    text:
      "Managing your time can make everything feel more manageable. What's the main challenge you're facing?",
    options: [
      { id: "distracted_friends", label: "Distracted by friends" },
      { id: "procrastination_issue", label: "Procrastination" },
      { id: "distracted_social_media", label: "Distracted by social media" },
      { id: "study_life_balance", label: "Finding work-life balance" },
      { id: "time_management_other", label: "Other" },
      { id: "go_back_academic", label: "Back" },
    ],
  },
  distracted_friends: {
    text:
      "Socializing is important, but balancing it with your studies is key. Try setting specific times for studying and socializing. Group study sessions can help.",
    options: [
      { id: "set_time_limits", label: "How to set time limits with friends?" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  set_time_limits: {
    text:
      "Use alarms or planners to schedule social and study periods. Let friends know in advance about your study timings.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  procrastination_issue: {
    text:
      "Procrastination is very common. The key is to figure out why you're delaying. Is it because the task feels too big, or are you a perfectionist?",
    options: [
      { id: "task_overwhelm", label: "Tasks feel too big" },
      { id: "perfectionism_block", label: "I'm a perfectionist" },
      { id: "go_back_time_management", label: "Back" },
    ],
  },
  task_overwhelm: {
    text:
      "Break down large tasks into very small, manageable steps. Focus on completing just the first step. For example, instead of 'write an essay,' try 'outline the introduction.'",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  perfectionism_block: {
    text:
      "Perfectionism can be a trap. Remember, a finished 'good enough' task is better than a perfect, unfinished one. Focus on progress, not perfection.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  study_life_balance: {
    text:
      "Finding balance is crucial for avoiding burnout. Try to schedule everything, including your hobbies and relaxation time, and stick to it.",
    options: [
      { id: "burnout_info", label: "Tell me more about burnout" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  distracted_social_media: {
    text:
      "Constant notifications can be a major distraction. Try using a digital detox app, turning off notifications, or setting your phone on silent while you work.",
    options: [
      { id: "suggest_app", label: "Suggest a helpful app" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  suggest_app: {
    text:
      "Apps like Forest (focus timer) or Freedom (blocks websites) can help you stay focused.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  time_management_other: {
    text:
      "If you're facing another issue with time management, describe it briefly and I'll suggest a solution.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  exam_anxiety: {
    text:
      "It's normal to feel nervous before exams. How do you feel about your preparation?",
    options: [
      { id: "well_prepared", label: "I am well-prepared." },
      { id: "not_prepared", label: "I am not well-prepared." },
      { id: "go_back_academic", label: "Back" },
    ],
  },
  well_prepared: {
    text:
      "That's great! Now, the key is to manage your anxiety and perform your best. Try a calming breathing exercise or grounding technique to help you feel more in control.",
    options: [
      { id: "breathing_exercise", label: "Guided breathing exercise" },
      { id: "mindfulness_tips", label: "Mindfulness tips for exams" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  not_prepared: {
    text:
      "Don't worry, you still have time to prepare by focusing on key topics. Would you like some tips for focusing or a breathing exercise to help you manage stress?",
    options: [
      { id: "focus_tips", label: "Tips for staying focused on key topics" },
      { id: "breathing_exercise", label: "Guided breathing exercise" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  focus_tips: {
    text:
      "Start by listing the most important topics. Allocate dedicated study slots to them and take short breaks to refresh your mind.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  breathing_exercise: {
    text:
      "Let's try a simple Box Breathing exercise. Inhale slowly for 4 counts, hold for 4, exhale for 4, and hold for 4. Repeat until you feel calmer.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  mindfulness_tips: {
    text:
      "Try the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  mental_health: {
    text:
      "It takes courage to talk about how you’re feeling. I’m here to listen. Can you tell me what you’re experiencing right now?",
    options: [
      { id: "depression_stress", label: "I feel stressed / depressed" },
      { id: "loneliness", label: "I feel lonely" },
      { id: "lack_of_motivation", label: "I feel unmotivated" },
      { id: "burnout_question", label: "I feel exhausted / burnt out" },
      { id: "go_back_start", label: "Back to Main Menu" },
    ],
  },
  depression_stress: {
    text:
      "I’m really sorry you’re feeling this way. Many students go through this silently, but you don’t have to. Could you share a little more — is it that you’re overwhelmed, feeling empty, or just need someone to talk to?",
    options: [
      { id: "overwhelmed", label: "I feel overwhelmed" },
      { id: "sad_empty", label: "I feel sad / empty" },
      { id: "need_professional_help", label: "I need to talk to someone" },
      { id: "go_back_mental_health", label: "Back to Mental Health Menu" },
    ],
  },
  overwhelmed: {
    text:
      "When everything piles up, the mind feels like it’s racing. One way psychiatrists often help is by teaching grounding techniques. Would you like me to guide you through a one-minute breathing exercise right now?",
    options: [
      { id: "begin_breathing", label: "Yes, please" },
      { id: "distress_tips", label: "Not now, give me another coping tip" },
      { id: "go_back_mental_health", label: "Back" },
    ],
  },
  sad_empty: {
    text:
      "Feeling empty can be very painful. Sometimes even small actions can shift that heaviness a little. Tell me — do you already have something comforting you usually do, or would you like me to suggest one?",
    options: [
      { id: "no_ideas", label: "I don’t know" },
      { id: "give_an_idea", label: "Suggest something" },
      { id: "go_back_mental_health", label: "Back" },
    ],
  },
  need_professional_help: {
    text:
      "It’s very important that you’re reaching out — that’s a strong step. I’m not a doctor, but I can guide you to people who are trained to help. You can contact your university’s counseling center at [Contact] or call [Helpline Number]. Would you like me to help you book a counseling appointment?",
    options: [
      { id: "book_counselling", label: "Yes, book appointment" },
      { id: "go_back_mental_health", label: "Back" },
    ],
  },
  loneliness: {
    text:
      "Loneliness is something many students quietly struggle with. When you feel isolated, it doesn’t mean you’re weak — it means you’re human. Would you like some ideas to meet new people, or tips on reconnecting with old friends?",
    options: [
      { id: "tips_new_people", label: "Tips for meeting new people" },
      { id: "reconnect_friends", label: "How to reconnect with old friends" },
      { id: "go_back_mental_health", label: "Back" },
    ],
  },
  lack_of_motivation: {
    text:
      "Sometimes motivation feels impossible, especially when stress or sadness is involved. Psychiatrists often suggest starting with one very small step, because even tiny wins can change your mindset. Would you like me to give you a small task idea, or help you set a personal goal?",
    options: [
      { id: "simple_task_idea", label: "Give me a simple task" },
      { id: "goal_setting_tips", label: "Help me set a goal" },
      { id: "go_back_mental_health", label: "Back" },
    ],
  },
  burnout_question: {
    text:
      "Burnout is a state of physical or emotional exhaustion. It's often caused by long-term stress. The first step is to acknowledge it. Would you like to learn how to identify the signs or get tips on how to manage it?",
    options: [
      { id: "signs_of_burnout", label: "Signs of burnout" },
      { id: "manage_burnout_tips", label: "How to manage burnout" },
      { id: "go_back_mental_health", label: "Back" },
    ],
  },
  signs_of_burnout: {
    text:
      "Common signs include feeling drained, cynical about your studies, or a decline in performance. Pay attention to your body and emotions.",
    options: [
      { id: "manage_burnout_tips", label: "How to manage it?" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  manage_burnout_tips: {
    text:
      "Try to disconnect from your work, get enough sleep, and practice self-care. It's okay to take a break. Remember, you can't pour from an empty cup.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  go_back_mental_health: {
    text: "What are you feeling right now?",
    options: [
      { id: "depression_stress", label: "Depression / Stress" },
      { id: "loneliness", label: "Loneliness" },
      { id: "lack_of_motivation", label: "Lack of motivation" },
      { id: "burnout_question", label: "Burnout" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  crisis_support: {
    text: "I hear how painful this is for you, and I’m really concerned about your safety. You are not alone. Please call [Suicide Helpline] immediately or reach out to someone you trust nearby. If you’re on campus, contact your university counselor right away. Your life matters.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  financial_issues: {
    text:
      "Financial issues can be a major source of stress. What's the main concern?",
    options: [
      { id: "living_expenses", label: "Living expenses" },
      { id: "tuition_fees", label: "Tuition fees" },
      { id: "job_search", label: "Job search" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  living_expenses: {
    text:
      "Creating a simple budget can give you a lot of control. Try tracking what you spend and look for ways to cut back.",
    options: [
      { id: "budget_template", label: "Budget template" },
      { id: "go_back_financial", label: "Back" },
    ],
  },
  budget_template: {
    text:
      "Here is a simple budget template: List your income, expenses and savings goals each month, and adjust as needed.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  tuition_fees: {
    text:
      "Tuition can feel overwhelming. Explore scholarships, grants, and educational loans. Contact your university's financial aid office.",
    options: [
      { id: "contact_financial_aid", label: "Contact financial aid office" },
      { id: "find_scholarships", label: "Find scholarships" },
      { id: "go_back_financial", label: "Back" },
    ],
  },
  contact_financial_aid: {
    text:
      "Visit your university's website to find contact info for the financial aid office; they can guide you about scholarships and loans.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  find_scholarships: {
    text:
      "Search online for scholarship opportunities relevant to your field and background.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  job_search: {
    text:
      "Finding a part-time job can help ease financial pressure. Here are tips for student job search on or around campus.",
    options: [
      { id: "type_of_jobs", label: "What type of jobs are available?" },
      { id: "resume_tips", label: "Resume tips" },
      { id: "go_back_financial", label: "Back" },
    ],
  },
  type_of_jobs: {
    text:
      "Campus jobs, retail, tutoring, internships, and freelancing are good options for students.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  resume_tips: {
    text:
      "Highlight your skills, education, and any prior experience. Keep it clear and concise.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  go_back_financial: {
    text: "Financial issues can be a major source of stress. What's the main concern?",
    options: [
      { id: "living_expenses", label: "Living expenses" },
      { id: "tuition_fees", label: "Tuition fees" },
      { id: "job_search", label: "Job search" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  social_env: {
    text:
      "Navigating your social environment is a big part of student life. What's currently on your mind?",
    options: [
      { id: "homesickness", label: "Homesickness" },
      { id: "new_environment", label: "New environment" },
      { id: "bullying", label: "Bullying" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  homesickness: {
    text:
      "Homesickness is very common. Stay in touch with your family and friends, but also explore your new surroundings.",
    options: [
      { id: "making_friends_tips", label: "Tips for making new friends" },
      { id: "just_venting", label: "Just venting" },
      { id: "staying_connected", label: "Staying connected" },
      { id: "go_back_social", label: "Back" },
    ],
  },
  making_friends_tips: {
    text:
      "Start small: say 'hello', join a study group, or sit with new people at lunch.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  just_venting: {
    text:
      "It's okay to vent; writing your feelings or talking to a friend can help.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  staying_connected: {
    text:
      "Schedule regular calls with your family or old friends to keep bonds strong.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  new_environment: {
    text:
      "Adjusting to a new place takes time and courage. Try new things, join campus clubs, and be open to different perspectives.",
    options: [
      { id: "how_to_make_friends", label: "How to make friends" },
      { id: "how_to_talk_to_people", label: "How to talk to people" },
      { id: "campus_groups", label: "List of campus groups" },
      { id: "go_back_social", label: "Back" },
    ],
  },
  how_to_make_friends: {
    text:
      "Be friendly and approachable. Attend events or join clubs to meet new people.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  how_to_talk_to_people: {
    text:
      "Start a conversation by asking questions about others' interests or experiences.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  campus_groups: {
    text:
      "Check your university's student union or activities website for club lists.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  bullying: {
    text:
      "I'm so sorry you're dealing with this. It's crucial to report bullying to a trusted authority, and here is an anti-ragging helpline you can contact.",
    options: [
      { id: "how_to_report", label: "How to report bullying" },
      { id: "antiragging_helplines", label: "Anti-ragging helplines" },
      { id: "go_back_social", label: "Back" },
    ],
  },
  how_to_report: {
    text:
      "Speak with a trusted adult at your institution—teacher, counselor, dean, or campus security. You may also report anonymously.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  antiragging_helplines: {
    text:
      "National anti-ragging helpline (India): 1800-180-5522. Save this number, and don't hesitate to call if needed.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  go_back_social: {
    text: "Navigating your social environment is a big part of student life. What's currently on your mind?",
    options: [
      { id: "homesickness", label: "Homesickness" },
      { id: "new_environment", label: "New environment" },
      { id: "bullying", label: "Bullying" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  distractions: {
    text: "It can be tough to focus. What's distracting you the most?",
    options: [
      { id: "friends", label: "Friends" },
      { id: "mobile_social_media", label: "Mobile / Social Media" },
      { id: "gaming_streaming", label: "Gaming / Streaming" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  friends: {
    text:
      "Socializing is important, but balancing it with your studies is key. Try setting specific times for study and socializing. Group study sessions can help.",
    options: [
      { id: "go_back_distractions", label: "Back" },
    ],
  },
  mobile_social_media: {
    text:
      "Track your phone usage and challenge yourself to limit it. Use apps that block distractions.",
    options: [
      { id: "app_suggestions", label: "Suggest an app" },
      { id: "go_back_distractions", label: "Back" },
    ],
  },
  app_suggestions: {
    text:
      "Try Forest to stay focused or Freedom to block distracting sites.",
    options: [
      { id: "go_back_distractions", label: "Back" },
    ],
  },
  gaming_streaming: {
    text:
      "Games and series consume a lot of time. Try the Pomodoro Technique: set short, focused study blocks, then enjoy your break.",
    options: [
      { id: "control_time", label: "How to control my time?" },
      { id: "more_pomodoro", label: "More about Pomodoro" },
      { id: "go_back_distractions", label: "Back" },
    ],
  },
  control_time: {
    text:
      "Set start and end times for gaming/streaming, stick to them, and reward yourself for staying disciplined.",
    options: [
      { id: "go_back_distractions", label: "Back" },
    ],
  },
  more_pomodoro: {
    text:
      "Work for 25 minutes, then take a 5-minute break. Repeat, then after four cycles, take a longer break.",
    options: [
      { id: "go_back_distractions", label: "Back" },
    ],
  },
  go_back_distractions: {
    text: "It can be tough to focus. What's distracting you the most?",
    options: [
      { id: "friends", label: "Friends" },
      { id: "mobile_social_media", label: "Mobile / Social Media" },
      { id: "gaming_streaming", label: "Gaming / Streaming" },
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
  other: {
    text: "Tell me briefly about your issue --- I will try to help or direct you to resources.",
    options: [
      { id: "go_back_start", label: "Back to main menu" },
    ],
  },
};

const intents = {
  academic_challenges: ["academics", "school", "studies", "classes", "learning"],
  complex_topics: ["complex topics", "new subjects", "hard topic", "don't understand", "confused"],
  high_pressure: [
    "pressure", "family expectations", "parents", "stress from home", "high expectations"
  ],
  time_management: [
    "time management", "organize my time", "schedule", "not enough time", "procrastinating"
  ],
  exam_anxiety: ["exam anxiety", "test stress", "nervous about exams", "finals"],
  assignments_deadlines: ["assignments", "deadlines", "too much work", "overwhelmed with homework"],
  procrastination_issue: ["procrastinating", "can't start", "delaying work", "putting things off"],
  study_life_balance: ["work-life balance", "study balance", "personal life", "social life"],
  mental_health: [
    "mental health", "emotional issues", "sad", "unhappy", "feeling low", "overwhelmed"
  ],
  depression_stress: [
    "depressed", "stressed", "feeling low", "overwhelmed", "sad", "unhappy"
  ],
  loneliness: [
    "lonely", "alone", "no friends", "loneliness", "homesick", "isolated"
  ],
  lack_of_motivation: [
    "no motivation", "unmotivated", "can't focus", "lazy", "no energy"
  ],
  burnout_question: ["burnt out", "exhausted", "tired of everything", "worn out"],
  need_professional_help: [
    "i want to die", "i feel hopeless", "i'm going to hurt myself", "i need a professional", "i need to talk to someone", "suicide", "end life", "can't go on"
  ],
  financial_issues: ["financial issues", "money", "cost", "broke", "don't have money"],
  living_expenses: [
    "living expenses", "money for food", "cost of living", "rent", "spending money"
  ],
  tuition_fees: ["tuition", "school fees", "college fees", "loan", "scholarship"],
  job_search: [
    "part-time job", "student job", "need to earn money"
  ],
  social_env: ["social", "environment", "friends", "social issues"],
  homesickness: [
    "homesick", "miss home", "lonely at school", "lonely", "alone"
  ],
  new_environment: [
    "new place", "new people", "campus", "new school", "adapting"
  ],
  bullying: ["bullying", "bullied", "being harassed", "mean people"],
  distractions: [
    "distractions", "can't focus", "losing focus", "getting distracted"
  ],
  friends: [
    "friends", "social life", "socializing", "hanging out"
  ],
  mobile_social_media: [
    "phone", "social media", "instagram", "tiktok", "whatsapp"
  ],
  gaming_streaming: [
    "games", "gaming", "series", "netflix", "youtube", "streaming"
  ],
  other: [],
};

function findIntent(input) {
  const normalizedInput = input.toLowerCase().trim();
  for (const intentId in intents) {
    if (
      intents[intentId].some((phrase) =>
        normalizedInput.includes(phrase)
      )
    ) {
      return intentId;
    }
  }
  return "other";
}

function checkSevereDistress(input) {
  const severePhrases = intents.need_professional_help;
  const normalizedInput = input.toLowerCase().trim();
  return severePhrases.some((phrase) =>
    normalizedInput.includes(phrase)
  );
}

const ChatMessage = ({ text, sender, options, onOptionClick }) => {
  return (
    <div className={`message-bubble ${sender}`}>
      <div className="message-content" dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }}></div>
      {options?.length > 0 && (
        <div className="option-chips">
          {options.map((o) => (
            <button
              key={o.id}
              onClick={() => onOptionClick(o.id)}
              className="option-chip"
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  function addMessage(text, sender = "bot", options = []) {
    setMessages((prev) => [...prev, { text, sender, options }]);
  }

  const botReply = React.useCallback((nodeId) => {
    const node = flowData[nodeId];
    if (!node) {
      addMessage("Sorry, I didn't understand that.", "bot", flowData.start.options);
      return;
    }
    setTimeout(() => {
      addMessage(node.text, "bot", node.options || []);
    }, 600);
  }, []);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      botReply("start");
      mounted.current = true;
    }
  }, [botReply]);

  function handleUserInput(text) {
    if (!text.trim()) return;
    addMessage(text, "user");
    setInput("");

    if (checkSevereDistress(text)) {
      botReply("crisis_support");
      return;
    }

    const intent = findIntent(text);
    botReply(intent);
  }

  function handleOption(id) {
    const option = Object.values(flowData).flatMap((n) => n.options || []).find((o) => o.id === id);
    if (option) addMessage(option.label, "user");

    const goBackMapping = {
      go_back_start: "start",
      go_back_academic: "academic_challenges",
      go_back_complex_topics: "complex_topics",
      go_back_time_management: "time_management",
      go_back_mental_health: "mental_health",
      go_back_financial: "financial_issues",
      go_back_social: "social_env",
      go_back_distractions: "distractions",
    };

    if (goBackMapping[id]) {
      botReply(goBackMapping[id]);
    } else {
      botReply(id);
    }
  }

  return (
    <div className="chatbot-container">
      <div className="messages-container">
        {messages.map((m, i) => (
          <ChatMessage
            key={i}
            text={m.text}
            sender={m.sender}
            options={m.options}
            onOptionClick={handleOption}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUserInput(input)}
          className="input-box"
          placeholder="Type a message or select an option..."
        />
        <button
          onClick={() => handleUserInput(input)}
          className="send-button"
          aria-label="Send"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}