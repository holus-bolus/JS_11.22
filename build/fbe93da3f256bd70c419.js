function insert(e){document.form.textview.value=document.form.textview.value+e,0===document.form.textview.value&&0===e&&(document.form.textview.value="")}function clearInput(){document.form.textview.value=""}function deleteANumber(){let e=document.form.textview.value;document.form.textview.value=e.substring(0,e.length-1)}function calculateAResult(){let expression=document.form.textview.value;expression&&(document.form.textview.value=eval(expression))}function reverseANumber(){let e=document.form.textview.value;document.form.textview.value=-1*parseInt(e)}function keyboardInputHandler(e){let res=document.querySelector(".input");if("0"===e.key?res.value+="0":"1"===e.key?res.value+="1":"2"===e.key?res.value+="2":"3"===e.key?res.value+="3":"4"===e.key?res.value+="4":"5"===e.key?res.value+="5":"6"===e.key?res.value+="6":"7"===e.key?res.value+="7":"8"===e.key?res.value+="8":"9"===e.key&&(res.value+="9"),"+"===e.key?res.value+="+":"-"===e.key?res.value+="-":"*"===e.key?res.value+="*":"/"===e.key?res.value+="/":"%"===e.key&&(res.value+="%"),"."===e.key&&(res.value+="."),"Enter"===e.key&&(res.value=eval(res.value||null)),"Backspace"===e.key){let e=res.value;res.value=e.substring(0,res.value.length-1)}}document.addEventListener("keydown",keyboardInputHandler);