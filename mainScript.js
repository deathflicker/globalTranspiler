//Define all variables here
var convertButton = document.getElementById("convertButton");
var zeroOption = document.getElementById("zeroOption");
var leftTextArea = document.getElementById("leftTextArea");
var rightTextArea = document.getElementById("rightTextArea");
var errorLabel = document.getElementById("errorLabel");
var removeErrorBtn = document.getElementById("removeErrorBtn");
var clearButton = document.getElementById("clearButton");

/*
**********************************************************************
*/


// Show convert button only when a language is selected.
function convertBtnOn(){
	convertButton.style.display = 'flex';
	zeroOption.style.display = 'none';
}

//Clear Button Pressed
function clearBtnClick(){
	if(leftTextArea.value==""){
		alert('Console is already empty.')
	}
	else{
		leftTextArea.value = "";
		rightTextArea.value="";
	}
}

//Convert Button Pressed
function convertBtnClick(){

//Clear error screen
errorLabel.innerHTML='';

// An array to store all the errors that will occur
errors = [];
	//Clear Right Text Area , works as screen refresh
rightTextArea.value='';
	//to check which language the user wants to convert
var currentLanguage = document.getElementById("mainMenu").value;
//if the python console if not empty, the conversation will proceed.
if(leftTextArea.value!=''){
	//When the selected language is c++
	if(currentLanguage=='C++'){
		rightTextArea.value = '#include <iostream.h>\nusing namespace std;\nint main()\n{\n'
		code = leftTextArea.value.split("\n");
		//Loop or compiler that checks the whole code for any error.
		for(counter in code){
			// If the user uses print function
			if(code[counter].includes('print')){
				rightTextArea.value = rightTextArea.value+code[counter].replace("print","cout").replace("(","<<").replace(")","");
			}
			//If there is blank line
			else if(code[counter] == ''){
				rightTextArea.value = rightTextArea.value+'\n';
			}
			//Store all the errors in errors array
			else{
				errors.push(counter)
			}
		}
		rightTextArea.value = rightTextArea.value+"\n\n"+"return 0;\n}"
		// Check if there is any error
		if(errors.length>0){
			//Clean Transpiled value if there is any error while compiling.
			rightTextArea.value="";
			leftTextArea.value = '';
			//Shows error label and error remove button
			removeErrorBtn.style.display = 'flex';
			alert('All the syntactical errors have been marked as per line.\nClick on the cross(x) to clear errors.\nHence, try to fix them.')

			//disable CLEAR button
			clearButton.style.display='none';

			//Loop to iterate through errors array
			for(errorCounter in errors){
				errorLabel.value=errorLabel.value+"(line "+(parseInt(errors[errorCounter])+1)+"): Syntax Error."+"\n";
				// to save the lines having error
				code[errors[errorCounter]]="Error >>> "+code[errors[errorCounter]];
			}
			// Show the error line on python console.
			for(errorCounter in code){
				if (code[errorCounter]=="") {
					leftTextArea.value=leftTextArea.value+"\n";
				}
				else{
					leftTextArea.value=leftTextArea.value+code[errorCounter]+"\n";
				}
			}
		}
	}
	//Unsupported language , we are working on it.
	else{
		alert('This language is not supported yet..we are working on it.');
	}
}
//empty python console will result in showing this error.
else{
	alert('Error: Empty Console');
	rightTextArea.value='';
}
}



//Timer to check if there is any error. If error found, convert button is disabled.
function disableConvertBtn(){
	if(leftTextArea.value.includes('Error >>> ')){
		convertButton.setAttribute('disabled','disabled');
		convertButton.style.cursor='not-allowed';
	}
	else{
		convertButton.removeAttribute('disabled');
		convertButton.style.cursor='pointer';
	}
setTimeout(disableConvertBtn,100);
}

disableConvertBtn();



//click on this button to remove all the errors error
function removeError(){
	errorLabel.value="";
	clearButton.style.display="flex";
	removeErrorBtn.style.display='none';
	console.log(leftTextArea)
	for(counter in errors){
		leftTextArea.value = leftTextArea.value.replace("Error >>> ",'');
	}
}