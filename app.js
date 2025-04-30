/* Hamburger menu pro mobilní zařízení */
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

/* Scroll na začátek stránky při kliknutí na logo */
menu.addEventListener('click', mobileMenu);
document.getElementById('navbar__logo').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Kalkulátor cen */
/* Definice cen služeb */
const services = {
    stavebni: {
        title: "Pořez stavebního řeziva",
        desc: "Zajišťujeme pořez stavebního řeziva dle specifikací zákazníka.",
        price: 3500
    },
    truhlarsky: {
        title: "Pořez truhlářského řeziva",
        desc: "Pořez kvalitního truhlářského řeziva s ohledem na přesnost.",
        price: 4200
    },
    prazce: {
        title: "Výroba pražců",
        desc: "Specializujeme se na výrobu železničních pražců.",
        price: 3900
    },
    lamely: {
        title: "Výroba podlahových lamel",
        desc: "Dodáváme dřevěné lamely pro výrobu podlah.",
        price: 5700
    },
    palety: {
        title: "Výroba palet a obalů",
        desc: "Vyrábíme standardní i zakázkové palety a obaly.",
        price: 3100
    },
    suseni: {
        title: "Sušení řeziva",
        desc: "Profesionální sušení řeziva v sušárnách.",
        price: 900
    },
    impregnace: {
        title: "Impregnace řeziva",
        desc: "Impregnace dřeva proti škůdcům a plísním.",
        price: 600
    }
};

/* Definice násobičů podle kvality a druhu dřeva */
const woodMultipliers = {
    smrk: 1.0,        
    borovice: 1.1,    
    dub: 1.4,         
    buk: 1.3,
    modrin: 1.2,
    A: 2,
    B: 1.6,
    C: 1,
    D: 0.8,
    E: 0.6
};

const serviceList = document.getElementById("serviceList");
const title = document.getElementById("serviceTitle");
const desc = document.getElementById("serviceDescription");
const price = document.getElementById("priceM3");
const volumeInput = document.getElementById("volume");
const totalPrice = document.getElementById("totalPrice");
const calculator = document.getElementById("calculator");
const woodTypeSel = document.getElementById("woodType");
const woodGradeSel = document.getElementById("woodGrade");

let service = null;

/* Funkce updatující celkovou cenu v kalkulátoru */
function updateTotal() {
    const volume = parseFloat(volumeInput.value);
    const woodType = woodTypeSel.value;
    const woodGrade = woodGradeSel.value;
    const multiplier = woodMultipliers[woodType] * woodMultipliers[woodGrade] || 1;
    if (service) {
        const adjustedPrice = service.price * multiplier;
        price.textContent = adjustedPrice.toLocaleString("cs-CZ");
        if (!isNaN(volume)) {
            const total = volume * adjustedPrice;
            totalPrice.textContent = total.toLocaleString("cs-CZ", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        } else {
            totalPrice.textContent = "0";
        }
    }
}

/* Funkce zajistující update po kliknutí na změnu stavu kalkulace na základě služby */
serviceList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        const key = e.target.getAttribute("data-service");
        service = services[key];
        if (service) {
        title.textContent = service.title;
        desc.textContent = service.desc;
        calculator.style.display = "block";
        updateTotal();
        }
    }
});

volumeInput.addEventListener("input", updateTotal);
woodTypeSel.addEventListener("change", updateTotal);
woodGradeSel.addEventListener("change", updateTotal);

