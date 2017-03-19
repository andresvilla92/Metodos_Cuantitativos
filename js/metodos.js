var myapp = angular.module('metodos', []);
myapp.controller('numrandom', function($scope) {
  $scope.update = function() {
    input = $scope.cuadrados;
    num_iteraciones = $scope.iteraciones-1;
    $scope.cuadrados_medios = [];  
    $scope.congruencial_lineal = [];

      for (i = 0; i <= num_iteraciones; i++) {
          p1 = Math.pow(input, 2).toString()
          if (p1.length < 8) {
              while (p1.length < 8) {
                  p1 = '0' + p1;
              }
          }
          p1 = p1.substring(2, 6);
          
          $scope.cuadrados_medios.push({
              generador: '('+input+')^2',
              xi: p1,
              ri: p1/10000
          });          
          /*window.alert(p1);*/
          input = parseInt(p1)
      }
      /* Metodo congruencial */

iteraciones = 10;
m = $scope.m;
a = $scope.a;
c = $scope.c;
Xi = $scope.X;
congruencial = $scope.myDropDown;


/* Teorema de Hull- Dobell */

if (congruencial == 'mixto') {

  /* 1) Primos relativos */
  var numero_primos = numerosPrimosRelativos(m, c);

  function numerosPrimosRelativos(a, b) {

    var max;
    var count = 0;
    var primos_realtivos = true;

    if (a >= b) {
      max = a;
    } else {
      max = b
    }
    for (var i = 2; i <= max; i++) {
      if (a % i == 0 && b % i == 0) {
        primos_realtivos = false;
        /*window.alert(numero_primos);*/
        break;
      }

    }
    return primos_realtivos;
  }

  /* 2) Si q es factor primo de m entonces p divide a (a-1) */


  /* 3) Si 4 divide a m entonces 4 divide a (a-1) */
  var cuatro_divide = cuatroDivide(m, a);
  /*window.alert(cuatro_divide);*/

  function cuatroDivide(m, a) {
    if (m % 4 == 0) {
      if ((a - 1) % 4 == 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (cuatro_divide == true && numero_primos == true) {
    iteraciones = m;
  }
}

if (congruencial == 'mixto' || congruencial == 'multiplicativo') {
    c = 0;
    generador = '('+a+'*'+Xi+') mod'+m;
}
      
else{
    generador = '('+a+'*'+Xi+'+'+c+') mod'+m;

}

for (i = 1; i <= iteraciones; i++) {
  temp = (a * Xi + c) % m;
  resultado = temp / m
  /*window.alert(resultado);*/
  $scope.congruencial_lineal.push({
      generador: generador, 
      xi: temp,
      ri: resultado
  }); 
    Xi=temp;
}
      
  };
});

$(document).ready(function() {
    $('select').material_select();        
        
});

