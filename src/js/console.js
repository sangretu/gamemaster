/**
* Copied directly from d&d tools\js for prototype...then started a-tweakin'.
* Requires charlotte for at least Component, so grabbed that too.
*/

/**
 * console.js
 *
 * Adaptation of explorer.js (from shared data explorer v0.1 UNCOMMITTED)
 * Essentially a quick hack as an attempt to quickly provide in-page output
 * for arbitrary commands and results...rather than dumping to JS console
 * like the current version does.
 *
 * v0.1 UNCOMMITTED
 */

{ /* Utilities */

	// execute a command with the given arguments
	// TODO: rough first version, very naive
	var execute = function(cmd)
	{
    // NOTE: Integrating with gamemaster
    sendCommand(cmd);
	}

}

{ /* CLASSES */

	{ // Window
	
    var Window = function(properties)
    {
      Component.call(this);
    };

    Window.prototype = Object.create(Component.prototype);
    
    Window.prototype.getElement = function()
    {
      if (typeof(this.element) === 'undefined')
      {
        Component.prototype.getElement.call(this);
        this.element.className += " window";
        
        this.element.top = document.createElement('div');		
        this.element.top.setAttribute('class', 'top');
        this.element.appendChild(this.element.top);
        
        this.element.center = document.createElement('div');		
        this.element.center.setAttribute('class', 'center');
        this.element.appendChild(this.element.center);
        this.center = this.element.center; // for temporary convenience
        
        this.element.bottom = document.createElement('div');		
        this.element.bottom.setAttribute('class', 'bottom');
        this.element.appendChild(this.element.bottom);
        
        this.element.top.titlebar = document.createElement('div');		
        this.element.top.titlebar.setAttribute('class', 'titlebar');
        this.element.top.appendChild(this.element.top.titlebar);
      }
      
      return this.element;
    };
    
    Window.prototype.setTitle = function(title)
    {
      this.getElement().top.titlebar.innerText = title;
    }
	
  }
  
	{ // Console
    
    var Console = function(properties)
    {
      Window.call(this);
      
      this.cmdQueue = [];
      
      // testing new feature for gamemaster
      this.cmdHistory = [];
      this.cmdHistoryIndex = 0;
    };

    Console.prototype = Object.create(Window.prototype);
    
    Console.prototype.getElement = function()
    {
      if (typeof(this.element) === 'undefined')
      {
        Window.prototype.getElement.call(this);
        this.element.className += " console";
        
        this.element.center.tty = document.createElement('div');
        this.element.center.tty.setAttribute('class', 'tty');
        this.element.center.appendChild(this.element.center.tty);
        this.tty = this.element.center.tty; // for temporary convenience
        
        this.element.bottom.prompt = document.createElement('span');
        this.element.bottom.prompt.setAttribute('class', 'prompt');
        this.element.bottom.appendChild(this.element.bottom.prompt);
        this.element.bottom.prompt.innerText = '> ';
        
        this.element.bottom.cmdArea = document.createElement('textarea');
        this.element.bottom.cmdArea.setAttribute('class', 'cmdArea');
        this.element.bottom.appendChild(this.element.bottom.cmdArea);
        this.cmdArea = this.element.bottom.cmdArea; // for temporary convenience
        this.cmdArea.object = this; // also for temporary convenience
      }
      
      return this.element;
    };
    
    Console.prototype.appendText = function(text)
    {
      var center = this.getElement().center;
      
      var entry = document.createElement('div');
      entry.setAttribute('class', 'entry');
      entry.innerText = text;
      center.tty.appendChild(entry);
      
      // NOTE: yoinking this for now because its the only jQuery dependency remaining
      // (2018-04-15, gamemaster prototype)
      //$(center).animate({scrollTop: $(center.tty).height()}, {duration: 1000, queue: false});
    }
    
    // 20181230 copied from appendText, differentiating commands
    Console.prototype.appendCommand = function(text)
    {
      var center = this.getElement().center;
      
      var entry = document.createElement('div');
      entry.setAttribute('class', 'entry command');
      entry.innerText = text;
      center.tty.appendChild(entry);
      
      // NOTE: yoinking this for now because its the only jQuery dependency remaining
      // (2018-04-15, gamemaster prototype)
      //$(center).animate({scrollTop: $(center.tty).height()}, {duration: 1000, queue: false});
    }
    
    Console.prototype.initialize = function(sessionTime)
    {
      Window.prototype.initialize.call(this);
      // dumb to rely on this to generate element but whatever its a prototype
      this.getElement();
      
      //this.cmdArea.gainFocus = function(){console.log('+1')};
      //this.cmdArea.loseFocus = function(){console.log('-1')};
      this.cmdArea.submit    = function(cmd)
      {
        this.object.cmdQueue.push(cmd);
        
        // testing command history feature
        this.object.cmdHistory.push(cmd);
        this.object.cmdHistoryIndex = 0;
      };
      //$(this.cmdArea).click(function(){setFocus(this);});
      
      // NOTE: removed jQuery dependency (2018-04-15, gamemaster prototype)
      this.cmdArea.addEventListener('keypress', (event) => {
        switch (event.keyCode)
        {
          case 13: // enter
            // submit
            this.cmdArea.submit(this.cmdArea.value);
            this.cmdArea.value = '';
            event.preventDefault(); // don't do the normal thing
            event.stopPropagation(); // don't do anything else
            break;
            
          default:
            // ignore
            break;
        }
      });
      
      // some keys (backspace, delete, arrows) don't generate keypress events.
      // also, repeat shows as multiple keydowns for these and a single keyup.
      this.cmdArea.addEventListener('keydown', (event) => {
        switch (event.keyCode)
        {  
          // NOTE: testing history for gamemaster
          case 38: // up arrow
            this.cmdHistoryIndex=this.cmdHistoryIndex==0?this.cmdHistory.length-1:this.cmdHistoryIndex-1;
            this.cmdArea.value = this.cmdHistory[this.cmdHistoryIndex];
            break;
            
          case  9: // tab
            // TODO: autocomplete?
            break;
            
          case  8: // backspace
          case 46: // delete
          default:
            // ignore
            break;
        }
      });
    }
    
    Console.prototype.update = function(sessiontime)
    {
      Window.prototype.initialize.call(this);
      
      var cmd = ''

      while (cmd = this.cmdQueue.shift())
      {
        // 20181230 differentiating commands from output
        this.appendCommand('> ' + cmd);
        
        // NOTE: more gamemaster tweaks
        execute(cmd);
        
        var response = gmClient.responseQueue.dequeue();
        console.log(response);
        this.appendText(response.resultText);
        
        // 20181230 jQuery scrolling was done like so:
        // $console.parent().animate({scrollTop: $console.height()}, {duration: 1000, queue: false});
        this.element.center.scroll({left:0, top:this.element.center.scrollHeight, behavior:smooth});
      }
    }
    
  }
}