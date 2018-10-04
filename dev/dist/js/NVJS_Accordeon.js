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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJOVkpTX0FjY29yZGVvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIE5WSlNBY2NvcmRlb24oY29uZmlnLCBjb25maWdBdHJpYnV0ZXMsIGxvZ0Vycm9ycykge1xuXHRjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBmYWN0b3J5ID0gYXJndW1lbnRzO1xuXG5cblx0Ly9zdGF0dXNcbiAgICBsZXQgX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgbGV0IF9hbGxvd0Rpc2FibGVkID0gdHJ1ZTtcbiAgICBcblx0Ly9vcHRpb25zXG5cdGxldCBvcHRpb25zID0ge1xuXHRcdGF1dG9Jbml0aWFsaXplOiB0cnVlLCBcblx0XHRoaWRlVW5hY3RpdmU6IHRydWVcblx0fTtcblxuICAgIGxldCBhY2NvcmRlb247XG4gICAgc2VsZi5hY2NvcmRlb24gPSBhY2NvcmRlb247XG4gICAgbGV0IGJ1dHRvbnM7XG4gICAgbGV0IGJsb2NrcztcbiAgICBsZXQgYmxvY2tzU2VsZWN0b3I7XG5cbiAgICBsZXQgYnV0dG9uc0FjdGl2ZUNsYXNzO1xuICAgIGxldCBibG9ja0FjdGl2ZUNsYXNzO1xuXG4gICAgc2VsZi5hdXRvSW5pdGlhbGl6ZSA9IHRydWU7XG5cblxuXG5cdGZ1bmN0aW9uIHBhcnNlRGF0YShjb25maWdEYXRhKSB7XG4gICAgICAgIGFjY29yZGVvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcyk7XG4gICAgICAgIGJ1dHRvbnMgPSBBcnJheS5hcHBseShudWxsLCBhY2NvcmRlb24ucXVlcnlTZWxlY3RvckFsbChjb25maWdEYXRhLmJ1dHRvbnMpKTtcbiAgICAgICAgYnV0dG9uc0FjdGl2ZUNsYXNzID0gY29uZmlnRGF0YS5idXR0b25zQWN0aXZlQ2xhc3M7XG5cbiAgICAgICAgYmxvY2tzU2VsZWN0b3IgPSBjb25maWdEYXRhLmJsb2NrcztcbiAgICAgICAgYmxvY2tzID0gQXJyYXkuYXBwbHkobnVsbCwgYWNjb3JkZW9uLnF1ZXJ5U2VsZWN0b3JBbGwoYmxvY2tzU2VsZWN0b3IpKTtcbiAgICAgICAgYmxvY2tBY3RpdmVDbGFzcyA9IGNvbmZpZ0RhdGEuYmxvY2tBY3RpdmVDbGFzcztcblxuICAgICAgICBpZihzZWxmLmF1dG9Jbml0aWFsaXplKSBpbml0aWFsaXplKCk7XG4gICAgfVxuXG5cdGZ1bmN0aW9uIGluaXRpYWxpemUoKXtcblx0XHRfaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICBhY2NvcmRlb24uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQgKCdpbml0aWFsaXplZCcpKTtcbiAgICAgICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInKTtcblxuXHRcdHNldEV2ZW50cygpO1xuXHR9XG4gICAgXG4gICAgZnVuY3Rpb24gc2V0RXZlbnRzKCl7XG5cbiAgICAgICAgaWYgKGJ1dHRvbnMpe1xuICAgICAgICAgICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7ICAgXG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoYmxvY2tzU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB0b2dnbGVBY2NvcmRlb24uY2FsbChidXR0b24sIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cdGZ1bmN0aW9uIHRvZ2dsZUFjY29yZGVvbih0YXJnZXQpe1xuICAgICAgICBsZXQgYnV0dG9uID0gdGhpcztcbiAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhibG9ja0FjdGl2ZUNsYXNzKSl7XG4gICAgICAgICAgICBhY3RpdmVDbGFzc0hhbmRsZXIuY2FsbCh0YXJnZXQsICdyZW1vdmUnLCBibG9ja0FjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgIGFjdGl2ZUNsYXNzSGFuZGxlci5jYWxsKGJ1dHRvbiwgJ3JlbW92ZScsIGJ1dHRvbnNBY3RpdmVDbGFzcyk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmKG9wdGlvbnMuaGlkZVVuYWN0aXZlKXtcbiAgICAgICAgICAgICAgICBhY3RpdmVDbGFzc0hhbmRsZXIuY2FsbChibG9ja3MsICdyZW1vdmUnLCBibG9ja0FjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICBhY3RpdmVDbGFzc0hhbmRsZXIuY2FsbChidXR0b25zLCAncmVtb3ZlJywgYnV0dG9uc0FjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgIGFjdGl2ZUNsYXNzSGFuZGxlci5jYWxsKHRhcmdldCwgJ2FkZCcsIGJsb2NrQWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGFjdGl2ZUNsYXNzSGFuZGxlci5jYWxsKGJ1dHRvbiwgJ2FkZCcsIGJ1dHRvbnNBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG5cblxuICAgICAgICBhY2NvcmRlb24uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQgKCd0b2dnbGUnKSk7XG4gICAgfVxuICAgIFxuXG5cdGZ1bmN0aW9uIGFjdGl2ZUNsYXNzSGFuZGxlcihhY3Rpb24sIGNsYXNzTmFtZSl7XG5cdFx0c3dpdGNoKGNoZWNrVHlwZSh0aGlzKSl7XG5cdFx0XHRjYXNlKCdOb2RlJyk6IHtcblx0XHRcdFx0aWYgKChhY3Rpb24gPT0gJ2FkZCcgJiYgIXRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHx8IChhY3Rpb24gPT0gJ3JlbW92ZScgJiYgdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkpe1xuXHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0W2FjdGlvbl0oY2xhc3NOYW1lKTtcblx0XHRcdFx0fSBcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlKCdhcnJheScpOntcblx0XHRcdFx0dGhpcy5mb3JFYWNoKFxuXHRcdFx0XHRcdGVsZW1lbnQgPT4gYWN0aXZlQ2xhc3NIYW5kbGVyLmNhbGwoZWxlbWVudCwgYWN0aW9uLCBjbGFzc05hbWUpXG5cdFx0XHRcdClcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXHRmdW5jdGlvbiBzaG93RXJyb3IodGV4dEVycm9yLCB0eXBlKSB7XG5cdFx0aWYgKGxvZ0Vycm9ycyAmJiB0ZXh0RXJyb3Ipe1xuXHRcdFx0aWYgKCF0eXBlIHx8IHR5cGUgPT0gJ3dhcm4nKSB7XG5cdFx0XHRcdGNvbnNvbGUud2Fybih0ZXh0RXJyb3IpO1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlID09ICdlcnJvcicpe1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKHRleHRFcnJvcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0KGZ1bmN0aW9uIHBhcnNlQ29uZmlnKCkge1xuXHRcdGxldCBwYXJzZU1hc2sgPSBbXG5cdFx0XHRcdFx0XHRbJ3N0cmluZycsIGBOVkpTX0FjY29yZGVvbiBpbml0aWFsaXphdGlvbiB3YXJuLl1gXSwgXG5cdFx0XHRcdFx0XHRbJ29iamVjdCcsIGBOVkpTX0FjY29yZGVvbiBpbml0aWFsaXphdGlvbiB3YXJuLmBdLCBcblx0XHRcdFx0XHRcdFsnYm9vbGVhbiddXVxuXG5cblx0XHRsZXQgZXJyb3JBcnIgPSBbXTtcblx0XHRsZXQgcGFyc2luZ0RhdGEgPSBbXTtcblx0XHRsZXQgZmFjdG9yeVBhcnNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZmFjdG9yeSwgMCwgcGFyc2VNYXNrLmxlbmd0aCk7XG5cdFx0XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXJzZU1hc2subGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYocGFyc2VNYXNrW2ldWzBdID09IGNoZWNrVHlwZShmYWN0b3J5UGFyc2VbMF0pKXtcblxuXHRcdFx0XHRwYXJzaW5nRGF0YS5wdXNoKGZhY3RvcnlQYXJzZS5zaGlmdCgpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRwYXJzaW5nRGF0YS5wdXNoKHVuZGVmaW5lZClcblx0XHRcdFx0ZXJyb3JBcnIucHVzaChwYXJzZU1hc2tbaV1bMV0pXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHBhcnNpbmdEYXRhLnBvcCgpID09IHRydWUpe1xuXHRcdFx0bG9nRXJyb3JzID0gdHJ1ZTtcblx0XHRcdGVycm9yQXJyLmZvckVhY2goZXJyb3JNZXNzYWdlID0+IHNob3dFcnJvcihlcnJvck1lc3NhZ2UpKVxuXHRcdH1cblxuXHRcdHBhcnNlRGF0YS5jYWxsKHBhcnNpbmdEYXRhWzBdLCBwYXJzaW5nRGF0YVsxXSlcblxuXHR9KSgpO1xufVxuXG5cbmZ1bmN0aW9uIGNoZWNrVHlwZShkYXRhKXtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnIHx8IGRhdGEgaW5zdGFuY2VvZiBTdHJpbmcpe1xuICAgICAgICByZXR1cm4gJ3N0cmluZydcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09ICdib29sZWFuJyl7XG4gICAgICAgIHJldHVybiAnYm9vbGVhbidcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShkYXRhKSl7XG4gICAgICAgIHJldHVybiAnbnVtYmVyJ1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICByZXR1cm4gJ3VuZGVmaW5lZCdcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09ICdmdW5jdGlvbicpe1xuICAgICAgICByZXR1cm4gJ2Z1bmN0aW9uJ1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcpe1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KGRhdGEpKXtcdFxuICAgICAgICAgICAgcmV0dXJuICdhcnJheSdcbiAgICAgICAgfSBlbHNlIGlmKE5vZGVMaXN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGRhdGEpKXtcdFxuICAgICAgICAgICAgcmV0dXJuICdOb2RlTGlzdCdcbiAgICAgICAgfSBlbHNlIGlmKGRhdGEgaW5zdGFuY2VvZiBOb2RlKXtcdFxuICAgICAgICAgICAgcmV0dXJuICdOb2RlJ1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuY29uc3RydWN0b3IgPT09IE9iamVjdCl7XG4gICAgICAgICAgICByZXR1cm4gJ29iamVjdCdcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmNvbnN0cnVjdG9yID09PSBSZWdFeHApe1xuICAgICAgICAgICAgcmV0dXJuICdyZWdleHAnXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRhdGEgPT09IG51bGwpe1xuICAgICAgICByZXR1cm4gJ251bGwnXG4gICAgfSBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgRXJyb3IgJiYgdHlwZW9mIGRhdGEubWVzc2FnZSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICByZXR1cm4gJ2Vycm9yJ1xuICAgIH0gZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIERhdGUpe1xuICAgICAgICByZXR1cm4gJ2RhdGUnXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N5bWJvbCcpe1xuICAgICAgICByZXR1cm4gJ3N5bWJvbCdcbiAgICB9IFxufSJdLCJmaWxlIjoiTlZKU19BY2NvcmRlb24uanMifQ==
