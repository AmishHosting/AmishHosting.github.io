class Die {
    constructor(hunger=false) {
        this.hunger = hunger;
        this.result = null;
        
        if (hunger) {this.sample_space = ['hunger_fail', 2, 3, 4, 5, 6, 7, 8, 9, 'hunger_crit']}
        else {this.sample_space = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'crit']}
    }

    roll() {
        var index = Math.floor(Math.random() * this.sample_space.length);
        let result = this.sample_space[index];
        this.result = result;
        return result;
    }
}

function roll_dice() {
    dice = parseInt(document.getElementById("dice_pool").value);
    hunger_level = parseInt(document.getElementById("hunger_pool").value);
    console.log("Rolling " + dice + " dice with hunger level " + hunger_level)
    dice_pool = Array(dice);
    dice_results = Array(dice);
    for (i = 0; i < dice; i++) {
        if (i < hunger_level) {dice_pool[i] = new Die(hunger=true);}
        else {dice_pool[i] = new Die(hunger=false);}
        dice_results[i] = dice_pool[i].roll();
    }

    return dice_results;
}

function evaluate_roll(dice_results) {
    console.log(dice_results)
    var total_successes = 0;
    var crit_successes = 0;
    

    for (i=0; i<dice_results.length; i++) {
        var r = dice_results[i];
        if (r == 'hunger_fail') continue;
        if (r == 'crit' || r == 'hunger_crit') {crit_successes++; continue;}
        if (r > 5) total_successes++;
        
    }

    total_successes += 4 * Math.floor(crit_successes / 2);
    total_successes += 1 * crit_successes % 2;

    var hunger_fail = dice_results.includes('hunger_fail');
    var hunger_crit = dice_results.includes('hunger_crit') && crit_successes > 1;

    console.log(hunger_crit)
    return {total_successes, hunger_fail, hunger_crit, dice_results};
}

function show_results(dice_results) {
    var total_successes = dice_results.total_successes;
    var hunger_fail = dice_results.hunger_fail;
    var hunger_crit = dice_results.hunger_crit;
    var results = clean_results(dice_results.dice_results);
    document.getElementById("total_successes").innerText = "Successes: " + total_successes;
    if (hunger_fail) { 
        document.getElementById("hunger_fail").innerText = "Beastial Fail";
        document.getElementById("banner_left").style.display = 'block';
    } 
    else {
        document.getElementById("hunger_fail").innerText = "";
        document.getElementById("banner_left").style.display = 'none';
    }
    if (hunger_crit) {
        document.getElementById("hunger_crit").innerText = "Messy Critical";
        document.getElementById("banner_right").style.display = 'block';
    } 
    else {
        document.getElementById("hunger_crit").innerText = "";
        document.getElementById("banner_right").style.display = 'none';
    }

    document.getElementById("roll_dice_result").innerText = results;
    //document.getElementById("banner_left").display
    //document.getElementById("banner_right").display

}

function clean_results(results) {
    cleaned_results = [];
    results.forEach(e => {
        if (e == 'ehunger_fail') {
            e = new Image();
            e.src = '../lib/skull symbol.jpeg';
            e.style.size = '100px';
        }
        
        cleaned_results.push(e)
    });

    return cleaned_results;
}

function increment(val, id)
{
    console.log('incrementing by ' + val);
    var input_field = document.getElementById(id);
    var value = parseInt(input_field.value, 10);
    value = isNaN(value) ? 0 : value;
    value += val;
    console.log(input_field)
    if (value > input_field.max && input_field.max != '') input_field.value = input_field.max;
    else if (value < input_field.min && input_field.min != '') input_field.value = input_field.min;

    else input_field.value = value;
}

function reset() {
    var inputs = document.getElementsByTagName('input')
    for (i=0; i< inputs.length; i++) {
        inp = inputs[i];
        minimum = isNaN(inp.min) ? 0 : inp.min;
        inp.value = minimum;
    }
    document.getElementById("total_successes").innerText = "-";
    document.getElementById("hunger_fail").innerText = "";
    document.getElementById("hunger_crit").innerText = "";
    document.getElementById("roll_dice_result").innerText = "";
    document.getElementById("banner_right").style.display = 'none';
    document.getElementById("banner_left").style.display = 'none';
}