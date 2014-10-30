function EventEmitter() {
  //	HashMap[event->[fn1,fn2,...]]
  this.callbacks = {};
  return new EventEmitter();
  
}
EventEmitter.prototype = {
  // Fonction qui permet d'ajouter des events. Clé -> Nom de l'event, Valeur -> tableau de fonctions
  on: function (event, fn)
  {
    // Si aucun event de ce nom n'existe, on déclare un evenement de ce nom. 
    if (!this.callbacks.hasOwnProperty(event))
    {
      this.callbacks[event] = [];
    }
    // Puis on insère la fonction, passée en paramètre, dans la liste de l'event

    this.callbacks[event].push(fn);
    return this;
  },
  // Fonction off qui permet de supprimer toutes les fonctions contenues dans un event. 
  off: function (event)
  {
    // Si l'event existe,
    if (this.callbacks)
    {
      // Alors on le vide
      this.callbacks = [];
    }
    return this;
  },
 
  emit: function (event)
  {
    // Initialise un tableau
    var args = new Array();
    // Place chaque argument dans le tableau
    for (index = 0; index < arguments.length; ++index) {
      args.push(index);
    }
    // Enlève le premier paramètre qui est le nom de l'event
    args.shift();
    
    // Si l'event existe
    if (this.callbacks.hasOwnProperty(event)) {
      
      // Pour chaque fonction de l'event,
      this.callbacks[event].forEach(function (fonctionEvent)
      {
        // La fonction est appelée avec les paramètres passés
        fonctionEvent.apply(this, args);
      });
      return this;
    }
  },
  
  
  once: function (event, fn)
  {
    // Si aucun event de ce nom n'existe, on déclare un evenement de ce nom. 
    if (!this.callbacks.hasOwnProperty(event))
    {
      this.callbacks[event] = [];
      // déclare un booléen à false, si la fonction est appelée, il passe a true. 
      var passage = false;
    }
    
    // Récupère l'instance
    var thisCall = this;
    var onceCall = (function() {

        if (!passage) {
          // Passe à true
           passage = true;
          // Fonction ajoutée
           thisCall.callbacks[event].push(fn);
           thisCall.callbacks[event].push(onceCall);
        }
      }
    )
    ();
    return this;
  },
    

  times: function (event, num, fn)
  {
    // Variable qui compte le nomrbe de passages
    var nbPassage = 0;
    if (!this.callbacks.hasOwnProperty(event))
    {
      this.callbacks[event] = [];
    }
    
    
    var thisTime = this;
    var fnTime = (function ()
    {
      nbPassage++;
      // Si le nombre est différent de celui passé en paramètre, on effectue les instructions
      if (nbPassage != num)
      {
        this.callbacks[event].push(fn);
        this.callbacks[event].push(fnTime);
      }
    });
   return this;
  }
};

/*
var quentin = new EventEmitter();

quentin.on('bonjour', function coucou() {console.log('salutation peuple de la Terre')});
quentin.on('bonjour', function bonjour() {console.log('bonjour peuple de la Terre')});
quentin.on('salut', function coucou() { console.log('salut peuple de la Terre')});
quentin.off('bonjour');
quentin.emit('bonjour')
quentin.once('salut', function coucou(){console.log('salutation peuple de la Terre')});
quentin.emit('salut');
quentin.emit('salut');
quentin.once('salut', function coucou());
quentin.times('salut', 2, function coucou(){console.log('salutation peuple de la Terre')});
quentin.emit('salut');
quentin.emit('salut');
*/
