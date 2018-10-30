var budgetController = (function() {
  var Exprense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
  return {
    addItem: function(type, des, val) {
      var newItem, ID;
      //Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      //Create new Items
      if (type === "exp") {
        newItem = new Exprense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      //Push it into out data structure
      data.allItems[type].push(newItem);
      //Return the item
      return newItem;
    },
    testing: function() {
      console.log(data);
    }
  };
})();

var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();
//GLOBAL APP CONTROLLER
var controller = (function(budgetControl, UIControl) {
  var DOM = UIControl.getDOMstrings();
  var setupEventListeners = function() {
    document.querySelector(DOM.inputBtn).addEventListener("click", function() {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    var input,
      newItem,
      // 1. Get the field input data
      input = UIControl.getInput();
    // 2. Add item to the bubget
    newItem = budgetControl.addItem(input.type, input.description, input.value);
    //Add the item in the UI
  };
  return {
    init: function() {
      setupEventListeners();
      console.log("App has started");
    }
  };
})(budgetController, UIController);
controller.init();
