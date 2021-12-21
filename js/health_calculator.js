var total_bashing_damage = 0;
var total_aggravated_damage = 0;
var changeList = [];

function undo() {
    if (changeList.length < 1) return;
    hitpoints = changeList.pop();
    id = hitpoints.shift();
    div = document.getElementById(id);
    div.replaceChildren(hitpoints);
}

function add_aggravated(id, damage=null) {
    let input_field = document.getElementById('damage_pool');
    if (damage == null) damage = parseInt(input_field.value, 10);

    let className = ''
    if (damage > 0) {
        className = 'aggravated';
    }
    else {
        className = 'empty';
    }
    let hitpoints = $(`#${id}`).children();
    if (hitpoints.length < 1 || damage == 0) return;  

    let increased_damage = total_aggravated_damage + damage;

    if (damage >= 0) {
        increased_damage = Math.min(hitpoints.length, total_aggravated_damage + damage)
        for (let i = 0; i < hitpoints.length; i++) {
            if (damage < 1) break;
            element = hitpoints[i]
            if (element.className == 'aggravated') continue;
            if (element.className == 'bashing') total_bashing_damage--;
            element.className = className;
            element.src = `../lib/check_box_${className}.png`;
            damage--;
        };
        total_aggravated_damage += damage;
    }

    else {
        for (let i = hitpoints.length; i > 0; i--) {
            if (damage > -1) break;
            element = hitpoints[i-1];
            if (element.className != 'empty') {
                if (element.className == 'bashing') total_bashing_damage--;
                else total_aggravated_damage--;
                element.className = 'empty';
                element.src = `../lib/check_box_empty.png`;
                damage++;
            }
            
        }
    }

    total_aggravated_damage = Math.max(0, total_aggravated_damage);
    total_aggravated_damage = Math.min(total_aggravated_damage, hitpoints.length);
    total_bashing_damage = Math.min(total_bashing_damage, hitpoints.length - total_aggravated_damage)
}

function add_bashing(id) {
    let input_field = document.getElementById('damage_pool');
    let damage = parseInt(input_field.value, 10);
    if (damage == 0) return;
    let hitpoints = $(`#${id}`).children()
    changeList.push([id, hitpoints])
    if (changeList.length > 100) changeList.shift();

    if (damage > 0) {
        className = 'bashing';
    }
    else {
        className = 'empty';
    }

    

    let i = 1
    let increment = -1;

    if (damage < 0) {
        i = hitpoints.length;
        increment *= -1;
    }

    while (damage != 0 & i > 0) {
        
        if (i > hitpoints.length) {
            add_aggravated(id, damage);
            break;
        }
        
        element = hitpoints[i-1];
                
        if (element.className == 'empty' & damage > 0) {
            damage--;
            total_bashing_damage++;
            element.className = 'bashing';
            element.src = `../lib/check_box_${className}.png`;
            i++;
            continue;
        }

        if (element.className != 'empty' & damage > 0) {
            i++;
            if (i > hitpoints.length) {
                add_aggravated(id, damage);
                break;
            }
            continue;
        }

        if (element.className == 'bashing' & damage < 0) {
            element.className = 'empty';
            element.src = `../lib/check_box_${className}.png`;
            damage++;
            total_bashing_damage--;
            i--;
            continue;
        }

        (damage < 0) ? i-- : i++;
        
        total_bashing_damage = Math.min(total_bashing_damage, hitpoints.length - total_aggravated_damage)

    }
    
}

function is_alive(hp) {
    return hp[-1] < 3;
}

function show_health(max_health, hp=none) {
    if (hp == none) hp = new Array(max_health).fill(0);
    
}

function increment(val, id)
{
    let input_field = document.getElementById(id);
    let value = parseInt(input_field.value, 10);
    value = isNaN(value) ? 0 : value;
    value += val;
    if (value > input_field.max && input_field.max != '') input_field.value = input_field.max;
    else if (value < input_field.min && input_field.min != '') input_field.value = input_field.min;

    else input_field.value = value;
}

var currentHealth = 0;
var currentWillpower = 0;

function generate_items(previous, current, id) 
{   
    id == 'hp' ? currentHealth = current : currentWillpower = current;

    div = document.getElementById(id);
    let id_name = ''
    id == 'hp' ? id_name = 'hpBox_' : id_name = 'wpBox_'
    if (previous < current) {
        for (var i = previous; i < current; i++){
            var img = document.createElement("img");
            img.height = "100"
            img.src = "../lib/check_box_empty.png";
            img.id = `${id_name}${i}`
            img.className = 'empty'
            
            document.getElementById(id).appendChild(img);            
        }
    }

    else if (previous > current) {
        for (var i = previous; i > current; i--) {
            $(`#${id}`).children().last().remove();
        }
    }

}

function generate_pools(id)
{
    if (id == 'hp') {
        let health_pool_field = document.getElementById('health_pool');
        let health_pool = parseInt(health_pool_field.value, 10);
        generate_items(currentHealth, health_pool, 'hp');
    }

    else {
        let willpower_pool_field = document.getElementById('willpower_pool');
        let willpower_pool = parseInt(willpower_pool_field.value, 10);
        generate_items(currentWillpower, willpower_pool, 'wp');
    }
    
}