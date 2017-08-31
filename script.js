'use strict'

var calendar = function(){
	var months=[
		{name: 'January', days:31},
		{name: 'February', days:28},
		{name: 'March', days:31},
		{name: 'April', days:30},
		{name: 'May', days:31},
		{name: 'June', days:30},
		{name: 'July', days:31},
		{name: 'August', days:31},
		{name: 'September', days:30},
		{name: 'October', days:31},
		{name: 'November', days:30},
		{name: 'December', days:31},
	];
	var year;
	var shownMonth;
	var firstDayInField;
	var lastWeekInField;

	function countNextMonth(previous){
		var current;
		if(previous===11){
			current=0;
		}else{
			current=previous+1;
		}
		return current;
	}

	function countPreviousMonth(current){
		if(current===0) {
			return 11;
		}else{
			current--;
			return current;
		} 
	}

	function countDaysInMonth(firstDay, month, currentMonth){
		var daysInCalendar = 35;
		if(month!==currentMonth){
			var daysInMonth = months[month].days - firstDay + months[currentMonth].days + 1;
			if(daysInMonth>daysInCalendar){
				daysInCalendar += 7;
			}
		}

		return daysInCalendar;
	}

	function isToday(day, month){
		var date = new Date();
		var currentMonth = parseInt(date.getMonth());
		var currentDay = parseInt(date.getDate());

		if(day===currentDay && month===currentMonth){
			return true;
		} else return false;
	}

	function addDays(){
		var days = document.createDocumentFragment();
		var number = firstDayInField.day;
		var month = firstDayInField.month;
		var daysInCalendar = countDaysInMonth(number, month, shownMonth);


		for(var i = 0; i<daysInCalendar; i++){
			var day = document.createElement('p');
			var dayNumber = document.createTextNode(number);
			day.appendChild(dayNumber);
			day.classList.add('day');

			if(month !== shownMonth){
				day.classList.add('another-month');
			}
			if((i+1)%7===0){
				day.classList.add('weekend');
			}
			if(isToday(number, month)){
				day.classList.add('today');
			}
			days.appendChild(day);
			
			number++;
			if(number > months[month].days){
				month=countNextMonth(month);
				number=1;
			}
		}

		document.getElementById("numbers-field").appendChild(days);
	}

	function countLastWeeksDay(){
		var daysInCalendar = countDaysInMonth(firstDayInField.day, firstDayInField.month, shownMonth);
		var lastDayOfWeek = firstDayInField.day+28;
		var daysNumber=months[firstDayInField.month].days;

		if(lastDayOfWeek>daysNumber){
			lastDayOfWeek=lastDayOfWeek-daysNumber;
			lastWeekInField.month=countNextMonth(lastWeekInField.month);
		}
		lastWeekInField.day=lastDayOfWeek;
		if(daysInCalendar>35){
			lastWeekInField.day+=7;
		}
	}

	function countFirstDayInField(){
		firstDayInField.day = months[countPreviousMonth(shownMonth)].days + lastWeekInField.day - 28;
		if(firstDayInField.day>months[countPreviousMonth(shownMonth)].days){
			firstDayInField.day = months[countPreviousMonth(shownMonth)].days + lastWeekInField.day - 35;
		}
		firstDayInField.month = countPreviousMonth(shownMonth);
	}

	function addCardEvent(){
		var numbersField = document.getElementById('numbers-field');
		var children = numbersField.children;
		numbersField.addEventListener("click", function(ev){ 
			for(var i=0; i<children.length; i++){
				if(children[i].classList.contains('chosen-day')){
					children[i].classList.remove('chosen-day');
				}
			} 
	    	ev.target.classList.add('chosen-day');
	  	}); 
	}

	return{
		setValues: function(){
			year = 2017;
			shownMonth = 5;
			firstDayInField = {
				day: 29,
				month: 4
			};
			lastWeekInField = {
				day: 26,
				month: 5
			};
			addDays();
			addCardEvent();
		},


		previousMonth: function(){
			document.getElementById('numbers-field').innerHTML='';
			shownMonth=countPreviousMonth(shownMonth);
			if(shownMonth===11) year--;
			document.getElementById('month').innerHTML=months[shownMonth].name + ' ' + year;
			lastWeekInField.day = firstDayInField.day;
			lastWeekInField.month = firstDayInField.month;
			countFirstDayInField();
			addDays();
		},

		nextMonth: function(){
			document.getElementById('numbers-field').innerHTML='';
			shownMonth=countNextMonth(shownMonth);
			if(shownMonth===0) year++;
			document.getElementById('month').innerHTML=months[shownMonth].name + ' ' + year;
			firstDayInField.day=lastWeekInField.day;
			firstDayInField.month=lastWeekInField.month;
			addDays();
			countLastWeeksDay();
		}

	};
}();