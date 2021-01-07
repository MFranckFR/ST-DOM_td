/**Explorons le DOM */
function writeInto(eltID, text){
    document.getElementById(eltID).innerHTML += '<br/>';
    document.getElementById(eltID).innerHTML += text;
}

function reset(eltID){
    document.getElementById(eltID).innerHTML = '';
}

function writeResult(text){
    writeInto("logResultHello", text);
}

function clearResult(contaierID){
    reset("logResultHello");
}

function exec() {
    const code = document.getElementById('jsCode').value
    const resultEl = document.getElementById('result')
    const fn = new Function(code)
    clearResult();
    writeResult(fn());
}


function toggle(eltID){
    elt = document.getElementById(eltID);
    if(elt){
        elt.className = elt.className == 'process' ? 'processed' : 'process';
    }else{
        console.error(`toogle: élement ${eltID} est inexistant`);
    }
}

/**
 * Affiche la liste des attributs d'un élement html.
 * @param {string} eltID    Identifiant de l'élément 
 * @param {*} resultEltID   Element dans lequel afficher les attributs
 */
function resultatGetAttributes(eltID, resultEltID=''){
    var dict = getAttributes(eltID);

    if(resultEltID == ''){
        console.log(dict);
    } else {
       writeInto(resultEltID, `<ol>${dict2html(dict, 'li')}</ol>`);
    }
}

/**
 * Renvoie la liste des attributs/valeur d'un éléménet html.
 * @param {string} Nom de l'élément
 * @return Array Key/value  Liste des attibuts/valeur d'un element
 */
function getAttributes(eltID){
    var attribs = document.getElementById(eltID).attributes;
    var dict = {};
    for(let i=0;i<attribs.length;i++){
        dict[attribs.item(i).name] = attribs.item(i).value;
    }
    return dict;
}

/**
 * Formate un dictionnaire en html
 * @param {string} eltType li, p, ''
 * @param {Object Key/value} dict
 * @return {string} Une chaine html formatée
 */
function dict2html(dict, eltType='',){
    var exp = ['li', 'p', ''];
    var l = [];

    // controle element html attendu
    eltType = eltType.toLowerCase();
    if(!exp.includes(eltType)){
        console.error(`Le type du parametre ${eltType} n'est pas celui attendu`);
        return '';
    }

    // Dico ?
    if(eltType === ''){
        Object.keys(dict).map((k,idx)=>l.push(`${k}:${dict[k]}\n`));
    }else{
        Object.keys(dict).map((k,idx)=>l.push(`<${eltType}><span class="key">${k}</span>:<span class="value">${dict[k]}</span></${eltType}>\n`));
    }

    return l.join('\n');
}

/**
 * Renvoie ce que contient un formulaire.
 * @param {DomID} formID ID du formulaire 
 * @param {*} names Noms des champs désirés
 * @return {Object Dict} Object {Key:values}
 */
function getFormFieldsByNames(formID, names){
    var eltForm = document.getElementById(formID);
    var dict = {};
    for (var name of names){
        dict[name] = [];
        document.getElementsByName(name).forEach(e=>dict[name].push(e.value));
    }
    return dict;
}

function resultatgetFormFieldsByNames(formID, names){
    var dict = getFormFieldsByNames(formID, names);
    writeInto('ctnResultEx3', `<ul>${dict2html(dict, 'li')}</ul>`);
}

/**
 * Auto-resize d'un textarea
 * adapté du code
 * https://stackoverflow.com/questions/38738442/is-there-a-way-to-make-a-textbox-auto-expand-without-jquery
 */
class TextAreaAutoresize {

    observe = null;

    constructor(textareaID){
        if (window.attachEvent) {
            this.observe = function (element, event, handler) {
                element.attachEvent('on'+event, handler);
            };
        } else {
            this.observe = function (element, event, handler) {
                element.addEventListener(event, handler, false);
            };
        }

        var text = document.getElementById(textareaID);
        function resize () {
            text.style.height = 'auto';
            text.style.height = text.scrollHeight+'px';
        }
        /* 0-timeout to get the already changed text */
        function delayedResize () {
            window.setTimeout(resize, 0);
        }
        this.observe(text, 'change',  resize);
        this.observe(text, 'cut',     delayedResize);
        this.observe(text, 'paste',   delayedResize);
        this.observe(text, 'drop',    delayedResize);
        this.observe(text, 'keydown', delayedResize);

        text.focus();
        text.select();
        resize();
    }
}

function main(){
    jsCode = new TextAreaAutoresize('jsCode');
}

main();



/*
Exercice 4 : 
À un document HTML, ajouter des alertes :
- Au chargement de la page (attribut onload)
- Quand on passe sur une image (attribut onmouseover)
- Quand on clique sur un bouton (attribut onclick)
Avec des boutons :
- Changer la couleur de fond quand on clique sur un bouton
- Changer aussi l'apparence du bouton
- Ajouter un bouton qui permette de revenir à la normale.
Sur des images : 
- Changer une image par une autre quand la souris passe dessus (attribut onmouseover)
- Remettre l'image d'origine quand la souris quitte l'image (attribut onmouseout)

*/

/*
Ex5

Un premier controle de formulaire
1. Ecrire une page HTML comportant un mini-formulaire compos´e d'un champ de saisie et d'un ´
simple bouton. 
2. Creer un fichier exo1.js 
3. Rajouter l'instruction precedente par :
function controler() {
var zoneSaisie = document.getElementById("zoneSaisie");
alert("La Zone de saisie contient : " + zoneSaisie.value);
}
Decrivez le code de cette fonction. Il faudrait maintenant associer ce code de controle a l'evenement
click sur le bouton du formulaire. Ecrivez le code correspondant.
4. Modifier la fonction de controle pour afficher un message d'erreur lorsque le champ est vide, et
afficher le contenu du champ lorsqu'il ne l'est pas.
5. La fonction eval, prenant en parametre une chaıne de caracteres representant une expression,
permet d'evaluer cette derniere. Par exemple :
eval("3+4"); // retourne la valeur 7
eval("bon"+"jour"); //retourne bonjour
Ajouter (concatenez) le resultat de l´evaluation de l'expression donn´ee par l'utilisateur dans le
champ de saisie a votre affichage. Cela donne une page HTML contenant un formulaire permettant d'executer "online" de petites operations.

*/
