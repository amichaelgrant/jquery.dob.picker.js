/* 
 * Author: a.michael.grant AT gmail.com
 * Simple inline Date picker for foundation 5 framework
 * Very Skeletal yet very functional; Please feel free to fork and modify as you see fit
 */
(function($){
    
    function twoDigity(val){
        if(!val)
            return val;
        if(val < 10)
            return "0" + val;
        return val;
    };
    
    function renderTags(selectedYear, selectedMonth, selectedDay){
        if( !selectedYear)
            selectedYear = new Date().getFullYear();
        if( !selectedMonth)
            selectedMonth = new Date().getMonth();
        if( !selectedDay)
            selectedDay = new Date().getDay();
        var monthList = [
        '---','---','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
        ];
        var dayTag = '';
        var monthTag = '';
        var yearTag = '';
        //Day Tag//
        for(i=1;i<=31;i++){
            if( i == selectedDay)
                dayTag += '<option selected value="' + i + '">' + twoDigity(i) + '</option>';
            else
                dayTag += '<option value="' + i + '">' + twoDigity(i) + '</option>';
        }
        //Year Tag//
        var thisYear = new Date().getFullYear();
        while( thisYear > 1900){
            if(thisYear == selectedYear)
                yearTag += '<option selected value="' + thisYear + '">' + thisYear + '</option>';
            else
                yearTag += '<option value="' + thisYear + '">' + thisYear + '</option>';
            thisYear--;
        }
        //Month Tag//
        monthList.forEach( function(e,i){
            if(i>1){
                if( i == selectedMonth)
                    monthTag += '<option selected value="' + i + '">' + e + '</option>';
                else
                    monthTag += '<option value="' + i + '">' + e + '</option>';
            }
        });
        dayTag = '<div class="small-4 columns"><select name="dayTag" id="dayID">' + dayTag + '</select></div>';
        monthTag = '<div class="small-4 columns"><select name="monthTag" id="monthID">' + monthTag + '</select></div>';
        yearTag = '<div class="small-4 columns"><select name="yearTag" id="yearID">' + yearTag + '</select></div>';
        var dobTag = '<div class="row">' + dayTag + monthTag + yearTag + '</div>';
        var dob = selectedDay + "/" + selectedMonth + "/" + selectedYear;
        dobTag += '<input type="hidden" name="dob" value="' + dob + '" />';
        return dobTag;
    }
    var dob = renderTags();
    $.fn.DateOfBirth = function(){
        return this.each( function(){
            $(this).html(dob);
            //Adding dynamic event handlers for the select click/change events//
            var parent = this;
            $(this).on('click change', 'select', function(e){
                console.dir( parent );
                console.dir( this );
                var valMonth = $('#monthID').val();
                var valYear = $('#yearID').val();
                var valDay = $('#dayID').val();
                console.log('day->%s ; month->%s ; year->%s',valDay, valMonth,valYear);
                $(parent).html(renderTags(valYear, valMonth, valDay));
            });
        });
    }    
})(jQuery);