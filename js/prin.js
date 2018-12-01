function getRandom(min, max){
  return Math.random() * (max - min) + min;
}

var isSafari = /constructor/i.test(window.HTMLElement);
var isFF = !!navigator.userAgent.match(/firefox/i);

if (isSafari) {
  document.getElementsByTagName('html')[0].classList.add('safari');
}

// Remove click on button for demo purpose
Array.prototype.slice.call(document.querySelectorAll('.button'), 0).forEach(function(bt) {
  bt.addEventListener('click', function(e) {
    e.preventDefault();
  });
});

initBt2();
initBt8();
// Button 2
function initBt2() {
  var bt = document.querySelectorAll('#component-2')[0];
  var filter = document.querySelectorAll('#filter-goo-2 feGaussianBlur')[0];
  var particleCount = 12;
  var colors = ['#DE8AA0', '#8AAEDE', '#FFB300', '#60C7DA']

  bt.addEventListener('click', function() {
    var particles = [];
    var nombre = $("#input-7").val();
    var email = $("#input-8").val(); validarEmail = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9_\-\.]+$/;
    var telefono = $("#input-9").val();
    var mensaje = $("#input-10").val();
    var tl = new TimelineLite({onUpdate: function() {
      filter.setAttribute('x', 0);
    }});

    tl.to(bt.querySelectorAll('.button__bg'), 0.6, { scaleX: 1.05 });
    tl.to(bt.querySelectorAll('.button__bg'), 0.9, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 0.6);

    for (var i = 0; i < particleCount; i++) {
      particles.push(document.createElement('span'));
      bt.appendChild(particles[i]);

      particles[i].classList.add(i % 2 ? 'left' : 'right');

      var dir = i % 2 ? '-' : '+';
      var r = i % 2 ? getRandom(-1, 1)*i/2 : getRandom(-1, 1)*i;
      var size = i < 2 ? 1 : getRandom(0.4, 0.8);
      var tl = new TimelineLite({ onComplete: function(i) {
        particles[i].parentNode.removeChild(particles[i]);
        this.kill();
      }, onCompleteParams: [i] });

      tl.set(particles[i], { scale: size });
      tl.to(particles[i], 0.6, { x: dir + 20, scaleX: 3, ease: SlowMo.ease.config(0.1, 0.7, false) });
      tl.to(particles[i], 0.1, { scale: size, x: dir +'=25' }, '-=0.1');
      if(i >= 2) tl.set(particles[i], { backgroundColor: colors[Math.round(getRandom(0, 3))] });
      tl.to(particles[i], 0.6, { x: dir + getRandom(60, 100), y: r*10, scale: 0.1, ease: Power3.easeOut });
      tl.to(particles[i], 0.2, { opacity: 0, ease: Power3.easeOut }, '-=0.2');
    }
    if(nombre == ""){
      $("#input-7").focus();
      return false;
    }else if (email == "" || !validarEmail.test(email)) {
      $("#input-8").focus();
      return false;
    }else if (telefono == "") {
      $("#input-9").focus();
      return false;
    }else if (mensaje == "") {
      $("#input-10").focus();
      return false;
    }else {
      //var datos = "Nombre: "+nombre+"\ne-mail: "+email+"\nTeléfono: "+telefono+"\nMensaje: "+mensaje;
      var datos = { nombre: $("#input-7").val(),
                    email: $("#input-8").val(),
                    telefono: $("#input-9").val(),
                    mensaje: $("#input-10").val()
                  };
      $.ajax({
        type: "POST",
        url: "email.php",
        data: datos,
        success: function(){
          alert("¡Mensaje enviado!");
          document.Form.input7.value='';
          document.Form.input8.value='';
          document.Form.input9.value='';
          document.Form.input10.value='';
          $("#input-10").focus();
          $("#input-9").focus();
          $("#input-8").focus();
          $("#input-7").focus();
        },
        error: function () {
          alert("Hubo un error al enviar los datos, verifique su información.");
        }
      });
      return false;
    }
  });
}

// Button 8
function initBt8() {
  var bt = document.querySelectorAll('#component-8')[0];
  var turb = document.querySelectorAll('#filter-ripple-1 feImage')[0];
  var dm = document.querySelectorAll('#filter-ripple-1 feDisplacementMap')[0];

  bt.addEventListener('click', function(e) {
    TweenLite.set(turb, { attr: { x: isFF ? e.offsetX : e.offsetX + 10, y: isFF ? e.offsetY : e.offsetY + 10, width: 0, height: 0 } });
    TweenLite.to(turb, 3, { attr: { x: '-=300', y: '-=300', width: 600, height: 600 } });
    TweenLite.fromTo(dm, 2, { attr: { scale: 30 } }, { attr: { scale: 0 } });
    var nombre = $("#input-7").val();
    var email = $("#input-8").val(); validarEmail = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9_\-\.]+$/;
    var telefono = $("#input-9").val();
    var mensaje = $("#input-10").val();
    if(nombre == ""){
      $("#input-7").focus();
      return false;
    }else if (email == "" || !validarEmail.test(email)) {
      $("#input-8").focus();
      return false;
    }else if (telefono == "") {
      $("#input-9").focus();
      return false;
    }else if (mensaje == "") {
      $("#input-10").focus();
      return false;
    }else {
      //var datos = "Nombre: "+nombre+"\ne-mail: "+email+"\nTeléfono: "+telefono+"\nMensaje: "+mensaje;
      var datos = { nombre: $("#input-7").val(),
                    email: $("#input-8").val(),
                    telefono: $("#input-9").val(),
                    mensaje: $("#input-10").val()
                  };
      $.ajax({
        type: "POST",
        url: "email.php",
        data: datos,
        success: function(){
          alert("¡Mensaje enviado!");
          document.Form.input7.value='';
          document.Form.input8.value='';
          document.Form.input9.value='';
          document.Form.input10.value='';
          $("#input-10").focus();
          $("#input-9").focus();
          $("#input-8").focus();
          $("#input-7").focus();
        },
        error: function () {
          alert("Hubo un error al enviar los datos, verifique su información.");
        }
      });
      return false;
    }
  });

   //alert("hola a todos");

}
