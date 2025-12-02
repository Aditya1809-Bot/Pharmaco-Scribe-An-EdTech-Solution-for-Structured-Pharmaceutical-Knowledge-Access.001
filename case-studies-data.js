// This file contains the data for the clinical case studies module.
const caseStudies = [
    {
        title: "Paracetamol in Fever",
        scenario: "Rahul, a 20-year-old, presents with a mild fever (101°F), headache, and body ache for one day. He has no history of chronic illness. You diagnose it as a viral fever and recommend Paracetamol.",
        question: "What is the primary mechanism of action of paracetamol?",
        options: [
            "Inhibits prostaglandin synthesis in the CNS",
            "Blocks opioid receptors in the brain",
            "Inactivates inflammatory enzymes in the periphery",
            "Increases the reuptake of serotonin"
        ],
        correctAnswer: "Inhibits prostaglandin synthesis in the CNS",
        explanation: "Paracetamol's main effect comes from inhibiting prostaglandin synthesis within the Central Nervous System (CNS), which helps reduce fever and pain. It has only weak anti-inflammatory effects in the rest of the body, which is a key difference from NSAIDs like ibuprofen. The maximum safe daily dose for an adult is 4 grams (4000 mg). Signs of toxicity include nausea, vomiting, and abdominal pain, which can progress to severe liver damage."
    },
    {
        title: "Amoxicillin in Sore Throat",
        scenario: "Priya, a 25-year-old, complains of a sore throat, mild fever, and difficulty swallowing for 3 days. Her tonsils are red and inflamed with white spots. You diagnose bacterial tonsillitis and prescribe Amoxicillin.",
        question: "What is the mechanism of action for Amoxicillin?",
        options: [
            "Inhibits bacterial protein synthesis",
            "Inhibits bacterial DNA replication",
            "Inhibits bacterial cell wall synthesis",
            "Disrupts the bacterial cell membrane"
        ],
        correctAnswer: "Inhibits bacterial cell wall synthesis",
        explanation: "Amoxicillin is a beta-lactam antibiotic that works by inhibiting the formation of the bacterial cell wall, leading to cell death. It's crucial for patients to complete the full course of antibiotics, even if they feel better, to prevent the development of resistant bacteria. If a patient is allergic to penicillin, they must not be given Amoxicillin. Alternative antibiotics like macrolides (e.g., Azithromycin) or cephalosporins may be used."
    },
    {
        title: "Salbutamol in Asthma",
        scenario: "Ravi, a 16-year-old, experiences coughing, wheezing, and shortness of breath, particularly at night and after exercise. He uses an inhaler for quick relief. You diagnose mild intermittent bronchial asthma.",
        question: "How does Salbutamol provide rapid relief in an asthma attack?",
        options: [
            "It reduces inflammation in the airways",
            "It acts as a selective beta-2 adrenergic agonist",
            "It blocks muscarinic receptors in the lungs",
            "It thins the mucus in the bronchial tubes"
        ],
        correctAnswer: "It acts as a selective beta-2 adrenergic agonist",
        explanation: "Salbutamol is a selective beta-2 agonist that relaxes the smooth muscles of the airways, leading to rapid bronchodilation and relief from breathlessness. The inhalation route is preferred because it delivers the drug directly to the lungs, ensuring a faster onset and minimizing systemic side effects like tremors or palpitations. For long-term control, inhaled corticosteroids are often used. A patient should seek immediate medical attention if their inhaler is not providing relief or if they need to use it more often than prescribed."
    },
    {
        title: "Omeprazole in Acidity",
        scenario: "Meena, a 35-year-old, reports a burning sensation in her chest and a sour taste in her mouth, especially after heavy or spicy meals. You diagnose Gastroesophageal Reflux Disease (GERD).",
        question: "What is the primary mechanism of action for Omeprazole?",
        options: [
            "It neutralizes existing stomach acid",
            "It forms a protective barrier over the stomach lining",
            "It irreversibly blocks the H+/K+ ATPase pump",
            "It blocks H2-receptors on parietal cells"
        ],
        correctAnswer: "It irreversibly blocks the H+/K+ ATPase pump",
        explanation: "Omeprazole is a Proton Pump Inhibitor (PPI) that works by irreversibly blocking the final step in gastric acid production. It can take 1-4 days for full effect. Lifestyle changes are crucial for managing acidity, including avoiding spicy/fatty foods, eating smaller meals, and elevating the head of the bed. Other common acid-reducing drugs include H2-receptor antagonists like Ranitidine and antacids."
    },
    {
        title: "Metformin in Type 2 Diabetes",
        scenario: "Mr. Suresh, a 50-year-old, complains of increased thirst and frequent urination. His fasting blood glucose is 160 mg/dL. You diagnose Type 2 Diabetes Mellitus and start him on Metformin.",
        question: "Why is Metformin considered a first-line drug for Type 2 Diabetes?",
        options: [
            "It is the most effective at lowering blood sugar",
            "It does not cause weight gain or hypoglycemia",
            "It directly stimulates the pancreas to release more insulin",
            "It can be used by patients with kidney disease"
        ],
        correctAnswer: "It does not cause weight gain or hypoglycemia",
        explanation: "Metformin's primary mechanism is to decrease glucose production by the liver and improve insulin sensitivity in peripheral tissues. It is a first-line drug because it is effective, does not cause weight gain (and can even cause modest weight loss), and has a very low risk of causing hypoglycemia (low blood sugar), making it very safe. It is taken after food to minimize gastrointestinal side effects like stomach upset. Other oral antidiabetic drugs, such as sulfonylureas or SGLT2 inhibitors, are often used in combination with Metformin."
    }
];