const submit = document.querySelector(".submit-btn")
const textarea = document.querySelector("textarea")
const inputs = document.querySelectorAll("input")

function toggleButton(){
  if(!textarea){
    if(textarea.value !== ""){
      submit.disabled = false
    }else{
      submit.disabled =true
    }
    return
  }
}

