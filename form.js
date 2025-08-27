const allergens = [
  { "al": "Gluten",                 "en": "gluten",         "es": "gluten",                 "fr": "gluten",           "pt": "glúten" },
  { "al": "Milch",                  "en": "milk",           "es": "leche",                  "fr": "lait",             "pt": "leite" },
  { "al": "Eier",                   "en": "egg",            "es": "huevo",                  "fr": "œuf",              "pt": "ovos" },
  { "al": "Schalenfrüchte",         "en": "tree nuts",      "es": "frutos de casca rija",   "fr": "fruits à coque",   "pt": "frutos de casca rija" },
  { "al": "Erdnüsse",               "en": "peanuts",        "es": "cacahuetes",             "fr": "arachides",        "pt": "amendoins" },
  { "al": "Soja",                   "en": "soy",            "es": "soja",                   "fr": "soja",             "pt": "soja" },
  { "al": "Fisch",                  "en": "fish",           "es": "pescado",                "fr": "poisson",          "pt": "peixe" },
  { "al": "Krustentiere",           "en": "crustaceans",    "es": "crustáceos",             "fr": "crustacés",        "pt": "crustáceos" },
  { "al": "Weichtiere",             "en": "molluscs",       "es": "moluscos",               "fr": "mollusques",       "pt": "moluscos" },
  { "al": "Sellerie",               "en": "celery",         "es": "apio",                   "fr": "céleri",           "pt": "aipo" },
  { "al": "Lupine",                 "en": "lupin",          "es": "lupino",                 "fr": "lupin",            "pt": "tremoço" },
  { "al": "Sesam",                  "en": "sesame",         "es": "sésamo",                 "fr": "sésame",           "pt": "sésamo" },
  { "al": "Senf",                   "en": "mustard",        "es": "mostaza",                "fr": "moutarde",         "pt": "mostarda" },
  { "al": "Sulfite",                "en": "sulphites",      "es": "sulfitos",               "fr": "sulfites",         "pt": "sulfitos" }
];

const form = document.querySelector("#allergens-form");

async function loadAllergens() {
    const contains = document.querySelector("#contains");
    const mayContain = document.querySelector("#may-contain");

    allergens.forEach(allergen => {
        const input1 = document.createElement("input");
        input1.id = allergen.en;
        input1.type = "checkbox";
        input1.name = "allergen[]";
        input1.value = allergen.en;
        const label1 = document.createElement("label");
        label1.textContent = allergen.pt;
        label1.htmlFor = input1.id;

        const input2 = document.createElement("input");
        input2.id = allergen.en + "possible";
        input2.type = "checkbox";
        input2.name = "possible_allergen[]";
        input2.value = allergen.en;
        const label2 = document.createElement("label");
        label2.textContent = allergen.pt;
        label2.htmlFor = input2.id;

        contains.appendChild(input1);
        contains.appendChild(label1);
        mayContain.appendChild(input2);
        mayContain.appendChild(label2);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const selectedAllergens = Array.from(form.elements["allergen[]"])
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    
    const selectedPossibleAllergens = Array.from(form.elements["possible_allergen[]"])
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    let al_text = "", en_text = "", es_text = "", fr_text = "", pt_text = "";

    if (selectedAllergens.length > 0) {
        en_text += "Contains: " + selectedAllergens.join(", ") + ". ";
        
        let alAllergens = Array(), esAllergens = Array(), frAllergens = Array(), ptAllergens = Array();
        selectedAllergens.forEach(selected => {
            allergens.forEach(allergen => {
                if (allergen.en == selected) {
                    alAllergens.push(allergen.al);
                    esAllergens.push(allergen.es);
                    frAllergens.push(allergen.fr);
                    ptAllergens.push(allergen.pt);
                }
            })
        })

        al_text += "Enthält: " + alAllergens.join(", ") + ". ";
        es_text += "Contiene: " + esAllergens.join(", ") + ". ";
        fr_text += "Contient: " + frAllergens.join(", ") + ". ";
        pt_text += "Contém: " + ptAllergens.join(", ") + ". ";        
    }

    if (selectedPossibleAllergens.length > 0) {
        en_text += "May contain traces of " + selectedPossibleAllergens.join(", ") + ".\n";

        let alAllergens = Array(), esAllergens = Array(), frAllergens = Array(), ptAllergens = Array();
        selectedPossibleAllergens.forEach(selected => {
            allergens.forEach(allergen => {
                if (allergen.en == selected) {
                    alAllergens.push(allergen.al);
                    esAllergens.push(allergen.es);
                    frAllergens.push(allergen.fr);
                    ptAllergens.push(allergen.pt);
                }
            })
        })

        al_text += "Kann Spuren von " + alAllergens.join(", ") + " enthalten.\n";
        es_text += "Puede contener trazas de " + esAllergens.join(", ") + ".\n";
        fr_text += "Peut contenir des traces de " + frAllergens.join(", ") + ".\n";
        pt_text += "Pode conter vestígios de " + ptAllergens.join(", ") + ".\n";
    }

    const al = document.querySelector("#al-translation");
    const en = document.querySelector("#en-translation");
    const es = document.querySelector("#es-translation");
    const fr = document.querySelector("#fr-translation");
    const pt = document.querySelector("#pt-translation");
    
    al.innerHTML = al_text;
    en.innerHTML = en_text;
    es.innerHTML = es_text;
    fr.innerHTML = fr_text;
    pt.innerHTML = pt_text;

    this.reset();
});

const articles = document.querySelectorAll("article");
articles.forEach(article => {
    article.addEventListener("click", () => {
        navigator.clipboard.writeText(article.innerHTML);
    });
});

loadAllergens();
