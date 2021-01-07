/**Explorons le DOM */
function writeResult(text){
    document.getElementById("logResultHello").innerHTML += '<br/>';
    document.getElementById("logResultHello").innerHTML += text;
}
function clearResult(contaierID){
    document.getElementById("logResultHello").innerHTML = '';
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

// Auto-resize textarea
// adapté du code
// https://stackoverflow.com/questions/38738442/is-there-a-way-to-make-a-textbox-auto-expand-without-jquery
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
