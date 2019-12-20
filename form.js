var $popUp = $('.popup');
var $popOverlay = $('.pop-overlay');
var $popWindow = $('#popup-window');
var $popClose = $('.popup-window .btn-close');
var $btnsub = $('#btnsub');
var form = document.getElementById('form');
var element = document.getElementById('popup-window');
var start = null;
  
  $popUp.on('click', function(){
        $popOverlay.fadeIn();
      $popWindow.fadeIn();
      history.pushState({ pop: 1 }, null, "#pop");
      window.requestAnimationFrame(step2(start, element));
  });

$popClose.on('click', function () {
    window.requestAnimationFrame(step1(start, element));
    setTimeout(function () {
        $popOverlay.fadeOut();
        $popWindow.fadeOut();
    }, 2000);


});

window.onpopstate = function (event) {
    if (event.state == null) {
        window.requestAnimationFrame(step1(start, element));
        setTimeout(function () {
            $popOverlay.fadeOut();
            $popWindow.fadeOut();
        }, 2000);
    

    }
};

function step2(start, element) {
    return function (timestamp) {
        // ��������� ����� �������.
        if (!start) start = timestamp;
        var progress = timestamp - start;
        // �������� �������.
        element.style.top = Math.min((progress) / 50, 200) + 'px';
        // ���� �� ������ 2 ������� �������� ��������� ����.
        if (progress < 2000) {
            window.requestAnimationFrame(step2(start, element));
        }
    }
}
function step1(start, element) {
    return function (timestamp) {
        // ��������� ����� �������.
        if (!start) start = timestamp;
        var progress = timestamp - start;
        // �������� �������.
        element.style.top = Math.min(40 - (progress) / 50, 200) + 'px';
        // ���� �� ������ 2 ������� �������� ��������� ����.
        if (progress < 2000) {
            window.requestAnimationFrame(step1(start, element));
        }
    }
}
  $(function(){
        $(document).on('click', function (event) {
            if ($(event.target).closest($popUp).length) return;
            if ($(event.target).closest($popWindow).length) return;
            if ($(event.target).closest($btnsub).length) return;
            window.requestAnimationFrame(step1(start, element));
            setTimeout(function () {
                $popOverlay.fadeOut();
                $popWindow.fadeOut();
            

            }, 1000);
            event.stopPropagation();
        });
  });

var xhr = new XMLHttpRequest();

$('.inner').submit(async function (e) {
   
    var th = $(this);
        try {
            let response = await fetch('https://formcarry.com/s/wiGrF8PlMSx', {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                mode: 'no-cors',
                body: new FormData(form)
            });
        

            
        } catch (error) {
        
            alert("PROVER FORMU"+error);

        }
    localStorage.removeItem('firstname');
    localStorage.removeItem('in');
    localStorage.removeItem('email');
    form.firstName.value = '';
    form.email.value = '';
    form.anotherInput.value = '';

    $popOverlay.fadeOut();
    $popWindow.fadeOut();

      
    e.preventDefault();
    return false;
});

form.email.value = localStorage.getItem('email');
form.email.oninput = () => {
    localStorage.setItem('email', form.email.value);
}
form.firstName.value = localStorage.getItem('firstname');
form.firstName.oninput = () => {
    localStorage.setItem('firstname', form.firstName.value);
}
form.anotherInput.value = localStorage.getItem('in');
form.anotherInput.oninput = () => {
    localStorage.setItem('in', form.anotherInput.value);
}