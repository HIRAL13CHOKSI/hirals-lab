const projectUpdates = {
  "reviewed": "2026-10-29",
  "updates": {
    "flood": {
      "tech": "Python · YOLO · GroundingDINO · SAM · OpenCV · NOAA · RTK/GNSS · Gradio",
      "detail": [
        [
          "The question",
          "Can a community flood photograph support a local depth estimate when tide-station data alone cannot describe what happened on that street?"
        ],
        [
          "What Hiral built",
          "Independently developed the computer-vision workflow and Gradio research interface within the broader CIRCA project: match photograph metadata, identify waterlines and reference objects, combine physical and environmental context, and review annotated outputs."
        ],
        [
          "The engineering challenge",
          "Photographs have inconsistent perspective, blur, partial occlusion, uncertain reference dimensions, and imperfect waterlines. The system needs to decide whether an estimate is physically supported, rather than returning a number for every image."
        ],
        [
          "Validation and interpretation",
          "The public showcase illustrates image-processing output and an evidence-dependent screening estimate. It distinguishes the broader observation-coverage map from the selected analysis set of 18 photographs. A separate preliminary evaluation across 16 locations reported 3.84 cm MAE. The result is specific to that evaluation."
        ],
        [
          "What comes next",
          "Verify metadata and vertical-datum consistency, expand validation across image conditions, and quantify uncertainty. Research code, private data, and unpublished findings are not redistributed here."
        ]
      ],
      "workflow": [
        "Photograph + metadata",
        "Waterline + reference objects",
        "Evaluate physical evidence",
        "Estimate with uncertainty / unavailable"
      ],
      "images": [
        [
          "flood-output",
          "Original photograph and image-processing output from the public research showcase."
        ],
        [
          "flood-workflow",
          "Workflow excerpt from the project presentation."
        ]
      ],
      "links": [
        [
          "77-second application demonstration",
          "MyCoast_Flood_Photo_Demo.webm"
        ]
      ]
    },
    "health": {
      "detail": [
        [
          "The problem",
          "Patient-portal menus, small text, and unfamiliar language can make routine healthcare tasks harder. This capstone explores conversational guidance with preferences controlled explicitly by the user."
        ],
        [
          "What Hiral developed",
          "An accessibility-focused capstone design and limited-workflow prototype, supported by survey/interview materials, personas, interface examples, and a proposed system architecture. The prototype illustrates appointment guidance and user-selected modes."
        ],
        [
          "Important design decisions",
          "Offer high-contrast and larger-text options, shorter step-by-step responses, plain language, and confirmation before actions. Adaptation follows explicit preferences rather than inferring a disability."
        ],
        [
          "Research evidence",
          "The report includes 16 survey participants: 12 reported navigation difficulty, 11 reported problems with small text, and 13 preferred a chat interface. These are small-sample, self-reported design insights; the source contains rounded percentages and one inconsistent percentage, so counts are used here."
        ],
        [
          "Architecture and implementation boundary",
          "React/Tailwind, FastAPI, retrieval with embeddings/vector search, SMART on FHIR, and OAuth appear in the proposed design. The public repository is a showcase without runnable application source; not every proposed component is established as integrated."
        ],
        [
          "Limitations and next steps",
          "Broader accessibility testing and live healthcare integration remain future work. The available materials do not establish clinical effectiveness, live Epic deployment, or independently verified HIPAA compliance."
        ]
      ],
      "workflow": [
        "User-selected preferences",
        "Conversational guidance",
        "Proposed retrieval / simulated FHIR",
        "Response + confirmation"
      ],
      "images": [
        [
          "health-dashboard",
          "Actual local prototype screenshot from the capstone presentation; patient details are fictional demo data."
        ],
        [
          "health-architecture",
          "Original report architecture: proposed design, including future capabilities."
        ]
      ],
      "links": [
        [
          "Capstone project report",
          "docs/capstone-report.pdf"
        ]
      ]
    },
    "lumera": {
      "detail": [
        [
          "The question",
          "Could clinical-trial, drug, and publication evidence be easier to explore together for rare diseases?"
        ],
        [
          "The collaborative prototype",
          "Lumera brings Trial Finder, Drug Repurposing, All Options, and Research views into a Next.js/React application with a Node.js/Express backend. Hiral contributed as part of the hackathon team; individual module ownership is not documented in the public README."
        ],
        [
          "Architecture",
          "The documented design connects ClinicalTrials.gov, OpenFDA, and PubMed with Gemini or OpenAI services. Session widgets keep a short search history and export a summary."
        ],
        [
          "Engineering detail checked in source",
          "The network-evidence service contains a curated disease → gene → protein → drug graph with predefined confidence rules. Those scores are demo heuristics, not measured medical probabilities or validated biological findings."
        ],
        [
          "Scope and next investigation",
          "The research page presents single-cell augmentation as a conceptual visual demonstration. Trial ranking and explanations do not establish eligibility. Next steps are provenance checks, evaluation of retrieved evidence, and a clear separation of curated demo content from live results."
        ]
      ],
      "workflow": [
        "Disease or de-identified prompt",
        "Trial / drug / literature services",
        "Rank + explain evidence",
        "Explore linked sources"
      ],
      "links": [
        [
          "Curated network-evidence implementation",
          "trialmatch-ai-hackrare2026/backend/services/networkEvidenceService.js"
        ]
      ]
    },
    "readme": {
      "detail": [
        [
          "What Hiral built",
          "Independently designed a script-level README generator for CSE 5095. It extracts imports, docstrings, definitions, argparse options, environment-variable references, and nearby metadata before calling an LLM."
        ],
        [
          "Architecture checked in source",
          "The pipeline calls analysis, builds structured messages, routes to OpenAI/Gemini/Groq through a shared provider interface, and writes Markdown. Folder mode processes immediate Python files, not a whole repository recursively."
        ],
        [
          "Recorded evaluation",
          "The committed AST OpenAI→OpenAI artifact reports 20 evaluated samples and 1 error skip, dependency precision 1.000, recall 0.875, and CLI completeness 0.900. Generation and judging both used gpt-4o-mini. These are historical artifact values, not a fresh benchmark or a claim of universally correct documentation."
        ],
        [
          "Engineering decisions and limits",
          "Normal generation analyzes code without executing it. Optional help probing executes trusted inputs and is not a security sandbox. Static analysis can miss dynamic behavior, and generated instructions require review."
        ],
        [
          "Baseline and next steps",
          "The current source-text baseline is a replacement implementation, not the historical original. AST and no-AST metric conventions differ. Align the measurements and run fresh experiments before making comparative claims. Offline mocked tests validate interfaces, not generation quality."
        ]
      ],
      "workflow": [
        "Python script",
        "AST facts + metadata",
        "Prompt + provider adapter",
        "README + evaluation"
      ],
      "links": [
        [
          "Recorded AST evaluation",
          "artifacts/readmegenv2_eval/ast-openai-openai/summary_ast-openai-openai.md"
        ],
        [
          "Pipeline implementation",
          "readmegenv2/pipeline.py"
        ],
        [
          "Final project report",
          "README_Generator_Final_Report.pdf"
        ]
      ]
    },
    "tobacco": {
      "detail": [
        [
          "What Hiral built",
          "An independently completed CSE 5520 policy-data analysis and seven-tab Dash dashboard covering 50 states plus Washington, DC over 1990–2019: 1,530 state-year records in the supplied complete export."
        ],
        [
          "Data engineering",
          "The loader reshapes the source’s long-format measures into state-year rows and checks duplicates, missing measures, invalid numbers, and prices. The CDC source covers 1970–2019; the application filters the requested 30-year period."
        ],
        [
          "Analytical workflow checked in source",
          "pandas preparation feeds LOESS trend smoothing, changepoint detection, correlations, four K-means clusters, choropleths, state comparisons, and a searchable table. The separate report documents statistical modeling; this review did not rerun it."
        ],
        [
          "Interpretation",
          "The analysis explores associations between tax share and pack sales per capita. It does not establish causal effects of tax changes. The overview averages jurisdictions without population weighting; unscaled clustering inputs can make consumption dominate distance."
        ],
        [
          "What comes next",
          "Use fold- or study-appropriate validation, test scaled clustering, and introduce demographic controls or a defensible causal design before interpreting policy effects."
        ]
      ],
      "workflow": [
        "CDC long-format measures",
        "Validate + reshape state-years",
        "Statistical / spatial analysis",
        "Seven-tab Dash dashboard"
      ],
      "links": [
        [
          "Original course report",
          "docs/CSE5520_Final_Report_Hiral_Choksi.pdf"
        ],
        [
          "Dashboard source",
          "tobacco_analysis_dashboard.py"
        ]
      ]
    },
    "tides": {
      "detail": [
        [
          "What Hiral built",
          "An independent CIRCA analysis for selecting useful high-water monitoring events and linking 16 coastal sites to four tidal zones across Groton, Stonington, and New London."
        ],
        [
          "Approach",
          "Prepare zone-specific time series, identify daily peaks, apply percentile thresholds with zone-aware fallback, and compare site assignments and selected times with NOAA predictions."
        ],
        [
          "Reported validation",
          "The report gives timing MAE of 7.00 minutes for Zone 2 and 3.75 minutes for Zone 3, with RMSE of 7.90 and 4.15 minutes respectively. These compare predicted high-tide times, not observed street flooding. The validation period and sample size need clarification."
        ],
        [
          "What comes next",
          "Resolve the report’s inconsistent period references, document the validation sample, and distinguish event-selection usefulness from observed flood validation."
        ]
      ],
      "images": [
        [
          "tides-map",
          "Monitoring-site map reproduced in the public research showcase."
        ]
      ]
    },
    "airbnb": {
      "detail": [
        [
          "What the analysis does",
          "A CSE 4502 assignment predicting 2019 NYC Airbnb listing prices from location, room type, availability, and review-related features."
        ],
        [
          "Methods",
          "Median imputation, scaling, one-hot encoding, linear regression, decision trees, random forests, cross-validation, and hyperparameter search."
        ],
        [
          "Saved evidence",
          "The selected grid-search random forest reports held-out MAE of 64.08 price units. The initial models’ 10-fold CV MAEs were 74.53 for linear regression, 87.46 for the decision tree, and 67.47 for random forest. Test and CV values describe different evaluation stages."
        ],
        [
          "Limitations",
          "Results are saved outputs, not rerun here. Preprocessing is fitted before cross-validation, which can make CV optimistic. The exact original CSV still needs to be matched and documented."
        ]
      ],
      "links": [
        [
          "Original analysis notebook",
          "notebooks/nyc_airbnb_original.ipynb"
        ]
      ]
    },
    "music": {
      "detail": [
        [
          "Team prototype",
          "A Microsoft Hack Night NYC music recommender built collaboratively by Hiral, Ramachandra Yerramsetti, and Sai Kiran Belana. The interface explores prompts such as wanting uplifting music while feeling sad."
        ],
        [
          "Architecture",
          "Semantic retrieval with Weaviate, mood-aware inference with FriendliAI, generation traces with Comet Opik, and FastAPI/Streamlit for the application. The README describes returning Spotify tracks."
        ],
        [
          "What the evidence supports",
          "The README documents the team, stack, and demo concept. It does not isolate Hiral’s module ownership or establish measured recommendation quality, latency, or production scale."
        ]
      ]
    },
    "caption": {
      "detail": [
        [
          "Team contribution",
          "Hiral is one of five credited creators of an image-captioning application using MS COCO 2014 and a Flask interface. The README includes a model diagram and two example outputs."
        ],
        [
          "Workflow",
          "Load an image, run the captioning model, and present a natural-language description in the application. The repository gives local setup instructions."
        ],
        [
          "Evidence and limits",
          "The example outputs demonstrate selected cases, not a representative caption-quality evaluation. The historical Heroku URL has not been verified as a working service. Individual ownership and training details should be clarified before stronger claims."
        ]
      ],
      "links": [
        [
          "Model architecture image",
          "docs/model.png"
        ],
        [
          "Example application output",
          "docs/op1.png"
        ]
      ]
    }
  },
  "additions": [
    {
      "id": "fashion",
      "name": "Fashion-MNIST classification",
      "domain": "vision",
      "kind": "UCONN · COURSE ASSIGNMENT",
      "repo": "fashion-mnist-classification",
      "question": "Which errors hide behind a classifier’s accuracy?",
      "summary": "Binary and multiclass clothing classification, with ROC curves and confusion-matrix analysis.",
      "tech": "Python · scikit-learn · TensorFlow/Keras · Error analysis",
      "scope": "Saved notebook outputs have not been independently reproduced. Preprocessing should be fitted inside each CV fold.",
      "detail": [
        [
          "Approach",
          "Classify 28×28 grayscale images across 10 clothing categories, and separately distinguish shirts from other items. Compare models through precision/recall, ROC curves, and multiclass errors."
        ],
        [
          "Saved results",
          "Random forest reports 87.64% held-out 10-class accuracy and 88.02% mean three-fold CV accuracy. Shirt-versus-other ROC AUC is 0.956 for random forest and 0.887 for SGD; binary AUC and multiclass accuracy describe different tasks."
        ],
        [
          "Next investigation",
          "Move scaling inside each fold, rerun in a documented environment, and investigate recurring confusion between similar clothing classes."
        ]
      ],
      "images": [
        [
          "fashion-roc",
          "Original binary-task ROC visualization saved in the notebook."
        ]
      ],
      "links": [
        [
          "Original classification notebook",
          "notebooks/fashion_classification_original.ipynb"
        ]
      ]
    },
    {
      "id": "letters",
      "name": "Letter recognition with ensembles",
      "domain": "data",
      "kind": "UCONN · COURSE ASSIGNMENT",
      "repo": "letter-recognition-ensemble-learning",
      "question": "When does combining classifiers actually help?",
      "summary": "Multiclass letter recognition exploring random forests, MLPs, voting, and blending.",
      "tech": "Python · scikit-learn · Cross-validation · Ensembles",
      "scope": "Saved results require a clean rerun. The notebook contains an unrelated example, feature mismatch, and convergence warnings.",
      "detail": [
        [
          "Dataset and approach",
          "20,000 character examples, 26 capital-letter classes, and 16 numeric features. The initial split uses 16,000 training rows and 4,000 test rows."
        ],
        [
          "Recorded results",
          "The README reports 95.69% mean five-fold CV accuracy for random forest and 95.53% saved test accuracy in a later blending workflow. These come from different stages and do not establish an ensemble improvement."
        ],
        [
          "What needs checking",
          "Remove the unrelated Iris example, isolate preprocessing, resolve the soft-voting feature mismatch, and rerun the comparisons under one protocol."
        ]
      ]
    },
    {
      "id": "cards",
      "name": "Playing-card image classification",
      "domain": "vision",
      "kind": "COURSEWORK · CNN EXPERIMENT",
      "repo": "playing-card-image-classification",
      "question": "Did the evaluation actually include every image?",
      "summary": "A 52-class convolutional classifier with an explicit review of incomplete-batch evaluation.",
      "tech": "Python · TensorFlow/Keras · CNN · Augmentation",
      "scope": "Original dataset is private. The full-evaluation revision is an unrun draft, not an improved measured result.",
      "detail": [
        [
          "Model and data",
          "Three convolution/pooling stages followed by dense classification into 52 cards. The documented split contains 7,509 training, 260 validation, and 260 test images at 150×150 pixels."
        ],
        [
          "Saved result and evaluation issue",
          "The original notebook reports 73.05% accuracy over eight full batches of 32: 256 of 260 test images. A training input-exhaustion warning also needs investigation."
        ],
        [
          "Next step",
          "The draft revision lets Keras infer batch counts so the final partial batch is included. It has cleared outputs and needs access to the original private dataset for a clean run."
        ]
      ],
      "links": [
        [
          "Unrun full-evaluation draft",
          "notebooks/playing_cards_full_evaluation_draft.ipynb"
        ]
      ]
    },
    {
      "id": "amazon",
      "name": "Amazon ML Challenge: product length",
      "domain": "data",
      "kind": "AMAZON ML CHALLENGE 2023 · TEAM PROJECT",
      "repo": "Product-Length-AMAZON-CHALLENGE",
      "question": "Can product features predict physical dimensions?",
      "summary": "Product-length prediction with feature preparation, XGBoost, and random forests; team rank 33rd.",
      "tech": "Python · XGBoost · Random forest · Feature engineering",
      "scope": "Team rank 33rd is user-confirmed. The README’s 49.46622 figure has no sufficiently clear metric definition, so it is not presented as model accuracy.",
      "detail": [
        [
          "Documented approach",
          "The README describes preprocessing, feature selection, one-hot encoding/scaling, ensemble models, cross-validation, and grid search for product-length prediction."
        ],
        [
          "Contribution and evidence",
          "This was a team competition entry. The supplied CV confirms team rank 33rd; the repository summary does not isolate individual responsibility or explain its reported score well enough for a general performance claim."
        ],
        [
          "Next investigation",
          "Document the competition metric, data split, features, and reproducible experiment before comparing model quality."
        ]
      ]
    }
  ]
};
