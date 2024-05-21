// Déclaration d'une constante contenant un ensemble de mots uniques
const motsSet = new Set([
    "gesticulerions", "parangonneront", "symetrisassent", "sponsoriserais", "deshypotheques", "mecomptassions", 
    "microfilmerait", "fertilisassent", "periphraserons", "hospitaliserai", "pendilleraient", "magnifiquement", 
    "rectifications", "desengorgerait", "deparaffineras", "discordassions", "confirmassions", "pestifererions", 
    "ressusciteront", "bringueballiez", "tournaillerons", "renflammassent", "rabaisseraient", "agenouillerent", 
    "consistassions", "cauchemardeuse", "decouronnement", "flagellassions", "porte-chapeaux", "reinvestissons", 
    "modificatrices", "socioaffectifs", "intellectuelle", "deliquescences", "reorientassiez", "contrebutaient", 
    "marginaliserez", "radiobalisions", "saucissonnates", "supplicierions", "bouleverserons", "agglomererions", 
    "extrapolassent", "surentrainerai", "reaffectations", "trainaillaient", "indivisibilite", "thesauriserent", 
    "tuberculinisas", "demissionnates", "ralentissaient", "desapprissions", "technologiques", "massifications", 
    "homologuassiez", "demobiliseront", "appropriassent", "tranquillisent", "phrenologiques", "scintillassiez", 
    "goujonneraient", "interviewasses", "decuivrassions", "escroquassions", "dessertissions", "reaffutassions", 
    "paraisonnerent", "universalismes", "sous-calibrees", "decachetteriez", "intersexuelles", "containerisera", 
    "limitativement", "synthetisaient", "trabouleraient", "accueillissent", "parachevassent", "proportionnels", 
    "ordonnançasses", "complimentions", "debenzolassent", "transmigraient", "denaturalisera", "encanaillerait", 
    "automatiserait", "desaccorderait", "entremettaient", "preserveraient", "lanterneraient", "rentabilisames", 
    "superfetatoire", "etablissements", "monolinguismes", "commercialiser", "tremblotements", "reconstituates", 
    "dechevetrerent", "diffractassent", "transborderait", "repositionnera", "innocentassent", "necessitassiez", 
    "insensibilisez", "electroniseras", "detonnellerait", "installeraient", "mithridatisera", "demineralisiez", 
    "ultra-soniques", "desambiguisons", "grognasserions", "rembarquerions", "quadrangulaire", "demilitarisons", 
    "interpolateurs", "reabsorbassent", "stratifiassiez", "encrasseraient", "africanisaient", "entretoisaient", 
    "printanisation", "entortillasses", "demonstratives", "commercialises", "neantisassions", "stigmatise"
    
]);

// Déclaration de la variable pour compter les tentatives restantes
let compteurTentative = 9;

// Déclaration des variables pour le mot mystère et le mot proposé par le joueur
let motMystere;
let motPropose;

// Fonction pour initialiser une nouvelle partie
function initialiserPartie() {
    let message = document.getElementById("message");

    // Conversion de l'ensemble de mots en tableau pour pouvoir accéder aux éléments par index
    const motsArray = Array.from(motsSet);

    // Sélection aléatoire d'un mot dans le tableau "motsArray" et stockage dans la variable "motMystere"
    motMystere = motsArray[Math.floor(Math.random() * motsArray.length)];

    // Initialisation du mot proposé avec des tirets pour chaque lettre du mot mystère
    motPropose = genererTirets(motMystere);

    // Affichage du mot proposé avec les tirets
    document.getElementById("mot-container").textContent = motPropose;

    // Appel de la fonction pour générer le clavier
    generateKeyboard();
}

// Fonction pour générer une chaîne de tirets en fonction de la longueur du mot mystère
function genererTirets(mot) {
    return "_".repeat(mot.length);
}

// Fonction pour mettre à jour le mot proposé avec les lettres correctement devinées jusqu'à présent
function mettreAJourMotPropose(char, motMystere, motPropose) {
    let nouveauMotPropose = "";
    for (let i = 0; i < motMystere.length; i++) {
        if (motMystere[i] === char) {
            nouveauMotPropose += char;
        } else {
            nouveauMotPropose += motPropose[i];
        }
    }
    return nouveauMotPropose;
}

// Fonction pour générer le clavier
function generateKeyboard() {
    const keyboardContainer = document.getElementById("keyboard");
    keyboardContainer.innerHTML = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz"; // Correction de l'alphabet

    for (let char of alphabet) {
        const key = document.createElement("div");
        key.classList.add("key");
        key.textContent = char;

        key.addEventListener("click", () => {
            if (compteurTentative > 0 && !key.classList.contains("disabled")) {
                if (motMystere.includes(char)) {
                    motPropose = mettreAJourMotPropose(char, motMystere, motPropose);
                    document.getElementById("mot-container").textContent = motPropose;
                } else {
                    compteurTentative--;
                    document.getElementById("tentative").textContent = compteurTentative;
                }
                verifierGagnerPerdre();
                key.classList.add("disabled");
            }
        });

        keyboardContainer.appendChild(key);
    }
}

// Fonction pour vérifier si le joueur a gagné ou perdu
function verifierGagnerPerdre() {
    let message = document.getElementById("message");
    // Comparaison entre le mot proposé et le mot mystère pour vérifier si le joueur a gagné
    if (motPropose === motMystere) {
        message.textContent = "Félicitations! Vous avez deviné le mot correctement!";
        // Recharger la page automatiquement après 3 secondes en cas de victoire
        rechargerPage();
    } else if (compteurTentative === 0) {
        // Affichage du message de défaite si le joueur a épuisé toutes ses tentatives
        message.textContent = "Désolé, vous avez épuisé toutes vos tentatives. Le mot mystère était : " + motMystere;
        // Recharger la page automatiquement après 3 secondes en cas de défaite
        rechargerPage();
    }
}

// Fonction pour recharger la page après un certain délai
function rechargerPage() {
    setTimeout(() => {
        window.location.reload(); // Utilisation de window.location.reload() pour recharger la page
    }, 3000);
}

// Appeler la fonction pour initialiser une nouvelle partie au chargement de la page
window.onload = initialiserPartie;
