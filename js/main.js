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

/* Exo 4 */
var flipFlop = {
    counter:0,
    _thresold:10,
    threshold:10,
    do:function(eltID){
        this.counter += 1;
        //console.log(this.threshold);
        eltID.childNodes.forEach(e=>e.className = e.className == 'flip' ? 'flop' : 'flip');
        if(this.counter % this.threshold == 0) {
            this.alert(`C'est bien énervant de bouger sa souris ${this.counter} fois sur l'image ?!`);
        }
    },
    alert:function(msg){
        window.alert(msg);
        this.threshold = Math.floor(Math.random()*10 + this.threshold);
    },
    reset:function(){
        this.threshold = this._thresold;
        this.counter = 0;
        //console.warn('flipFlop is reset');
    }
}

function calc_result(str_op){
    console.log(`elt_op:${str_op}`);
    str_op = str_op.replace(/x/gi, '*'); // remplace x par *
    console.log(`op:${str_op} `);
    return eval(str_op);
}

function add(eltID, resultID){
    document.getElementById(resultID).value = calc_result(document.getElementById(eltID).value);
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

window.onload = main();

