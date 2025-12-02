// This file contains the structured pharmacology index data.
// It allows for multiple reference books to be added in the future.

const pharmacologyData = {
    "KD Tripathi, 7th Edition": [
        {
            section: "Section 1: General Pharmacological Principles",
            topics: [
                { topic: "Introduction, Routes of Drug Administration", page: "1", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Pharmacokinetics: Membrane Transport, Absorption and Distribution of Drugs", page: "10", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Pharmacokinetics: Metabolism and Excretion of Drugs, Kinetics of Elimination", page: "22", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Pharmacodynamics: Mechanism of Drug Action; Receptor Pharmacology", page: "37", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Aspects of Pharmacotherapy, Clinical Pharmacology and Drug Development", page: "61", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Adverse Drug Effects", page: "82", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 2: Drugs Acting on Autonomic Nervous System",
            topics: [
                { topic: "Autonomic Nervous System: General Considerations", page: "92", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Cholinergic System and Drugs", page: "99", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Anticholinergic Drugs and Drugs Acting on Autonomic Ganglia", page: "113", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Adrenergic System and Drugs", page: "124", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antiadrenergic Drugs (Adrenergic Receptor Antagonists) and Drugs for Glaucoma", page: "140", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 3: Autacoids and Related Drugs",
            topics: [
                { topic: "Histamine and Antihistaminics", page: "159", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "5-Hydroxytryptamine, its Antagonists and Drug Therapy of Migraine", page: "170", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Prostaglandins, Leukotrienes (Eicosanoids) and Platelet Activating Factor", page: "181", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Nonsteroidal Antiinflammatory Drugs and Antipyretic-Analgesics", page: "192", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antirheumatoid and Antigout Drugs", page: "206", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 4: Respiratory System Drugs",
            topics: [
                { topic: "Drugs for Cough and Bronchial Asthma", page: "218", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 5: Hormones and Related Drugs",
            topics: [
                { topic: "Introduction to Hormones", page: "234", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Anterior Pituitary Hormones", page: "236", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Thyroid Hormone and Thyroid Inhibitors", page: "245", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Insulin, Oral Hypoglycaemic Drugs and Glucagon", page: "258", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Corticosteroids", page: "282", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Androgens and Drugs for Erectile Dysfunction", page: "296", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Estrogens, Progestins and Contraceptives", page: "306", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Oxytocin and Other Drugs Acting on Uterus", page: "329", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Drugs Affecting Calcium Balance", page: "335", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 6: Drugs Acting on Peripheral (Somatic) Nervous System",
            topics: [
                { topic: "Skeletal Muscle Relaxants", page: "347", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Local Anaesthetics", page: "360", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 7: Drugs Acting on Central Nervous System",
            topics: [
                { topic: "General Anaesthetics", page: "372", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Ethyl and Methyl Alcohols", page: "388", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Sedative-Hypnotics", page: "397", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antiepileptic Drugs", page: "411", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antiparkinsonian Drugs", page: "425", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Drugs Used in Mental Illness: Antipsychotic and Antimanic Drugs", page: "435", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Drugs Used in Mental Illness: Antidepressant and Antianxiety Drugs", page: "454", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Opioid Analgesics and Antagonists", page: "469", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "CNS Stimulants and Cognition Enhancers", page: "486", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 8: Cardiovascular Drugs",
            topics: [
                { topic: "Cardiac Electrophysiological Considerations", page: "492", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Drugs Affecting Renin-Angiotensin System and Plasma Kinins", page: "495", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Cardiac Glycosides and Drugs for Heart Failure", page: "512", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antiarrhythmic Drugs", page: "526", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antianginal and Other Anti-ischaemic Drugs", page: "539", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antihypertensive Drugs", page: "558", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 9: Drugs Acting on Kidney",
            topics: [
                { topic: "Relevant Physiology of Urine Formation", page: "575", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Diuretics", page: "579", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antidiuretics", page: "593", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 10: Drugs Affecting Blood and Blood Formation",
            topics: [
                { topic: "Haematinics and Erythropoietin", page: "599", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Drugs Affecting Coagulation, Bleeding and Thrombosis", page: "613", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Hypolipidaemic Drugs and Plasma Expanders", page: "634", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 11: Gastrointestinal Drugs",
            topics: [
                { topic: "Drugs for Peptic Ulcer and Gastroesophageal Reflux Disease", page: "647", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antiemetic, Prokinetic and Digestant Drugs", page: "661", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Drugs for Constipation and Diarrhoea", page: "672", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 12: Antimicrobial Drugs",
            topics: [
                { topic: "Antimicrobial Drugs: General Considerations", page: "688", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Sulfonamides, Cotrimoxazole and Quinolones", page: "704", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Beta-Lactam Antibiotics", page: "716", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Tetracyclines and Chloramphenicol (Broad-Spectrum Antibiotics)", page: "733", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Aminoglycoside Antibiotics", page: "743", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Macrolide, Lincosamide, Glycopeptide and Other Antibacterial Antibiotics; Urinary Antiseptics", page: "752", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antitubercular Drugs", page: "765", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antileprotic Drugs", page: "780", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antifungal Drugs", page: "787", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antiviral Drugs", page: "798", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antimalarial Drugs", page: "816", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antiamoebic and Other Antiprotozoal Drugs", page: "836", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Anthelmintic Drugs", page: "849", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 13: Chemotherapy of Neoplastic Diseases",
            topics: [
                { topic: "Anticancer Drugs", page: "857", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        },
        {
            section: "Section 14: Miscellaneous Drugs",
            topics: [
                { topic: "Immunosuppressant Drugs", page: "878", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Drugs Acting on Skin and Mucous Membranes", page: "886", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Antiseptics, Disinfectants and Ectoparasiticides", page: "897", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Chelating Agents", page: "905", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Vitamins", page: "909", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Vaccines and Sera", page: "919", content: { summary: "Content not available yet.", keyPoints: [] } },
                { topic: "Drug Interactions", page: "928", content: { summary: "Content not available yet.", keyPoints: [] } }
            ]
        }
    ],
    "Goodman & Gilman's: The Pharmacological Basis of Therapeutics, 12th Edition": [],
    "MODERN PHARMACOLOGY with Clinical Applications, 5th Edition": []
};