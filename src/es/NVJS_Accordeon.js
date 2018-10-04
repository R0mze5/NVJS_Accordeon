'use strict';

function NVJSAccordeon(config, configAtributes, logErrors) {
	const self = this;
    const factory = arguments;


	//status
    let _initialized = false;
    let _allowDisabled = true;
    
	//options
	let options = {
		autoInitialize: true, 
		hideUnactive: true
	};

    let accordeon;
    self.accordeon = accordeon;
    let buttons;
    let blocks;
    let blocksSelector;

    let buttonsActiveClass;
    let blockActiveClass;

    self.autoInitialize = true;



	function parseData(configData) {
        accordeon = document.querySelector(this);
        buttons = Array.apply(null, accordeon.querySelectorAll(configData.buttons));
        buttonsActiveClass = configData.buttonsActiveClass;

        blocksSelector = configData.blocks;
        blocks = Array.apply(null, accordeon.querySelectorAll(blocksSelector));
        blockActiveClass = configData.blockActiveClass;

        if(self.autoInitialize) initialize();
    }

	function initialize(){
		_initialized = true;
        accordeon.dispatchEvent(new Event ('initialized'));
        buttons.forEach(button => button.style.cursor = 'pointer');

		setEvents();
	}
    
    function setEvents(){

        if (buttons){
            buttons.forEach(button => {   
                button.addEventListener('click', event => {
                    let target = event.target.closest(blocksSelector);
                    if (target) toggleAccordeon.call(button, target);
                });
            });
        }
    }


	function toggleAccordeon(target){
        let button = this;
        if(target.classList.contains(blockActiveClass)){
            activeClassHandler.call(target, 'remove', blockActiveClass);
            activeClassHandler.call(button, 'remove', buttonsActiveClass);
        } else {

            if(options.hideUnactive){
                activeClassHandler.call(blocks, 'remove', blockActiveClass);
                activeClassHandler.call(buttons, 'remove', buttonsActiveClass);
            }

            setTimeout(()=>{
                activeClassHandler.call(target, 'add', blockActiveClass);
                activeClassHandler.call(button, 'add', buttonsActiveClass);
            }, 300);
        }


        accordeon.dispatchEvent(new Event ('toggle'));
    }
    

	function activeClassHandler(action, className){
		switch(checkType(this)){
			case('Node'): {
				if ((action == 'add' && !this.classList.contains(className)) || (action == 'remove' && this.classList.contains(className))){
					this.classList[action](className);
				} 
				break;
			}
			case('array'):{
				this.forEach(
					element => activeClassHandler.call(element, action, className)
				)
				break;
			}
		}
	}


	function showError(textError, type) {
		if (logErrors && textError){
			if (!type || type == 'warn') {
				console.warn(textError);
			} else if (type == 'error'){
				console.error(textError);
			}
		}
	}

	(function parseConfig() {
		let parseMask = [
						['string', `NVJS_Accordeon initialization warn.]`], 
						['object', `NVJS_Accordeon initialization warn.`], 
						['boolean']]


		let errorArr = [];
		let parsingData = [];
		let factoryParse = Array.prototype.slice.call(factory, 0, parseMask.length);
		
		for (let i = 0; i < parseMask.length; i++){
			if(parseMask[i][0] == checkType(factoryParse[0])){

				parsingData.push(factoryParse.shift());
			} else {
				
				parsingData.push(undefined)
				errorArr.push(parseMask[i][1])
			}
		}

		if (parsingData.pop() == true){
			logErrors = true;
			errorArr.forEach(errorMessage => showError(errorMessage))
		}

		parseData.call(parsingData[0], parsingData[1])

	})();
}


function checkType(data){
    if (typeof data === 'string' || data instanceof String){
        return 'string'
    } else if (typeof data == 'boolean'){
        return 'boolean'
    } else if (typeof data === 'number' && isFinite(data)){
        return 'number'
    } else if (typeof data == 'undefined'){
        return 'undefined'
    } else if (typeof data == 'function'){
        return 'function'
    } else if (typeof data == 'object'){
        if(Array.isArray(data)){	
            return 'array'
        } else if(NodeList.prototype.isPrototypeOf(data)){	
            return 'NodeList'
        } else if(data instanceof Node){	
            return 'Node'
        } else if (data.constructor === Object){
            return 'object'
        } else if (data.constructor === RegExp){
            return 'regexp'
        }
    } else if (data === null){
        return 'null'
    } else if (data instanceof Error && typeof data.message !== 'undefined'){
        return 'error'
    } else if (data instanceof Date){
        return 'date'
    } else if (typeof data === 'symbol'){
        return 'symbol'
    } 
}