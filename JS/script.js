const slide = document.querySelectorAll(".carousel-item");
const caption = document.querySelectorAll(".cap");

// console.log(slide, caption);

let indexedSlide = 1;

function addSlide(n) {
    slideShow(indexedSlide += n);
}

function slideShow(n) {
    if (n > slide.length) {
        indexedSlide = 1;
    }
    if (n < 1) {
        indexedSlide = slide.length;
    }
    for (let i = 0; i < slide.length; i++) {
        slide[i].style.display = "none";
    }
}

var price , crustPrice, topping_price ;
let total = 0;
function Getpizza( name,size,crust,topping, total ){
  this.name = name;
  this.size = size;
  this.crust = crust;
  this.topping = topping;
  this.total = total;
}


// proceed button
$(document).ready(function(){
  $("button.proceed").click(function(event){
   let pizzaSize = $("#size option:selected").val();
   let pizzaCrust = $("#crust option:selected").val();
   let pizzaTopping = [];
   $.each($("input[name='toppings']:checked"), function(){            
       pizzaTopping.push($(this).val());
   });
   console.log(pizzaTopping.join(", "));

   switch(pizzaSize){
    case "0":
      price =0;
    break;
    case "large":
       price = 1000;
       console.log(price);
     break;
     case "medium":
       price = 800;
       console.log("The price is "+ price);
     break;
     case "small":
       price = 500;
       console.log(price);
     default:
       console.log("error"); 
   }
   switch(pizzaCrust){
      case "0":
        crustPrice = 0;
      break;
      case "Crispy":
        crustPrice = 300;
      break;
      case "Stuffed":
        crustPrice = 200;
      break;
      case "Gluten-free":
        crustPrice = 220;
      break;
      default:
        console.log("No price"); 
    }
    let toppingValue = pizzaTopping.length*100;
    console.log("toppins value" + toppingValue);

    if((pizzaSize == "0") && (pizzaCrust == "0")){
      console.log("You have selcted nothing");
      $("button.proceed").show();
      $("#information").show();
      $("div.choise").hide();
      alert("Please choose your preffered pizza size and crust"); 
    }
    else{
      $("button.proceed").hide();
      $("#information").hide();
      $("div.choise").slideDown(1000);
    }

    total = price + crustPrice + toppingValue;
    console.log(total);
    let checkoutTotal = 0;
    checkoutTotal = checkoutTotal + total;

    $("#pizzaname").html($(".name option:selected").val());
    $("#pizzasize").html( $("#size option:selected").val());
    $("#pizzacrust").html($("#crust option:selected").val());
    $("#pizzatopping").html(pizzaTopping.join(", "));
    $("#totals").html(total);
    
// Add pizza button
    $("button.addPizza").click(function(){
      let pizzaName = $(".name option:selected").val();
      let pizzaSize = $("#size option:selected").val();
      let pizzaCrust = $("#crust option:selected").val();
      let pizzaTopping = [];
      $.each($("input[name='toppings']:checked"), function(){            
          pizzaTopping.push($(this).val());
      });
      console.log(pizzaTopping.join(", "));
      switch(pizzaSize){
        case "0":
          price =0;
        break;
        case "large":
           price = 1000;
           console.log(price);
         break;
         case "medium":
           price = 800;
           console.log("The price is "+price);
         break;
         case "small":
           price = 500;
           console.log(price);
         default:
           console.log("error"); 
       }
       switch(pizzaCrust){
          case "0":
            crustPrice = 0;
          break;
          case "Crispy":
            crustPrice = 300;
          break;
          case "Stuffed":
            crustPrice = 200;
          break;
          case "Gluten-free":
            crustPrice = 220;
          break;
          default:
            console.log("No price"); 
        }
        let toppingValue = pizzaTopping.length*100;
        console.log("toppins value" + toppingValue);
        total = price + crustPrice + toppingValue;
        console.log(total);

        checkoutTotal = checkoutTotal + total;
        console.log(checkoutTotal);
      // constractor function
      var newOrder = new Getpizza(pizzaName, pizzaSize, pizzaCrust,pizzaTopping,total);

      $("#ordersmade").append('<tr><td id="pizzaname">'+newOrder.name +'</td><td id="pizzasize">' + newOrder.size + '</td><td id="pizzacrust">'+newOrder.crust + '</td><td id="pizzatopping">'+newOrder.topping+'</td><td id="totals">'+newOrder.total+'</td></tr>');
      console.log(newOrder);
    });

    // Buttons
    // Checkout 
    $("button#checkout").click(function(){ 
      $("button#checkout").hide();
      $("button.addPizza").hide();
      $("button.deliver").slideDown(1000);
      $("#addedprice").slideDown(1000);
      console.log("Your total bills is sh. "+checkoutTotal);
      $("#pizzatotal").append("Your bill is sh. "+checkoutTotal);
    });

    // Delivery 
    $("button.deliver").click(function(){
      $(".pizzatable").hide();
      $(".choise h2").hide();
      $(".delivery").slideDown(1000);
      $("#addedprice").hide();
      $("button.deliver").hide();
      $("#pizzatotal").hide();
      let deliveryAmount = checkoutTotal + 200;
      console.log("You will pay sh. "+deliveryAmount+" on delivery");
      $("#totalbill").append("Your bill plus delivery fee is: "+deliveryAmount);
    });

    // Order Now 
    $("button#final-order").click(function(event){
      event.preventDefault();

      $("#pizzatotal").hide();
      $(".delivery").hide();
      $("button#final-order").hide();
      let deliveryAmount = checkoutTotal + 200;
      console.log("Final Bill is: "+ deliveryAmount);
      let person = $("input#name").val();
      let phone = $("input#phone").val();
      let location = $("input#location").val();

      if ($("input#name").val() && $("input#phone").val() && $("input#location").val()!=""){
  
        $("#finallmessage").append(person+", We have recieved your order and it will be delivered to you at "+ location + ". Prepare sh. "+ deliveryAmount);
        $("#totalbill").hide();
        $("#finallmessage").slideDown(1200);
      }
      else {
        alert("Please fill in the details for delivery!");
        $(".delivery").show();
        $("button#final-order").show();
      }
    });
   event.preventDefault();
  });
});
