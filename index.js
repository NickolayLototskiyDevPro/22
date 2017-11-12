let ProjectModule = (function() {

  const project = {
    participants : [],
    pricing : {},
    isBusy : false,

    init(participants, pricing) { 
      
      if (
        Array.isArray(participants)
        &&
        participants.length
        &&
        participants.every(participant => participant.seniorityLevel && (typeof participant.seniorityLevel === 'string'))
        ) {
        
        this.participants = [...participants]

      } else if (Array.isArray(participants) && participants.length === 0) {
        
        this.participants = []

      }

      if( (typeof pricing === "object") && (pricing !== null) ) {
        
        this.pricing = Object.assign({}, pricing)

      } else if (Object.keys(this.pricing).length === 0) {
        this.pricing = {}
      }

    },

    findParticipant(functor, callbackFunction) {

      if (this.isBusy || (typeof callbackFunction !== "function")) {
        return false;
      }

      this.isBusy = true;
      const find = this.participants.find(functor)

      if (find) {
        setTimeout(function() {
          this.isBusy = false;
          callbackFunction(find)
        }.bind(this), 100)

      } else {

        setTimeout(function() {
          this.isBusy = false;
          callbackFunction(null)
        }.bind(this), 100)

      }

    },

    findParticipants(functor, callbackFunction) {

      if (this.isBusy || (typeof callbackFunction !== "function")) {
        return false;
      }

      this.isBusy = true;

      const finds = this.participants.filter(functor)
      
      if (finds.length) {
        
        setTimeout(function() {
          this.isBusy = false;
          callbackFunction(finds)
        }.bind(this), 100)

      } else {
        
        setTimeout(function() {
          this.isBusy = false;
          callbackFunction([])
        }.bind(this), 100)

      }

    },

    addParticipant(participantObject, callbackFunction) {

      if (this.isBusy || (typeof callbackFunction !== "function")) {
        return false;
      }

      this.isBusy = true;

      if ( 
        (typeof participantObject === "object") 
        &&
        (participantObject !== null)
        && 
        participantObject.seniorityLevel && (typeof participantObject.seniorityLevel === 'string') 
        ) {

        this.participants = [...this.participants, participantObject];

        setTimeout(function() {
          this.isBusy = false;
          callbackFunction()
        }.bind(this), 100)

      } else {

        setTimeout(function() {
          callbackFunction(new TypeError("Missing object property 'seniorityLevel' or the data type is not a 'string'"))
          this.isBusy = false;
        }.bind(this), 100)

      }
      
    },

    removeParticipant(participantObject, callbackFunction) {

      if (this.isBusy || (typeof callbackFunction !== "function")) {
        return false;
      }

      this.isBusy = true;

      if ( 
        (typeof participantObject === "object") 
        &&
        (participantObject !== null)
        ) {

          const index = this.participants.findIndex((elm, ind) => {
            
            return this.participants[ind] == participantObject ? true: false ;
          }, this)

          if (index !== -1) {

            const participant = this.participants.splice(index, 1)

            setTimeout(function() {
              this.isBusy = false;
              callbackFunction(participant[0])
            }.bind(this), 100)

          } else {
            
            setTimeout(function() {
              this.isBusy = false;
              callbackFunction(null)
            }.bind(this), 100)              
        
          }

      } else {

        setTimeout(function() {
          this.isBusy = false;
          callbackFunction(null)
        }.bind(this), 100)

      }

    },

    setPricing(participantPriceObject, callbackFunction) {
      
      if (this.isBusy || (typeof callbackFunction !== "function")) {
        return false;
      }

      this.isBusy = true;

      if ( 
        (typeof participantPriceObject === "object") 
        &&
        (participantPriceObject !== null)
        ) {
        
        const keysParticipantPriceObject = Object.keys(participantPriceObject)

        if (
          keysParticipantPriceObject
          .map(participantPriceName => participantPriceObject[participantPriceName])
          .map(Number)
          .every((key) => key === parseInt(key, 10))
          ) {

          this.pricing = Object.assign(this.pricing, participantPriceObject)

        }

        setTimeout(function() {
          this.isBusy = false;
          callbackFunction()
        }.bind(this), 100)
        
      } else {
        
        setTimeout(function() {        
          this.isBusy = false;
          callbackFunction()
        }.bind(this), 100)

      }

    },

    calculateSalary(periodInDays) {
      
      const keysParticipants = this.participants.map((participant) => {
        return participant.seniorityLevel;
      })

      const keysPricing = Object.keys(this.pricing)

      if ( 
        keysParticipants.every(keyParticipants => {
          return keysPricing.some(keyPricing => {
            return keyPricing === keyParticipants
          })
        })
        ) {

        const salary = this.participants.reduce((sumSalary, participant) => {
          return sumSalary += (8 * periodInDays * this.pricing[participant.seniorityLevel])
        }, 0, this )
        
        return salary

      } else {

        throw new Error("Some property in Pricing is missing or in Participants members")

      }

    }
  }

  let instance,
      createInstance = () => project,
      getInstance = () => instance || (instance = createInstance());

  return getInstance();

})()

module.exports = {
  firstName: 'Andreyev',
  lastName: 'Anton',
  task: ProjectModule
}