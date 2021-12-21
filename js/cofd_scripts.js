class Die {
    constructor(reroll_threshold=10, success_threshold=8) {
        this.reroll_threshold = reroll_threshold;
        this.success_threshold = success_threshold;
        this.sample_space = [1,2,3,4,5,6,7,8,9,10];
        this.result = null;
    }

    roll() {
        let index = Math.floor(Math.random() * this.sample_space.length);
        let result = this.sample_space[index];
        this.result = result;
        return result;
    }

    roll_and_evaluate() {
        let index = Math.floor(Math.random() * this.sample_space.length);
        let result = this.sample_space[index];

        if (result >= this.reroll_threshold) return 1 + this.roll_and_evaluate();

        if (result >= this.success_threshold) return 1;
        return 0;
    }

}

function roll_dice(reroll_threshold=10, success_threshold=8) {
    let text = document.getElementById("dice_rolls");
    text.innerText = "";
    dice = parseInt(document.getElementById("dice_pool").value);
    die = new Die(reroll_threshold=reroll_threshold, success_threshold);
    result = 0;
    for (let i = 0; i < dice; i++) {
        r = die.roll_and_evaluate();
        console.log("dice roll " + (1 + i).toString() + " is " + r.toString());
        result += r;
        text.innerText += r.toString();
        text.innerText += ", ";
    }

    text.innerText = text.innerText.substring(0, text.innerText.length - 1);

    return result;
}

function show_results(result) {
    document.getElementById("result_display").innerText = result.toString();
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