

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();
const thisDay = today.getDate();
const thisWeekDay = today.getDay();
const numberOfDays = new Date(thisYear, thisMonth + 1, 0).getDate();
const FirstDayWeekDay = new Date(thisYear, thisMonth, 1).getDay();

const events = {};

printCalendar();

function printCalendar() {
  // Title
  let html = '<table><thead><tr><td colspan="7">' + months[thisMonth] + ' ' + thisYear + '</td></tr></thead><tbody>';

  // Week Days
  html+= '<tr class="weekDays">';
  html+= weekDays.map(day => '<td>' + day + '</td>').join('');
  html+= '</tr>';

  // empty days before month starts
  html+= '<tr>';
  for (i = 0; i < FirstDayWeekDay; i++) {
    html+= '<td class="disabled">-</td>';
  }

  // Month Days
  let actualWeekDay = FirstDayWeekDay;
  for (i = 1; i <= numberOfDays; i++) {
    if (actualWeekDay === 7) {
      actualWeekDay = 0;
      html+= '</tr><tr>';  
    }
    
    let classes = '';
    if (i === thisDay) classes += ' today';
    if (typeof events[i] !== 'undefined') classes += ' has-event';
    if (i >= thisDay) classes += ' schedule-enable'; else classes += ' schedule-disable';
    
    let click = 'null';
    if (i >= thisDay) click = 'handleClick(' + i + ')';

    html+= '<td class="' + classes + '" onClick="' + click + '">' + i + '</td>';
    actualWeekDay++;
  }
  
  // empty days before month ends
  for (i = actualWeekDay; i < 7; i++) {
    html+= '<td class="disabled">-</td>';
  }
  
  html+= '</tr>';

  // Closes
  html+= '</tbody></table>';

  document.getElementById('calendar').innerHTML = html;
}

function handleClick(day) {
  const modal = document.getElementById('modal');
  const main = document.getElementById('main');
  modal.classList.add('is-open'); //el.classList.remove(className);
  main.className += ' modal-is-open';
  let html = `
    <button class="close" onClick="handleModalClose()">X</button><h2 class="Schedule">هل تريد حجز موعيد في  ${months[thisMonth]} ${day}  ...؟ </h2>
    `;

  if (typeof events[day] !== 'undefined') {
    html += `
    <p>يوجد بالفعل موعد مسجل لهذا اليوم، يمكنك تحديثه أو حذفه أدناه:</p><form onSubmit="handleSubmit(' + day + '); return false;"><input type="hidden" name="day" value="' + day + '" /><button class="delete" onClick="handleDelete('${day}'); return false;">Delete</button></form>
    `;
  } else {
    html += `
       
       
        <div class='All_Data'>
       
        <div class='All_Time'>
          <p class='text-center'>حدد التوقيت</p>
            <div class='Time'>  
                <input type="text" value='12:00 pm' readonly onClick="Color_Input()" />
                <input type="text" value='10:00 pm' readonly onClick="Color_Input()"/>
                <input type="text" value='3:00 pm' readonly onClick="Color_Input()"/>
                <input type="text" value='4:00 pm' readonly onClick="Color_Input()"/>
            </div>
              <button onClick="Click_Next()" disabled class='btn btn-success w-100 Next_Step' id='Next_Step'> التالي </button>
        </div>
        
        
        
       <div class='form_data' id="form_data">
        <p class='text-center'> قم بادخال البيانات </p>
           <form onSubmit="handleSubmit('${day}'); return false;">
           <input type='text' placeholder='الاسم بالكامل' />
           <input type='text' placeholder=' اسم الشركة ' />
           <input type='text' placeholder='رقم الهاتف ' />
           <input type='text' placeholder=' الايميل ' />
             <input type="hidden" name="day" value="${day}" />
             <input id="text" type="text" name="description" placeholder='وصف الاجتماع' value="" />
        
             <button class="save btn btn-success text-white" type="submit"> حفظ </button>
             <button class="cancel btn btn-danger text-white" onClick="handleModalClose(); return false;">الغاء</button>
           </form>

       </div>
       </div>
    `;
  }
  
  modal.innerHTML = html;
}

function handleModalClose() {
  const modal = document.getElementById('modal');
  const main = document.getElementById('main');
  modal.classList.remove('is-open');
  main.classList.remove('modal-is-open');
}

function handleDelete(day) {
  delete events[day];
  handleModalClose();
  printCalendar();
}

function handleSubmit(day) {
  const text = document.getElementById('text');
  events[day] = text.value;
  handleModalClose();
  printCalendar();
}

function Click_Next(){
    const Next = document.getElementById("Next_Step");
    const Form_Data = document.getElementById("form_data");
    Next.onclick = ()=>{
       Form_Data.style.display = "block";

       if(Form_Data.style.display == "block"){
        Next.style.display = "none";
    }
    else{
        Next.style.display = "block";
    }

    }  
}

function Color_Input(){
    const Next = document.getElementById("Next_Step");
const timeInputs = document.querySelectorAll('.Time input');

// أضف مستمع الحدث لكل عنصر input
timeInputs.forEach(input => {
    input.addEventListener('click', function() {
        // قم بإزالة الخلفية الحمراء من جميع العناصر
        timeInputs.forEach(i => i.style.backgroundColor = '');
        
        // أضف الخلفية الحمراء للعنصر الحالي
        this.style.backgroundColor = 'rgb(52 63 182 / 57%)';

        Next.removeAttribute('disabled');
    });
});
}