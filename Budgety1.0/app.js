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

    deteleItem: function(type, id) {
      var ids, index;
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });
      index = ids.indexOf(id);
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },
    Test: function() {
      console.log(data);
    }
  };
})();

var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLable: ".budget__value",
    incomeLable: ".budget__income--value",
    expenseLable: ".budget__expenses--value",
    percentageLable: ".budget__expenses--percentage",
    container: ".container"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    },
    addListItem: function(obj, type) {
      //Create HTML string with placeholder text
      var html, newHTML, element;
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //Replace the placeholder  text with some actual data
      newHTML = html.replace("%id%", obj.id);
      newHTML = newHTML.replace("%description%", obj.description);
      newHTML = newHTML.replace("%value%", obj.value);
      //Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHTML);
    },
    clearFields: function() {}
  };
})();
// GLOBAL APP CONTROLLER
var controller = (function(budgetControl, UIControl) {
  var DOM = UIControl.getDOMstrings();
  var updateBudget = function() {};
  var updatePercentages = function() {};
  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the field input data
    input = UIControl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add item to the bubget
      newItem = budgetControl.addItem(
        input.type,
        input.description,
        input.value
      );
      // 3. Add the item in the UI
      UIControl.addListItem(newItem, input.type);
      // 4. Clear the fields
      UIControl.clearFields();
      // 5.Caculate and update budget
      updateBudget();
      //Calculate and update percentages
      updatePercentages();
    } else {
      console.log("Uncorrect input values ");
    }
  };

  var ctrlDeleteItem = function(event) {
    var itemID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);
      console.log(type, "", ID);

      //detele the item in data
      budgetControl.deteleItem(type, ID);
      //detele the item in UI

      //Update and the new budget
    }
  };

  var setupEventListeners = function() {
    document.querySelector(DOM.inputBtn).addEventListener("click", function() {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
  };

  return {
    init: function() {
      setupEventListeners();
      console.log("App has started");
    }
  };
})(budgetController, UIController);
controller.init();
