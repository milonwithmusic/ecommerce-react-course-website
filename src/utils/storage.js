//save data 

export function saveData(key,value){
    localStorage.setItem(key,JSON.stringify(value));
}

//Load Data 

export function loadData(key){
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data):null; 
}


//Remove or Delete Data

export function removeData(key){
    localStorage.removeItem(key);
}